import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { productService } from './product.service.js';
import { listProductsQuerySchema } from './product.schema.js';

export const productController = {
  async list(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const filters = listProductsQuerySchema.parse(req.query);
    const products = await productService.listProducts(shopId, filters);
    res.json(products);
  },

  async getBySlug(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const product = await productService.getProductBySlug(shopId, req.params.slug);
    res.json(product);
  },
};
