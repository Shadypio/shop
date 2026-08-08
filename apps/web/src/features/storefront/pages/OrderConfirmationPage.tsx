import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice } from '../../../lib/format';
import type { OrderConfirmation } from '../types';

interface LocationState {
  order?: OrderConfirmation;
}

export function OrderConfirmationPage() {
  const location = useLocation();
  const { order } = (location.state as LocationState) ?? {};

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 text-center">
      <span className="text-4xl">✅</span>
      <h1 className="text-xl font-semibold text-gray-900">Richiesta d'ordine inviata!</h1>
      <p className="text-sm text-gray-600">
        Il negozio verificherà la disponibilità e ti contatterà a breve per confermare i dettagli.
        Il pagamento avviene alla consegna o al ritiro.
      </p>
      <div className="w-full rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
        <p>
          Numero ordine: <span className="font-mono">{order.id.slice(-8)}</span>
        </p>
        <p className="mt-1 font-semibold text-gray-900">Totale: {formatPrice(order.total)}</p>
      </div>
      <Link
        to="/"
        className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
      >
        Torna al catalogo
      </Link>
    </div>
  );
}
