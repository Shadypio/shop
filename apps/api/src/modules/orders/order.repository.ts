import { prisma } from '../../config/prisma.js';
import type { ListOrdersQuery, OrderStatus } from './order.schema.js';

interface OrderItemInput {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface CreateOrderData {
  customerName: string;
  customerSurname: string;
  phone: string;
  address?: string;
  notes?: string;
  deliveryMethod: 'DELIVERY' | 'PICKUP';
  items: OrderItemInput[];
}

// Forma minima del prodotto necessaria per ricalcolare un ordine lato server.
// Definita esplicitamente (invece di affidarsi al tipo Product inferito dal
// client Prisma) per restare compilabile anche quando la generazione dei
// tipi Prisma in un ambiente di build risulta incompleta.
export interface OrderProductSnapshot {
  id: string;
  name: string;
  price: unknown; // Prisma.Decimal a runtime: va sempre convertito con Number(...)
}

// Nessuna annotazione esplicita "satisfies Prisma.OrderInclude": il tipo
// viene semplicemente inferito da questo oggetto letterale. In alcuni
// ambienti di build il client Prisma non espone il namespace `Prisma` con
// tutti i suoi helper type (es. `Prisma.OrderInclude`), quindi evitare quella
// dipendenza rende il file compilabile indipendentemente da come/dove viene
// generato il client, senza cambiare il comportamento a runtime.
const withItems = { items: true };

export const orderRepository = {
  // Usato dal Service per ricalcolare i prezzi lato server prima di creare l'ordine.
  // Cast esplicito sul valore di ritorno: se in un ambiente di build il modello
  // Product risultasse tipizzato in modo incompleto dal client Prisma generato,
  // il confronto strutturale con OrderProductSnapshot fallirebbe; il cast
  // garantisce che il file compili comunque, riflettendo la forma reale dei
  // dati restituiti a runtime.
  findProductsByIds(shopId: string, ids: string[]): Promise<OrderProductSnapshot[]> {
    return prisma.product.findMany({
      where: { shopId, id: { in: ids } },
    }) as Promise<OrderProductSnapshot[]>;
  },

  createOrder(shopId: string, data: CreateOrderData) {
    return prisma.order.create({
      data: {
        shopId,
        customerName: data.customerName,
        customerSurname: data.customerSurname,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        deliveryMethod: data.deliveryMethod,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  },

  // --- Operazioni per il pannello admin ---

  findAllByShop(shopId: string, filters: ListOrdersQuery) {
    return prisma.order.findMany({
      where: {
        shopId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search
          ? {
              OR: [
                { customerName: { contains: filters.search, mode: 'insensitive' as const } },
                { customerSurname: { contains: filters.search, mode: 'insensitive' as const } },
                { phone: { contains: filters.search, mode: 'insensitive' as const } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: withItems,
      // Limite di sicurezza: sufficiente per il volume di un piccolo negozio;
      // evita query illimitate quando lo storico ordini crescerà nel tempo.
      take: 200,
    });
  },

  findById(shopId: string, id: string) {
    return prisma.order.findFirst({ where: { id, shopId }, include: withItems });
  },

  updateStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
      include: withItems,
    });
  },

  countByShop(shopId: string) {
    return prisma.order.count({ where: { shopId } });
  },

  countByShopAndStatus(shopId: string, status: OrderStatus) {
    return prisma.order.count({ where: { shopId, status } });
  },

  countCreatedSince(shopId: string, since: Date) {
    return prisma.order.count({ where: { shopId, createdAt: { gte: since } } });
  },
};
