import { PrismaClient } from '@prisma/client';

// Singleton: un solo PrismaClient per processo, condiviso da tutti i repository.
export const prisma = new PrismaClient();
