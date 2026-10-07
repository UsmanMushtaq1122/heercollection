"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import { useMediaQuery, useProductsByIds } from "@/hooks";
import { motion } from "framer-motion";

const STORAGE_KEY = "heer-recently-viewed";

export function getRecentlyViewedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function recordRecentlyViewed(productId: string) {
  try {
    const ids = getRecentlyViewedIds();
    const updated = [productId, ...ids.filter((id) => id !== productId)].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("heer:recently-viewed"));
    }
  } catch {
    // ignore storage errors
  }
}

interface RecentlyViewedProps {
  currentProductSlug?: string;
  title?: string;
}

export default function RecentlyViewed({
  currentProductSlug,
  title = "Recently Viewed",
}: RecentlyViewedProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [revision, setRevision] = useState(0);

  const refresh = useCallback(() => setRevision((r) => r + 1), []);

  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getRecentlyViewedIds());
  }, [revision, currentProductSlug]);

  const { products, isLoading } = useProductsByIds(ids);

  useEffect(() => {
    window.addEventListener("heer:recently-viewed", refresh);
    return () => window.removeEventListener("heer:recently-viewed", refresh);
  }, [refresh]);

  if (isLoading || products.length === 0) return null;

  const visibleProducts = products
    .filter((p) => p.slug !== currentProductSlug)
    .slice(0, isMobile ? 2 : 4);

  if (visibleProducts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-px w-10 bg-[#C9A27E]" />
          <h2 className="font-serif text-2xl font-light tracking-wide text-[#1A1A1A] md:text-3xl">
            {title}
          </h2>
          <p className="text-sm text-[#1A1A1A]/50">
            Pieces you&apos;ve explored
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}