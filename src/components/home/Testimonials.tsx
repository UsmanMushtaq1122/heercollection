"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Loader2,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTestimonials } from "@/hooks/useContent";
import EmptyState from "@/components/common/EmptyState";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Testimonials() {
  const { testimonials, isLoading } = useTestimonials();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const count = testimonials.length;

  useEffect(() => {
    if (count > 0) setCurrent((prev) => (prev >= count ? 0 : prev));
  }, [count]);

  const paginate = useCallback(
    (dir: number) => {
      if (count === 0) return;
      setDirection(dir);
      setCurrent((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count < 2) return;
    const interval = setInterval(() => paginate(1), 7000);
    return () => clearInterval(interval);
  }, [paginate, count]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <section className="py-20 sm:py-28 bg-[#F8F5F2]">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
        </div>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="py-20 sm:py-28 bg-[#F8F5F2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="Client stories coming soon"
            description="Customer testimonials will appear here once published."
          />
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];
  const isVideo = testimonial.type === "video" || testimonial.type === "story";
  const isInstagram = testimonial.type === "instagram";
  const mediaUrl = testimonial.videoUrl || testimonial.image || "";

  return (
    <section className="py-20 sm:py-28 bg-[#F8F5F2] overflow-hidden border-t border-[#E8DDD4]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A27E] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Client Stories &amp; Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#1A1A1A]"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 h-[1px] w-20 bg-[#C9A27E]"
          />
        </div>

        {/* Carousel Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DDD4]/80 flex flex-col md:flex-row"
              >
                {/* Left accent bar */}
                <div className="h-1 md:h-auto md:w-1 bg-gradient-to-r md:bg-gradient-to-b from-[#C9A27E] to-[#E8DDD4]/60 shrink-0" />

                {/* Visual Media Preview */}
                {mediaUrl && (
                  <div className="relative w-full md:w-44 h-52 md:h-auto overflow-hidden bg-[#1A1A1A] shrink-0">
                    {isVideo ? (
                      <div className="w-full h-full relative">
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover opacity-90"
                          preload="metadata"
                          muted
                          playsInline
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        {/* Play button */}
                        <Link
                          href="/testimonials"
                          className="absolute inset-0 flex items-center justify-center"
                          title="Watch Story"
                        >
                          <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-[#1A1A1A] ml-0.5" />
                          </div>
                        </Link>
                        {/* Label */}
                        <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] uppercase tracking-widest text-white/75 font-medium pointer-events-none">
                          Video Story
                        </span>
                      </div>
                    ) : isInstagram ? (
                      <div className="w-full h-full bg-gradient-to-tr from-[#833ab4]/20 via-[#fd1d1d]/15 to-[#fcb045]/20 flex flex-col items-center justify-center p-3 text-center">
                        <InstagramIcon className="w-8 h-8 text-pink-600 mb-2" />
                        <span className="text-[10px] text-pink-700 uppercase tracking-wider font-semibold">
                          Instagram
                        </span>
                      </div>
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={testimonial.customerName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}

                {/* Text & Content */}
                <div className="flex-1 flex flex-col justify-between p-7 sm:p-10">
                  <div>
                    {/* Stars + rating score */}
                    <div className="flex items-center gap-1.5 mb-5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-[#C9A27E] fill-[#C9A27E]"
                                : "text-[#1A1A1A]/10 fill-[#1A1A1A]/5"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#1A1A1A]/30 font-light ml-1">
                        {testimonial.rating}.0
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-xl sm:text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                  </div>

                  {/* Divider + Author */}
                  <div className="mt-8">
                    <div className="h-px bg-[#E8DDD4]/60 mb-5" />
                    <div className="flex items-center gap-3">
                      {/* Initials avatar */}
                      <div className="w-9 h-9 rounded-full bg-[#C9A27E]/15 border border-[#C9A27E]/25 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-[#B8906A] tracking-wide">
                          {testimonial.customerName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-wide text-[#1A1A1A] flex items-center gap-1.5">
                          {testimonial.customerName}
                          {/* Verified checkmark */}
                          <svg
                            className="w-3.5 h-3.5 text-[#C9A27E]"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </p>
                        {testimonial.location && (
                          <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A]/35 font-medium">
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {/* Dots */}
              <div className="flex gap-1.5 mx-2">
                {testimonials.slice(0, 10).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-[#C9A27E]"
                        : "w-1.5 bg-[#1A1A1A]/15 hover:bg-[#C9A27E]/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {count > 1 && (
                <span className="text-[11px] text-[#1A1A1A]/25 font-light ml-1">
                  {current + 1} / {count}
                </span>
              )}
            </div>

            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-[#C9A27E] hover:text-[#B8906A] transition-colors group"
            >
              <span>All Stories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}