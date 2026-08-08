export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  available: boolean;
  image: string | null;
  category: Category;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  available: boolean;
  category: Category;
  images: string[];
}

export type DeliveryMethod = 'DELIVERY' | 'PICKUP';

export interface CreateOrderPayload {
  customerName: string;
  customerSurname: string;
  phone: string;
  address?: string;
  notes?: string;
  deliveryMethod: DeliveryMethod;
  items: { productId: string; quantity: number }[];
}

export interface OrderConfirmation {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}
