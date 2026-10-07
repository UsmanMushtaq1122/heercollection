"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { useSiteSettings } from "@/hooks/useSettings";
import type { FooterLink } from "@/types/content";
import SocialLinks from "@/components/common/SocialLinks";

/* ── Brand SVG icons (removed from lucide-react) ── */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.78.72 1.45 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM19.85 5.59a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z" />
    </svg>
  );
}

/* ── Link column ── */
function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  if (!links.length) return null;
  return (
    <div>
      <p style={{
        margin: "0 0 0.75rem",
        fontSize: "0.92rem",
        fontWeight: 600,
        color: "#111111",
        letterSpacing: "0",
      }}>
        {title}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontSize: "0.85rem",
                color: "#9898ad",
                textDecoration: "none",
                lineHeight: 1.4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9898ad")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main Footer ── */
export default function Footer() {
  const { settings } = useSiteSettings();
  const { footerLinks, contact, siteName, socialLinks } = settings;
  const displayName = siteName || SITE_NAME;

  const informationLinks: FooterLink[] = footerLinks.customerCare?.length
    ? footerLinks.customerCare
    : [
        { label: "Returns and Exchange", href: "/returns" },
        { label: "Privacy Policy",       href: "/privacy" },
        { label: "FAQs",                 href: "/faqs" },
        { label: "Store Locator",        href: "/stores" },
        { label: "Track Your Order",     href: "/track-order" },
        { label: "Blogs",                href: "/blogs" },
      ];

  const customerCareLinks: FooterLink[] = footerLinks.about?.length
    ? footerLinks.about
    : [
        { label: "About Heer",          href: "/about" },
        { label: "Client Stories",      href: "/testimonials" },
        { label: "Contact Us",          href: "/contact" },
        { label: "Careers",             href: "/careers" },
        { label: "Terms and Conditions",href: "/terms" },
      ];

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="hidden md:block"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e8e8e8",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ── Top section ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.75rem 2rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.75rem",
          borderBottom: "1px solid #e8e8e8",
        }}
        className="footer-top-grid"
      >
        {/* Brand + Contact */}
        <div>
          <Link
            href="/"
            aria-label={`${displayName} homepage`}
            style={{
              display: "inline-block",
            }}
          >
            <Image
              src="/heer-logo.png"
              alt={`${displayName} logo`}
              width={491}
              height={593}
              style={{ width: "120px", height: "auto" }}
            />
          </Link>

          <div
            style={{
              marginTop: "0.65rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
              fontSize: "0.85rem",
              color: "#9898ad",
              lineHeight: 1.45,
            }}
          >
            {contact.address && <span>{contact.address}</span>}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                Call: {contact.phone}
              </a>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                WhatsApp: {contact.whatsapp}
              </a>
            )}
            <a
              href={`mailto:${contact.email || "hello@heercollection.com"}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Email: {contact.email || "hello@heercollection.com"}
            </a>
          </div>

          <SocialLinks
            links={socialLinks}
            className="mt-5 flex items-center gap-5"
            linkClassName="flex items-center transition-transform duration-200 hover:-translate-y-0.5"
            iconClassName="h-5 w-5"
          />
        </div>

        {/* Link columns */}
        <LinkColumn title="Information"   links={informationLinks} />
        <LinkColumn title="Customer Care" links={customerCareLinks} />
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.85rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#9898ad" }}>
          &copy; {new Date().getFullYear()}, {displayName} Designs (PK) Powered by Shopify
        </p>

      </div>

      {/* Responsive grid style */}
      <style>{`
        @media (min-width: 768px) {
          .footer-top-grid {
            grid-template-columns: 1.3fr 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}