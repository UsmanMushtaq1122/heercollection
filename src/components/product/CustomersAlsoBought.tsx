"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";

interface CustomersAlsoBoughtProps {
  products: Product[];
}

export default function CustomersAlsoBought({ products }: CustomersAlsoBoughtProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollDistance = scrollRef.current.clientWidth * 0.95;
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-12 border-t border-[#E5E5E5] pt-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
          Customers Also Bought
        </h2>
        <button
          type="button"
          onClick={scrollRight}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] transition hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Horizontal scroll row - 2 cards side by side on mobile */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => {
          const discount = product.compareAtPrice
            ? calculateDiscount(product.price, product.compareAtPrice)
            : 0;

          const firstImg = product.images?.[0];
          const imgUrl =
            typeof firstImg === "string"
              ? firstImg
              : firstImg?.url || product.thumbnail || null;
          const imgAlt =
            (typeof firstImg === "object" && firstImg?.alt) || product.name;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group flex-shrink-0 snap-start w-[calc(50%-6px)] sm:w-[210px]"
            >
              {/* Image Box - rounded-2xl matching reference design */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#E8DDD4]">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, 210px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center"
                    style={{
                      background: `linear-gradient(135deg, #F0E8E1 0%, #E8DDD4 50%, #D8C7B8 100%)`,
                    }}
                  >
                    <span className="font-serif text-xs font-medium text-[#1A1A1A]/70 line-clamp-2 px-1">
                      {product.name}
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute left-0 bottom-0 bg-[#E52E2E] px-2.5 py-1 text-[11px] font-bold text-white rounded-tr-md">
                    {discount}%
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="mt-2.5 space-y-1">
                <p className="line-clamp-2 text-[0.8rem] font-medium leading-snug text-[#1A1A1A] group-hover:text-[#C9A27E] transition-colors">
                  {product.name}
                </p>
                <div className="flex items-center gap-2">
                  {product.compareAtPrice && (
                    <span className="text-[0.75rem] text-[#1A1A1A]/40 line-through">
                      PKR {product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[0.8rem] font-semibold text-[#1A1A1A]">
                    PKR {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
