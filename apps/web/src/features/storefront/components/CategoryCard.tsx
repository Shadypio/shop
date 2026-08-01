import { Link } from 'react-router-dom';
import type { Category } from '../types';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
    >
      <span className="font-medium text-gray-900">{category.name}</span>
      <span aria-hidden className="text-gray-400">
        &rsaquo;
      </span>
    </Link>
  );
}
