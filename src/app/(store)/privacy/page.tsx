import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Server,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Learn how Heer Collection collects, protects, and handles your personal data. We uphold the strictest standards of data privacy and security for our clientele.",
};

const SECTIONS = [
  {
    id: "collection",
    title: "1. Information We Collect",
    icon: FileText,
    content: (
      <>
        <p className="leading-relaxed">
          At Heer Collection, we gather only the personal details necessary to
          provide you with an exemplary shopping experience, bespoke tailoring,
          and secure delivery. This includes:
        </p>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Contact & Identification:</strong> Full
              name, email address, phone number, shipping address, and billing address.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Bespoke & Sizing Details:</strong> Body
              measurements, custom tailoring preferences, and alteration notes provided
              for bridal or custom pret garments.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Transaction Records:</strong> Products
              ordered, transaction dates, payment method type (e.g. COD, Credit/Debit
              Card, Bank Transfer), and delivery milestones.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Technical & Device Telemetry:</strong> IP
              address, browser type, device identifiers, and pages browsed to optimize site
              speed, performance, and responsive layout.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    icon: Eye,
    content: (
      <>
        <p className="leading-relaxed">
          We use the information we collect strictly for legitimate business and
          customer care purposes:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-[#E8DDD4] bg-[#F8F5F2]/50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Order Fulfillment & Delivery
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/70">
              Processing garments, coordinating couriers, providing dispatch SMS/email
              updates, and managing returns or size exchanges.
            </p>
          </div>
          <div className="rounded-sm border border-[#E8DDD4] bg-[#F8F5F2]/50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Customer Care & Atelier Styling
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/70">
              Assisting you with sizing inquiries, bridal appointments, order modifications,
              and post-purchase care advice.
            </p>
          </div>
          <div className="rounded-sm border border-[#E8DDD4] bg-[#F8F5F2]/50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Fraud Prevention & Security
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/70">
              Verifying authentic transactions, detecting unauthorized account logins,
              and safeguarding client financial data.
            </p>
          </div>
          <div className="rounded-sm border border-[#E8DDD4] bg-[#F8F5F2]/50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Curated Communications
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/70">
              Sending previews of new lookbooks, festive edits, and VIP private sales only
              if you have affirmatively subscribed.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "security",
    title: "3. Payment Security & Encryption",
    icon: Lock,
    content: (
      <>
        <p className="leading-relaxed">
          Your payment safety is paramount. All online payment transactions conducted on
          Heer Collection are encrypted using state-of-the-art 256-bit Secure Socket Layer
          (SSL) encryption protocols.
        </p>
        <div className="mt-4 rounded-sm border border-[#C9A27E]/30 bg-[#F5EDE4]/60 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A27E]" />
            <div className="text-xs leading-relaxed text-[#1A1A1A]/80">
              <strong className="font-semibold text-[#1A1A1A]">
                Zero Card Storage Guarantee:
              </strong>{" "}
              We do NOT store your full credit or debit card number, CVV code, or banking
              credentials on our servers. All card payments are securely tokenized and
              processed directly through certified PCI-DSS Level 1 payment gateways.
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Sharing & Third-Party Disclosures",
    icon: Server,
    content: (
      <>
        <p className="leading-relaxed font-medium text-[#1A1A1A]">
          We never sell, rent, monetize, or trade your personal information to third-party
          marketers or advertisers. Never.
        </p>
        <p className="mt-3 leading-relaxed">
          We share necessary data exclusively with trusted operational partners under
          strict non-disclosure agreements:
        </p>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Logistics Partners:</strong> Certified
              courier services (e.g. TCS, Leopard Courier, DHL Express) to deliver your
              parcel directly to your destination.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Payment Processors:</strong> Licensed
              banking partners and payment gateways for instant transaction clearance.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Legal Obligations:</strong> In rare cases,
              when strictly required by applicable law, court order, or governmental authorities.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    icon: Eye,
    content: (
      <>
        <p className="leading-relaxed">
          Our website uses standard cookies and browser session tokens to provide you with
          seamless browsing:
        </p>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Essential Cookies:</strong> Keeping items
              in your shopping bag as you browse, remembering your currency preferences, and
              maintaining your login session.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A27E]" />
            <span>
              <strong className="text-[#1A1A1A]">Performance Cookies:</strong> Aggregated,
              anonymous analytics to discover high-demand collections and optimize page
              load times.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-xs text-[#1A1A1A]/60">
          You may modify your cookie settings in your web browser at any time, though
          disabling essential cookies may impair shopping bag functionality.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "6. Your Rights & Choices",
    icon: UserCheck,
    content: (
      <>
        <p className="leading-relaxed">
          Regardless of your jurisdiction, we respect your rights regarding your personal
          data:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-sm border border-[#E8DDD4] bg-white p-4">
            <CheckCircle className="h-5 w-5 text-[#C9A27E]" />
            <h4 className="mt-2 text-xs font-semibold text-[#1A1A1A]">Access & Review</h4>
            <p className="mt-1 text-xs text-[#1A1A1A]/60">
              Request a summary copy of the personal information we hold on file for you.
            </p>
          </div>
          <div className="rounded-sm border border-[#E8DDD4] bg-white p-4">
            <CheckCircle className="h-5 w-5 text-[#C9A27E]" />
            <h4 className="mt-2 text-xs font-semibold text-[#1A1A1A]">Rectify or Update</h4>
            <p className="mt-1 text-xs text-[#1A1A1A]/60">
              Update outdated shipping addresses, names, or contact phone numbers at any time.
            </p>
          </div>
          <div className="rounded-sm border border-[#E8DDD4] bg-white p-4">
            <CheckCircle className="h-5 w-5 text-[#C9A27E]" />
            <h4 className="mt-2 text-xs font-semibold text-[#1A1A1A]">Erasure & Unsubscribe</h4>
            <p className="mt-1 text-xs text-[#1A1A1A]/60">
              Opt out of marketing emails with one click, or request complete account deletion.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "contact",
    title: "7. Data Protection Officer & Queries",
    icon: HelpCircle,
    content: (
      <>
        <p className="leading-relaxed">
          If you have questions regarding this Privacy Policy, wish to exercise your rights,
          or want to update your stored preferences, our dedicated Privacy Team is available
          to assist you:
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-sm border border-[#E8DDD4] bg-[#F8F5F2] p-4">
            <Mail className="h-5 w-5 text-[#C9A27E]" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                Privacy Email
              </p>
              <a
                href="mailto:privacy@heercollection.com"
                className="text-xs font-medium text-[#1A1A1A] hover:underline"
              >
                privacy@heercollection.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-[#E8DDD4] bg-[#F8F5F2] p-4">
            <Phone className="h-5 w-5 text-[#C9A27E]" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                Helpline
              </p>
              <p className="text-xs font-medium text-[#1A1A1A]">+92 (042) 111-4337</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-[#E8DDD4] bg-[#F8F5F2] p-4">
            <MapPin className="h-5 w-5 text-[#C9A27E]" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                Atelier Location
              </p>
              <p className="text-xs font-medium text-[#1A1A1A]">Gulberg III, Lahore, PK</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]/60 pb-20">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-[#E8DDD4] bg-white py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            Trust & Security
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C9A27E]" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/70 sm:text-base">
            Your privacy and trust are paramount to Heer Collection. We handle your
            personal data with the highest discretion, transparency, and protective
            safeguards.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#1A1A1A]/50">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Applies to heercollection.com</span>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="border-b border-[#E8DDD4] bg-[#F8F5F2]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3.5 rounded-sm border border-[#E8DDD4] bg-white p-4">
              <Lock className="h-6 w-6 text-[#C9A27E]" />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  256-Bit SSL Encrypted
                </h2>
                <p className="text-[11px] text-[#1A1A1A]/60">Bank-grade data transit security</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-sm border border-[#E8DDD4] bg-white p-4">
              <ShieldCheck className="h-6 w-6 text-[#C9A27E]" />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Zero Data Selling
                </h2>
                <p className="text-[11px] text-[#1A1A1A]/60">We never monetize your private data</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-sm border border-[#E8DDD4] bg-white p-4">
              <UserCheck className="h-6 w-6 text-[#C9A27E]" />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Full User Control
                </h2>
                <p className="text-[11px] text-[#1A1A1A]/60">Access or delete your data at will</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-sm border border-[#E8DDD4] bg-white p-7 sm:p-9 shadow-xs"
              >
                <div className="flex items-center gap-3 border-b border-[#E8DDD4] pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DDD4] text-[#C9A27E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-serif text-xl font-light text-[#1A1A1A] sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-5 text-sm text-[#1A1A1A]/75">
                  {section.content}
                </div>
              </section>
            );
          })}
        </div>

        {/* Support Callout */}
        <section className="mt-16 rounded-sm border border-[#E8DDD4] bg-white p-8 text-center sm:p-12">
          <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
            Questions About Your Privacy?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#1A1A1A]/60">
            Our privacy officer and client support liaisons are always available to
            clarify policies or process data requests.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                Contact Customer Care
              </Button>
            </Link>
            <Link href="/terms">
              <Button variant="outline" className="border-[#E8DDD4] text-xs font-medium uppercase tracking-widest text-[#1A1A1A]">
                View Terms & Conditions
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
