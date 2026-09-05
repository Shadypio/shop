import { Router } from 'express';
import { asyncHandler } from '../../middlewares/error-handler.js';
import { loginRateLimiter } from '../../middlewares/rate-limit.js';
import { authController } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/login', loginRateLimiter, asyncHandler(authController.login));
authRouter.post('/logout', asyncHandler(authController.logout));
authRouter.get('/me', asyncHandler(authController.me));
