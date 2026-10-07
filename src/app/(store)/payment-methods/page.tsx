import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import PaymentMethodsView from "@/components/payment/PaymentMethodsView";

export const metadata: Metadata = {
  title: `Payment Methods | ${SITE_NAME}`,
  description:
    "Discover the secure payment options at Heer Collection — Cash on Delivery, Visa & Mastercard, Easypaisa, JazzCash, and bank transfer for seamless shopping across Pakistan.",
  keywords: [
    "payment methods",
    "cash on delivery",
    "easypaisa payment",
    "jazzcash payment",
    "online payment pakistan",
    "secure checkout",
    "Heer Collection",
  ],
  openGraph: {
    title: `Payment Methods | ${SITE_NAME}`,
    description:
      "Secure and convenient payment options for your Heer Collection order — COD, cards, Easypaisa, JazzCash, and bank transfer.",
    type: "website",
  },
};

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E8DDD4] bg-[#F8F5F2]/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Payment Methods" },
            ]}
          />
        </div>
      </div>

      <PaymentMethodsView />
    </div>
  );
}