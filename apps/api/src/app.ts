import cors from 'cors';
import express from 'express';
import path from 'node:path';
import session from 'express-session';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { healthRouter } from './modules/health/health.routes.js';
import { categoryRouter } from './modules/categories/category.routes.js';
import { adminCategoryRouter } from './modules/categories/admin-category.routes.js';
import { productRouter } from './modules/products/product.routes.js';
import { adminProductRouter } from './modules/products/admin-product.routes.js';
import { orderRouter } from './modules/orders/order.routes.js';
import { adminOrderRouter } from './modules/orders/admin-order.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { dashboardRouter } from './modules/dashboard/dashboard.routes.js';

export function createApp() {
  const app = express();

  // Necessario in produzione: Render è dietro un reverse proxy, senza questo
  // Express non riconoscerebbe la connessione come HTTPS e il cookie "secure"
  // non verrebbe mai impostato.
  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

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
        // In produzione frontend (Vercel) e backend (Render) vivono su domini
        // diversi: il cookie di sessione deve essere cross-site, quindi
        // richiede SameSite=None + Secure. In sviluppo restano entrambi su
        // localhost (porte diverse ma stesso "site"), quindi Lax + non-Secure
        // funziona ed evita di dover usare HTTPS in locale.
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 8, // 8 ore
      },
    }),
  );

  app.use('/api', healthRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);

  // File statici delle immagini caricate localmente (vedi LocalDiskImageStorageService).
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.use('/api/admin/auth', authRouter);
  app.use('/api/admin/categories', adminCategoryRouter);
  app.use('/api/admin/products', adminProductRouter);
  app.use('/api/admin/orders', adminOrderRouter);
  app.use('/api/admin/dashboard', dashboardRouter);

  app.use(errorHandler);

  return app;
}
