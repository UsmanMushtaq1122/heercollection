"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  Banner,
  Testimonial,
  EditorialCollection,
  InstagramPost,
} from "@/types/content";
import { contentService } from "@/services/content.service";

interface UseContentOptions {
  enabled?: boolean;
}

function useApi<T>(fetcher: () => Promise<T>, deps: unknown[], enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const depsKey = deps.join("-");

  const refetch = useCallback(() => {
    const id = ++requestId.current;
    setError(null);
    setIsLoading(true);
    fetcher()
      .then((result) => {
        if (id === requestId.current) setData(result);
      })
      .catch((err: unknown) => {
        if (id === requestId.current) {
          setError(err instanceof Error ? err.message : "Failed to fetch data");
        }
      })
      .finally(() => {
        if (id === requestId.current) setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  useEffect(() => {
    if (enabled) refetch();
  }, [enabled, refetch]);

  return { data, isLoading, error, refetch };
}

export function useHeroBanners(options?: UseContentOptions): {
  banners: Banner[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getHeroBanners(),
    [],
    options?.enabled ?? true
  );
  return { banners: data ?? [], isLoading, error };
}

export function useEditorialBanners(options?: UseContentOptions): {
  banners: Banner[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getEditorialBanners(),
    [],
    options?.enabled ?? true
  );
  return { banners: data ?? [], isLoading, error };
}

export function useAnnouncementBars(options?: UseContentOptions): {
  announcements: Banner[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getAnnouncementBars(),
    [],
    options?.enabled ?? true
  );
  return { announcements: data ?? [], isLoading, error };
}

export function useTestimonials(options?: UseContentOptions): {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getTestimonials(),
    [],
    options?.enabled ?? true
  );
  return { testimonials: data ?? [], isLoading, error };
}

export function useCollections(options?: UseContentOptions): {
  collections: EditorialCollection[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getCollections(),
    [],
    options?.enabled ?? true
  );
  return { collections: data ?? [], isLoading, error };
}

export function useInstagramFeed(options?: UseContentOptions): {
  posts: InstagramPost[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => contentService.getInstagramFeed(),
    [],
    options?.enabled ?? true
  );
  return { posts: data ?? [], isLoading, error };
}

export function useCategoryList(options?: UseContentOptions): {
  categories: import("@/types").Category[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApi(
    () => import("@/services/category.service").then((m) => m.categoryService.getCategories()),
    [],
    options?.enabled ?? true
  );
  return {
    categories: (data ?? []).filter((category) => category.slug !== "uncategorized"),
    isLoading,
    error,
  };
}