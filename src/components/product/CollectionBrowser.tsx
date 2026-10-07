"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/common/EmptyState";
import { Loader2, PackageX } from "lucide-react";
import { useCollections, useCategoryList } from "@/hooks";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Match =
  | { kind: "collection"; name: string; description?: string }
  | { kind: "category"; name: string; description?: string }
  | { kind: "special"; name: string; description?: string; mode: "all" | "new-arrivals" | "best-sellers" }
  | null;

const SPECIAL_SLUGS: Record<
  string,
  { name: string; description: string; mode: "all" | "new-arrivals" | "best-sellers" }
> = {
  "new-arrivals": {
    name: "New Arrivals",
    description: "Fresh styles added to our collection — be the first to discover them.",
    mode: "new-arrivals",
  },
  "best-sellers": {
    name: "Best Sellers",
    description: "Our most-loved pieces, chosen by you.",
    mode: "best-sellers",
  },
  all: {
    name: "All Products",
    description: "Browse our complete collection of luxury women's fashion.",
    mode: "all",
  },
};

const PAGE_SIZE = 48;

export default function CollectionBrowser({
  slug,
  breadcrumbLabel = "Collections",
  breadcrumbHref = "/",
}: {
  slug: string;
  breadcrumbLabel?: string;
  breadcrumbHref?: string;
}) {
  const { collections, isLoading: collectionsLoading } = useCollections();
  const { categories, isLoading: categoriesLoading } = useCategoryList();

  const special = SPECIAL_SLUGS[slug];
  const editorial = collections.find((c) => c.slug === slug) as
    | { name: string; description?: string }
    | undefined;
  const category = categories.find((c) => c.slug === slug) as
    | { name: string; description?: string }
    | undefined;

  const match: Match = useMemo(() => {
    if (special) return { kind: "special", ...special };
    if (editorial)
      return {
        kind: "collection",
        name: editorial.name,
        description: editorial.description,
      };
    if (category)
      return { kind: "category", name: category.name, description: category.description };
    return null;
  }, [special, editorial, category]);

  const resolving =
    !special && !editorial && !category && (collectionsLoading || categoriesLoading);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (resolving) return;
    const currentMatch = match;
    const kind = currentMatch?.kind;
    let active = true;
    setIsLoading(true);
    setError(null);
    setProducts([]);

    async function load() {
      try {
        let result: Product[] = [];
        if (kind === "special" && currentMatch?.kind === "special") {
          if (currentMatch.mode === "all") {
            const res = await productService.getProducts({ limit: PAGE_SIZE });
            result = res.data;
          } else if (currentMatch.mode === "new-arrivals") {
            result = await productService.getNewArrivals(PAGE_SIZE);
          } else {
            result = await productService.getBestSellers(PAGE_SIZE);
          }
        } else if (kind === "category" || (!special && !editorial)) {
          const res = await productService.getProductsByCategory(slug, { limit: PAGE_SIZE });
          result = res.data;
        } else {
          const res = await productService.getProducts({ collection: slug, limit: PAGE_SIZE });
          result = res.data;
        }
        if (active) setProducts(result);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load products.");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [editorial, match, resolving, slug, special, attempt]);

  const isLoadingAnything = resolving || isLoading;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: breadcrumbLabel, href: breadcrumbHref },
          { label: match?.name ?? slug },
        ]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]/50">
          Collection
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-wide text-[#1A1A1A] md:text-4xl">
          {match?.name ?? slug}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        {match?.description && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/60">
            {match.description}
          </p>
        )}
      </div>

      {/* Toolbar */}
      <div className="mb-8 flex items-center justify-between border-b border-[#E8DDD4] pb-4">
        <p className="text-sm text-[#1A1A1A]/60">
          <span className="font-medium text-[#1A1A1A]">{products.length}</span>{" "}
          {products.length === 1 ? "product" : "products"}
        </p>
        <div className="flex items-center gap-3">
          <Select defaultValue="featured">
            <SelectTrigger className="w-45 rounded-sm border-[#E8DDD4] bg-transparent text-xs font-medium uppercase tracking-widest text-[#1A1A1A]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="best-selling">Best Selling</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {isLoadingAnything ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#1A1A1A]/50">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
          <p className="text-sm">Loading collection...</p>
        </div>
      ) : error ? (
        <EmptyState
          icon={PackageX}
          title="Couldn't Load Products"
          description={error}
          actionLabel="Try Again"
          onAction={() => setAttempt((prev) => prev + 1)}
        />
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-light text-[#1A1A1A]/60">
            No products found in this collection yet.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-[#C9A27E] transition-colors hover:text-[#C9A27E]/70"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </section>
  );
}