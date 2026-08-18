import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { orderService } from './order.service.js';
import { listOrdersQuerySchema, updateOrderStatusSchema } from './order.schema.js';

export const adminOrderController = {
  async list(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const filters = listOrdersQuerySchema.parse(req.query);
    const orders = await orderService.listOrdersForAdmin(shopId, filters);
    res.json(orders);
  },

  async getById(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const order = await orderService.getOrderByIdForAdmin(shopId, req.params.id);
    res.json(order);
  },

  async updateStatus(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const { status } = updateOrderStatusSchema.parse(req.body);
    const order = await orderService.updateOrderStatus(shopId, req.params.id, status);
    res.json(order);
  },
};
