import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import EditorialBanner from "@/components/home/EditorialBanner";
import Categories from "@/components/home/Categories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import Collections from "@/components/home/Collections";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Heer Collection",
  description:
    "Discover exquisite luxury women's fashion at Heer Collection. Premium pret, formal wear, and summer collections crafted with timeless elegance.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <EditorialBanner />
      <Categories />
      <NewArrivals />
      <Collections />
      <BestSellers />
      <Testimonials />
    </main>
  );
}
