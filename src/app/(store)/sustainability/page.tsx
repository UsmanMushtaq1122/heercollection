import type { Metadata } from "next";
import CmsPageView from "@/components/cms/CmsPageView";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sustainability | ${SITE_NAME}`,
  description:
    "Heer Collection is committed to ethical fashion, sustainable sourcing, and empowering local artisans. Discover our journey towards conscious luxury.",
};

export default function SustainabilityPage() {
  return <CmsPageView slug="sustainability" breadcrumbLabel="Sustainability" />;
}