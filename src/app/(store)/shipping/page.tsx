import type { Metadata } from "next";
import CmsPageView from "@/components/cms/CmsPageView";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Shipping Policy | ${SITE_NAME}`,
  description:
    "Learn about Heer Collection's shipping options, delivery times, and policies for orders within Pakistan and internationally.",
};

export default function ShippingPage() {
  return <CmsPageView slug="shipping" breadcrumbLabel="Shipping Policy" />;
}