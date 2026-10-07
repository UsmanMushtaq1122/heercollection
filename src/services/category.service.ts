import { apiService } from "./api";
import type { Category } from "@/types";

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await apiService.get<{ categories: Category[] }>("/categories");
    return response.categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return apiService.get<Category>(`/categories/slug/${encodeURIComponent(slug)}`);
  }

  async getSubcategories(categorySlug: string): Promise<Category[]> {
    const category = await this.getCategoryBySlug(categorySlug);
    return category.children || [];
  }
}

export const categoryService = new CategoryService();
