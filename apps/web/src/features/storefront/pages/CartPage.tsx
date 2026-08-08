import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../store/cart-store';
import { formatPrice } from '../../../lib/format';
import { QuantityStepper } from '../components/QuantityStepper';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Carrello</h1>
        <p className="text-sm text-gray-500">Il carrello è vuoto.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-gray-900 underline">
          Torna al catalogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Carrello</h1>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{formatPrice(item.unitPrice)} cad.</p>
            </div>
            <QuantityStepper
              value={item.quantity}
              onChange={(quantity) => setQuantity(item.productId, quantity)}
            />
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-sm text-red-600 hover:underline cursor-pointer"
              aria-label={`Rimuovi ${item.name}`}
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-base font-semibold text-gray-900">Totale</span>
        <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={() => navigate('/checkout')}
        className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 cursor-pointer"
      >
        Procedi al checkout
      </button>
    </div>
  );
}
