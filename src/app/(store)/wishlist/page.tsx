"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
        className="mb-6"
      />

      <h1 className="mb-2 text-3xl font-light tracking-wide text-[#1A1A1A]">
        Wishlist
      </h1>
      <div className="mb-8 h-px w-12 bg-[#C9A27E]" />

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save your favorite pieces here so you can find them later."
          actionLabel="Explore Collections"
          actionHref="/"
        />
      ) : (
        <>
          <p className="mb-6 text-sm text-[#1A1A1A]/60">
            You have{" "}
            <span className="font-medium text-[#1A1A1A]">{items.length}</span>{" "}
            {items.length === 1 ? "item" : "items"} in your wishlist.
          </p>
          <ProductGrid products={items} />
        </>
      )}
    </section>
  );
}
