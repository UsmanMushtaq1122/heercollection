"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, ScanEye } from "lucide-react";
import { cn, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const openQuickView = useUIStore((state) => state.openQuickView);
  const [imageError, setImageError] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  // Determine badge text matching the design
  const badgeText = product.isNewArrival
    ? "New"
    : discount > 0
      ? `-${discount}%`
      : product.isBestSeller
        ? "Best Seller"
        : null;

  const firstImage = product.images?.[0];
  const rawImageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url || product.thumbnail || null;
  const imageUrl = !imageError && rawImageUrl ? rawImageUrl : null;
  const imageAlt =
    (typeof firstImage === "object" && firstImage?.alt) || product.name;

  return (
    <motion.div
      className={cn("group relative w-full", className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#E8DDD4] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center"
              style={{
                background: `linear-gradient(135deg, #F0E8E1 0%, #E8DDD4 50%, #D8C7B8 100%)`,
              }}
            >
              <span className="font-serif text-xs sm:text-sm font-medium text-[#1A1A1A]/70 line-clamp-3 leading-snug px-1">
                {product.name}
              </span>
            </div>
          )}

          {/* Top-Left Badge */}
          {badgeText && (
            <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 pointer-events-none">
              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] sm:text-xs font-semibold rounded-md sm:rounded-lg shadow-sm">
                {badgeText}
              </span>
            </div>
          )}

          {/* Bottom Floating Action Bar (View Details -> | ScanEye | Heart) — Hidden by default, reveals on hover */}
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-20 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
            <div className="flex items-center justify-between rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-md shadow-black/10 border border-white/60">
              {/* Left: View Details text & arrow */}
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 pr-1">
                <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium text-[#1A1A1A] whitespace-nowrap">
                  View Details
                </span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#1A1A1A] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>

              {/* Right: Action Buttons (Quick View & Wishlist) */}
              <div className="flex items-center gap-1 sm:gap-2 text-[#1A1A1A] shrink-0">
                {/* Quick View Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openQuickView(product);
                  }}
                  title="Quick View"
                  aria-label="Quick View"
                  className="p-1 hover:text-[#C9A27E] active:scale-90 transition-transform cursor-pointer shrink-0"
                >
                  <ScanEye className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.75]" />
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleItem(product);
                  }}
                  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className="p-1 hover:text-[#C9A27E] active:scale-90 transition-transform cursor-pointer shrink-0"
                >
                  <Heart
                    className={cn(
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.75] transition-colors",
                      inWishlist ? "fill-[#C9A27E] text-[#C9A27E]" : "text-[#1A1A1A]"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-1 text-xs sm:text-sm font-medium text-[#1A1A1A] transition-colors group-hover:text-[#C9A27E]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-[#1A1A1A]/40 line-through">
              Rs. {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}