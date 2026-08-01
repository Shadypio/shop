import { Prisma } from '@prisma/client';
import { productRepository } from './product.repository.js';
import { NotFoundError } from '../../middlewares/app-error.js';
import type { ListProductsQuery } from './product.schema.js';

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: { select: { id: true; name: true; slug: true } };
    images: true;
  };
}>;

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

export const productService = {
  async listProducts(shopId: string, filters: ListProductsQuery) {
    const products = await productRepository.findAvailableByShop(shopId, filters);
    return products.map(toListDto);
  },

  async getProductBySlug(shopId: string, slug: string) {
    const product = await productRepository.findBySlug(shopId, slug);
    if (!product) {
      throw new NotFoundError('Prodotto non trovato');
    }
    return toDetailDto(product);
  },
};
