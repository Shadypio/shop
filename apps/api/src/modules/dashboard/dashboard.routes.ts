import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { requireAuth } from '../../middlewares/require-auth.js';
import { dashboardController } from './dashboard.controller.js';

export const dashboardRouter = Router();

dashboardRouter.use(requireAuth);

dashboardRouter.get('/summary', asyncHandler(dashboardController.summary));
