import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { categoryController } from './category.controller.js';

export const categoryRouter = Router();

categoryRouter.get('/', asyncHandler(categoryController.list));
categoryRouter.get('/:slug', asyncHandler(categoryController.getBySlug));
