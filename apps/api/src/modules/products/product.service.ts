import { productRepository } from './product.repository.js';
import { categoryRepository } from '../categories/category.repository.js';
import { AppError, NotFoundError } from '../../middlewares/app-error.js';
import { slugify } from '../../lib/slugify.js';
import type {
  ListProductsQuery,
  CreateProductInput,
  UpdateProductInput,
} from './product.schema.js';

// Forma esplicita del prodotto con le relazioni usate da questo modulo,
// definita localmente invece che tramite `Prisma.ProductGetPayload<...>`:
// in alcuni ambienti di build il client Prisma generato non espone questo
// helper type (o l'intero namespace `Prisma`), quindi affidarsi a un tipo
// concreto scritto a mano rende il file compilabile indipendentemente da
// come/dove viene generato il client, senza cambiare nulla a runtime.
interface ProductCategorySnapshot {
  id: string;
  name: string;
  slug: string;
}

interface ProductImageSnapshot {
  id: string;
  url: string;
  position: number;
}

interface ProductWithRelations {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: unknown; // Prisma.Decimal a runtime: va sempre convertito con Number(...)
  available: boolean;
  category: ProductCategorySnapshot;
  images: ProductImageSnapshot[];
}

function toListDto(product: ProductWithRelations) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    available: product.available,
    image: product.images[0]?.url ?? null,
    category: product.category,
  };
}

function toDetailDto(product: ProductWithRelations) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    available: product.available,
    category: product.category,
    images: product.images.map((image) => image.url),
  };
}

function toAdminDetailDto(product: ProductWithRelations) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    available: product.available,
    category: product.category,
    images: product.images.map((image) => ({ id: image.id, url: image.url })),
  };
}

async function generateUniqueSlug(shopId: string, name: string, excludeId?: string) {
  const base = slugify(name) || 'prodotto';
  let candidate = base;
  let attempt = 1;
  while (true) {
    const existing = await productRepository.findBySlugExcludingId(shopId, candidate, excludeId);
    if (!existing) {
      return candidate;
    }
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}

async function assertCategoryExists(shopId: string, categoryId: string) {
  const category = await categoryRepository.findById(shopId, categoryId);
  if (!category) {
    throw new AppError('Categoria non valida', 400, 'INVALID_CATEGORY');
  }
}

export const productService = {
  async listProducts(shopId: string, filters: ListProductsQuery) {
    const products = await productRepository.findAvailableByShop(shopId, filters);
    return (products as ProductWithRelations[]).map(toListDto);
  },

  async getProductBySlug(shopId: string, slug: string) {
    const product = await productRepository.findBySlug(shopId, slug);
    if (!product) {
      throw new NotFoundError('Prodotto non trovato');
    }
    return toDetailDto(product as ProductWithRelations);
  },

  // --- Operazioni per il pannello admin ---

  async listAllForAdmin(shopId: string) {
    const products = await productRepository.findAllByShop(shopId);
    return (products as ProductWithRelations[]).map(toAdminDetailDto);
  },

  async getByIdForAdmin(shopId: string, id: string) {
    const product = await productRepository.findById(shopId, id);
    if (!product) {
      throw new NotFoundError('Prodotto non trovato');
    }
    return toAdminDetailDto(product as ProductWithRelations);
  },

  async createProduct(shopId: string, input: CreateProductInput) {
    await assertCategoryExists(shopId, input.categoryId);
    const slug = await generateUniqueSlug(shopId, input.name);
    const product = await productRepository.create(shopId, {
      name: input.name,
      slug,
      description: input.description,
      price: input.price,
      categoryId: input.categoryId,
      available: input.available,
    });
    return toAdminDetailDto(product as ProductWithRelations);
  },

  async updateProduct(shopId: string, id: string, input: UpdateProductInput) {
    const existing = await productRepository.findById(shopId, id);
    if (!existing) {
      throw new NotFoundError('Prodotto non trovato');
    }
    if (input.categoryId) {
      await assertCategoryExists(shopId, input.categoryId);
    }
    const slug = input.name ? await generateUniqueSlug(shopId, input.name, id) : undefined;
    const product = await productRepository.update(id, {
      ...input,
      ...(slug ? { slug } : {}),
    });
    return toAdminDetailDto(product as ProductWithRelations);
  },

  async deleteProduct(shopId: string, id: string) {
    const existing = await productRepository.findById(shopId, id);
    if (!existing) {
      throw new NotFoundError('Prodotto non trovato');
    }
    // Un prodotto già presente in ordini passati non va eliminato: cancellarlo
    // romperebbe lo storico ordini (OrderItem mantiene un riferimento FK).
    // Il negoziante deve invece segnarlo come non disponibile.
    const orderCount = await productRepository.countOrderItems(id);
    if (orderCount > 0) {
      throw new AppError(
        'Impossibile eliminare: il prodotto compare in ordini esistenti. Segnalo come non disponibile invece.',
        409,
        'PRODUCT_HAS_ORDERS',
      );
    }
    await productRepository.delete(id);
  },

  async addProductImage(shopId: string, productId: string, url: string) {
    const existing = await productRepository.findById(shopId, productId);
    if (!existing) {
      throw new NotFoundError('Prodotto non trovato');
    }
    const currentCount = await productRepository.countImages(productId);
    await productRepository.addImage(productId, url, currentCount);
    return productService.getByIdForAdmin(shopId, productId);
  },

  async removeProductImage(shopId: string, productId: string, imageId: string) {
    const product = await productRepository.findById(shopId, productId);
    if (!product) {
      throw new NotFoundError('Prodotto non trovato');
    }
    const image = await productRepository.findImageById(imageId);
    if (!image || image.productId !== productId) {
      throw new NotFoundError('Immagine non trovata');
    }
    await productRepository.removeImage(imageId);
    return productService.getByIdForAdmin(shopId, productId);
  },
};
