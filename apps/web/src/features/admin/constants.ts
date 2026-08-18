import type { OrderStatus } from './types';

// Etichette e colori centralizzati: qualunque componente che mostra lo stato
// ordine (lista, dettaglio, dashboard) usa questa unica fonte di verità.
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'In attesa',
  CONFIRMED: 'Confermato',
  MODIFIED: 'Modificato',
  REJECTED: 'Rifiutato',
  COMPLETED: 'Completato',
};

export const ORDER_STATUS_COLORS: Record<
  OrderStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  MODIFIED: 'info',
  REJECTED: 'error',
  COMPLETED: 'success',
};

// Rispecchia la macchina a stati del backend (order.service.ts): gli stati
// terminali (REJECTED, COMPLETED) non ammettono ulteriori transizioni.
export const TERMINAL_ORDER_STATUSES: OrderStatus[] = ['REJECTED', 'COMPLETED'];

export function isOrderStatusTerminal(status: OrderStatus): boolean {
  return TERMINAL_ORDER_STATUSES.includes(status);
}

export const DELIVERY_METHOD_LABELS: Record<'DELIVERY' | 'PICKUP', string> = {
  DELIVERY: 'Consegna a domicilio',
  PICKUP: 'Ritiro in negozio',
};
