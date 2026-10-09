"use client";

import Link from "next/link";
import { MessageSquare, Mail, ContactRound, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useSiteSettings } from "@/hooks/useSettings";
import { findSocialLink } from "@/components/common/SocialIcon";

type SupportOption = {
  icon: LucideIcon;
  label: string;
  description: string;
  platform?: string;
  href?: string;
  external: boolean;
  cta: string;
};

type ResolvedSupportOption = SupportOption & { href: string };

const SUPPORT_OPTIONS: SupportOption[] = [
  {
    icon: MessageSquare,
    label: "WhatsApp Support",
    description: "Chat with our care team — instant replies during business hours.",
    platform: "WhatsApp",
    external: true,
    cta: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email Support",
    description: "Write to us for detailed inquiries. We reply within 24 hours.",
    href: "mailto:hello@heercollection.com",
    external: true,
    cta: "Send an Email",
  },
  {
    icon: ContactRound,
    label: "Contact Page",
    description: "Browse our full contact details, showroom, and working hours.",
    href: "/contact",
    external: false,
    cta: "Visit Contact Page",
  },
];

export default function NeedHelp() {
  const { settings } = useSiteSettings();
  const whatsapp = findSocialLink(settings.socialLinks, "WhatsApp");
  const supportOptions = SUPPORT_OPTIONS.flatMap<ResolvedSupportOption>((option) => {
    if (option.platform === "WhatsApp") {
      return whatsapp ? [{ ...option, href: whatsapp.url }] : [];
    }
    const href = option.href;
    return href ? [{ ...option, href }] : [];
  });

  return (
    <section
      aria-labelledby="need-help-heading"
      className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="need-help-heading"
        eyebrow="We're At Your Service"
        title="Need Help With Your Payment?"
        description="Our customer care team is here to assist you with any payment-related questions — seven days a week."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {supportOptions.map((option, index) => {
          const inner = (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F5EDE4] text-[#C9A27E] transition-colors duration-500">
                <option.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-light tracking-wide text-[#1A1A1A]">
                {option.label}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1A1A1A]/60">
                {option.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9A27E]">
                {option.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          );

          return (
            <Reveal key={option.label} delay={index * 0.08}>
              {option.external ? (
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-sm border border-[#E8DDD4] bg-white p-7 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A27E]/60 hover:shadow-lg"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={option.href}
                  className="group flex h-full flex-col rounded-sm border border-[#E8DDD4] bg-white p-7 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A27E]/60 hover:shadow-lg"
                >
                  {inner}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 rounded-sm border border-[#C9A27E]/30 bg-[#F5EDE4]/70 px-6 py-8 text-center sm:px-10 sm:py-10">
          <h3 className="font-serif text-2xl font-light tracking-wide text-[#1A1A1A]">
            Still Have Questions?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#1A1A1A]/65">
            Reach out to our dedicated concierge and we will gladly walk you
            through every payment option available for your order.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button
                variant="gold"
                className="text-xs font-medium uppercase tracking-widest"
              >
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}