"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
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
          Similar Products
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
            </div>

            {/* Info */}
            <div className="mt-2.5 space-y-1">
              <p className="line-clamp-2 text-[0.825rem] font-medium leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#C9A27E]">
                {product.name}
              </p>
              <p className="text-[0.8rem] font-normal text-[#1A1A1A]/80">
                PKR {product.price.toLocaleString()}
              </p>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
