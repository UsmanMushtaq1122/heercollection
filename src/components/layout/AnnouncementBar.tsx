"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useAnnouncementBars, useSiteSettings } from "@/hooks";
import { useUIStore } from "@/store/uiStore";
import type { Announcement } from "@/types/content";

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "default-1",
    text: "Complimentary Express Shipping on Orders over PKR 10,000",
    cta: "Shop Now",
    link: "/collections/luxury-pret",
    isActive: true,
  },
  {
    id: "default-2",
    text: "Discover the New Season Luxury Pret & Formal Collection",
    cta: "Explore",
    link: "/collections/luxury-pret",
    isActive: true,
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAnnouncementVisible, setAnnouncementVisible } = useUIStore();
  const { settings } = useSiteSettings();
  const { announcements } = useAnnouncementBars();
  const barRef = useRef<HTMLElement>(null);

  // Keep the --announcement-h CSS variable dynamically updated with the real height
  useEffect(() => {
    if (!isAnnouncementVisible) {
      document.documentElement.style.setProperty("--announcement-h", "0px");
      return;
    }
    if (!barRef.current) return;

    const updateHeight = () => {
      if (barRef.current) {
        const h = barRef.current.offsetHeight;
        document.documentElement.style.setProperty("--announcement-h", `${h}px`);
      }
    };
    updateHeight();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(
          entry.borderBoxSize?.[0]?.blockSize ?? barRef.current?.offsetHeight ?? 36
        );
        document.documentElement.style.setProperty("--announcement-h", `${h}px`);
      }
    });

    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [isAnnouncementVisible]);

  const apiAnnouncements: Announcement[] = announcements
    .filter((a) => a.isActive !== false)
    .map((a) => ({
      id: a.id,
      text: a.title,
      link: a.link || undefined,
      cta: a.buttonText || "Shop Now",
      isActive: a.isActive ?? true,
    }));

  const messages: Announcement[] =
    apiAnnouncements.length > 0
      ? apiAnnouncements
      : settings.announcementMessages && settings.announcementMessages.length > 0
        ? settings.announcementMessages.filter((m) => m.isActive !== false)
        : DEFAULT_ANNOUNCEMENTS;

  const cycleMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (messages.length || 1));
  }, [messages.length]);

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(cycleMessage, 4500);
      return () => clearInterval(interval);
    }
  }, [cycleMessage, messages.length]);

  // Guard: ensure currentIndex is in bounds and message is defined
  const safeIndex = Math.min(currentIndex, Math.max(0, messages.length - 1));
  const message = messages[safeIndex];

  if (!isAnnouncementVisible || !message) return null;

  return (
    <aside
      ref={barRef}
      className="relative z-50 flex min-h-9 w-full items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[#111111]/97 backdrop-blur-sm py-1 sm:py-0"
      aria-label="Announcement bar"
    >
      {/* Animated message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          // px-10 on mobile leaves room for close button; sm:px-0 lets content center naturally
          className="flex max-w-[calc(100%-2.5rem)] items-center justify-center gap-1.5 text-center"
        >
          <span className="truncate text-[11px] font-light tracking-[0.12em] text-white/90 sm:text-xs sm:tracking-[0.15em]">
            {message.text}
          </span>
          {message.link && (
            <Link
              href={message.link}
              className="ml-1 shrink-0 text-[11px] font-medium tracking-[0.1em] text-[#C9A27E] underline-offset-2 transition-all hover:underline hover:text-[#d4b396] sm:text-xs"
            >
              {message.cta || "Shop Now"}
            </Link>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Close button — absolutely positioned so it never pushes the text */}
      <button
        onClick={() => setAnnouncementVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center text-white/50 transition-colors hover:text-white focus:outline-none"
        aria-label="Close announcement bar"
      >
        <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </button>
    </aside>
  );
}