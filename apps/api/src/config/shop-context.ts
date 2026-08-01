import { prisma } from './prisma.js';
import { env } from './env.js';

// MVP single-tenant: un solo shop, risolto per slug e cachato in memoria.
// Isolare questa funzione qui rende esplicito il "confine" da cui, in futuro,
// si passerà alla risoluzione del tenant per sottodominio/header, senza
// dover toccare i repository che già ricevono uno shopId come parametro.
let cachedShopId: string | null = null;

export async function getCurrentShopId(): Promise<string> {
  if (cachedShopId) {
    return cachedShopId;
  }
  const shop = await prisma.shop.findUniqueOrThrow({ where: { slug: env.SHOP_SLUG } });
  cachedShopId = shop.id;
  return cachedShopId;
}
