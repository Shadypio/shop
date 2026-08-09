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

  findById(shopId: string, id: string) {
    return prisma.category.findFirst({ where: { id, shopId } });
  },

  create(shopId: string, data: { name: string; slug: string }) {
    return prisma.category.create({ data: { ...data, shopId } });
  },

  update(id: string, data: { name?: string; slug?: string }) {
    return prisma.category.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },

  countProducts(categoryId: string) {
    return prisma.product.count({ where: { categoryId } });
  },
};
