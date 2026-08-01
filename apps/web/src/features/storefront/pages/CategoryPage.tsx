import { Link, useParams } from 'react-router-dom';
import { useCategory, useProducts } from '../queries';
import { ProductCard } from '../components/ProductCard';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data: category, isLoading: isCategoryLoading } = useCategory(slug);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useProducts({ categorySlug: slug });

  const isLoading = isCategoryLoading || isProductsLoading;

  return (
    <div>
      <Link to="/" className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
        &lsaquo; Tutte le categorie
      </Link>
      <h1 className="mb-4 text-xl font-semibold text-gray-900">
        {category?.name ?? (isLoading ? 'Caricamento…' : 'Categoria')}
      </h1>

      {isLoading ? (
        <p className="text-sm text-gray-500">Caricamento prodotti…</p>
      ) : isError ? (
        <p className="text-sm text-red-600">Impossibile caricare i prodotti. Riprova più tardi.</p>
      ) : !products || products.length === 0 ? (
        <p className="text-sm text-gray-500">Nessun prodotto disponibile in questa categoria.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
