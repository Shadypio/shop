import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { categoryService } from './category.service.js';

export const categoryController = {
  async list(_req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const categories = await categoryService.listCategories(shopId);
    res.json(categories);
  },

  async getBySlug(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const category = await categoryService.getCategoryBySlug(shopId, req.params.slug);
    res.json(category);
  },
};
