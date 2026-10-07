"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import EmptyState from "@/components/common/EmptyState";
import { FileText } from "lucide-react";

export default function BlogsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} className="mb-8" />
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A27E]">The Journal</p>
        <h1 className="mt-2 text-3xl font-light tracking-wide">Blogs</h1>
      </div>
      <EmptyState
        icon={FileText}
        title="Journal coming soon"
        description="Our stories on craft, styling, and South Asian fashion will appear here shortly."
        actionLabel="Explore Collections"
        actionHref="/collections"
      />
    </section>
  );
}
