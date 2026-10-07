"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!products || products.length === 0) return null;

  return (
    <section ref={ref} className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-light tracking-wide text-text">
            You May Also Like
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-accent" />
        </div>

        {/* Mobile: Horizontal Scroll - 2 cards side by side */}
        <div className="md:hidden">
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-[calc(50%-6px)] flex-shrink-0 snap-start"
                initial={{ opacity: 0, x: 30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
