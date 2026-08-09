import { prisma } from '../../config/prisma.js';

export const authRepository = {
  findByEmail(email: string) {
    return prisma.adminUser.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.adminUser.findUnique({ where: { id } });
  },
};
