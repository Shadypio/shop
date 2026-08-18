import { apiClient } from '../../lib/api-client';
import type {
  AdminCategory,
  AdminOrderDetail,
  AdminOrderListItem,
  AdminProduct,
  AdminUser,
  CreateCategoryPayload,
  CreateProductPayload,
  DashboardSummary,
  ListOrdersFilters,
  LoginPayload,
  OrderStatus,
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

  // --- Ordini ---
  getOrders: (filters: ListOrdersFilters = {}) => {
    const query = new URLSearchParams();
    if (filters.status) query.set('status', filters.status);
    if (filters.search) query.set('search', filters.search);
    const qs = query.toString();
    return apiClient.get<AdminOrderListItem[]>(`/admin/orders${qs ? `?${qs}` : ''}`);
  },
  getOrder: (id: string) => apiClient.get<AdminOrderDetail>(`/admin/orders/${id}`),
  updateOrderStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<AdminOrderDetail>(`/admin/orders/${id}/status`, { status }),

  // --- Dashboard ---
  getDashboardSummary: () => apiClient.get<DashboardSummary>('/admin/dashboard/summary'),
};
