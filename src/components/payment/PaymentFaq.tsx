"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Is Cash on Delivery available?",
    a: "Yes. Cash on Delivery is available across Pakistan on all orders. Simply select \"Cash on Delivery\" at checkout and pay the exact amount to our courier partner when your order arrives at your doorstep.",
  },
  {
    q: "Are online payments secure?",
    a: "Absolutely. All online payments are processed through PCI-DSS compliant, SSL-secured gateways using 256-bit encryption. Your card and wallet details are tokenized, meaning we never store or expose your financial information.",
  },
  {
    q: "Can I pay via Easypaisa?",
    a: "Yes. Easypaisa is one of our supported mobile wallet payment methods. Choose Easypaisa at checkout and you will receive a payment prompt on your registered mobile number for instant, secure confirmation.",
  },
  {
    q: "How long does payment verification take?",
    a: "Card and mobile wallet payments are verified instantly at checkout. Bank transfers typically take up to 24 hours to reflect, after which your order is confirmed and moved into processing. Our team will notify you by email and SMS.",
  },
  {
    q: "Can I change payment method after placing an order?",
    a: "If your order has not yet entered the processing stage, you may request a payment method change by contacting our customer care team via WhatsApp or email. Once your order is dispatched, changes are no longer possible.",
  },
];

export default function PaymentFaq() {
  return (
    <section
      aria-labelledby="payment-faq-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="payment-faq-heading"
        eyebrow="Good to Know"
        title="Payment & Billing FAQs"
        description="Everything you need to know about paying for your Heer Collection order."
      />

      <Reveal>
        <div className="mx-auto max-w-3xl rounded-sm border border-[#E8DDD4] bg-white px-6 py-3 shadow-xs sm:px-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="border-[#E8DDD4]"
              >
                <AccordionTrigger className="text-left text-sm font-medium tracking-wide text-[#1A1A1A] hover:text-[#C9A27E] sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#1A1A1A]/65">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </section>
  );
}