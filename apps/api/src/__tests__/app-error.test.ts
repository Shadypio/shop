import { describe, expect, it } from 'vitest';
import { AppError, NotFoundError, UnauthorizedError } from '../middlewares/app-error.js';

describe('AppError', () => {
  it('imposta statusCode e code di default', () => {
    const err = new AppError('generico');
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('BAD_REQUEST');
  });

  it('NotFoundError usa statusCode 404', () => {
    const err = new NotFoundError();
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe('NOT_FOUND');
  });

  it('UnauthorizedError usa statusCode 401', () => {
    const err = new UnauthorizedError();
    expect(err.statusCode).toBe(401);
    expect(err.code).toBe('UNAUTHORIZED');
  });
});
