import { Router } from 'express';

export const healthRouter = Router();

// Endpoint minimale per verificare che il server e la pipeline di deploy funzionino (M0).
healthRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
