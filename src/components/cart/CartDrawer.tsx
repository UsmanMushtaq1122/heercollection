"use client";

import Link from "next/link";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } =
    useCartStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 bg-[#F8F5F2] p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-[#E8DDD4] px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#1A1A1A]">
            <ShoppingBag className="h-5 w-5 text-[#C9A27E]" />
            Shopping Bag ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping bag
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8DDD4]">
              <ShoppingBag className="h-7 w-7 text-[#1A1A1A]/40" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-[#1A1A1A]">
              Your Cart is Empty
            </h3>
            <p className="max-w-[220px] text-sm text-[#1A1A1A]/50">
              Discover our latest collection of luxury fashion pieces.
            </p>
            <div className="mx-auto mt-2 h-px w-12 bg-[#C9A27E]" />
            <Link
              href="/"
              onClick={toggleCart}
              className="text-xs font-medium uppercase tracking-widest text-[#C9A27E] transition-colors hover:text-[#C9A27E]/70"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={toggleCart}
                      className="flex-shrink-0"
                    >
                      <div
                        className="relative h-24 w-20 overflow-hidden rounded-sm"
                        style={{
                          background: `linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 100%)`,
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center p-1">
                          <span className="text-center text-[10px] font-medium text-[#1A1A1A]/30">
                            {item.product.name}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={toggleCart}
                          className="line-clamp-1 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A27E]"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[#1A1A1A]/40 transition-colors hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-0.5 text-xs text-[#1A1A1A]/50">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " • "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-[#E8DDD4]">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-7 w-7 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A] disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-7 w-9 items-center justify-center border-x border-[#E8DDD4] text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-[#1A1A1A]">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-[#1A1A1A]/50 transition-colors hover:text-[#C9A27E]"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#E8DDD4] px-6 py-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                  Subtotal
                </span>
                <span className="text-lg font-medium text-[#1A1A1A]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="mb-4 text-xs text-[#1A1A1A]/40">
                Shipping and taxes calculated at checkout
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="/checkout" onClick={toggleCart} className="w-full">
                  <Button
                    variant="gold"
                    className="h-12 w-full text-xs font-medium uppercase tracking-widest"
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/cart" onClick={toggleCart} className="w-full">
                  <Button
                    variant="outline"
                    className="h-11 w-full border-[#E8DDD4] text-xs font-medium uppercase tracking-widest"
                  >
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}