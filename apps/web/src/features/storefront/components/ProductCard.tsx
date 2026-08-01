import { Link } from 'react-router-dom';
import { formatPrice } from '../../../lib/format';
import type { ProductListItem } from '../types';

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link
      to={`/prodotto/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow"
    >
      <div className="aspect-square w-full bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-sm font-medium text-gray-900">{product.name}</span>
        <span className="text-sm font-semibold text-gray-700">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
