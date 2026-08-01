import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../queries';
import { formatPrice } from '../../../lib/format';

export function ProductPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Caricamento prodotto…</p>;
  }

  if (isError || !product) {
    return <p className="text-sm text-red-600">Prodotto non trovato.</p>;
  }

  return (
    <div>
      <Link
        to={`/categoria/${product.category.slug}`}
        className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700"
      >
        &lsaquo; {product.category.name}
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="aspect-square w-full bg-gray-100">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          {!product.available ? (
            <span className="w-fit rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Momentaneamente non disponibile
            </span>
          ) : null}
          {product.description ? (
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
