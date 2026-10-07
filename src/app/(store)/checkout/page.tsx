"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useSiteSettings } from "@/hooks";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ShoppingBag } from "lucide-react";
import type { PaymentMethod } from "@/types";
import { useShippingQuote } from "@/hooks/useShippingQuote";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const { settings } = useSiteSettings();

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "store_pickup" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null>(null);

  const { codEnabled, codFee } = settings.shipping;
  const taxRate = settings?.tax?.rate || 0;

  const { quote, loading: shippingLoading, error: shippingError } = useShippingQuote(items, deliveryMethod);
  const checkoutCodFee = paymentMethod === "cod" && codEnabled ? codFee : 0;

  const tax = Math.round(totalPrice * taxRate);

  // Calculate discount if coupon applied
  const discount =
    appliedCoupon?.discountType === "fixed"
      ? Math.min(appliedCoupon.discount, totalPrice)
      : appliedCoupon
      ? Math.round(totalPrice * appliedCoupon.discount)
      : 0;

  const total = Math.max(0, totalPrice - discount + (quote?.shippingCost ?? 0) + checkoutCodFee + tax);

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Checkout" },
          ]}
          className="mb-6"
        />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some items to your cart before proceeding to checkout."
          actionLabel="Continue Shopping"
          actionHref="/"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 overflow-x-hidden">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        className="mb-6"
      />

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Checkout Form */}
        <div className="order-last lg:order-first lg:col-span-7 xl:col-span-7">
          <CheckoutForm
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            appliedCoupon={appliedCoupon}
            totalAmount={total}
            shippingQuoteReady={Boolean(quote) && !shippingLoading && !shippingError}
          />
        </div>

        {/* Right Column: Order Summary */}
        <div className="order-first lg:order-last lg:col-span-5 xl:col-span-5">
          <div className="sticky w-full" style={{ top: "calc(var(--navbar-h) + 16px)" }}>
            <OrderSummary
              items={items}
              subtotal={totalPrice}
              shipping={quote?.baseCharge ?? 0}
              additionalShipping={quote?.additionalCharge ?? 0}
              codFee={checkoutCodFee}
              shippingLoading={shippingLoading}
              shippingUnavailable={Boolean(shippingError)}
              tax={tax}
              total={totalPrice + (quote?.shippingCost ?? 0) + checkoutCodFee + tax}
              deliveryMethod={deliveryMethod}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={setAppliedCoupon}
            />
            {shippingError && (
              <p role="alert" className="mt-2 text-center text-xs text-red-600">
                {shippingError}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
