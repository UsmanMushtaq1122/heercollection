"use client";

import Header from "./Header";
import Footer from "./Footer";
import ShippingBar from "./ShippingBar";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/common/SearchOverlay";
import QuickView from "@/components/product/QuickView";
import { MobileBottomNav } from "./mobile-bottom-nav";
import MobileFooter from "@/components/footer/MobileFooter";
import WhatsAppFloatingButton, {
  WhatsAppProductProvider,
} from "@/components/common/WhatsAppFloatingButton";

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <WhatsAppProductProvider>
      <div className="min-h-screen max-w-full overflow-x-hidden flex flex-col bg-[#F8F5F2]">
        <Header />
        <MobileMenu />
        {/*
          padding-top offsets the fixed header (announcement bar + navbar).
          The value is driven by CSS variables declared in globals.css so it
          automatically updates on mobile vs desktop with no extra JS.

          The homepage Hero uses the .hero-pull-up class to apply an equal
          negative-margin-top, cancelling this padding and letting the hero
          bleed all the way to the top of the viewport behind the transparent
          navbar — without requiring any per-page overrides.
        */}
        <main
          className="flex-1 pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-0"
          style={{ paddingTop: "var(--header-h)" }}
        >
          {children}
        </main>
        <ShippingBar />
        <Footer />
        <MobileFooter />
        <CartDrawer />
        <SearchOverlay />
        <QuickView />
        <MobileBottomNav />
        <WhatsAppFloatingButton />
      </div>
    </WhatsAppProductProvider>
  );
}
