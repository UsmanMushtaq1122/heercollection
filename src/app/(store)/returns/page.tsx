import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Truck,
  Clock,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Mail,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialLinkAction from "@/components/common/SocialLinkAction";

export const metadata: Metadata = {
  title: `Returns & Exchanges | ${SITE_NAME}`,
  description:
    "Heer Collection's seamless 7-day return and exchange policy. Learn how to return or exchange your pret and couture orders within Pakistan and internationally.",
};

const STEPS = [
  {
    step: "01",
    title: "Initiate Your Request",
    description:
      "Contact our Customer Care via WhatsApp or email within 7 calendar days of receiving your parcel. Share your Order ID and photos of the garment with tags intact.",
  },
  {
    step: "02",
    title: "Verification & Approval",
    description:
      "Our quality team reviews your request within 24 business hours and sends pickup confirmation along with return authorization.",
  },
  {
    step: "03",
    title: "Doorstep Courier Pickup",
    description:
      "Repack the piece safely in its original Heer garment bag and box. Our courier partner will collect the package from your doorstep across Pakistan.",
  },
  {
    step: "04",
    title: "Exchange or Refund",
    description:
      "Once inspected at our atelier, your replacement size is immediately dispatched, or your store credit/bank refund is issued within 3 to 5 business days.",
  },
];

const ELIGIBLE_ITEMS = [
  "Unworn, unwashed, and unaltered garments in pristine condition",
  "All original brand tags, barcodes, and security tags attached",
  "Original Heer luxury packaging, hanger, and dust cover included",
  "Reported within 7 calendar days from the date of confirmed delivery",
  "Standard ready-to-wear (Pret) sizes (XS, S, M, L, XL)",
  "Items with manufacturing flaws or incorrect shipments (100% free swap)",
];

const NON_ELIGIBLE_ITEMS = [
  "Custom-stitched or made-to-measure bridal and formal couture",
  "Garments altered, hemmed, or modified by the customer",
  "Items purchased during Flash Sales, Sample Sales, or marked Final Sale",
  "Pieces showing traces of perfume, deodorant, makeup, or wear",
  "Requests received beyond the 7-day delivery threshold",
  "Unstitched fabrics that have been cut or tailored",
];

const FAQS = [
  {
    q: "How long do I have to request a return or exchange?",
    a: "You have 7 calendar days from the moment your parcel is delivered to notify us. We recommend trying on your pieces immediately upon arrival without removing the security tags.",
  },
  {
    q: "Are exchanges free of charge?",
    a: "Yes! First-time size exchanges within Pakistan are completely free. If an item arrived damaged or incorrect, Heer Collection bears all reverse and forward shipping costs.",
  },
  {
    q: "How will I receive my refund?",
    a: "You may opt for an instant Heer Collection Store Credit (valid for 12 months) or a bank transfer / reversal to your original payment method, processed within 3–5 working days after atelier inspection.",
  },
  {
    q: "What about international returns from outside Pakistan?",
    a: "International customers can return ready-to-wear items within 10 days of delivery. Overseas shipping costs and customs duties are the responsibility of the customer unless the piece is defective.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]/60 pb-20">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Returns and Exchange" },
          ]}
        />
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-[#E8DDD4] bg-white py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            Customer Care & Guarantees
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl">
            Returns & Exchange Policy
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C9A27E]" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/70 sm:text-base">
            Every Heer Collection creation is handcrafted with meticulous artistry.
            If your selection does not meet your expectations or sizing needs, we
            offer a transparent, hassle-free 7-day return and exchange policy.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <SocialLinkAction platform="WhatsApp">
              <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                <MessageSquare className="mr-2 h-4 w-4 text-[#C9A27E]" />
                WhatsApp Care Team
              </Button>
            </SocialLinkAction>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#E8DDD4] bg-white text-xs font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#F8F5F2]"
              >
                <Mail className="mr-2 h-4 w-4 text-[#C9A27E]" />
                Email Support
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Highlights Bar */}
      <section className="border-b border-[#E8DDD4] bg-[#F8F5F2]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-sm border border-[#E8DDD4] bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A27E]/15 text-[#C9A27E]">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1A1A1A]">7-Day Window</h2>
                <p className="text-xs text-[#1A1A1A]/60">Initiate within 7 days of delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-sm border border-[#E8DDD4] bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A27E]/15 text-[#C9A27E]">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1A1A1A]">Free Size Swap</h2>
                <p className="text-xs text-[#1A1A1A]/60">First exchange is completely free</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-sm border border-[#E8DDD4] bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A27E]/15 text-[#C9A27E]">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1A1A1A]">Doorstep Pickup</h2>
                <p className="text-xs text-[#1A1A1A]/60">Courier reverse pickup in Pakistan</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-sm border border-[#E8DDD4] bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A27E]/15 text-[#C9A27E]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1A1A1A]">Prompt Refunds</h2>
                <p className="text-xs text-[#1A1A1A]/60">Store credit or bank transfer in 3-5 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {/* Step-by-Step Flow */}
        <section aria-labelledby="steps-heading">
          <div className="text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Simple & Transparent
            </span>
            <h2 id="steps-heading" className="mt-2 font-serif text-2xl font-light text-[#1A1A1A] sm:text-3xl">
              How the Return & Exchange Process Works
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-[#C9A27E]" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-sm border border-[#E8DDD4] bg-white p-6 transition-all hover:border-[#C9A27E]/50 hover:shadow-md"
              >
                <div>
                  <span className="font-serif text-3xl font-light text-[#C9A27E]">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-base font-medium text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/65">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility Criteria Side by Side */}
        <section aria-labelledby="eligibility-heading">
          <div className="text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Policy Guidelines
            </span>
            <h2 id="eligibility-heading" className="mt-2 font-serif text-2xl font-light text-[#1A1A1A] sm:text-3xl">
              Eligibility & Exceptions
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-[#C9A27E]" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Eligible */}
            <div className="rounded-sm border border-emerald-200 bg-white p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">
                  Eligible for Return / Exchange
                </h3>
              </div>
              <p className="mt-3 text-xs text-[#1A1A1A]/60">
                Items meeting all the following conditions qualify for full return or swap:
              </p>
              <ul className="mt-6 space-y-3.5">
                {ELIGIBLE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#1A1A1A]/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Eligible */}
            <div className="rounded-sm border border-red-200 bg-white p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <XCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">
                  Non-Returnable Items
                </h3>
              </div>
              <p className="mt-3 text-xs text-[#1A1A1A]/60">
                Due to sanitary requirements and artisanal customization, these items are final sale:
              </p>
              <ul className="mt-6 space-y-3.5">
                {NON_ELIGIBLE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#1A1A1A]/80">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* International Returns Callout */}
        <section className="rounded-sm border border-[#C9A27E]/30 bg-[#F5EDE4]/70 p-8 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B8906A]">
                Global Shoppers
              </span>
              <h3 className="mt-1 font-serif text-2xl font-light text-[#1A1A1A]">
                International Returns & Exchanges
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/70">
                We proudly ship our handcrafted collections to the UK, USA, Canada, UAE,
                and over 40 countries worldwide. For overseas orders, customers can exchange
                pret garments within 10 days of delivery. Please reach out to our dedicated
                international concierge for personalized courier dispatch instructions.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/contact">
                <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                  Contact Concierge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section aria-labelledby="faq-heading">
          <div className="text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Got Questions?
            </span>
            <h2 id="faq-heading" className="mt-2 font-serif text-2xl font-light text-[#1A1A1A] sm:text-3xl">
              Returns & Exchanges FAQs
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-[#C9A27E]" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-sm border border-[#E8DDD4] bg-white p-6 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A27E]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#1A1A1A]">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Need Assistance Bottom Box */}
        <section className="rounded-sm border border-[#E8DDD4] bg-white p-8 text-center sm:p-12">
          <Package className="mx-auto h-10 w-10 text-[#C9A27E]" />
          <h3 className="mt-4 font-serif text-2xl font-light text-[#1A1A1A]">
            Ready to Start an Exchange or Return?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#1A1A1A]/60">
            Have your Order Number ready (found on your order confirmation email or SMS)
            and our team will guide you through the process right away.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/track-order">
              <Button variant="outline" className="border-[#E8DDD4] text-xs font-medium uppercase tracking-widest">
                Track Existing Order
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-[#C9A27E] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#B8906A]">
                Submit Return Request
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}