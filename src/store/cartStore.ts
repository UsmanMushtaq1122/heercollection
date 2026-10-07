import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
}

const keyOf = (productId: string, size?: string, color?: string) =>
  `${productId}::${size ?? ""}::${color ?? ""}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              keyOf(i.product.id, i.selectedSize, i.selectedColor) ===
              keyOf(item.product.id, item.selectedSize, item.selectedColor)
          );
          let items: CartItem[];
          if (existing) {
            items = state.items.map((i) =>
              keyOf(i.product.id, i.selectedSize, i.selectedColor) ===
              keyOf(item.product.id, item.selectedSize, item.selectedColor)
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            items = [...state.items, item];
          }
          return {
            items,
            totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
          };
        }),
      removeItem: (productId, selectedSize, selectedColor) =>
        set((state) => {
          const items = state.items.filter(
            (i) =>
              keyOf(i.product.id, i.selectedSize, i.selectedColor) !==
              keyOf(productId, selectedSize, selectedColor)
          );
          return {
            items,
            totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
          };
        }),
      updateQuantity: (productId, quantity, selectedSize, selectedColor) =>
        set((state) => {
          const key = keyOf(productId, selectedSize, selectedColor);
          if (quantity <= 0) {
            const items = state.items.filter(
              (i) =>
                keyOf(i.product.id, i.selectedSize, i.selectedColor) !== key
            );
            return {
              items,
              totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
              totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
            };
          }
          const items = state.items.map((i) =>
            keyOf(i.product.id, i.selectedSize, i.selectedColor) === key
              ? { ...i, quantity }
              : i
          );
          return {
            items,
            totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
          };
        }),
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "heer-cart" }
  )
);