import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { createOrderRateLimiter } from '../../middlewares/rate-limit.js';
import { orderController } from './order.controller.js';

export const orderRouter = Router();

// Pubblico: il cliente invia una richiesta d'ordine, nessuna autenticazione richiesta.
orderRouter.post('/', createOrderRateLimiter, asyncHandler(orderController.create));
