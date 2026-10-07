"use client";

import { useState, useEffect } from "react";
import { Star, Minus, Plus, Heart, Check, ShoppingBag } from "lucide-react";
import { cn, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useSiteSettings } from "@/hooks/useSettings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function QuickView() {
  const { isQuickViewOpen, quickViewProduct, closeQuickView } = useUIStore();
  const { settings } = useSiteSettings();
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product: Product | null = quickViewProduct;

  useEffect(() => {
    if (isQuickViewOpen && product) {
      const timer = setTimeout(() => {
        setSelectedSize("");
        setQuantity(1);
        setAddedToCart(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isQuickViewOpen, product]);

  if (!product) return null;

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) return;
    addItem({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: product.colors[0]?.name || undefined,
    });
    setAddedToCart(true);
    setTimeout(() => {
      closeQuickView();
      setAddedToCart(false);
    }, 1200);
  };

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={closeQuickView}>
      <DialogContent className="max-w-4xl overflow-y-auto p-0 max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.category.name}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          {(() => {
            const firstImg = product.images?.[0];
            const imgUrl =
              typeof firstImg === "string"
                ? firstImg
                : firstImg?.url || product.thumbnail || null;
            const imgAlt =
              (typeof firstImg === "object" && firstImg?.alt) || product.name;

            return (
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DDD4]">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, #F0E8E1 0%, #E8DDD4 50%, #D8C7B8 100%)`,
                    }}
                  />
                )}
                <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
                  {discount > 0 && (
                    <span className="rounded-sm bg-red-500 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Info */}
          <div className="flex flex-col justify-center gap-5 p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]/50">
              {product.category.name}
            </p>

            <div>
              <h3 className="text-2xl font-light text-[#1A1A1A]">
                {product.name}
              </h3>
              {typeof (product as any).rating === "number" && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          (product as any).rating >= i + 0.5
                            ? "fill-[#C9A27E] text-[#C9A27E]"
                            : "fill-[#E8DDD4] text-[#E8DDD4]"
                        )}
                      />
                    ))}
                  </div>
                  {(product as any).reviewCount !== undefined && (
                    <span className="text-xs text-[#1A1A1A]/50">
                      ({(product as any).reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-xl font-medium text-[#1A1A1A]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#1A1A1A]/40 line-through">
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>



            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                  Size: {selectedSize || "Select"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.id || `${size.name}-${index}`}
                      onClick={() => size.inStock && setSelectedSize(size.name)}
                      disabled={!size.inStock}
                      className={cn(
                        "min-w-[42px] rounded-sm border px-3 py-2 text-xs font-medium uppercase transition-all",
                        selectedSize === size.name
                          ? "border-[#C9A27E] bg-[#C9A27E] text-white"
                          : size.inStock
                            ? "border-[#E8DDD4] text-[#1A1A1A] hover:border-[#C9A27E]"
                            : "cursor-not-allowed border-[#E8DDD4] text-[#1A1A1A]/30 line-through"
                      )}
                    >
                      {size.label || size.name}
                    </button>
                  ))}
                </div>
                {!selectedSize && product.sizes.length > 0 && (
                  <p className="text-xs text-[#C9A27E]">
                    Please select a size to add to cart
                  </p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                Qty:
              </span>
              <div className="flex items-center border border-[#E8DDD4]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex h-8 w-10 items-center justify-center border-x border-[#E8DDD4] text-xs font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                variant="gold"
                onClick={handleAddToCart}
                disabled={product.sizes.length > 0 && !selectedSize}
                className="h-11 w-full text-xs font-medium uppercase tracking-widest"
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                  </>
                )}
              </Button>
            </div>

            <p className="mt-2 flex items-center gap-2 text-[11px] text-[#1A1A1A]/50">
              <Heart className="h-3.5 w-3.5 text-[#C9A27E]" />
              Free shipping on orders over Rs. {settings.shipping.freeShippingThreshold.toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}