"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SearchSuggestion } from "@/types/content";
import { searchService } from "@/services/cms.service";

export function useSearchSuggestions(): {
  suggestions: SearchSuggestion[];
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  onQueryChange: (query: string) => void;
  addRecent: (query: string) => void;
  clearRecent: () => void;
} {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [trending, setTrending] = useState<SearchSuggestion[]>([]);
  const [recent, setRecent] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastQuery = useRef("");
  const requestId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("heer-recent-searches");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRecent(parsed);
      }
    } catch {
      setRecent([]);
    }

    let active = true;
    searchService
      .getTrendingSearches()
      .then((result) => {
        if (active) setTrending(result);
      })
      .catch(() => {
        if (active) setTrending([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const onQueryChange = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }
    lastQuery.current = trimmed;
    const id = ++requestId.current;
    setIsLoading(true);
    searchService
      .getSuggestions(trimmed)
      .then((result) => {
        if (id === requestId.current) setSuggestions(result);
      })
      .catch((err: unknown) => {
        if (id === requestId.current) {
          setError(err instanceof Error ? err.message : "Search unavailable");
          setSuggestions([]);
        }
      })
      .finally(() => {
        if (id === requestId.current) setIsLoading(false);
      });
  }, []);

  const addRecent = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecent((prev) => {
      const next = [
        { query: trimmed, href: `/search?q=${encodeURIComponent(trimmed)}` },
        ...prev.filter((r) => r.query !== trimmed),
      ].slice(0, 6);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("heer-recent-searches", JSON.stringify(next));
        } catch {
          /* noop */
        }
      }
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("heer-recent-searches");
      } catch {
        /* noop */
      }
    }
  }, []);

  return {
    suggestions,
    trending,
    recent,
    isLoading,
    error,
    onQueryChange,
    addRecent,
    clearRecent,
  };
}