"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  CmsPage,
  Faq,
  Career,
  SizeGuideEntry,
} from "@/types/content";
import { cmsService } from "@/services/cms.service";

function useCmsQuery<T>(fetcher: () => Promise<T>, deps: unknown[], enabled = true) {
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
          setError(err instanceof Error ? err.message : "Failed to load");
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

export function usePage(slug: string): {
  page: CmsPage | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useCmsQuery(
    () => cmsService.getPage(slug),
    [slug],
    Boolean(slug)
  );
  return { page: data, isLoading, error };
}

export function useFaqs(category?: string): {
  faqs: Faq[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useCmsQuery(
    () => cmsService.getFaqs(category),
    [category]
  );
  return { faqs: data ?? [], isLoading, error };
}

export function useCareers(): {
  careers: Career[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useCmsQuery(
    () => cmsService.getCareers(),
    []
  );
  return { careers: data ?? [], isLoading, error };
}

export function useSizeGuide(): {
  entries: SizeGuideEntry[];
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useCmsQuery(
    () => cmsService.getSizeGuide(),
    []
  );
  return { entries: data ?? [], isLoading, error };
}