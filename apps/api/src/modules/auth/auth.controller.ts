import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { loginSchema } from './auth.schema.js';
import { AppError, UnauthorizedError } from '../../middlewares/app-error.js';

export const authController = {
  async login(req: Request, res: Response) {
    const input = loginSchema.parse(req.body);
    const admin = await authService.login(input);

    // Rigenera l'id di sessione al login per prevenire session fixation.
    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });
    req.session.adminUserId = admin.id;

    res.json(admin);
  },

  async logout(req: Request, res: Response) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
    res.clearCookie('shop.sid');
    res.status(204).send();
  },

  async me(req: Request, res: Response) {
    if (!req.session.adminUserId) {
      throw new UnauthorizedError();
    }
    const admin = await authService.getById(req.session.adminUserId);
    if (!admin) {
      throw new AppError('Sessione non valida', 401, 'UNAUTHORIZED');
    }
    res.json(admin);
  },
};
