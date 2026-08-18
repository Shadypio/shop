export interface AdminUser {
  id: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
}

export interface AdminProductImage {
  id: string;
  url: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  available: boolean;
  category: AdminCategory;
  images: AdminProductImage[];
}

export interface CreateCategoryPayload {
  name: string;
}

export type UpdateCategoryPayload = CreateCategoryPayload;

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  available: boolean;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

// --- Ordini ---
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'MODIFIED' | 'REJECTED' | 'COMPLETED';
export type OrderDeliveryMethod = 'DELIVERY' | 'PICKUP';

export interface AdminOrderListItem {
  id: string;
  customerName: string;
  customerSurname: string;
  phone: string;
  deliveryMethod: OrderDeliveryMethod;
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface AdminOrderItem {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface AdminOrderDetail {
  id: string;
  customerName: string;
  customerSurname: string;
  phone: string;
  address: string | null;
  notes: string | null;
  deliveryMethod: OrderDeliveryMethod;
  status: OrderStatus;
  total: number;
  items: AdminOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ListOrdersFilters {
  status?: OrderStatus;
  search?: string;
}

// --- Dashboard ---
export interface DashboardSummary {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  todayOrders: number;
}

