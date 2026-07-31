import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { healthRouter } from './modules/health/health.routes.js';

export function createApp() {
  const app = express();

  app.use(pinoHttp());
  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(
    session({
      name: 'shop.sid',
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 8, // 8 ore
      },
    }),
  );

  app.use('/api', healthRouter);
  // Le rotte dei moduli (products, categories, orders, auth) verranno montate qui
  // via app.use('/api/...', ...Router) man mano che vengono implementate (M1-M4).

  app.use(errorHandler);

  return app;
}
