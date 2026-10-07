import { create } from "zustand";
import type { Product } from "@/types";

interface UIState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isScrolled: boolean;
  setScrolled: (scrolled: boolean) => void;
  isAnnouncementVisible: boolean;
  setAnnouncementVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => {
      const nextOpen = !state.isMobileMenuOpen;
      return {
        isMobileMenuOpen: nextOpen,
        ...(nextOpen ? { isSearchOpen: false, isCartOpen: false, isQuickViewOpen: false } : {}),
      };
    }),
  setMobileMenuOpen: (open: boolean) =>
    set(() => ({
      isMobileMenuOpen: open,
      ...(open ? { isSearchOpen: false, isCartOpen: false, isQuickViewOpen: false } : {}),
    })),
  isSearchOpen: false,
  toggleSearch: () =>
    set((state) => {
      const nextOpen = !state.isSearchOpen;
      return {
        isSearchOpen: nextOpen,
        ...(nextOpen ? { isMobileMenuOpen: false, isCartOpen: false, isQuickViewOpen: false } : {}),
      };
    }),
  setSearchOpen: (open: boolean) =>
    set(() => ({
      isSearchOpen: open,
      ...(open ? { isMobileMenuOpen: false, isCartOpen: false, isQuickViewOpen: false } : {}),
    })),
  isCartOpen: false,
  toggleCart: () =>
    set((state) => {
      const nextOpen = !state.isCartOpen;
      return {
        isCartOpen: nextOpen,
        ...(nextOpen ? { isMobileMenuOpen: false, isSearchOpen: false, isQuickViewOpen: false } : {}),
      };
    }),
  setCartOpen: (open: boolean) =>
    set(() => ({
      isCartOpen: open,
      ...(open ? { isMobileMenuOpen: false, isSearchOpen: false, isQuickViewOpen: false } : {}),
    })),
  isQuickViewOpen: false,
  quickViewProduct: null,
  openQuickView: (product) =>
    set({
      isQuickViewOpen: true,
      quickViewProduct: product,
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isCartOpen: false,
    }),
  closeQuickView: () => set({ isQuickViewOpen: false }),
  isScrolled: false,
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
  isAnnouncementVisible: true,
  setAnnouncementVisible: (visible) => set({ isAnnouncementVisible: visible }),
}));