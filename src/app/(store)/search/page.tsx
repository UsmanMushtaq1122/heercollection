"use client";

import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestSeq = useRef(0);

  const hasSearched = query.trim().length > 0;
  const activeQuery = hasSearched ? query.trim() : initialQuery;

  const runSearch = useCallback(async (q: string) => {
    const seq = ++requestSeq.current;
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.searchProducts(q);
      if (requestSeq.current === seq) {
        setResults(data);
      }
    } catch (err) {
      if (requestSeq.current === seq) {
        setError(err instanceof Error ? err.message : "Search failed. Please try again.");
        setResults([]);
      }
    } finally {
      if (requestSeq.current === seq) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!activeQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    runSearch(activeQuery);
  }, [activeQuery, runSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-light tracking-wide text-[#1A1A1A]">
          Search
        </h1>
        <div className="mx-auto mt-3 h-px w-12 bg-[#C9A27E]" />

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A1A1A]/40" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories, or styles..."
              className="h-14 rounded-sm border-[#E8DDD4] bg-white pl-12 pr-4 text-sm"
              autoFocus
            />
          </div>
        </form>
      </div>

      <div className="mt-12">
        {hasSearched && (
          <p className="mb-6 text-sm text-[#1A1A1A]/60">
            {isLoading ? (
              <>
                Searching for &quot;
                <span className="font-medium text-[#1A1A1A]">{activeQuery}</span>
                &quot;...
              </>
            ) : error ? null : results.length > 0 ? (
              <>
                Found{" "}
                <span className="font-medium text-[#1A1A1A]">{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for &quot;
                <span className="font-medium text-[#1A1A1A]">{activeQuery}</span>
                &quot;
              </>
            ) : (
              <>
                No results found for &quot;
                <span className="font-medium text-[#1A1A1A]">{activeQuery}</span>
                &quot;
              </>
            )}
          </p>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#1A1A1A]/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
            <p className="text-sm">Searching...</p>
          </div>
        ) : error ? (
          <EmptyState
            icon={SearchIcon}
            title="Search Failed"
            description={error}
            actionLabel="Try Again"
            onAction={() => runSearch(activeQuery)}
          />
        ) : hasSearched && results.length > 0 ? (
          <ProductGrid products={results} />
        ) : hasSearched ? (
          <EmptyState
            icon={SearchIcon}
            title="No products found."
            description="Try searching for another product or category."
            actionLabel="Browse Collections"
            actionHref="/"
          />
        ) : (
          <div className="py-20 text-center">
            <SearchIcon className="mx-auto h-12 w-12 text-[#E8DDD4]" />
            <p className="mt-6 text-sm text-[#1A1A1A]/50">
              Start typing to search...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-40" />
          <div className="mt-16 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}