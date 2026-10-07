"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product, ProductFilter } from "@/types";
import { productService } from "@/services/product.service";

interface UseProductsResult {
  products: Product[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  refetch: () => void;
  loadMore: () => void;
}

export function useProducts(initialFilters: ProductFilter = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(initialFilters.page || 1);
  const [filters] = useState(initialFilters);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await productService.getProducts({
          ...filters,
          page,
        });
        if (!ignore) {
          setProducts(response.data);
          setTotal(response.total);
          setTotalPages(response.totalPages);
          setHasMore(response.hasMore);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch products");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [filters, page]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  return {
    products,
    total,
    totalPages,
    isLoading,
    error,
    hasMore,
    refetch,
    loadMore,
  };
}

export function useProductBySlug(slug: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const currentSlug = slug;
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getProductBySlug(currentSlug);
        if (!ignore) {
          setProduct(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch product");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [slug]);

  return { product, isLoading, error };
}

export function useFeaturedProducts(limit: number = 8) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getFeaturedProducts(limit);
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch featured products");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return { products, isLoading, error };
}

export function useNewArrivals(limit: number = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getNewArrivals(limit);
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch new arrivals");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return { products, isLoading, error };
}

export function useBestSellers(limit: number = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getBestSellers(limit);
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch best sellers");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return { products, isLoading, error };
}

export function useTrendingProducts(limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        let data = await productService.getBestSellers(limit);
        if (data.length === 0) {
          data = await productService.getFeaturedProducts(limit);
        }
        if (data.length === 0) {
          const res = await productService.getProducts({ limit });
          data = res.data;
        }
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch trending products");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return { products, isLoading, error };
}

export function useRelatedProducts(
  categorySlug?: string,
  excludeId?: string,
  limit: number = 4
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(categorySlug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;
    const currentCategory = categorySlug;
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getRelatedProducts(currentCategory, excludeId, limit);
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch related products");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [categorySlug, excludeId, limit]);

  return { products, isLoading, error };
}

export function useProductsByIds(ids: string[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(ids.length > 0);
  const [error, setError] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    if (idsKey.length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }
    const currentIds = idsKey.split(",");
    let ignore = false;

    async function load() {
      try {
        const data = await productService.getProductsByIds(currentIds);
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch products");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [idsKey]);

  return { products, isLoading, error };
}
