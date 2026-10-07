"use client";

import { use } from "react";
import CollectionBrowser from "@/components/product/CollectionBrowser";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <CollectionBrowser
      slug={slug}
      breadcrumbLabel="Shop"
      breadcrumbHref="/collections/all"
    />
  );
}