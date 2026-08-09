import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { productService } from './product.service.js';
import { createProductSchema, updateProductSchema } from './product.schema.js';
import { imageStorageService } from '../../services/image-storage.js';
import { AppError } from '../../middlewares/app-error.js';

export const adminProductController = {
  async list(_req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const products = await productService.listAllForAdmin(shopId);
    res.json(products);
  },

  async getById(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const product = await productService.getByIdForAdmin(shopId, req.params.id);
    res.json(product);
  },

  async create(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const input = createProductSchema.parse(req.body);
    const product = await productService.createProduct(shopId, input);
    res.status(201).json(product);
  },

  async update(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const input = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(shopId, req.params.id, input);
    res.json(product);
  },

  async remove(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    await productService.deleteProduct(shopId, req.params.id);
    res.status(204).send();
  },

  async uploadImage(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    if (!req.file) {
      throw new AppError('Nessun file caricato', 400, 'MISSING_FILE');
    }
    const { url } = await imageStorageService.upload(
      {
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
      `products/${req.params.id}`,
    );
    const product = await productService.addProductImage(shopId, req.params.id, url);
    res.status(201).json(product);
  },

  async removeImage(req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const product = await productService.removeProductImage(
      shopId,
      req.params.id,
      req.params.imageId,
    );
    res.json(product);
  },
};
