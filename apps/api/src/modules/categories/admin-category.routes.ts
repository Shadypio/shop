import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { requireAuth } from '../../middlewares/require-auth.js';
import { adminCategoryController } from './admin-category.controller.js';

export const adminCategoryRouter = Router();

adminCategoryRouter.use(requireAuth);

adminCategoryRouter.get('/', asyncHandler(adminCategoryController.list));
adminCategoryRouter.post('/', asyncHandler(adminCategoryController.create));
adminCategoryRouter.patch('/:id', asyncHandler(adminCategoryController.update));
adminCategoryRouter.delete('/:id', asyncHandler(adminCategoryController.remove));
