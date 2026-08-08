import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { orderService } from './order.service.js';
import { createOrderSchema } from './order.schema.js';

export const orderController = {
  async create(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const input = createOrderSchema.parse(req.body);
    const order = await orderService.createOrder(shopId, input);
    res.status(201).json(order);
  },
};
