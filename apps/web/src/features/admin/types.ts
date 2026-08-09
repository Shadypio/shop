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
