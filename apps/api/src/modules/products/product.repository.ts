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
};
