"use client";

import { use } from "react";
import CollectionBrowser from "@/components/product/CollectionBrowser";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <CollectionBrowser slug={slug} />;
}