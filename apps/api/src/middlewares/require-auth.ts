import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from './app-error.js';

// Protegge le rotte /api/admin/*: verifica che la sessione contenga un
// adminUserId valido (impostato al login). Nessun token: solo il cookie
// HttpOnly di sessione gestito da express-session.
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.session.adminUserId) {
    throw new UnauthorizedError('Accesso riservato agli amministratori');
  }
  next();
}
