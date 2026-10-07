"use client";

import {
  ShoppingBag,
  ClipboardList,
  CreditCard,
  CheckCheck,
  MailCheck,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface TimelineStep {
  icon: typeof ShoppingBag;
  step: string;
  title: string;
  description: string;
}

const STEPS: TimelineStep[] = [
  {
    icon: ShoppingBag,
    step: "01",
    title: "Add Products to Cart",
    description:
      "Browse our collections and add your selected pieces to the shopping bag.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Proceed to Checkout",
    description:
      "Review your bag and enter your delivery details at the secure checkout.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Select Payment Method",
    description:
      "Choose from COD, card, mobile wallet, or bank transfer at the payment step.",
  },
  {
    icon: CheckCheck,
    step: "04",
    title: "Confirm Order",
    description:
      "Review your summary and place the order with a single confirmation.",
  },
  {
    icon: MailCheck,
    step: "05",
    title: "Receive Confirmation",
    description:
      "Get instant order confirmation by email and SMS, with live tracking updates.",
  },
];

export default function PaymentTimeline() {
  return (
    <section
      aria-labelledby="payment-timeline-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="payment-timeline-heading"
        eyebrow="Effortless Checkout"
        title="Your Payment, Step by Step"
        description="A seamless, guided journey from your bag to your doorstep — in five simple steps."
      />

      <div className="relative">
        {/* Desktop connector line */}
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-[#C9A27E]/20 via-[#C9A27E]/60 to-[#C9A27E]/20 lg:block"
        />

        {/* Mobile connector line */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-7 top-8 w-px bg-gradient-to-b from-[#C9A27E]/30 via-[#C9A27E]/60 to-[#C9A27E]/30 lg:hidden"
        />

        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-5">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.1}>
              <li className="relative flex flex-row items-start gap-5 pl-0 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A27E] bg-[#F8F5F2] shadow-sm lg:bg-[#FBF8F4]">
                  <item.icon className="h-6 w-6 text-[#C9A27E]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col lg:mt-5 lg:items-center">
                  <span className="font-serif text-lg font-light tracking-[0.15em] text-[#C9A27E]">
                    {item.step}
                  </span>
                  <h3 className="mt-1.5 text-base font-medium tracking-wide text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-[#1A1A1A]/55 lg:max-w-[15rem]">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}