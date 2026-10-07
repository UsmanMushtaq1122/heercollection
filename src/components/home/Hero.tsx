"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useHeroBanners } from "@/hooks/useContent";

export interface HeroSlideItem {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  secondaryText?: string;
  link: string;
  secondaryLink?: string;
  image: string;
  mobileImage: string;
  highlights?: string[];
}

const CURATED_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "slide-1-new-season",
    eyebrow: "NEW SEASON",
    title: "Elegance, Redefined",
    subtitle:
      "Handcrafted luxury pret and bridal couture, woven with delicate zari, lustrous pearls, and contemporary royal silhouettes.",
    buttonText: "Shop Now",
    secondaryText: "Explore Collection",
    link: "/collections/luxury-pret",
    secondaryLink: "/collections",
    image: "/images/hero/hero-slide-1-desktop.jpg",
    mobileImage: "/images/hero/hero-slide-1-mobile.jpg",
    highlights: ["Handcrafted", "Bespoke Couture", "Pure Fabrics"],
  },
  {
    id: "slide-2-festive-edit",
    eyebrow: "FESTIVE EDIT",
    title: "Made for Your Moments",
    subtitle:
      "Refined festive silhouettes & intricate embroidery tailored for unforgettable celebrations and timeless memories.",
    buttonText: "Shop Festive",
    secondaryText: "View Lookbook",
    link: "/collections/festive",
    secondaryLink: "/lookbook",
    image: "/images/hero/hero-slide-2-desktop.jpg",
    mobileImage: "/images/hero/hero-slide-2-mobile.jpg",
    highlights: ["Festive Zari", "Hand Embellished", "Silk Chanderi"],
  },
  {
    id: "slide-3-signature",
    eyebrow: "SIGNATURE COLLECTION",
    title: "Timeless. Elegant. Yours.",
    subtitle:
      "Bespoke royal statement pieces handcrafted in pure silks, fine laces, and exquisite heritage artisanal textures.",
    buttonText: "Discover Signature",
    secondaryText: "Explore Collection",
    link: "/collections/signature",
    secondaryLink: "/collections",
    image: "/images/hero/hero-slide-3-desktop.jpg",
    mobileImage: "/images/hero/hero-slide-3-mobile.jpg",
    highlights: ["Pure Raw Silk", "Intricate Dabka", "Heirloom Craft"],
  },
  {
    id: "slide-4-luxury-pret",
    eyebrow: "LUXURY PRET",
    title: "Artisanal Splendor",
    subtitle:
      "Handcrafted silks, chanderi, and organza adorned with fine dabka and timeless tilla work for everyday opulence.",
    buttonText: "Shop Luxury Pret",
    secondaryText: "View Lookbook",
    link: "/collections/pret",
    secondaryLink: "/lookbook",
    image: "/images/hero/hero-slide-4-desktop.jpg",
    mobileImage: "/images/hero/hero-slide-4-mobile.jpg",
    highlights: ["Artisanal Pret", "Organza & Chiffon", "Timeless Tilla"],
  },
];

const AUTO_PLAY_INTERVAL = 5500; // 5.5 seconds per slide

export default function Hero() {
  const { banners } = useHeroBanners();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Compute slides array: merge backend banners if any active exist, else fallback to curated slides
  const slides: HeroSlideItem[] =
    banners && banners.filter((b) => b.isActive).length > 0
      ? banners
          .filter((b) => b.isActive)
          .map((b, idx) => ({
            id: b.id || `banner-${idx}`,
            eyebrow: b.eyebrow || CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].eyebrow,
            title: b.title || CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].title,
            subtitle: b.subtitle || CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].subtitle,
            buttonText: b.buttonText || "Shop Now",
            secondaryText: "Explore Collection",
            link: b.link || "/collections/luxury-pret",
            secondaryLink: "/collections",
            image: b.image || CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].image,
            mobileImage:
              b.mobileImage ||
              b.image ||
              CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].mobileImage,
            highlights: CURATED_HERO_SLIDES[idx % CURATED_HERO_SLIDES.length].highlights,
          }))
      : CURATED_HERO_SLIDES;

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  // Pause auto-play when tab loses focus / is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    }
  };

  // Touch Swipe Handlers (calibrated > 45px threshold)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = (touchStartY.current ?? 0) - (touchEndY.current ?? 0);

    // Only fire if horizontal intent dominates and threshold > 45px
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Collections"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="hero-pull-up relative w-full h-[76vh] min-h-[540px] max-h-[680px] md:h-[84vh] md:min-h-[700px] md:max-h-[920px] overflow-hidden flex items-end md:items-center pb-24 md:pb-12 outline-none select-none focus-visible:ring-1 focus-visible:ring-[#C9A27E]"
    >
      {/* Background Images with Fluid Crossfade & Subtle Ken Burns Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full will-change-transform transform-gpu"
          >
            {/* Responsive Picture: Desktop vs Mobile crops */}
            <picture className="absolute inset-0 w-full h-full">
              <source media="(max-width: 767px)" srcSet={currentSlide.mobileImage} />
              <source media="(min-width: 768px)" srcSet={currentSlide.image} />
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-top sm:object-center pointer-events-none"
                loading={currentIndex === 0 ? "eager" : "lazy"}
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Intelligent Editorial Gradients:
            1. Top vignette keeps transparent fixed header and announcement icons 100% crisp.
            2. Lateral gradient provides contrast for left-aligned luxury text.
            3. Subtle bottom vignette grounds the indicators and pagination. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/75 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Main Editorial Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-[100px] sm:pt-[110px] md:pt-[125px]">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeInOut" } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6 md:space-y-7"
            >
              {/* Eyebrow Pill */}
              {currentSlide.eyebrow && (
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-sm">
                  <Sparkles className="h-3 w-3 text-[#C9A27E]" />
                  <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white">
                    {currentSlide.eyebrow}
                  </span>
                </div>
              )}

              {/* Editorial Headline */}
              <h1
                style={{ fontFamily: "var(--font-cinzel), var(--font-cormorant), serif" }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-wide drop-shadow-md"
              >
                {currentSlide.title.includes(",") ? (
                  <>
                    <span>{currentSlide.title.split(",")[0]},</span>
                    <br />
                    <span className="italic font-light text-white/90 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                      {currentSlide.title.split(",")[1]}
                    </span>
                  </>
                ) : currentSlide.title.includes(".") ? (
                  <>
                    <span>{currentSlide.title.split(".")[0]}.</span>
                    <br />
                    <span className="italic font-light text-white/90 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                      {currentSlide.title.substring(currentSlide.title.indexOf(".") + 1)}
                    </span>
                  </>
                ) : (
                  currentSlide.title
                )}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-light max-w-lg drop-shadow-sm">
                {currentSlide.subtitle}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Link href={currentSlide.link}>
                  <Button
                    size="lg"
                    className="h-11 sm:h-13 px-7 sm:px-9 rounded-none bg-white text-[#1A1A1A] hover:bg-[#C9A27E] hover:text-white transition-all duration-500 font-medium tracking-[0.2em] text-[11px] sm:text-xs uppercase group shadow-2xl"
                  >
                    {currentSlide.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </Link>

                {currentSlide.secondaryText && currentSlide.secondaryLink && (
                  <Link href={currentSlide.secondaryLink}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11 sm:h-13 px-6 sm:px-8 rounded-none border-white/40 text-white bg-black/25 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-500 font-light tracking-[0.2em] text-[11px] sm:text-xs uppercase"
                    >
                      {currentSlide.secondaryText}
                    </Button>
                  </Link>
                )}
              </div>

              {/* Editorial Highlights */}
              {currentSlide.highlights && currentSlide.highlights.length > 0 && (
                <div className="pt-3 sm:pt-4 flex items-center gap-4 sm:gap-6 text-white/65 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] border-t border-white/15">
                  {currentSlide.highlights.map((h, i) => (
                    <span key={h} className="flex items-center gap-4 sm:gap-6">
                      <span>{h}</span>
                      {i < currentSlide.highlights!.length - 1 && (
                        <span className="text-white/30">•</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Center Dash Pagination */}
      <div
        role="tablist"
        aria-label="Carousel Slides"
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 sm:gap-2.5 pointer-events-auto"
      >
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goToSlide(idx)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              className="group py-2 px-0.5 focus:outline-none cursor-pointer"
            >
              <span
                className={`block h-[3.5px] sm:h-1 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "w-14 sm:w-20 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    : "w-7 sm:w-9 bg-white/40 group-hover:bg-white/75"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}