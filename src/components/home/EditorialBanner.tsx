"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEditorialBanners } from "@/hooks/useContent";

export default function EditorialBanner() {
  const { banners } = useEditorialBanners();
  const banner = banners.find((item) => item.isActive) ?? banners[0];

  if (!banner) return null;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={banner.link || "/collections"}
          className="group relative block min-h-[360px] overflow-hidden rounded-sm bg-[#E8DDD4] sm:min-h-[460px]"
        >
          {banner.image && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/70 via-[#1A1A1A]/35 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative flex min-h-[360px] max-w-xl flex-col justify-center px-6 py-12 sm:min-h-[460px] sm:px-12 lg:px-16"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A27E]">
              Featured Edit
            </p>
            <h2 className="font-serif text-3xl tracking-wide text-white sm:text-5xl">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                {banner.subtitle}
              </p>
            )}
            {banner.link && (
              <span className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors group-hover:text-[#C9A27E]">
                Explore edit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </motion.div>
        </Link>
      </div>
    </section>
  );
}