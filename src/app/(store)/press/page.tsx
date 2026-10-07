import type { Metadata } from "next";
import CmsPageView from "@/components/cms/CmsPageView";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Press | ${SITE_NAME}`,
  description:
    "Heer Collection press room — media coverage, brand assets, press kit downloads, and contact information for journalists and collaborators.",
};

export default function PressPage() {
  return <CmsPageView slug="press" breadcrumbLabel="Press" />;
}