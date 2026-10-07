"use client";

import Link from "next/link";
import { Truck, PackageSearch } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSettings";

export default function ShippingBar() {
  const { settings } = useSiteSettings();
  const shipping = settings.shipping;

  const money = (amount: number) =>
    `Rs. ${amount.toLocaleString("en-PK", {
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;

  const advancedCharges: string[] = [];
  if (shipping.advancedShippingEnabled) {
    if (shipping.additionalShippingChargeEnabled && shipping.additionalShippingCharge > 0) {
      advancedCharges.push(`${money(shipping.additionalShippingCharge)} additional`);
    }
    if (shipping.expressAdditionalChargeEnabled && shipping.expressAdditionalCharge > 0) {
      advancedCharges.push(`${money(shipping.expressAdditionalCharge)} express extra`);
    }
    if (shipping.perItemChargeEnabled && shipping.perItemCharge > 0) {
      advancedCharges.push(`${money(shipping.perItemCharge)}/item`);
    }
    if (shipping.perKgChargeEnabled && shipping.perKgCharge > 0) {
      advancedCharges.push(`${money(shipping.perKgCharge)}/kg`);
    }
  }

  return (
    <div className="bg-[#FDF6F0] border-t border-[#E8DDD4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
          {/* Shipping Charges */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#C9A27E]/60">
              <Truck className="h-6 w-6 text-[#C9A27E]" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                Shipping Charges
              </p>
              <div className="space-y-0.5 text-sm text-[#1A1A1A]/60">
                <p>
                  Standard {money(shipping.standardCost)} · Express {money(shipping.expressCost)}
                </p>
                {shipping.freeShippingThreshold > 0 ? (
                  <p>Free standard shipping over {money(shipping.freeShippingThreshold)}</p>
                ) : (
                  <p>Free standard shipping disabled</p>
                )}
                {advancedCharges.length > 0 && (
                  <p>
                    Advanced charges: {advancedCharges.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-[#E8DDD4]" />

          {/* Track Your Order */}
          <Link href="/track-order" className="flex items-center gap-4 group">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#C9A27E]/60 transition-colors group-hover:border-[#C9A27E]">
              <PackageSearch className="h-6 w-6 text-[#C9A27E]" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#C9A27E] transition-colors">
                Track Your Order
              </p>
              <p className="text-sm text-[#1A1A1A]/60">
                Check status of your order.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}