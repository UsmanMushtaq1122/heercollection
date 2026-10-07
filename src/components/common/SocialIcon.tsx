import { useId } from "react";
import { AtSign, BriefcaseBusiness, Camera, ExternalLink, Globe, Link2, MessageCircle, Music2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialLink } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  facebook: AtSign,
  instagram: Camera,
  tiktok: Music2,
  youtube: ExternalLink,
  twitter: AtSign,
  x: AtSign,
  twitterx: AtSign,
  "twitter-x": AtSign,
  pinterest: Globe,
  linkedin: BriefcaseBusiness,
  whatsapp: MessageCircle,
  link: Link2,
};

const COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  tiktok: "#111111",
  youtube: "#FF0000",
  twitter: "#111111",
  x: "#111111",
  "twitter/x": "#111111",
  pinterest: "#BD081C",
  linkedin: "#0A66C2",
  whatsapp: "#25D366",
};

const BRAND_KEYS = new Set(["facebook", "instagram", "tiktok", "youtube"]);

function socialKey(link: SocialLink): string {
  return normalizeSocialKey(link.icon || link.platform || link.name || "link");
}

function normalizeSocialKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getBrandKey(link: SocialLink): string | null {
  const iconKey = normalizeSocialKey(link.icon || "");
  const platformKey = normalizeSocialKey(link.platform || link.name || "");

  if (BRAND_KEYS.has(iconKey)) return iconKey;
  if (BRAND_KEYS.has(platformKey)) return platformKey;
  return null;
}

function BrandSocialIcon({
  brand,
  className,
}: {
  brand: string;
  className?: string;
}) {
  const gradientId = `instagram-gradient-${useId().replace(/:/g, "")}`;

  if (brand === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          fill="#fff"
          d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4z"
        />
      </svg>
    );
  }

  if (brand === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0033" />
        <path d="m10 8.5 6 3.5-6 3.5v-7z" fill="#fff" />
      </svg>
    );
  }

  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB000" />
            <stop offset=".48" stopColor="#FF3040" />
            <stop offset="1" stopColor="#C837AB" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="6" fill={`url(#${gradientId})`} />
        <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17" cy="7.3" r="1.1" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#050505" />
      <path
        fill="#fff"
        d="M14.1 3.2h3.1c.2 1.7 1.2 3.1 3.1 3.7v3.2a9 9 0 0 1-3.1-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.3a2.8 2.8 0 1 0 1.8 2.7V3.2z"
      />
    </svg>
  );
}

export function SocialIcon({
  link,
  className,
}: {
  link: SocialLink;
  className?: string;
}) {
  const brand = getBrandKey(link);
  if (brand) return <BrandSocialIcon brand={brand} className={className} />;

  const key = socialKey(link);
  const platform = normalizeSocialKey(link.platform || link.name || "");
  const Icon = ICONS[key] || ICONS[platform] || Link2;
  return <Icon className={className} aria-hidden="true" />;
}

export function socialColor(link: SocialLink): string {
  return COLORS[(link.platform || link.name || "").trim().toLowerCase()] || "#76583F";
}

export function isVisibleSocialLink(link: SocialLink): boolean {
  return link.isActive !== false && Boolean(link.url?.trim());
}

export function findSocialLink(links: SocialLink[], platform: string): SocialLink | undefined {
  const target = platform.toLowerCase().replace(/[^a-z0-9]/g, "");
  return links.find((link) => {
    if (!isVisibleSocialLink(link)) return false;
    const name = (link.platform || link.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const icon = (link.icon || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return name === target || icon === target;
  });
}