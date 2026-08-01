import { prisma } from '../../config/prisma.js';

// Repository: unico punto di accesso a Prisma per le categorie.
// Il Service Layer non conosce Prisma, solo questa interfaccia.
export const categoryRepository = {
  findAllByShop(shopId: string) {
    return prisma.category.findMany({
      where: { shopId },
      orderBy: { name: 'asc' },
    });
  },

  findBySlug(shopId: string, slug: string) {
    return prisma.category.findUnique({
      where: { shopId_slug: { shopId, slug } },
    });
  },
};
