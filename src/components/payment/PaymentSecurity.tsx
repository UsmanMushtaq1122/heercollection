"use client";

import { ShieldCheck, Lock, Server, UserCheck, Fingerprint } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface SecurityFeature {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}

const FEATURES: SecurityFeature[] = [
  {
    icon: ShieldCheck,
    title: "SSL Secured Checkout",
    description:
      "Every page of your checkout is protected with 256-bit SSL encryption, keeping your data safe in transit.",
  },
  {
    icon: Lock,
    title: "Encrypted Transactions",
    description:
      "Payment details are tokenized and encrypted end-to-end, so your information is never exposed.",
  },
  {
    icon: Server,
    title: "Secure Payment Gateway",
    description:
      "We partner with certified gateways compliant with PCI-DSS standards for all online payments.",
  },
  {
    icon: UserCheck,
    title: "Customer Data Protection",
    description:
      "Your personal and financial information is stored securely and never shared with third parties.",
  },
];

export default function PaymentSecurity() {
  return (
    <section
      aria-labelledby="payment-security-heading"
      className="relative overflow-hidden bg-[#1A1A1A] py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 90% at 85% 10%, rgba(201,162,126,0.14) 0%, transparent 60%), radial-gradient(50% 80% at 10% 90%, rgba(201,162,126,0.10) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="payment-security-heading"
          eyebrow="Shop With Confidence"
          title="Your Payment Is Safe With Us"
          description="From encryption to fraud protection, we uphold the highest standards of payment security — inspired by the trust luxury houses place in every transaction."
          tone="dark"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <div className="group flex h-full flex-col rounded-sm border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:border-[#C9A27E]/60 hover:bg-white/[0.06]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A27E]/40 text-[#C9A27E] transition-colors duration-500 group-hover:bg-[#C9A27E] group-hover:text-[#1A1A1A]">
                  <feature.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-base font-medium tracking-wide text-[#F8F5F2]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F8F5F2]/55">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <Fingerprint className="h-5 w-5 text-[#C9A27E]" strokeWidth={1.5} />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F8F5F2]/45">
              PCI-DSS Compliant Gateways · 256-bit SSL · Verified and Trusted
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}