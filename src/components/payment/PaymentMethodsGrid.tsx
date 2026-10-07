"use client";

import {
  Banknote,
  CreditCard,
  Smartphone,
  Wallet,
  Landmark,
  Plus,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface PaymentMethod {
  icon: typeof Banknote;
  name: string;
  tagline: string;
  details: string;
  badge?: string;
  labels?: string[];
}

const METHODS: PaymentMethod[] = [
  {
    icon: Banknote,
    name: "Cash on Delivery",
    tagline: "Pay when your order arrives",
    details: "Available across Pakistan.",
    badge: "Most Popular",
  },
  {
    icon: CreditCard,
    name: "Debit & Credit Cards",
    tagline: "Secure online payments",
    details: "Processed through certified gateways.",
    labels: ["VISA", "Mastercard"],
  },
  {
    icon: Smartphone,
    name: "Easypaisa",
    tagline: "Instant mobile wallet payments",
    details: "Quick and secure checkout.",
  },
  {
    icon: Wallet,
    name: "JazzCash",
    tagline: "Convenient mobile wallet transactions",
    details: "Fast payment confirmation.",
  },
  {
    icon: Landmark,
    name: "Bank Transfer",
    tagline: "Direct bank deposits",
    details: "Manual payment verification within 24 hours.",
  },
];

export default function PaymentMethodsGrid() {
  return (
    <section
      aria-labelledby="payment-methods-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="payment-methods-heading"
        eyebrow="Simple & Secure"
        title="Available Payment Methods"
        description="Choose the option that suits you best — every method is designed for a smooth and secure checkout experience."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {METHODS.map((method, index) => (
          <Reveal key={method.name} delay={index * 0.08}>
            <article className="group relative flex h-full flex-col rounded-sm border border-[#E8DDD4] bg-white p-7 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A27E]/60 hover:shadow-lg">
              {method.badge && (
                <span className="absolute right-5 top-5 rounded-full border border-[#C9A27E]/40 bg-[#C9A27E]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#B8906A]">
                  {method.badge}
                </span>
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F5EDE4] text-[#C9A27E] transition-colors duration-500 group-hover:bg-[#C9A27E] group-hover:text-white">
                <method.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              <h3 className="mt-6 font-serif text-xl font-light tracking-wide text-[#1A1A1A]">
                {method.name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A27E]">
                {method.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/60">
                {method.details}
              </p>

              {method.labels && (
                <div className="mt-5 flex items-center gap-2.5">
                  {method.labels.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center rounded-sm border border-[#E8DDD4] bg-[#F8F5F2] px-3 py-1 font-serif text-[0.7rem] font-medium italic tracking-[0.1em] text-[#1A1A1A]/80"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}

        <Reveal delay={METHODS.length * 0.08}>
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-sm border border-dashed border-[#C9A27E]/50 bg-[#FBF8F4] p-7 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A27E]/40 text-[#C9A27E]">
              <Plus className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-6 font-serif text-xl font-light tracking-wide text-[#1A1A1A]">
              More Methods Coming Soon
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#1A1A1A]/50">
              We are continuously expanding our payment options to serve you
              better.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}