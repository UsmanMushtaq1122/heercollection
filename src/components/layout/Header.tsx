"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import AnnouncementBar from "./AnnouncementBar";
import SocialLinks from "@/components/common/SocialLinks";
import { useSiteSettings } from "@/hooks/useSettings";

// ------------------------------------------------------------------
// Bespoke thin 3-line hamburger — matching the reference image exactly
// ------------------------------------------------------------------
function LuxuryHamburger({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="2" y1="5.5"  x2="20" y2="5.5"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="11"   x2="20" y2="11"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="16.5" x2="20" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const { settings } = useSiteSettings();
  const {
    isScrolled,
    setScrolled,
    toggleMobileMenu,
    toggleSearch,
    toggleCart,
  } = useUIStore();

  const totalItems    = useCartStore((s) => s.totalItems);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Detect route — homepage gets transparent hero overlay; every other page
  // gets a solid background so icons are readable on the light content below.
  const pathname   = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrolled]);

  // ------------------------------------------------------------------
  // Dynamically synchronize --header-h with the actual measured height
  // of the entire coordinated header (AnnouncementBar + Navbar).
  // When AnnouncementBar closes or screen resizes, --header-h adapts
  // automatically with zero empty space and zero layout jump.
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty("--header-h", `${height}px`);
        }
      }
    };
    updateHeight();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = Math.round(
          entry.borderBoxSize?.[0]?.blockSize ?? headerRef.current?.offsetHeight ?? 0
        );
        if (height > 0) {
          document.documentElement.style.setProperty("--header-h", `${height}px`);
        }
      }
    });

    observer.observe(headerRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // ------------------------------------------------------------------
  // Background:
  //   Homepage + not scrolled → transparent gradient (hero overlay)
  //   Homepage + scrolled     → solid frosted dark
  //   Any internal page       → always solid (light content below)
  // ------------------------------------------------------------------
  const isSolid = isScrolled || !isHomePage;

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 w-full flex flex-col"
      aria-label="Main navigation"
    >
      {/* Row 1: Announcement Bar (relative row, unmounts smoothly when dismissed) */}
      <AnnouncementBar />

      {/* Row 2: Navbar (always stacked directly below Announcement Bar with 0 overlap) */}
      <nav
        className={cn(
          "w-full transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          isSolid
            ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-gradient-to-b from-black/75 via-black/30 to-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative flex h-[56px] items-center justify-between md:h-[62px]">

          {/* ===================== LEFT: Hamburger + Search ===================== */}
          <div className="relative flex flex-1 items-center justify-start gap-1 sm:gap-4 md:gap-7 z-20 pointer-events-auto">

            {/* Hamburger */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="group -ml-1 flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm cursor-pointer"
              aria-label="Open navigation menu"
            >
              <LuxuryHamburger className="transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
            </button>

            {/* Search — hidden on mobile screen (<sm), visible on desktop */}
            <button
              type="button"
              onClick={toggleSearch}
              className="group hidden sm:flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm cursor-pointer"
              aria-label="Search collection"
            >
              <Search
                strokeWidth={1.3}
                className="h-5 w-5 sm:h-[21px] sm:w-[21px] transition-transform duration-300 group-hover:scale-110 pointer-events-none"
              />
            </button>

            <SocialLinks
              links={settings.socialLinks}
              className="hidden items-center gap-1.5 lg:flex"
              linkClassName="flex h-8 w-8 items-center justify-center text-white/75 transition-colors hover:text-white"
              iconClassName="h-4 w-4"
              ariaLabel="Social media"
              useBrandColors={false}
            />

          </div>

          {/* ============= CENTER: BRAND LOGO — viewport-centered ============= */}
          {/*
            Uses absolute positioning relative to the navbar bar itself so the brand
            name is centered relative to the full viewport width, not just the space
            between the two icon groups.
            pointer-events-none ensures it does not intercept clicks meant for the left/right icons.
          */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center z-10">
            <Link
              href="/"
              className="pointer-events-auto group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm px-1 cursor-pointer"
              aria-label="Heer Collection — home"
            >
              <Image
                src="/heer-wordmark.png"
                alt="Heer Collection"
                width={487}
                height={170}
                priority
                className="h-auto w-[100px] sm:w-[128px] md:w-[146px] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* ============= RIGHT: Wishlist + Account + Cart ============= */}
          <div className="relative flex flex-1 items-center justify-end gap-1 sm:gap-4 md:gap-7 z-20 pointer-events-auto">

            {/* Wishlist — hidden on mobile screen (<sm), visible on desktop */}
            <Link
              href="/wishlist"
              className="group relative hidden sm:flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm cursor-pointer"
              aria-label="View wishlist"
            >
              <Heart
                strokeWidth={1.3}
                className="h-5 w-5 sm:h-[21px] sm:w-[21px] transition-transform duration-300 group-hover:scale-110"
              />
              {/* Wishlist count badge — only when items exist */}
              {mounted && wishlistCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#C9A27E] text-[8px] font-semibold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account — visible on mobile & desktop */}
            <Link
              href="/account"
              className="group flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm cursor-pointer"
              aria-label="My account"
            >
              <User
                strokeWidth={1.3}
                className="h-5 w-5 sm:h-[21px] sm:w-[21px] transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Cart / Shopping Bag — hidden on mobile screen (<sm), visible on desktop */}
            <button
              type="button"
              onClick={toggleCart}
              className="group relative -mr-1 hidden sm:flex h-11 w-11 items-center justify-center text-white/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm cursor-pointer"
              aria-label={
                mounted && totalItems > 0
                  ? `Shopping bag — ${totalItems} item${totalItems !== 1 ? "s" : ""}`
                  : "Open shopping bag"
              }
            >
              <ShoppingBag
                strokeWidth={1.3}
                className="h-5 w-5 sm:h-[21px] sm:w-[21px] transition-transform duration-300 group-hover:scale-110"
              />
              {/* Cart badge — only render when there are real items */}
              {mounted && totalItems > 0 && (
                <span
                  className={cn(
                    "absolute right-1 top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full",
                    "bg-[#111111] border border-white/50 shadow-[0_1px_4px_rgba(0,0,0,0.5)]",
                    "text-[9px] font-semibold text-white",
                  )}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
      </nav>
    </motion.header>
  );
}