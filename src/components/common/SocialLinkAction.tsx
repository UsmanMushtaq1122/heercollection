"use client";

import type { ReactNode } from "react";
import { useSiteSettings } from "@/hooks/useSettings";
import { findSocialLink } from "./SocialIcon";

export default function SocialLinkAction({
  platform,
  children,
}: {
  platform: string;
  children: ReactNode;
}) {
  const { settings } = useSiteSettings();
  const link = findSocialLink(settings.socialLinks, platform);
  if (!link) return null;

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}