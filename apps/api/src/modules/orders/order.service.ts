import { orderRepository } from './order.repository.js';
import { AppError, NotFoundError } from '../../middlewares/app-error.js';
import type { CreateOrderInput, ListOrdersQuery } from './order.schema.js';
import type { OrderStatus } from '@prisma/client';

// Macchina a stati minimale per le transizioni di stato ordine.
// Regola: PENDING/CONFIRMED/MODIFIED sono stati "vivi" e possono muoversi
// liberamente tra loro; REJECTED e COMPLETED sono terminali (l'ordine è
// stato chiuso, non ha senso riaprirlo — un nuovo ordine va creato ex novo).
const TERMINAL_STATUSES: OrderStatus[] = ['REJECTED', 'COMPLETED'];

function assertValidTransition(from: OrderStatus, to: OrderStatus) {
  if (from === to) {
    return; // no-op, permesso implicitamente
  }
  if (TERMINAL_STATUSES.includes(from)) {
    throw new AppError(
      `L'ordine è già "${from}" e non può essere modificato ulteriormente`,
      409,
      'ORDER_STATUS_TERMINAL',
    );
  }
}

function toListDto(order: {
  id: string;
  customerName: string;
  customerSurname: string;
  phone: string;
  deliveryMethod: string;
  status: string;
  createdAt: Date;
  items: { unitPrice: unknown; quantity: number }[];
}) {
  const total = order.items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0,
  );
  return {
    id: order.id,
    customerName: order.customerName,
    customerSurname: order.customerSurname,
    phone: order.phone,
    deliveryMethod: order.deliveryMethod,
    status: order.status,
    total,
    createdAt: order.createdAt,
  };
}

function toDetailDto(order: {
  id: string;
  customerName: string;
  customerSurname: string;
  phone: string;
  address: string | null;
  notes: string | null;
  deliveryMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    productId: string;
    productName: string;
    unitPrice: unknown;
    quantity: number;
  }[];
}) {
  const items = order.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    unitPrice: Number(item.unitPrice),
    quantity: item.quantity,
  }));
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return {
    id: order.id,
    customerName: order.customerName,
    customerSurname: order.customerSurname,
    phone: order.phone,
    address: order.address,
    notes: order.notes,
    deliveryMethod: order.deliveryMethod,
    status: order.status,
    total,
    items,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

export const orderService = {
  async createOrder(shopId: string, input: CreateOrderInput) {
    const productIds = [...new Set(input.items.map((item) => item.productId))];
    const products = await orderRepository.findProductsByIds(shopId, productIds);

    if (products.length !== productIds.length) {
      throw new AppError(
        'Uno o più prodotti non sono più disponibili nel catalogo',
        400,
        'INVALID_ITEMS',
      );
    }

    const productsById = new Map(products.map((product) => [product.id, product]));

    // Prezzo e nome ricalcolati dal DB: non ci si fida mai di quanto inviato dal client.
    const items = input.items.map((item) => {
      const product = productsById.get(item.productId)!;
      return {
        productId: product.id,
        productName: product.name,
        unitPrice: Number(product.price),
        quantity: item.quantity,
      };
    });

    const order = await orderRepository.createOrder(shopId, {
      customerName: input.customerName,
      customerSurname: input.customerSurname,
      phone: input.phone,
      address: input.address,
      notes: input.notes,
      deliveryMethod: input.deliveryMethod,
      items,
    });

    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return {
      id: order.id,
      status: order.status,
      total,
      createdAt: order.createdAt,
    };
  },

  // --- Operazioni per il pannello admin ---

  async listOrdersForAdmin(shopId: string, filters: ListOrdersQuery) {
    const orders = await orderRepository.findAllByShop(shopId, filters);
    return orders.map(toListDto);
  },

  async getOrderByIdForAdmin(shopId: string, id: string) {
    const order = await orderRepository.findById(shopId, id);
    if (!order) {
      throw new NotFoundError('Ordine non trovato');
    }
    return toDetailDto(order);
  },

  async updateOrderStatus(shopId: string, id: string, nextStatus: OrderStatus) {
    const order = await orderRepository.findById(shopId, id);
    if (!order) {
      throw new NotFoundError('Ordine non trovato');
    }
    assertValidTransition(order.status, nextStatus);
    const updated = await orderRepository.updateStatus(id, nextStatus);
    return toDetailDto(updated);
  },

  async getDashboardSummary(shopId: string) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [total, pending, completed, today] = await Promise.all([
      orderRepository.countByShop(shopId),
      orderRepository.countByShopAndStatus(shopId, 'PENDING'),
      orderRepository.countByShopAndStatus(shopId, 'COMPLETED'),
      orderRepository.countCreatedSince(shopId, startOfToday),
    ]);

    return { totalOrders: total, pendingOrders: pending, completedOrders: completed, todayOrders: today };
  },
};
