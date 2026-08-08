import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCartStore } from '../../../store/cart-store';
import { formatPrice } from '../../../lib/format';
import { storefrontApi } from '../api';
import { ApiError } from '../../../lib/api-client';
import type { DeliveryMethod } from '../types';

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerSurname, setCustomerSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('DELIVERY');

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const mutation = useMutation({
    mutationFn: () =>
      storefrontApi.createOrder({
        customerName,
        customerSurname,
        phone,
        address: deliveryMethod === 'DELIVERY' ? address : undefined,
        notes: notes || undefined,
        deliveryMethod,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      }),
    onSuccess: (order) => {
      clearCart();
      navigate('/ordine-confermato', { state: { order } });
    },
  });

  if (items.length === 0) {
    return <Navigate to="/carrello" replace />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate();
  }

  const errorMessage =
    mutation.error instanceof ApiError ? mutation.error.message : 'Errore imprevisto, riprova.';

  return (
    <div>
      <Link to="/carrello" className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
        &lsaquo; Torna al carrello
      </Link>
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Nome
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Cognome
            <input
              required
              value={customerSurname}
              onChange={(e) => setCustomerSurname(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Telefono
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </label>

        <fieldset className="flex flex-col gap-2 text-sm text-gray-700">
          <legend className="mb-1 font-medium">Modalità di consegna</legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deliveryMethod"
              checked={deliveryMethod === 'DELIVERY'}
              onChange={() => setDeliveryMethod('DELIVERY')}
            />
            Consegna a domicilio
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deliveryMethod"
              checked={deliveryMethod === 'PICKUP'}
              onChange={() => setDeliveryMethod('PICKUP')}
            />
            Ritiro in negozio
          </label>
        </fieldset>

        {deliveryMethod === 'DELIVERY' ? (
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Indirizzo
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Note (facoltative)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-semibold text-gray-900">Totale</span>
          <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
        </div>

        {mutation.isError ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
        >
          {mutation.isPending ? 'Invio in corso…' : "Invia richiesta d'ordine"}
        </button>
        <p className="text-center text-xs text-gray-500">
          Il pagamento avviene alla consegna o al ritiro. Non è un ordine confermato: il negozio ti
          contatterà per verificare la disponibilità.
        </p>
      </form>
    </div>
  );
}
