"use client";

import { useMemo } from "react";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { Product, Size, Color } from "@/types";

export function useCart() {
  const { items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const formattedTotalPrice = useMemo(() => formatPrice(totalPrice), [totalPrice]);

  const isEmpty = totalItems === 0;

  const getItemQuantity = (productId: string): number => {
    const item = items.find((i) => i.product.id === productId);
    return item?.quantity || 0;
  };

  const addProduct = (
    product: Product,
    quantity: number = 1,
    selectedSize?: Size,
    selectedColor?: Color
  ) => {
    addItem({
      product,
      quantity,
      selectedSize: selectedSize?.name,
      selectedColor: selectedColor?.name,
    });
  };

  const removeProduct = (productId: string) => {
    removeItem(productId);
  };

  const incrementQuantity = (productId: string) => {
    const currentQty = getItemQuantity(productId);
    updateQuantity(productId, currentQty + 1);
  };

  const decrementQuantity = (productId: string) => {
    const currentQty = getItemQuantity(productId);
    if (currentQty <= 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const getProductQuantity = (productId: string): number => {
    return getItemQuantity(productId);
  };

  const getItemById = (productId: string): CartItem | undefined => {
    return items.find((item) => item.product.id === productId);
  };

  return {
    items,
    totalItems,
    totalPrice,
    formattedTotalPrice,
    isEmpty,
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
    getProductQuantity,
    getItemById,
    clearCart,
  };
}
