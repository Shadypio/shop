import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { healthRouter } from './modules/health/health.routes.js';
import { categoryRouter } from './modules/categories/category.routes.js';
import { productRouter } from './modules/products/product.routes.js';

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
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
  // Le rotte admin (prodotti/categorie CRUD, ordini, auth) verranno montate qui
  // sotto /api/admin man mano che vengono implementate (M3-M4).

  app.use(errorHandler);

  return app;
}
