import { prisma } from '../../config/prisma.js';

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

export const orderRepository = {
  // Usato dal Service per ricalcolare i prezzi lato server prima di creare l'ordine.
  findProductsByIds(shopId: string, ids: string[]) {
    return prisma.product.findMany({
      where: { shopId, id: { in: ids } },
    });
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
};
