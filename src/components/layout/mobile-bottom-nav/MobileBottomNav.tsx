"use client";

import { usePathname } from "next/navigation";
import { Heart, Home, Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import NavItem from "./NavItem";
import CartBadge from "./CartBadge";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="mx-auto flex h-19 max-w-md items-center justify-around rounded-t-[22px] border border-b-0 border-[#EEEEF2] bg-white/95 px-2 shadow-[0_-8px_30px_rgba(17,17,17,0.08)] backdrop-blur-md">
        <NavItem href="/" label="Home" active={pathname === "/"}>
          <Home className="h-7 w-7" strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/search" label="Search" active={pathname.startsWith("/search")}>
          <Search className="h-7 w-7" strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/wishlist" label="Favourite" active={pathname.startsWith("/wishlist")}>
          <Heart className="h-7 w-7" strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/cart" label="My bag" active={pathname.startsWith("/cart")} badge={<CartBadge count={totalItems} />}>
          <ShoppingBag className="h-7 w-7" strokeWidth={1.8} />
        </NavItem>
      </div>
    </nav>
  );
}
