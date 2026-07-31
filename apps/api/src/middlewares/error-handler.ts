import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from './app-error.js';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Dati non validi',
        details: err.flatten(),
      },
    });
  }

  req.log?.error({ err }, 'Errore non gestito');
  return res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Errore interno del server' },
  });
}

// Evita try/catch ripetuti nei controller: incapsula gli handler async
// e inoltra automaticamente le eccezioni al middleware di errore.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
