import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import {
  Scale,
  FileCheck,
  ShoppingBag,
  Scissors,
  Truck,
  RotateCcw,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "Read the terms, guidelines, and service agreements governing purchases, bespoke tailoring, and site usage at Heer Collection.",
};

const ARTICLES = [
  {
    number: "01",
    title: "Acceptance of Terms & Account Responsibility",
    icon: FileCheck,
    content: (
      <>
        <p className="leading-relaxed">
          Welcome to Heer Collection (heercollection.com). By browsing our boutique,
          registering an account, or placing an order, you agree to comply with and be bound
          by these Terms and Conditions, together with our Privacy Policy and Returns &
          Exchange Policy.
        </p>
        <p className="mt-3 leading-relaxed">
          If you create a user account, you are responsible for maintaining the
          confidentiality of your login credentials and restricting unauthorized access to
          your device. You accept responsibility for all activities that occur under your
          account.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Handcrafted Artistry, Fabrics & Color Nuances",
    icon: Sparkles,
    content: (
      <>
        <p className="leading-relaxed">
          Heer Collection celebrates ancestral South Asian artisanal heritage. Many of our
          garments incorporate hand-dyed silks, delicate organza, zari threadwork, and hand-embroidered
          motifs (Adda work, Zardozi, and Tilla).
        </p>
        <div className="mt-4 rounded-sm border border-[#E8DDD4] bg-[#F8F5F2]/60 p-4 text-xs leading-relaxed text-[#1A1A1A]/70">
          <strong className="font-semibold text-[#1A1A1A]">Artisanal Variation:</strong>{" "}
          Minor nuances in weave texture, dye saturation, or embroidery placement are
          hallmarks of genuine handcraftsmanship rather than industrial defects. Furthermore,
          while we calibrate photoshoot imagery accurately, slight variations in color may
          occur depending on your display device and screen brightness settings.
        </div>
      </>
    ),
  },
  {
    number: "03",
    title: "Pricing, Currency & Payment Options",
    icon: ShoppingBag,
    content: (
      <>
        <p className="leading-relaxed">
          Prices on our website are shown in Pakistani Rupees (PKR) and may also be viewed in
          select foreign currencies (USD, GBP, AED, EUR, CAD) for your convenience. All prices
          are subject to change without prior notice.
        </p>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Payment Methods:</strong> We accept Visa,
              MasterCard, PayFast, Direct Bank Transfer, and Cash on Delivery (COD available
              for orders within Pakistan up to PKR 50,000).
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Taxes & Duties:</strong> Orders within Pakistan
              include applicable provincial sales taxes. For international orders, customs
              duties and local import levies are the sole responsibility of the recipient.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Orders, Custom Tailoring & Bridal Couture",
    icon: Scissors,
    content: (
      <>
        <p className="leading-relaxed">
          <strong>Order Confirmation:</strong> An automated confirmation email/SMS is sent
          upon order placement. An order is deemed accepted once verified and booked for
          dispatch by our client management team.
        </p>
        <p className="mt-3 leading-relaxed">
          <strong>Bespoke & Made-to-Measure:</strong> Garments ordered with custom sizing or
          bridal customizations require accurate body measurements provided by the client.
          Once the fabric has been cut or embroidery karchob frames mounted (typically 48 hours
          after placement), custom orders cannot be cancelled or modified.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Shipping, Couriers & Risk of Loss",
    icon: Truck,
    content: (
      <>
        <p className="leading-relaxed">
          We partner with leading couriers (TCS, Leopard Courier, DHL Express) to deliver your
          orders safely. Standard ready-to-wear dispatch within Pakistan is 3–5 business days.
          International delivery typically takes 7–10 business days after dispatch.
        </p>
        <p className="mt-3 leading-relaxed">
          Title and risk of loss pass to the customer upon delivery handover by the courier
          partner. In the improbable event that your parcel arrives tampered with or visibly
          compromised, please refuse delivery and notify our concierge immediately.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Returns, Exchanges & Cancellations",
    icon: RotateCcw,
    content: (
      <>
        <p className="leading-relaxed">
          Our return and exchange policy allows 7 calendar days from delivery for standard
          pret-a-porter pieces, provided all security tags, labels, and original packaging
          remain pristine and intact.
        </p>
        <p className="mt-3 leading-relaxed">
          For full eligibility terms, free size-swap procedures, and non-returnable categories,
          please consult our dedicated{" "}
          <Link href="/returns" className="font-medium text-[#C9A27E] underline hover:text-[#B8906A]">
            Returns and Exchange Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Intellectual Property & Brand Copyright",
    icon: Scale,
    content: (
      <>
        <p className="leading-relaxed">
          All content featured on heercollection.com—including garment designs, embroidery
          motifs, editorial lookbooks, campaign videos, graphics, logos, and copywriting—is the
          exclusive intellectual property of Heer Collection and protected by copyright and
          trademark laws.
        </p>
        <p className="mt-3 leading-relaxed">
          Any unauthorized duplication, commercial reproduction, or imitation of our designs
          or brand collateral will be subject to immediate legal action.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Governing Law & Jurisdiction",
    icon: AlertCircle,
    content: (
      <>
        <p className="leading-relaxed">
          These Terms and Conditions shall be governed by and construed in accordance with the
          laws of the Islamic Republic of Pakistan. Any dispute, claim, or controversy
          arising out of or relating to these terms shall be subject to the exclusive
          jurisdiction of the courts of Lahore, Pakistan.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]/60 pb-20">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms and Conditions" },
          ]}
        />
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-[#E8DDD4] bg-white py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            Service Agreement & Guidelines
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl">
            Terms and Conditions
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C9A27E]" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/70 sm:text-base">
            Please review these terms and conditions prior to finalizing your order. They
            establish the foundation of our commitment to transparent luxury service and
            client satisfaction.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#1A1A1A]/50">
            <span>Effective Date: September 2026</span>
            <span>•</span>
            <span>Version 2.4</span>
          </div>
        </div>
      </header>

      {/* Highlights Bar */}
      <section className="border-b border-[#E8DDD4] bg-[#F8F5F2]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-4 text-center">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#C9A27E]">
                Authenticity
              </span>
              <p className="mt-1 text-xs font-semibold text-[#1A1A1A]">100% Genuine Handcrafts</p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-4 text-center">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#C9A27E]">
                Pricing
              </span>
              <p className="mt-1 text-xs font-semibold text-[#1A1A1A]">Transparent Rates in PKR</p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-4 text-center">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#C9A27E]">
                Delivery
              </span>
              <p className="mt-1 text-xs font-semibold text-[#1A1A1A]">Insured Express Couriers</p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-4 text-center">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#C9A27E]">
                Support
              </span>
              <p className="mt-1 text-xs font-semibold text-[#1A1A1A]">Concierge 6 Days a Week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {ARTICLES.map((art) => {
            const Icon = art.icon;
            return (
              <article
                key={art.number}
                className="rounded-sm border border-[#E8DDD4] bg-white p-7 sm:p-9 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#E8DDD4] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DDD4] text-[#C9A27E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-serif text-lg font-light text-[#1A1A1A] sm:text-xl">
                      {art.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#C9A27E]">
                    ART. {art.number}
                  </span>
                </div>
                <div className="mt-5 text-sm text-[#1A1A1A]/75">
                  {art.content}
                </div>
              </article>
            );
          })}
        </div>

        {/* Support Section */}
        <section className="mt-16 rounded-sm border border-[#E8DDD4] bg-white p-8 text-center sm:p-12">
          <HelpCircle className="mx-auto h-10 w-10 text-[#C9A27E]" />
          <h3 className="mt-4 font-serif text-2xl font-light text-[#1A1A1A]">
            Need Clarification on Any Terms?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#1A1A1A]/60">
            Our customer relations specialists are on hand to assist with questions
            regarding custom orders, shipping logistics, or return policies.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                Contact Legal & Support
              </Button>
            </Link>
            <Link href="/returns">
              <Button variant="outline" className="border-[#E8DDD4] text-xs font-medium uppercase tracking-widest text-[#1A1A1A]">
                Returns & Exchanges
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
