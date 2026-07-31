// Errore applicativo tipizzato: il Service Layer lancia AppError, il middleware
// centrale di gestione errori lo traduce in una risposta HTTP uniforme.
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code: string = 'BAD_REQUEST',
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Risorsa non trovata') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non autenticato') {
    super(message, 401, 'UNAUTHORIZED');
  }
}
