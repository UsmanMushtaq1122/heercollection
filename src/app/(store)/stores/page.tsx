"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import EmptyState from "@/components/common/EmptyState";
import { MapPin } from "lucide-react";
import { apiService } from "@/services/api";

type StoreLocation = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  province?: string;
  phone?: string;
  email?: string;
};

export default function StoresPage() {
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiService
      .get<StoreLocation[]>("/locations")
      .then(setLocations)
      .catch(() => setError("We couldn't load store locations right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Store Locator" }]} className="mb-8" />
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A27E]">Visit Heer</p>
        <h1 className="mt-2 text-3xl font-light tracking-wide">Store Locator</h1>
      </div>
      {loading ? (
        <div className="py-20 text-center text-sm text-[#1A1A1A]/60">Loading locations...</div>
      ) : error ? (
        <EmptyState icon={MapPin} title="Locations unavailable" description={error} actionLabel="Return Home" actionHref="/" />
      ) : locations.length === 0 ? (
        <EmptyState icon={MapPin} title="Stores coming soon" description="Our showroom locations will appear here shortly." actionLabel="Contact Us" actionHref="/contact" />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <article key={location.id} className="border border-[#E8DDD4] bg-white p-6">
              <MapPin className="h-6 w-6 text-[#C9A27E]" />
              <h2 className="mt-4 text-lg font-medium">{location.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/65">{location.address}</p>
              <p className="text-sm text-[#1A1A1A]/65">{[location.city, location.province].filter(Boolean).join(", ")}</p>
              {location.phone && <p className="mt-4 text-sm">{location.phone}</p>}
              {location.email && <p className="text-sm text-[#1A1A1A]/65">{location.email}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
