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
