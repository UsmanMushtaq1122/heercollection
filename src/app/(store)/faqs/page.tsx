"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import { Loader2, MessageCircleQuestion } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { useFaqs } from "@/hooks";

export default function FAQsPage() {
  const { faqs, isLoading, error } = useFaqs();

  const categories = faqs.reduce<{ title: string; items: typeof faqs }[]>(
    (acc, faq) => {
      const existing = acc.find((c) => c.title === faq.category);
      if (existing) {
        existing.items.push(faq);
      } else {
        acc.push({ title: faq.category, items: [faq] });
      }
      return acc;
    },
    []
  );

  return (
    <section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      />

      {/* Header */}
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-light tracking-wide text-[#1A1A1A]">
          Frequently Asked Questions
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        <p className="mt-6 text-sm leading-relaxed text-[#1A1A1A]/60">
          Find answers to the most commonly asked questions about shopping with{" "}
          {SITE_NAME}. If you can&apos;t find what you&apos;re looking for, our
          team is always here to help.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#1A1A1A]/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
            <p className="text-sm">Loading FAQs...</p>
          </div>
        ) : error ? (
          <EmptyState
            icon={MessageCircleQuestion}
            title="Couldn't Load FAQs"
            description={error}
          />
        ) : categories.length === 0 ? (
          <EmptyState
            icon={MessageCircleQuestion}
            title="No FAQs Available"
            description="We're updating our FAQ. Please check back soon."
          />
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.title}>
                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-0">
                  {category.items.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`${faq.id ?? `${category.title}-${index}`}`}
                      className="border-[#E8DDD4]"
                    >
                      <AccordionTrigger className="py-5 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A27E]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-relaxed text-[#1A1A1A]/60">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="border-t border-[#E8DDD4] bg-white/50 py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            Still Have Questions?
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1A1A1A]">
            We&apos;re Here to Help
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-[#C9A27E]" />
          <p className="mt-4 text-sm text-[#1A1A1A]/60">
            Our customer service team is available Monday through Saturday. Reach
            out and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button
                variant="gold"
                className="text-xs font-medium uppercase tracking-widest"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}