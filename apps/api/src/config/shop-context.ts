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
  // Si assegna prima a una costante locale e si restituisce quella: il
  // narrowing di TypeScript su una variabile di modulo mutabile (`let`) non
  // è sempre garantito attraverso un'assegnazione, quindi rileggere
  // `cachedShopId` subito dopo può ancora risultare "string | null".
  const shopId = shop.id;
  cachedShopId = shopId;
  return shopId;
}
