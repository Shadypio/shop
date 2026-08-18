import type { Request, Response } from 'express';
import { getCurrentShopId } from '../../config/shop-context.js';
import { orderService } from '../orders/order.service.js';

// Dashboard minimale: solo i conteggi richiesti dall'MVP (numero ordini,
// in attesa, completati). Nessun grafico o metrica aggiuntiva finché non
// serve concretamente al negoziante.
export const dashboardController = {
  async summary(_req: Request, res: Response) {
    const shopId = await getCurrentShopId();
    const summary = await orderService.getDashboardSummary(shopId);
    res.json(summary);
  },
};
