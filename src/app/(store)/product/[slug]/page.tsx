"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Loader2, PackageX } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import { useProductBySlug, useRelatedProducts } from "@/hooks/useProducts";
import EmptyState from "@/components/common/EmptyState";
import CustomersAlsoBought from "@/components/product/CustomersAlsoBought";
import SimilarProducts from "@/components/product/SimilarProducts";
import TopTrendingProducts from "@/components/product/TopTrendingProducts";


export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { product, isLoading, error } = useProductBySlug(slug);
  const productWithCategories = product as
    | (NonNullable<typeof product> & {
        category: NonNullable<typeof product>["category"] | string;
        categories?: Array<{ name: string; slug: string }>;
      })
    | null;
  const category = productWithCategories
    ? typeof productWithCategories.category === "string"
      ? productWithCategories.categories?.[0] ?? {
          name: productWithCategories.category,
          slug: productWithCategories.category,
        }
      : productWithCategories.category
    : null;
  const categorySlug = category?.slug;
  const { products: relatedProducts } = useRelatedProducts(
    categorySlug,
    product?.id,
    4
  );

  const { products: alsoBoughtProducts } = useRelatedProducts(
    categorySlug,
    product?.id,
    6
  );

  const { products: similarProducts } = useRelatedProducts(
    categorySlug,
    product?.id,
    8
  );

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-24 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#C9A27E]" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={PackageX}
          title="Product Not Found"
          description="We couldn't load this product right now."
          actionLabel="Continue Shopping"
          actionHref="/collections"
        />
      </section>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 w-full max-w-full overflow-x-hidden">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(category
            ? [{ label: category.name, href: `/category/${category.slug}` }]
            : []),
          { label: product.name },
        ]}
        className="mb-4 hidden sm:block sm:mb-6"
      />

      {/* Product Detail Grid */}
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-12 w-full min-w-0 max-w-full">
        <ProductGallery
          images={product.images}
          thumbnail={product.thumbnail}
          productName={product.name}
        />
        <ProductInfo product={product} />
      </div>

      {/* Customers Also Bought */}
      <CustomersAlsoBought products={alsoBoughtProducts} />

      {/* Similar Products */}
      <SimilarProducts products={similarProducts} />

      {/* Top Trending Products */}
      <TopTrendingProducts />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-[#E8DDD4]">
          <RelatedProducts products={relatedProducts} />
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed currentProductSlug={product.slug} />
    </section>
  );
}