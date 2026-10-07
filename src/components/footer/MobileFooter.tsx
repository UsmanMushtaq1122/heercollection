"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { useSiteSettings } from "@/hooks/useSettings";
import FooterAccordion, { FooterAccordionSection } from "./FooterAccordion";
import SocialLinks from "@/components/common/SocialLinks";
import { isVisibleSocialLink } from "@/components/common/SocialIcon";

export default function MobileFooter() {
  const { settings } = useSiteSettings();
  const [openId, setOpenId] = useState<string | null>(null);
  const contact = settings.contact;
  const displayName = settings.siteName || SITE_NAME;
  const whatsapp = settings.socialLinks.find((link) =>
    isVisibleSocialLink(link) && (link.platform || link.name || "").toLowerCase() === "whatsapp"
  );

  const sections: FooterAccordionSection[] = [
    {
      id: "contact",
      title: "Contact",
      links: [
        ...(whatsapp ? [{ label: "WhatsApp", href: whatsapp.url, external: true }] : []),
        ...(contact.phone ? [{ label: `Phone: ${contact.phone}`, href: `tel:${contact.phone}` }] : []),
        { label: `Email: ${contact.email || "hello@heercollection.com"}`, href: `mailto:${contact.email || "hello@heercollection.com"}` },
        ...(contact.address ? [{ label: `Store: ${contact.address}`, href: "/stores" }] : [{ label: "Store Location", href: "/stores" }]),
        ...(contact.hours ? [{ label: `Hours: ${contact.hours}`, href: "/contact" }] : [{ label: "Business Hours", href: "/contact" }]),
      ],
    },
    {
      id: "information",
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/faqs" },
        { label: "Blogs", href: "/blogs" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      id: "care",
      title: "Customer Care",
      links: [
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Return Policy", href: "/returns" },
        { label: "Exchange Policy", href: "/returns" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
    {
      id: "account",
      title: "My Account",
      links: [
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/register" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "My Orders", href: "/account" },
        { label: "Order Tracking", href: "/track-order" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#EEEEEE] bg-white md:hidden" aria-label="Mobile site footer">
      <div className="mx-auto max-w-md space-y-4 px-4 py-8">
        {sections.map((section) => (
          <FooterAccordion
            key={section.id}
            section={section}
            openId={openId}
            onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
          />
        ))}

        <SocialLinks
          links={settings.socialLinks}
          className="flex items-center justify-center gap-4 border-t border-[#EEEEEE] pt-5"
          linkClassName="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEEEEE]"
          iconClassName="h-4 w-4"
          ariaLabel="Social media"
          useBrandColors={false}
        />

        <Link
          href="/"
          aria-label={`${displayName} homepage`}
          className="flex justify-center"
        >
          <Image
            src="/heer-logo.png"
            alt={`${displayName} logo`}
            width={491}
            height={593}
            className="h-auto w-[76px]"
          />
        </Link>

        <div className="border-t border-[#EEEEEE] pt-6 text-center text-xs leading-6 text-[#777777]">
          <p>© {new Date().getFullYear()} {displayName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
