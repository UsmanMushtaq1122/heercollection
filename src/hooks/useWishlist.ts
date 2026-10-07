"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";

export function useWishlist() {
  const { items, toggleItem, isInWishlist } = useWishlistStore();

  const count = items.length;
  const isEmpty = count === 0;

  const toggle = (product: Product) => {
    toggleItem(product);
  };

  const add = (product: Product) => {
    if (!isInWishlist(product.id)) {
      toggleItem(product);
    }
  };

  const remove = (productId: string) => {
    if (isInWishlist(productId)) {
      const item = items.find((i) => i.id === productId);
      if (item) {
        toggleItem(item);
      }
    }
  };

  const check = (productId: string): boolean => {
    return isInWishlist(productId);
  };

  const clearWishlist = () => {
    for (const item of items) {
      toggleItem(item);
    }
  };

  return {
    items,
    count,
    isEmpty,
    toggle,
    add,
    remove,
    isInWishlist: check,
    clearWishlist,
  };
}
