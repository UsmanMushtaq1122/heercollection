"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight, Clock, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useCategoryList } from "@/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const RECENT_SEARCHES_KEY = "heer-recent-searches";

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 300);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { categories } = useCategoryList();

  // Load recent searches
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 6));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecentSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((t) => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Autofocus input and lock body scroll on open
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      setQuery("");
      setProducts([]);
      setIsLoading(false);
      setError(null);
    }
  }, [isSearchOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  // Execute debounced search against actual catalog
  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    productService
      .searchProducts(debouncedQuery, 16)
      .then((data) => {
        if (isMounted) {
          setProducts(data || []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Search failed");
          setProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      saveRecentSearch(trimmed);
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleProductClick = (slug: string) => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
    }
    setSearchOpen(false);
    router.push(`/product/${encodeURIComponent(slug)}`);
  };

  const hasQuery = query.trim().length > 0;
  const isSearching = isLoading;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-[#F8F5F2]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Product Search"
        >
          {/* Top Bar with Brand & Close Button */}
          <div className="flex h-16 sm:h-20 items-center justify-between border-b border-[#E8DDD4] px-4 sm:px-8 lg:px-12 bg-white/70 backdrop-blur-md">
            <span
              style={{
                fontFamily:
                  "var(--font-cinzel), 'Cormorant Garamond', var(--font-cormorant), 'Times New Roman', serif",
              }}
              className="text-base sm:text-lg tracking-[0.25em] uppercase font-light text-[#1A1A1A]"
            >
              HEER COLLECTION
            </span>

            <button
              onClick={() => setSearchOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#1A1A1A] transition-all hover:bg-[#E8DDD4]/50 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]"
              aria-label="Close search"
            >
              <X className="h-6 w-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Input Section */}
          <div className="w-full border-b border-[#E8DDD4] bg-white py-6 sm:py-8 shadow-sm">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <Search className="absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 text-[#C9A27E]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by product name, category, or style..."
                  className="w-full bg-transparent pl-10 sm:pl-12 pr-12 text-base sm:text-xl lg:text-2xl font-light text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none border-b border-[#E8DDD4] pb-3 focus:border-[#C9A27E] transition-colors"
                  autoFocus
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                    aria-label="Clear query"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : null}
              </form>

              {hasQuery && (
                <div className="mt-3 flex items-center justify-between text-xs text-[#1A1A1A]/60">
                  <span>
                    Press <kbd className="rounded bg-[#E8DDD4]/60 px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd> to view all results on search page
                  </span>
                  {isSearching && (
                    <span className="flex items-center gap-1.5 text-[#C9A27E]">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Searching...
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search Body / Results Container */}
          <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-5xl">
              {/* STATE 1: Empty Search (Start typing...) */}
              {!hasQuery && (
                <div className="space-y-10">
                  <div className="text-center py-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#C9A27E] font-medium mb-1">
                      Search Collection
                    </p>
                    <p className="text-sm sm:text-base text-[#1A1A1A]/60 font-light">
                      Start typing to search...
                    </p>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#1A1A1A]/60">
                          <Clock className="h-3.5 w-3.5 text-[#C9A27E]" />
                          Recent Searches
                        </p>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSelectTerm(term)}
                            className="rounded-full border border-[#E8DDD4] bg-white px-4 py-1.5 text-xs text-[#1A1A1A]/80 transition-all hover:border-[#C9A27E] hover:text-[#C9A27E]"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Categories */}
                  {categories && categories.length > 0 && (
                    <div>
                      <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#1A1A1A]/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#C9A27E]" />
                        Browse Categories
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.slice(0, 6).map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/collections/${cat.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="group flex items-center justify-between rounded-sm border border-[#E8DDD4] bg-white p-4 transition-all hover:border-[#C9A27E] hover:shadow-sm"
                          >
                            <span className="text-sm font-light uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#C9A27E] transition-colors">
                              {cat.name}
                            </span>
                            <ArrowRight className="h-4 w-4 text-[#1A1A1A]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#C9A27E]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STATE 2: Loading State */}
              {hasQuery && isSearching && (
                <div className="flex flex-col items-center justify-center py-20 text-[#1A1A1A]/50 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
                  <p className="text-sm tracking-wide">Searching products...</p>
                </div>
              )}

              {/* STATE 3: No Results */}
              {hasQuery && !isSearching && products.length === 0 && !error && (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8DDD4]/50">
                    <Search className="h-6 w-6 text-[#C9A27E]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">
                    No products found.
                  </h3>
                  <p className="mt-2 text-sm text-[#1A1A1A]/60 max-w-md mx-auto">
                    Try searching for another product or category.
                  </p>

                  {categories && categories.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-[#E8DDD4] max-w-xl mx-auto">
                      <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/40 mb-3">
                        Suggested Categories
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {categories.slice(0, 4).map((c) => (
                          <Link
                            key={c.id}
                            href={`/collections/${c.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="rounded-full border border-[#E8DDD4] bg-white px-4 py-1.5 text-xs text-[#1A1A1A]/80 hover:border-[#C9A27E] hover:text-[#C9A27E] transition-all"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STATE 4: Matching Results Found */}
              {hasQuery && !isSearching && products.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center justify-between border-b border-[#E8DDD4] pb-3">
                    <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/60">
                      Found <span className="font-medium text-[#1A1A1A]">{products.length}</span> matching{" "}
                      {products.length === 1 ? "product" : "products"}
                    </p>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#C9A27E] hover:underline"
                    >
                      View All
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => {
                      const firstImg = product.images?.[0];
                      const imgUrl =
                        typeof firstImg === "string"
                          ? firstImg
                          : firstImg?.url || product.thumbnail || null;
                      const categoryName =
                        typeof product.category === "object"
                          ? product.category?.name
                          : product.category || "";

                      return (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product.slug)}
                          className="group cursor-pointer rounded-lg bg-white p-2.5 sm:p-3 border border-[#E8DDD4]/60 shadow-sm transition-all duration-300 hover:border-[#C9A27E] hover:shadow-md flex flex-col"
                        >
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F4EFEA] mb-3">
                            {imgUrl ? (
                              <Image
                                src={imgUrl}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-[#1A1A1A]/30">
                                Heer Collection
                              </div>
                            )}
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              {categoryName && (
                                <p className="text-[10px] uppercase tracking-wider text-[#C9A27E] mb-1 line-clamp-1">
                                  {categoryName}
                                </p>
                              )}
                              <h4 className="text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#C9A27E] transition-colors">
                                {product.name}
                              </h4>
                            </div>

                            <div className="mt-2 pt-2 border-t border-[#E8DDD4]/40 flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                                {formatPrice(product.price)}
                              </span>
                              {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <span className="text-[11px] text-[#1A1A1A]/40 line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}