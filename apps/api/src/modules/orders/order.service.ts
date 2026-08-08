import { orderRepository } from './order.repository.js';
import { AppError } from '../../middlewares/app-error.js';
import type { CreateOrderInput } from './order.schema.js';

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
};
