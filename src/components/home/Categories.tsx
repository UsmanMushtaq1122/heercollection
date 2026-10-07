"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { EASE_LUXURY } from "@/lib/constants";
import { useCategoryList } from "@/hooks/useContent";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

const categoryGradients: Record<string, string> = {
  "luxury-pret": "linear-gradient(135deg, #C9A27E44 0%, #E8DDD4 100%)",
  formal: "linear-gradient(135deg, #1A1A1A22 0%, #E8DDD4 100%)",
  casual: "linear-gradient(135deg, #C9A27E22 0%, #F8F5F2 100%)",
  summer: "linear-gradient(135deg, #C9A27E33 0%, #F8F5F2 100%)",
  accessories: "linear-gradient(135deg, #E8DDD4 0%, #C9A27E22 100%)",
  sale: "linear-gradient(135deg, #dc262622 0%, #E8DDD4 100%)",
};

const DEFAULT_CATEGORIES: import("@/types").Category[] = [
  {
    id: "cat-1",
    name: "Luxury Pret",
    slug: "luxury-pret",
    description: "Contemporary silhouettes adorned with signature hand embellishments.",
    productCount: 24,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "cat-2",
    name: "Formal & Festive",
    slug: "formal",
    description: "Opulent fabrics crafted for timeless celebrations.",
    productCount: 18,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "cat-3",
    name: "Summer Lawn",
    slug: "summer",
    description: "Breathable pure fabrics tailored for graceful everyday wear.",
    productCount: 32,
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "cat-4",
    name: "Casual Pret",
    slug: "casual",
    description: "Effortlessly elegant daily wear with subtle artisanal accents.",
    productCount: 16,
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "cat-5",
    name: "Accessories & Shawls",
    slug: "accessories",
    description: "Handwoven shawls and fine couture accessories.",
    productCount: 12,
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "cat-6",
    name: "Special Edit",
    slug: "sale",
    description: "Limited-edition luxury pieces at exclusive seasonal pricing.",
    productCount: 8,
    sortOrder: 6,
    isActive: true,
  },
];

import { cn } from "@/lib/utils";

export default function Categories() {
  const { categories, isLoading } = useCategoryList();

  const displayCategories =
    categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#1A1A1A]"
          >
            Shop by Category
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 h-[1px] w-20 bg-[#C9A27E]"
          />
        </div>

        {/* Grid */}
        {isLoading && (!categories || categories.length === 0) ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6"
          >
            {displayCategories.map((category, index) => {
              const isLastOdd =
                displayCategories.length % 2 !== 0 &&
                index === displayCategories.length - 1;

              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className={cn(isLastOdd && "col-span-2 md:col-span-1")}
                >
                  <Link
                    href={`/collections/${category.slug}`}
                    className={cn(
                      "group relative block overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm transition-shadow duration-300 group-hover:shadow-md",
                      isLastOdd
                        ? "aspect-[16/9] sm:aspect-[2/1] md:aspect-[3/4]"
                        : "aspect-[3/4]"
                    )}
                  >
                    {/* Category image */}
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        ...(category.image
                          ? {
                              backgroundImage: `url(${category.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : {
                              background:
                                categoryGradients[category.slug] ||
                                "linear-gradient(135deg, #E8DDD4 0%, #F8F5F2 100%)",
                            }),
                      }}
                    />

                    {/* Dark gradient overlay for pristine text contrast (Image 2 style) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Subtle hover tint */}
                    <div className="absolute inset-0 bg-[#C9A27E]/0 group-hover:bg-[#C9A27E]/10 transition-all duration-500 pointer-events-none" />

                    {/* Center-bottom luxury typography matching Image 2 */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 text-center z-10 flex flex-col items-center justify-end">
                      <h3 className="font-sans font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-md">
                        {category.name}
                      </h3>
                      {typeof category.productCount === "number" && (
                        <p className="mt-1 text-[10px] sm:text-xs text-white/75 uppercase tracking-[0.2em] drop-shadow-sm">
                          {category.productCount} pieces
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}