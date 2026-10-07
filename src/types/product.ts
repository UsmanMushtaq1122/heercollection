export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  weight?: number | null;
  currency: string;
  images: ProductImage[];
  thumbnail: string;
  category: Category;
  subcategory?: string;
  tags: string[];
  variants: ProductVariant[];
  sizes: Size[];
  colors: Color[];
  materials?: string[];
  careInstructions?: string[];
  fabric?: string;
  descriptionSections?: {
    color?: string;
    note?: string;
    sections: { title: string; items: string[] }[];
  };
  inStock: boolean;
  stock?: number;
  stockCount?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  collection?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  color?: Color;
  size?: Size;
  image?: ProductImage;
  inStock: boolean;
  stockCount?: number;
}

export interface Size {
  id: string;
  name: string;
  label: string;
  inStock: boolean;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  swatch?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  parent?: string;
  children?: Category[];
  productCount?: number;
  sortOrder?: number;
  isActive?: boolean;
}

export interface ProductFilter {
  category?: string;
  subcategory?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  inStock?: boolean;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling"
  | "rating";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
