import { useQuery } from '@tanstack/react-query';
import { storefrontApi } from './api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: storefrontApi.getCategories,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => storefrontApi.getCategoryBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useProducts(params: { categorySlug?: string; search?: string } = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => storefrontApi.getProducts(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: () => storefrontApi.getProductBySlug(slug),
    enabled: Boolean(slug),
  });
}
