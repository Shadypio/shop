import { prisma } from '../../config/prisma.js';
import type { ListProductsQuery } from './product.schema.js';

const listInclude = {
  category: { select: { id: true, name: true, slug: true } },
  images: { orderBy: { position: 'asc' as const }, take: 1 },
};

const detailInclude = {
  category: { select: { id: true, name: true, slug: true } },
  images: { orderBy: { position: 'asc' as const } },
};

export const productRepository = {
  // Il catalogo pubblico mostra solo i prodotti che il negoziante ha reso
  // disponibili: "available" è il modo con cui il merchant nasconde/mostra
  // un prodotto senza doverlo eliminare (nessun inventario reale dietro).
  findAvailableByShop(shopId: string, filters: ListProductsQuery) {
    return prisma.product.findMany({
      where: {
        shopId,
        available: true,
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
        ...(filters.categorySlug ? { category: { slug: filters.categorySlug } } : {}),
        ...(filters.search
          ? { name: { contains: filters.search, mode: 'insensitive' as const } }
          : {}),
      },
      orderBy: { name: 'asc' },
      include: listInclude,
    });
  },

  findBySlug(shopId: string, slug: string) {
    return prisma.product.findUnique({
      where: { shopId_slug: { shopId, slug } },
      include: detailInclude,
    });
  },

  // Variante admin: tutti i prodotti dello shop, disponibili o meno.
  findAllByShop(shopId: string) {
    return prisma.product.findMany({
      where: { shopId },
      orderBy: { name: 'asc' },
      include: detailInclude,
    });
  },

  findById(shopId: string, id: string) {
    return prisma.product.findFirst({ where: { id, shopId }, include: detailInclude });
  },

  findBySlugExcludingId(shopId: string, slug: string, excludeId?: string) {
    return prisma.product.findFirst({ where: { shopId, slug, NOT: { id: excludeId } } });
  },

  create(
    shopId: string,
    data: {
      name: string;
      slug: string;
      description?: string;
      price: number;
      categoryId: string;
      available: boolean;
    },
  ) {
    return prisma.product.create({ data: { ...data, shopId }, include: detailInclude });
  },

  update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string | null;
      price: number;
      categoryId: string;
      available: boolean;
    }>,
  ) {
    return prisma.product.update({ where: { id }, data, include: detailInclude });
  },

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },

  countOrderItems(productId: string) {
    return prisma.orderItem.count({ where: { productId } });
  },

  addImage(productId: string, url: string, position: number) {
    return prisma.productImage.create({ data: { productId, url, position } });
  },

  countImages(productId: string) {
    return prisma.productImage.count({ where: { productId } });
  },

  removeImage(imageId: string) {
    return prisma.productImage.delete({ where: { id: imageId } });
  },

  findImageById(imageId: string) {
    return prisma.productImage.findUnique({ where: { id: imageId } });
  },
};
