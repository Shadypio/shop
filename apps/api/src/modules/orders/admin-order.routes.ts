import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { requireAuth } from '../../middlewares/require-auth.js';
import { adminOrderController } from './admin-order.controller.js';

export const adminOrderRouter = Router();

adminOrderRouter.use(requireAuth);

adminOrderRouter.get('/', asyncHandler(adminOrderController.list));
adminOrderRouter.get('/:id', asyncHandler(adminOrderController.getById));
adminOrderRouter.patch('/:id/status', asyncHandler(adminOrderController.updateStatus));
