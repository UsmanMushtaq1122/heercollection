"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Search, PackageCheck, CheckCircle, Clock, MapPin, Loader2 } from "lucide-react";
import { orderService } from "@/services/order.service";
import type { Order, OrderStatus } from "@/types";

const STATUS_META: Record<OrderStatus, { label: string; description: string }> = {
  pending: { label: "Order Placed", description: "We've received your order and are waiting for payment confirmation." },
  confirmed: { label: "Payment Confirmed", description: "Your payment has been confirmed. We're preparing your order." },
  processing: { label: "Processing", description: "Your order is being carefully packed for dispatch." },
  shipped: { label: "Shipped", description: "Your order has left our warehouse and is on its way." },
  delivered: { label: "Delivered", description: "Your order has been delivered. Enjoy your piece!" },
  cancelled: { label: "Cancelled", description: "This order has been cancelled." },
  returned: { label: "Returned", description: "This order has been returned." },
};

const STATUS_ORDER: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const order = await orderService.trackOrder(orderNumber.trim());
      if (!order) {
        setError(
          "No order found with that number. Please check your details and try again."
        );
        return;
      }
      if (email && order.user?.email && email.trim().toLowerCase() !== order.user.email.toLowerCase()) {
        setError("No order found for that email address.");
        return;
      }
      setResult(order);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "No order found with that number. Please check your details and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const statusKey = (result?.status ? String(result.status).toLowerCase() : "") as OrderStatus;
  const statusMeta = statusKey && STATUS_META[statusKey] ? STATUS_META[statusKey] : (result ? STATUS_META.pending : null);
  const steps =
    result && statusMeta
      ? STATUS_ORDER.map((status) => ({
          label: STATUS_META[status].label,
          done: STATUS_ORDER.indexOf(status) <= STATUS_ORDER.indexOf(statusKey),
        }))
      : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A27E] mb-3">
          Real-Time Updates
        </p>
        <h1 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] md:text-4xl lg:text-5xl">
          Track Your Order
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-[#C9A27E]" />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#1A1A1A]/60">
          Enter your order number and email address to get live updates on your delivery.
        </p>
      </div>

      {/* Track Form */}
      <form
        onSubmit={handleTrack}
        className="mb-10 rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] p-8"
      >
        <div className="mb-5 space-y-4">
          <div>
            <label
              htmlFor="order-number"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]"
            >
              Order Number
            </label>
            <input
              id="order-number"
              type="text"
              placeholder="e.g. HC-284910"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="w-full rounded-sm border border-[#E8DDD4] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none focus:border-[#C9A27E] transition-colors"
            />
            <p className="mt-1 text-[11px] text-[#1A1A1A]/40">
              Found in your order confirmation email (e.g. HC-284910)
            </p>
          </div>
          <div>
            <label
              htmlFor="track-email"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]"
            >
              Email Address
            </label>
            <input
              id="track-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-[#E8DDD4] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none focus:border-[#C9A27E] transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-sm border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#1A1A1A] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#C9A27E] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Track Order
            </>
          )}
        </button>
      </form>

      {/* Result */}
      {result && statusMeta && (
        <div className="rounded-sm border border-[#E8DDD4] bg-white p-8">
          {/* Status Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8DDD4] pb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]/50 mb-1">
                Order {result.orderNumber}
              </p>
              <p className="text-lg font-semibold text-[#1A1A1A]">
                {statusMeta.label}
              </p>
              <p className="text-sm text-[#1A1A1A]/50">
                Placed on {new Date(result.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E8DF]">
              {["delivered", "returned"].includes(result.status) ? (
                <PackageCheck className="h-6 w-6 text-[#C9A27E]" />
              ) : (
                <Clock className="h-6 w-6 text-[#C9A27E]" />
              )}
            </div>
          </div>

          {/* Courier Info */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1">
                Status
              </p>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {statusMeta.description}
              </p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1">
                Tracking No.
              </p>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {result.trackingNumber ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Items */}
          {result.items.length > 0 && (
            <div className="mb-8 rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] p-5">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]">
                Items ({result.items.length})
              </p>
              <ul className="space-y-3">
                {result.items.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-[#1A1A1A]/70">
                      {item.product?.name ?? "Item"}
                      {item.size ? ` · ${item.size}` : ""}
                      {item.color ? ` · ${item.color}` : ""}
                      <span className="text-[#1A1A1A]/40"> × {item.quantity}</span>
                    </span>
                    <span className="font-medium text-[#1A1A1A]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {result.status !== "cancelled" && result.status !== "returned" && steps.length > 0 ? (
            <>
              <h3 className="mb-5 text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]">
                Delivery Timeline
              </h3>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                        step.done
                          ? "border-[#C9A27E] bg-[#C9A27E]"
                          : "border-[#E8DDD4] bg-white"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-[#1A1A1A]/30" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${step.done ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"}`}>
                        {step.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className="flex items-center gap-3 rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] px-4 py-3 text-sm text-[#1A1A1A]/60">
              <MapPin className="h-4 w-4 text-[#C9A27E]" />
              This order is currently {result.status}.
            </div>
          )}
        </div>
      )}

      {/* Help */}
      <div className="mt-10 rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] px-8 py-7 text-center">
        <p className="text-sm text-[#1A1A1A]/60">
          Can&apos;t find your order?{" "}
          <Link href="/contact" className="font-medium text-[#C9A27E] hover:underline">
            Contact our support team
          </Link>{" "}
          or check your{" "}
          <Link href="/account" className="font-medium text-[#C9A27E] hover:underline">
            account orders
          </Link>
          .
        </p>
      </div>
    </div>
  );
}