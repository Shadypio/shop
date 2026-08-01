import { apiClient } from '../../lib/api-client';
import type { Category, ProductDetail, ProductListItem } from './types';

export const storefrontApi = {
  getCategories: () => apiClient.get<Category[]>('/categories'),
  getCategoryBySlug: (slug: string) => apiClient.get<Category>(`/categories/${slug}`),
  getProducts: (params: { categorySlug?: string; search?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.categorySlug) query.set('categorySlug', params.categorySlug);
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    return apiClient.get<ProductListItem[]>(`/products${qs ? `?${qs}` : ''}`);
  },
  getProductBySlug: (slug: string) => apiClient.get<ProductDetail>(`/products/${slug}`),
};
