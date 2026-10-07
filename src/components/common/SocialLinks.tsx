import type { SocialLink } from "@/types/content";
import { isVisibleSocialLink, SocialIcon, socialColor } from "./SocialIcon";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
  ariaLabel?: string;
  useBrandColors?: boolean;
}

export default function SocialLinks({
  links,
  className = "",
  linkClassName = "",
  iconClassName = "h-5 w-5",
  ariaLabel = "Social media links",
  useBrandColors = true,
}: SocialLinksProps) {
  const visibleLinks = links.filter(isVisibleSocialLink);
  if (!visibleLinks.length) return null;

  return (
    <nav className={className} aria-label={ariaLabel}>
      {visibleLinks.map((link) => {
        const label = link.platform || link.name || "Social media";
        return (
          <a
            key={link.id || `${label}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={linkClassName}
            style={useBrandColors ? { color: socialColor(link) } : undefined}
          >
            <SocialIcon link={link} className={iconClassName} />
          </a>
        );
      })}
    </nav>
  );
}