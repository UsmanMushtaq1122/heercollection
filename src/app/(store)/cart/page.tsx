"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useSiteSettings } from "@/hooks";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/checkout/OrderSummary";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { useShippingQuote } from "@/hooks/useShippingQuote";

export default function CartPage() {
  const { items, totalPrice } = useCartStore();
  const { settings } = useSiteSettings();
  const { quote, loading: shippingLoading, error: shippingError } = useShippingQuote(items, "standard");
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const freeShippingThreshold = quote?.freeShippingThreshold ?? settings.shipping.freeShippingThreshold;
  const taxRate = settings.tax.rate;

  const shippingCost = quote?.shippingCost ?? 0;
  const tax = Math.round(totalPrice * taxRate);
  const total = totalPrice + shippingCost + tax;

  const remainingForFreeShipping =
    freeShippingThreshold > 0 ? freeShippingThreshold - totalPrice : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shopping Bag" },
        ]}
        className="mb-6"
      />

      <h1 className="mb-2 text-3xl font-light tracking-wide text-[#1A1A1A]">
        Shopping Bag
      </h1>
      <div className="mb-8 h-px w-12 bg-[#C9A27E]" />

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your bag is empty"
          description="Looks like you haven't added anything to your bag yet. Explore our collections to find something you love."
          actionLabel="Start Shopping"
          actionHref="/"
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-[#E8DDD4]">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  item={item}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-[#C9A27E] transition-colors hover:text-[#C9A27E]/70"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <p className="text-sm text-[#1A1A1A]/60">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your bag
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "calc(var(--navbar-h) + 16px)" }}>
              <OrderSummary
                items={items}
                subtotal={totalPrice}
                shipping={quote?.baseCharge ?? 0}
                additionalShipping={quote?.additionalCharge ?? 0}
                shippingLoading={shippingLoading}
                shippingUnavailable={Boolean(shippingError)}
                tax={tax}
                total={total}
              />
              {shippingError && (
                <p role="alert" className="mt-2 text-center text-xs text-red-600">
                  {shippingError}
                </p>
              )}
              <Link href="/checkout" className="mt-4 block">
                <Button
                  variant="gold"
                  className="h-12 w-full text-xs font-medium uppercase tracking-widest"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              {remainingForFreeShipping > 0 && (
                <p className="mt-3 text-center text-xs text-[#1A1A1A]/50">
                  Add Rs. {remainingForFreeShipping.toLocaleString()} more for{" "}
                  <span className="font-medium text-[#C9A27E]">free shipping</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
