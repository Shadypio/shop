import { apiClient } from '../../lib/api-client';
import type {
  AdminCategory,
  AdminProduct,
  AdminUser,
  CreateCategoryPayload,
  CreateProductPayload,
  LoginPayload,
  UpdateCategoryPayload,
  UpdateProductPayload,
} from './types';

export const adminApi = {
  // --- Autenticazione ---
  login: (payload: LoginPayload) => apiClient.post<AdminUser>('/admin/auth/login', payload),
  logout: () => apiClient.post<void>('/admin/auth/logout'),
  me: () => apiClient.get<AdminUser>('/admin/auth/me'),

  // --- Categorie ---
  getCategories: () => apiClient.get<AdminCategory[]>('/admin/categories'),
  createCategory: (payload: CreateCategoryPayload) =>
    apiClient.post<AdminCategory>('/admin/categories', payload),
  updateCategory: (id: string, payload: UpdateCategoryPayload) =>
    apiClient.patch<AdminCategory>(`/admin/categories/${id}`, payload),
  deleteCategory: (id: string) => apiClient.delete<void>(`/admin/categories/${id}`),

  // --- Prodotti ---
  getProducts: () => apiClient.get<AdminProduct[]>('/admin/products'),
  getProduct: (id: string) => apiClient.get<AdminProduct>(`/admin/products/${id}`),
  createProduct: (payload: CreateProductPayload) =>
    apiClient.post<AdminProduct>('/admin/products', payload),
  updateProduct: (id: string, payload: UpdateProductPayload) =>
    apiClient.patch<AdminProduct>(`/admin/products/${id}`, payload),
  deleteProduct: (id: string) => apiClient.delete<void>(`/admin/products/${id}`),
  uploadProductImage: (productId: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.postForm<AdminProduct>(`/admin/products/${productId}/images`, formData);
  },
  removeProductImage: (productId: string, imageId: string) =>
    apiClient.delete<AdminProduct>(`/admin/products/${productId}/images/${imageId}`),
};
