import type { Category, PaginatedResponse, Product, ProductFilter } from "./product";

export type { Category } from "./product";

export interface CategoryPageData {
  category: Category;
  subcategories: Category[];
  products: PaginatedResponse<Product>;
  filters: ProductFilter;
}
