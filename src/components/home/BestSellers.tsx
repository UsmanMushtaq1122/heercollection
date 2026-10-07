"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_LUXURY } from "@/lib/constants";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { useBestSellers } from "@/hooks/useProducts";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: EASE_LUXURY },
  }),
};

export default function BestSellers() {
  const { products, isLoading } = useBestSellers(8);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#1A1A1A]"
            >
              Best Sellers
            </motion.h2>
          </div>
          <Link href="/collections/best-sellers">
            <Button
              variant="ghost"
              className="group text-[#C9A27E] hover:text-[#b38d6a] hidden sm:flex"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState title="No best sellers yet" description="Top-selling pieces will appear here once the catalogue is live." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        {!isLoading && products.length > 0 && (
          <div className="mt-8 text-center sm:hidden">
            <Link href="/collections/best-sellers">
              <Button variant="outline" className="group">
                View All Best Sellers
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}