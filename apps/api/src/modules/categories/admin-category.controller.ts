import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { categoryService } from './category.service.js';
import { createCategorySchema, updateCategorySchema } from './category.schema.js';

// Controller per il pannello admin: stesse categorie del catalogo pubblico,
// ma con operazioni di scrittura protette da requireAuth (vedi routes).
export const adminCategoryController = {
  async list(_req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const categories = await categoryService.listCategories(shopId);
    res.json(categories);
  },

  async create(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const input = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(shopId, input);
    res.status(201).json(category);
  },

  async update(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const input = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(shopId, req.params.id, input);
    res.json(category);
  },

  async remove(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    await categoryService.deleteCategory(shopId, req.params.id);
    res.status(204).send();
  },
};
