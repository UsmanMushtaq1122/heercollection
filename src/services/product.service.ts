import { apiService } from "./api";
import type { Product, PaginatedResponse, ProductFilter } from "@/types";

interface ProductQueryParams extends Omit<Partial<ProductFilter>, "sortBy"> {
  sortBy?: ProductFilter["sortBy"] | "price" | "createdAt";
  search?: string;
  collection?: string;
  isFeatured?: string;
  isNewArrival?: string;
  isBestSeller?: string;
  sortOrder?: "asc" | "desc";
  exclude?: string;
  ids?: string;
}

function buildQueryString(params: ProductQueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        searchParams.set(key, value.join(","));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  return searchParams.toString();
}

class ProductService {
  private toPaginatedResponse(response: {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }, limit: number = 10): PaginatedResponse<Product> {
    return {
      data: response.products,
      total: response.total,
      page: response.page,
      limit,
      totalPages: response.totalPages,
      hasMore: response.page < response.totalPages,
    };
  }

  private async getProductList(params: ProductQueryParams): Promise<PaginatedResponse<Product>> {
    const queryString = buildQueryString(params);
    const response = await apiService.get<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/products?${queryString}`);
    return this.toPaginatedResponse(response, Number(params.limit) || 10);
  }

  async getProducts(
    filters: ProductFilter = {}
  ): Promise<PaginatedResponse<Product>> {
    const { category, sortBy, ...rest } = filters;
    const sortParams: ProductQueryParams = { ...rest };
    if (category) sortParams.category = category;
    if (sortBy === "price-asc") {
      sortParams.sortBy = "price";
      sortParams.sortOrder = "asc";
    } else if (sortBy === "price-desc") {
      sortParams.sortBy = "price";
      sortParams.sortOrder = "desc";
    } else if (sortBy === "newest") {
      sortParams.sortBy = "createdAt";
      sortParams.sortOrder = "desc";
    }
    return this.getProductList(sortParams);
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return apiService.get<Product>(`/products/slug/${encodeURIComponent(slug)}`);
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const result = await this.getProductList({ isFeatured: "true", limit });
    return result.data;
  }

  async getNewArrivals(limit: number = 12): Promise<Product[]> {
    const result = await this.getProductList({ isNewArrival: "true", limit });
    return result.data;
  }

  async getBestSellers(limit: number = 12): Promise<Product[]> {
    const result = await this.getProductList({ isBestSeller: "true", limit });
    return result.data;
  }

  async getProductsByCategory(
    categorySlug: string,
    filters: ProductFilter = {}
  ): Promise<PaginatedResponse<Product>> {
    return this.getProductList({ ...filters, category: categorySlug });
  }

  async searchProducts(
    query: string,
    limit: number = 20
  ): Promise<Product[]> {
    const response = await apiService.get<{
      products: Product[];
    }>(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.products;
  }

  async getRelatedProducts(categorySlug: string, excludeId?: string, limit: number = 4): Promise<Product[]> {
    const result = await this.getProductList({
      category: categorySlug,
      exclude: excludeId,
      limit,
    });
    return result.data;
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    const result = await this.getProductList({ ids: ids.join(","), limit: ids.length || 1 });
    return result.data;
  }
}

export const productService = new ProductService();
