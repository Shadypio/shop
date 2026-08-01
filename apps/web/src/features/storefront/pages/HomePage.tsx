import { useCategories } from '../queries';
import { CategoryCard } from '../components/CategoryCard';

export function HomePage() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Caricamento categorie…</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        Impossibile caricare le categorie. Riprova più tardi.
      </p>
    );
  }

  if (!categories || categories.length === 0) {
    return <p className="text-sm text-gray-500">Nessuna categoria disponibile al momento.</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Categorie</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
