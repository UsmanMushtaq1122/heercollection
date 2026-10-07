"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import type { CartItem } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const firstImg = item.product.images?.[0];
  const imgUrl =
    typeof firstImg === "string"
      ? firstImg
      : firstImg?.url || item.product.thumbnail || null;
  const imgAlt =
    (typeof firstImg === "object" && firstImg?.alt) || item.product.name;

  return (
    <div className="flex gap-4 py-5">
      {/* Product Image */}
      <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
        <div
          className="relative h-28 w-24 overflow-hidden rounded-sm bg-[#E8DDD4]"
        >
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={imgAlt}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-1" style={{ background: `linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 100%)` }}>
              <span className="text-center text-[10px] font-medium text-[#1A1A1A]/30">
                {item.product.name}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Link
              href={`/product/${item.product.slug}`}
              className="text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A27E]"
            >
              {item.product.name}
            </Link>
            <p className="text-xs text-[#1A1A1A]/50">
              {item.selectedSize && (
                <span className="mr-2">
                  Size: <span className="text-[#1A1A1A]/70">{item.selectedSize}</span>
                </span>
              )}
              {item.selectedColor && (
                <span>
                  Color:{" "}
                  <span className="text-[#1A1A1A]/70">{item.selectedColor}</span>
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-[#1A1A1A]/40 transition-colors hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <span className="text-sm font-medium text-[#1A1A1A]">
            Rs. {(item.product.price * item.quantity).toLocaleString()}
          </span>

          <div className="flex items-center border border-[#E8DDD4]">
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A] disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center border-x border-[#E8DDD4] text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity + 1)
              }
              className="flex h-8 w-8 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}