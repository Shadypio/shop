import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { orderController } from './order.controller.js';

export const orderRouter = Router();

// Pubblico: il cliente invia una richiesta d'ordine, nessuna autenticazione richiesta.
orderRouter.post('/', asyncHandler(orderController.create));
