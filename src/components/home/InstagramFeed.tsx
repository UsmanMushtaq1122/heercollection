"use client";

import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { EASE_LUXURY } from "@/lib/constants";
import { useInstagramFeed } from "@/hooks/useContent";
import EmptyState from "@/components/common/EmptyState";

const FALLBACK_GRADIENT = "linear-gradient(135deg, #C9A27E44 0%, #E8DDD4 100%)";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

export default function InstagramFeed() {
  const { posts, isLoading } = useInstagramFeed();

  if (isLoading) {
    return (
      <section className="py-20 sm:py-28">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState title="Feed coming soon" description="Instagram posts will appear here once the account is connected." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <InstagramIcon className="h-5 w-5 text-[#C9A27E]" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A27E]">
              @heercollection
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#1A1A1A]"
          >
            Follow Our Journey
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link || "https://instagram.com/heercollection"}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            >
              {/* Image placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={
                  post.image
                    ? { backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: FALLBACK_GRADIENT }
                }
              >
                {!post.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <InstagramIcon className="h-6 w-6 text-[#1A1A1A]/10" />
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-all duration-500">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                  <Heart className="h-4 w-4 text-white fill-white" />
                  <span className="text-sm font-medium text-white">
                    {(post.likes ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://instagram.com/heercollection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#C9A27E] hover:text-[#b38d6a] transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}