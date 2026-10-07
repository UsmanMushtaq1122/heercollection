"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  WashingMachine,
  Shirt,
  Droplets,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { recordRecentlyViewed } from "./RecentlyViewed";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { useWhatsAppProduct } from "@/components/common/WhatsAppFloatingButton";

// Map care instruction keywords to icons
function CareIcon({ text }: { text: string }) {
  const lower = text.toLowerCase();
  if (lower.includes("wash") || lower.includes("clean")) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f5f5] text-[#555] flex-shrink-0">
        <WashingMachine className="h-5 w-5" />
      </span>
    );
  }
  if (lower.includes("iron") || lower.includes("press")) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f5f5] text-[#555] flex-shrink-0">
        <Shirt className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f5f5] text-[#555] flex-shrink-0">
      <Droplets className="h-5 w-5" />
    </span>
  );
}

// Size Chart Modal
function SizeChartModal({ onClose }: { onClose: () => void }) {
  const [unit, setUnit] = useState<"IN" | "CM">("IN");

  const measurements = [
    { point: "Shoulder", s: 14, m: 14.5, l: 15.5 },
    { point: "Chest", s: 37, m: 39, l: 42 },
    { point: "Waist", s: 30, m: 32, l: 35 },
    { point: "Front Neck depth", s: 7, m: 7.5, l: 8 },
    { point: "Sleeve Length", s: 22, m: 22.5, l: 23 },
    { point: "Gown Length", s: 54, m: 54, l: 54 },
  ];

  const lehanaMeasurements = [
    { point: "Sizes", s: "S", m: "M", l: "L" },
    { point: "Waist", s: 30, m: 32, l: 35 },
    { point: "Length", s: 44, m: 45, l: 46 },
  ];

  const toDisplay = (val: number | string) => {
    if (typeof val === "string") return val;
    if (unit === "CM") return (val * 2.54).toFixed(2);
    return val;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[640px] rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
          <h2 className="text-[1.15rem] font-semibold text-[#1A1A1A]">Size &amp; Fit Guide</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A]/60 hover:bg-[#f2f2f2] transition"
            aria-label="Close size chart"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Unit toggle */}
        <div className="flex justify-center pt-5 pb-2">
          <div className="flex rounded-full border border-[#E5E5E5] bg-[#f9f9f9] p-1">
            {(["IN", "CM"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={cn(
                  "px-5 py-1.5 rounded-full text-[0.85rem] font-medium transition-all",
                  unit === u
                    ? "bg-white shadow text-[#1A1A1A]"
                    : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <table className="w-full text-[0.85rem] border-collapse mt-3">
            <thead>
              <tr className="bg-[#f5f5f5]">
                <th className="text-left font-semibold text-[#1A1A1A] py-3 px-3 uppercase text-[0.75rem] tracking-wider">Point of Measurement</th>
                {["S", "M", "L"].map((h) => (
                  <th key={h} className="font-semibold text-[#1A1A1A] py-3 px-3 text-center uppercase text-[0.75rem] tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, i) => (
                <tr key={row.point} className={i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}>
                  <td className="py-3 px-3 text-[#1A1A1A] font-medium">{row.point}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.s)}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.m)}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.l)}</td>
                </tr>
              ))}
              {/* Lehanga section header */}
              <tr className="bg-white">
                <td colSpan={4} className="py-3 px-3 font-semibold text-[#1A1A1A]">Lehanga</td>
              </tr>
              {lehanaMeasurements.map((row, i) => (
                <tr key={row.point} className={i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                  <td className="py-3 px-3 text-[#1A1A1A] font-medium">{row.point}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.s)}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.m)}</td>
                  <td className="py-3 px-3 text-center text-[#1A1A1A]/80">{toDisplay(row.l)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const selectedColor = product.colors?.[0]?.name;
  useWhatsAppProduct({
    name: product.name,
    slug: product.slug,
    price: product.price,
    size: selectedSize,
    color: selectedColor,
  });

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { isCartOpen, toggleCart } = useUIStore();

  const toggleAccordion = (key: string) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  useEffect(() => {
    setMounted(true);
    recordRecentlyViewed(product.id);
  }, [product.id]);

  useEffect(() => {
    const firstAvailableSize = product.sizes.find((size) => size.inStock)?.name ?? product.sizes[0]?.name ?? null;
    setSelectedSize(firstAvailableSize);
  }, [product.sizes]);

  const inWishlist = mounted ? isInWishlist(product.id) : false;

  const hasSizes = product.sizes && product.sizes.length > 0;
  const availableStock = product.stockCount ?? product.stock ?? (product.inStock ? 1 : 0);
  const isAvailable = availableStock > 0;

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  const handleAddToCart = () => {
    if (!isAvailable) return;
    if (hasSizes && !selectedSize) {
      setSizeWarning(true);
      return;
    }
    setSizeWarning(false);

    addItem({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: product.colors?.[0]?.name || undefined,
    });

    setAddedToCart(true);

    if (!isCartOpen) {
      toggleCart();
    }

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const careInstructions =
    product.careInstructions && product.careInstructions.length > 0
      ? product.careInstructions
      : ["Hand wash cold", "Do not bleach", "Iron on low heat", "Dry clean recommended"];

  const descriptionSections = product.descriptionSections;
  const hasSections = descriptionSections && descriptionSections.sections && descriptionSections.sections.length > 0;
  const displaySizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : [
          { id: "s", name: "S", label: "S", inStock: true },
          { id: "m", name: "M", label: "M", inStock: true },
          { id: "l", name: "L", label: "L", inStock: true },
          { id: "xl", name: "XL", label: "XL", inStock: true },
        ];

  return (
    <div className="w-full max-w-[720px] min-w-0">
      {/* Size Chart Modal */}
      {sizeChartOpen && <SizeChartModal onClose={() => setSizeChartOpen(false)} />}

      {/* Title + In Stock Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-[1.25rem] sm:text-[1.55rem] font-normal leading-snug tracking-[-0.01em] text-[#1A1A1A] break-words">
            {product.name}
          </h1>
        </div>

        <div
          className={cn(
            "shrink-0 rounded-[8px] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[0.75rem] sm:text-[0.82rem] font-medium",
            isAvailable ? "bg-[#F2F2F2] text-[#1A1A1A]" : "bg-red-50 text-red-600"
          )}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* SKU / Variant Code */}
      <p className="mt-1 text-[0.78rem] sm:text-[0.82rem] font-normal text-[#666666] tracking-[0.02em] break-all">
        {(product as unknown as { sku?: string }).sku ||
          `SF-PF26-${product.slug?.toUpperCase().slice(0, 6) || "05"}${
            product.colors?.[0]?.name ? `-${product.colors[0].name}` : ""
          }${selectedSize ? `-${selectedSize}` : ""}`}
      </p>

      <div className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-5">
        {/* Price Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[1.05rem] sm:text-[1.15rem] font-normal text-[#1A1A1A]">
            Price
          </span>
          <span className="text-[1.35rem] sm:text-[1.5rem] font-bold text-[#1A1A1A]">
            Rs.{product.price.toLocaleString()}
          </span>
        </div>

        {/* Shipping Time Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.7rem] sm:text-[0.75rem] font-normal uppercase tracking-[0.06em] text-[#666666]">
            SHIPPING TIME
          </span>
          <span className="text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#1A1A1A]">
            3-5 BUSINESS DAYS
          </span>
        </div>

        {/* Size Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">
            SIZE
          </span>
          <button
            type="button"
            onClick={() => setSizeChartOpen(true)}
            className="inline-flex items-center gap-1 text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-[#1A1A1A] hover:opacity-75 transition-opacity"
          >
            <Ruler className="h-3.5 w-3.5 shrink-0" />
            <span>SIZE CHART</span>
          </button>
        </div>

        {/* Size Buttons */}
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
          {displaySizes.map((size, index) => (
            <button
              key={size.id || `${size.name}-${index}`}
              type="button"
              onClick={() => {
                if (size.inStock) {
                  setSelectedSize(size.name);
                  setSizeWarning(false);
                }
              }}
              disabled={!size.inStock}
              className={cn(
                "flex h-[42px] sm:h-[46px] items-center justify-center rounded-[8px] border text-[0.85rem] sm:text-[0.9rem] font-medium tracking-[0.02em] transition-all duration-150 sm:w-[72px] px-1",
                selectedSize === size.name
                  ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm"
                  : size.inStock
                    ? "border-[#D1D5DB] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]"
                    : "cursor-not-allowed border-[#E5E5E5] bg-[#F9F9F9] text-[#1A1A1A]/30 line-through"
              )}
            >
              {size.label || size.name}
            </button>
          ))}
        </div>

        {/* Quantity Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">
            QUANTITY
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[4px] bg-[#E8E8E8] text-[#777777] transition hover:bg-[#dedede] active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5 stroke-[2]" />
            </button>

            <span className="w-6 text-center text-[0.9rem] sm:text-[0.95rem] font-medium text-[#1A1A1A] select-none">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[4px] bg-[#1A1A1A] text-white transition hover:bg-[#333333] active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {sizeWarning && (
          <p className="-mt-1 text-xs font-medium text-red-500 animate-pulse">
            Please select a size before adding to cart
          </p>
        )}

        {/* Action Buttons: Wishlist Square + Wide Add to Cart */}
        <div className="flex gap-2.5 sm:gap-3 pt-2">
          {/* Wishlist Square Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={cn(
              "flex h-[50px] sm:h-[54px] w-[50px] sm:w-[58px] shrink-0 items-center justify-center rounded-[10px] border border-[#1A1A1A] bg-white transition-all duration-200 active:scale-95 cursor-pointer",
              inWishlist
                ? "border-[#C9A27E] bg-[#C9A27E]/10 text-[#B8906A]"
                : "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F8F5F2]"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              strokeWidth={1.4}
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                inWishlist && "fill-[#C9A27E] text-[#C9A27E] scale-110"
              )}
            />
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={cn(
              "flex flex-1 min-w-0 h-[50px] sm:h-[54px] items-center justify-center gap-2 sm:gap-2.5 rounded-[10px] bg-[#141414] text-white text-[0.78rem] sm:text-[0.85rem] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.14em] transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm hover:bg-[#252525] disabled:cursor-not-allowed disabled:bg-[#CCCCCC] disabled:text-white/60 px-3",
              addedToCart && "bg-emerald-700 hover:bg-emerald-700"
            )}
            aria-label="Add to cart"
          >
            {addedToCart ? (
              <>
                <Check className="h-5 w-5 shrink-0 text-white animate-in zoom-in-75 duration-200" />
                <span className="truncate">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag strokeWidth={1.5} className="h-5 w-5 shrink-0" />
                <span className="truncate">{isAvailable ? "ADD TO CART" : "OUT OF STOCK"}</span>
              </>
            )}
          </button>
        </div>

        {/* Accordions: Description & Product Care */}
        <div className="pt-2 border-t border-[#EAEAEA]">
          {/* Description */}
          <div className="border-b border-[#EAEAEA]">
            <button
              type="button"
              onClick={() => toggleAccordion("description")}
              className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-[#555]"
            >
              <span className="text-[0.95rem] font-medium text-[#1A1A1A]">Description</span>
              <span className="text-xl font-light text-[#1A1A1A] leading-none">
                {openAccordion === "description" ? "−" : "+"}
              </span>
            </button>
            {openAccordion === "description" && (
              <div className="pb-5">
                {hasSections ? (
                  <div className="text-[0.875rem] leading-relaxed text-[#1A1A1A]">
                    {descriptionSections!.color && (
                      <p className="mb-2 text-[#1A1A1A]/70">{descriptionSections!.color}</p>
                    )}
                    {descriptionSections!.sections.map((section, i) => (
                      <div key={i} className="mb-2">
                        <p className="font-bold text-[#1A1A1A]">{section.title}</p>
                        {section.items.map((item, j) => (
                          <p key={j} className="text-[#1A1A1A]/80">{item}</p>
                        ))}
                      </div>
                    ))}
                    {descriptionSections!.note && (
                      <p className="mt-2 text-[#1A1A1A]/80">{descriptionSections!.note}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-[0.875rem] leading-relaxed text-[#1A1A1A]/70">
                    {product.description ||
                      "Crafted with premium quality fabric, this piece is designed for both comfort and elegance. Perfect for all occasions, it features intricate embroidery and a flattering silhouette."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Product Care */}
          <div className="border-b border-[#E5E5E5]">
            <button
              type="button"
              onClick={() => toggleAccordion("care")}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-[0.95rem] font-semibold text-[#1A1A1A]">Product Care</span>
              <span className="text-[1.4rem] font-light text-[#1A1A1A] leading-none">
                {openAccordion === "care" ? "−" : "+"}
              </span>
            </button>
            {openAccordion === "care" && (
              <div className="pb-5 space-y-4">
                {/* Fabric note */}
                {product.fabric && (
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[#1A1A1A] mb-1">Fabric</p>
                    <p className="text-[0.875rem] text-[#1A1A1A]/70">{product.fabric}</p>
                  </div>
                )}
                {/* Care instruction cards */}
                {careInstructions.length > 0 && (
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[#1A1A1A] mb-3">Care</p>
                    <div className="space-y-2">
                      {careInstructions.map((instruction, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg border border-[#E8E8E8] p-3"
                        >
                          <CareIcon text={instruction} />
                          <span className="text-[0.875rem] text-[#1A1A1A]/80">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}