"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight, ShoppingBag } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderNumber] = useState(
    () => searchParams.get("order") || "HC-284913"
  );

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A27E]/10">
          <CheckCircle2 className="h-10 w-10 text-[#C9A27E]" />
        </div>

        <h1 className="mt-8 font-serif text-3xl font-light tracking-wide text-[#1A1A1A] md:text-4xl">
          Thank You for Your Order
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#1A1A1A]/70">
          Your order has been received and is now being prepared with the utmost
          care. A confirmation email with your order details has been sent to your
          registered email address.
        </p>

        {/* Order Number */}
        <div className="mx-auto mt-10 inline-flex flex-col items-center gap-2 rounded-sm luxury-border px-8 py-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50">
            Order Number
          </span>
          <span className="font-serif text-xl tracking-widest text-[#1A1A1A]">
            {orderNumber}
          </span>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-12 max-w-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A]">Confirmed</span>
              <span className="text-[11px] text-[#1A1A1A]/50">Just now</span>
            </div>
            <div className="h-px flex-1 mx-2 bg-[#E8DDD4]" />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDD4] bg-white text-[#1A1A1A]/40">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A]/70">Processing</span>
              <span className="text-[11px] text-[#1A1A1A]/50">1-2 days</span>
            </div>
            <div className="h-px flex-1 mx-2 bg-[#E8DDD4]" />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDD4] bg-white text-[#1A1A1A]/40">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A]/70">Shipped</span>
              <span className="text-[11px] text-[#1A1A1A]/50">3-5 days</span>
            </div>
          </div>
        </div>

        <Separator className="mx-auto mt-12 max-w-xl bg-[#E8DDD4]" />

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="gold"
            className="h-12 text-xs font-medium uppercase tracking-widest"
            onClick={() => router.push("/account")}
          >
            Track Your Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link href="/category/luxury-pret" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-12 w-full text-xs font-medium uppercase tracking-widest"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-xs text-[#1A1A1A]/50">
          Questions about your order?{" "}
          <Link href="/contact" className="text-[#C9A27E] hover:underline">
            Contact our concierge
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Skeleton className="mx-auto h-20 w-20 rounded-full" />
          <Skeleton className="mx-auto mt-8 h-8 w-64" />
          <Skeleton className="mx-auto mt-4 h-4 w-96 max-w-full" />
          <Skeleton className="mx-auto mt-4 h-4 w-72 max-w-full" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}