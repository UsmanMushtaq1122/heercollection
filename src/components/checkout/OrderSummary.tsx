"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Tag, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import type { CartItem } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { couponService } from "@/services/cms.service";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  additionalShipping?: number;
  codFee?: number;
  shippingLoading?: boolean;
  shippingUnavailable?: boolean;
  tax: number;
  total: number;
  deliveryMethod?: "standard" | "express" | "store_pickup";
  appliedCoupon?: {
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null;
  onApplyCoupon?: (coupon: {
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null) => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  additionalShipping = 0,
  codFee = 0,
  shippingLoading = false,
  shippingUnavailable = false,
  tax,
  total,
  deliveryMethod = "standard",
  appliedCoupon,
  onApplyCoupon,
}: OrderSummaryProps) {
  const [couponInput, setCouponInput] = useState("");
  const [internalCoupon, setInternalCoupon] = useState<{
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  const activeCoupon = appliedCoupon !== undefined ? appliedCoupon : internalCoupon;

  const applyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setIsApplying(true);
    setCouponError("");
    try {
      const result = await couponService.validate(code, subtotal);
      if (result.valid && result.discount !== undefined) {
        const couponData = {
          code: result.code || code,
          discount: result.discount,
          discountType: result.discountType || "percentage",
        };
        if (onApplyCoupon) onApplyCoupon(couponData);
        else setInternalCoupon(couponData);
        setCouponError("");
      } else {
        if (onApplyCoupon) onApplyCoupon(null);
        else setInternalCoupon(null);
        setCouponError(result.message || "Invalid coupon code.");
      }
    } catch {
      if (onApplyCoupon) onApplyCoupon(null);
      else setInternalCoupon(null);
      setCouponError("Coupon validation is currently unavailable.");
    } finally {
      setIsApplying(false);
    }
  };

  const removeCoupon = () => {
    if (onApplyCoupon) onApplyCoupon(null);
    else setInternalCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const discount =
    activeCoupon?.discountType === "fixed"
      ? Math.min(activeCoupon.discount, subtotal)
      : activeCoupon
      ? Math.round(subtotal * activeCoupon.discount)
      : 0;

  const grandTotal = Math.max(0, total - discount);

  const getProductImage = (item: CartItem) => {
    if (item.product.thumbnail) return item.product.thumbnail;
    const firstImg = item.product.images?.[0];
    if (typeof firstImg === "string") return firstImg;
    if (firstImg?.url) return firstImg.url;
    return null;
  };

  return (
    /* Outer wrapper: block-level, constrained to parent width */
    <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>

      {/* ── Mobile Accordion Toggle ── */}
      <div
        className="lg:hidden mb-3 rounded-xl border border-gray-200 bg-gray-50/80"
        style={{ width: "100%", boxSizing: "border-box", overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: "8px", boxSizing: "border-box" }}>
          {/* Toggle button — takes remaining space */}
          <button
            type="button"
            onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
            style={{ display: "flex", alignItems: "center", gap: "8px", color: "#005BD3", fontSize: "14px", fontWeight: 500, minWidth: 0, flex: "1 1 0", overflow: "hidden" }}
          >
            <ShoppingBag style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {isMobileSummaryOpen ? "Hide order summary" : "Show order summary"}
            </span>
            {isMobileSummaryOpen
              ? <ChevronUp style={{ width: 16, height: 16, flexShrink: 0 }} />
              : <ChevronDown style={{ width: 16, height: 16, flexShrink: 0 }} />
            }
          </button>
          {/* Total price — never shrinks */}
          <span style={{ fontWeight: 700, color: "#111827", fontSize: "14px", flexShrink: 0, whiteSpace: "nowrap" }}>
            Rs. {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div
        className={`rounded-2xl border border-gray-200 bg-white ${isMobileSummaryOpen ? "block" : "hidden lg:block"}`}
        style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", overflow: "hidden" }}
      >

        {/* ── Product List ── */}
        <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6", boxSizing: "border-box" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map((item) => {
              const imgUrl = getProductImage(item);
              return (
                <li
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", alignItems: "center", gap: "12px", width: "100%", boxSizing: "border-box", minWidth: 0 }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0, borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#d1d5db" }}>
                        <ShoppingBag style={{ width: 20, height: 20 }} />
                      </div>
                    )}
                    <span style={{ position: "absolute", top: -6, right: -6, display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", backgroundColor: "#4b5563", color: "white", fontSize: 10, fontWeight: 700, boxShadow: "0 0 0 2px white" }}>
                      {item.quantity}
                    </span>
                  </div>

                  {/* Title & Options — takes remaining space, overflows safely */}
                  <div style={{ minWidth: 0, overflow: "hidden" }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
                      {item.product.name}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: 2, fontSize: 12, color: "#6b7280" }}>
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedSize && item.selectedColor && <span>·</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                  </div>

                  {/* Price — never shrinks, always visible */}
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", textAlign: "right", flexShrink: 0 }}>
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Coupon Code ── */}
        <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6", backgroundColor: "rgba(249,250,251,0.4)", boxSizing: "border-box" }}>
          <label
            htmlFor="coupon-input"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b5563", marginBottom: 8 }}
          >
            <Tag style={{ width: 14, height: 14, color: "#005BD3" }} />
            Discount Code
          </label>

          {/* Coupon row — explicit widths to prevent overflow */}
          <div style={{ display: "flex", gap: 8, width: "100%", boxSizing: "border-box" }}>
            <input
              id="coupon-input"
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
              placeholder="Discount code"
              style={{
                flex: "1 1 0",
                minWidth: 0,
                padding: "10px 14px",
                fontSize: 13,
                border: "1px solid #d1d5db",
                borderRadius: 12,
                backgroundColor: "white",
                outline: "none",
                boxSizing: "border-box",
                textTransform: "uppercase",
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={applyCoupon}
              disabled={isApplying || !couponInput.trim()}
              style={{ flexShrink: 0, borderRadius: 12, padding: "0 16px", fontSize: 13, fontWeight: 600, border: "1px solid #d1d5db", whiteSpace: "nowrap" }}
            >
              {isApplying ? <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> : "Apply"}
            </Button>
          </div>

          {activeCoupon && (
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, backgroundColor: "#ecfdf5", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#065f46", boxSizing: "border-box" }}>
              <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                🏷️ {activeCoupon.code} applied (−{activeCoupon.discountType === "fixed" ? `Rs. ${activeCoupon.discount.toLocaleString()}` : `${Math.round(activeCoupon.discount * 100)}%`})
              </span>
              <button type="button" onClick={removeCoupon} style={{ flexShrink: 0, color: "#9ca3af", fontWeight: 700, background: "none", border: "none", cursor: "pointer", marginLeft: 4 }}>✕</button>
            </div>
          )}

          {couponError && (
            <p style={{ marginTop: 8, fontSize: 12, color: "#dc2626" }}>{couponError}</p>
          )}
        </div>

        {/* ── Price Breakdown ── */}
        <div style={{ padding: "16px", boxSizing: "border-box" }}>

          {/* Each row: grid with 2 columns — label left, value right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>

            {/* Subtotal */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#4b5563" }}>Subtotal</span>
              <span style={{ fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>Rs. {subtotal.toLocaleString()}</span>
            </div>

            {/* Shipping */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#4b5563" }}>Shipping</span>
              <span style={{ whiteSpace: "nowrap" }}>
                {shippingLoading ? (
                  <span className="text-xs text-gray-500">Calculating…</span>
                ) : shippingUnavailable ? (
                  <span className="text-xs text-red-600">Unavailable</span>
                ) : deliveryMethod === "store_pickup" ? (
                  <span style={{ fontWeight: 600, color: "#059669" }}>FREE (Pickup)</span>
                ) : shipping === 0 ? (
                  <span style={{ fontWeight: 600, color: "#059669" }}>FREE</span>
                ) : (
                  <span style={{ fontWeight: 500, color: "#111827" }}>Rs. {shipping.toLocaleString()}</span>
                )}
              </span>
            </div>

            {additionalShipping > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                <span style={{ color: "#4b5563" }}>Additional Shipping Charges</span>
                <span style={{ fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>
                  Rs. {additionalShipping.toLocaleString()}
                </span>
              </div>
            )}

            {codFee > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                <span style={{ color: "#4b5563" }}>Cash on Delivery Fee</span>
                <span style={{ fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>
                  Rs. {codFee.toLocaleString()}
                </span>
              </div>
            )}

            {/* Discount */}
            {activeCoupon && discount > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", color: "#059669" }}>
                <span>Discount</span>
                <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>− Rs. {discount.toLocaleString()}</span>
              </div>
            )}

            {/* Tax */}
            {tax > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                <span style={{ color: "#4b5563" }}>Estimated Tax</span>
                <span style={{ fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>Rs. {tax.toLocaleString()}</span>
              </div>
            )}
          </div>

          <Separator className="my-4 bg-gray-200" />

          {/* Grand Total */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Total</span>
              <span style={{ marginLeft: 6, fontSize: 12, color: "#9ca3af" }}>PKR</span>
            </div>
            <div style={{ textAlign: "right" }}>
              {discount > 0 && (
                <span style={{ marginRight: 6, fontSize: 12, color: "#9ca3af", textDecoration: "line-through", whiteSpace: "nowrap" }}>
                  Rs. {total.toLocaleString()}
                </span>
              )}
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#111827", whiteSpace: "nowrap" }}>
                {shippingLoading || shippingUnavailable
                  ? "—"
                  : `Rs. ${grandTotal.toLocaleString()}`}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}