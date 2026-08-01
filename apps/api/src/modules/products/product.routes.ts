import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { productController } from './product.controller.js';

export const productRouter = Router();

productRouter.get('/', asyncHandler(productController.list));
productRouter.get('/:slug', asyncHandler(productController.getBySlug));
