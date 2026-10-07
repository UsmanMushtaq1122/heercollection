"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import EmptyState from "@/components/common/EmptyState";
import { Loader2, FileText, Gem, Leaf, Heart, Star, Users, Award, Scissors, Sparkles, Truck, Clock, MapPin, PackageCheck, AlertCircle, Phone, RefreshCw, ShieldCheck, XCircle, Recycle, Sun, Camera, Globe, Music2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePage } from "@/hooks";
import type { CmsSection, CmsSectionItem } from "@/types/content";

const ICON_MAP: Record<string, LucideIcon> = {
  Gem,
  Leaf,
  Heart,
  Star,
  Users,
  Award,
  Scissors,
  Sparkles,
  Truck,
  Clock,
  MapPin,
  PackageCheck,
  AlertCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  XCircle,
  Recycle,
  Sun,
  Camera,
  Globe,
  Music2,
};

function SectionIcon({ item }: { item: CmsSectionItem }) {
  if (!item.icon) return null;
  const Icon = ICON_MAP[item.icon] ?? Star;
  return <Icon className="h-6 w-6 text-[#C9A27E]" />;
}

function HeroSection({ section }: { section: CmsSection }) {
  return (
    <div className="relative overflow-hidden bg-[#E8DDD4] py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 50%, #C9A27E22 100%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {section.subtitle && (
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            {section.subtitle}
          </p>
        )}
        <h1 className="mt-6 text-4xl font-light tracking-wide text-[#1A1A1A] md:text-5xl">
          {section.title}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        {section.body && (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#1A1A1A]/70">
            {section.body}
          </p>
        )}
      </div>
    </div>
  );
}

function ItemsGridSection({ section }: { section: CmsSection }) {
  const items = section.items ?? [];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <div className="text-center">
          {section.subtitle && (
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
              {section.subtitle}
            </p>
          )}
          <h2 className="mt-3 text-2xl font-light text-[#1A1A1A] md:text-3xl">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        </div>
      )}

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="text-center">
            {item.icon && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8DDD4]">
                <SectionIcon item={item} />
              </div>
            )}
            <h3 className="mt-5 text-sm font-medium uppercase tracking-widest text-[#1A1A1A]">
              {item.title}
            </h3>
            <div className="mx-auto mt-3 h-px w-8 bg-[#C9A27E]" />
            {item.description && (
              <p className="mt-4 text-sm leading-relaxed text-[#1A1A1A]/60">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestonesSection({ section }: { section: CmsSection }) {
  const items = section.items ?? [];
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <div className="text-center">
          {section.subtitle && (
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
              {section.subtitle}
            </p>
          )}
          <h2 className="mt-3 text-2xl font-light text-[#1A1A1A] md:text-3xl">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        </div>
      )}

      <div className="mt-14 space-y-0">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex gap-6">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C9A27E] bg-white text-xs font-medium text-[#C9A27E]">
                {(item.meta ?? item.value ?? "").slice(2) || index + 1}
              </div>
              {index < items.length - 1 && (
                <div className="w-px flex-1 bg-[#E8DDD4]" />
              )}
            </div>
            <div className="pb-10 pt-1">
              {item.meta && (
                <p className="text-xs font-medium uppercase tracking-widest text-[#C9A27E]">
                  {item.meta}
                </p>
              )}
              <h3 className="mt-1 text-base font-medium text-[#1A1A1A]">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-[#1A1A1A]/60">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsSection({ section }: { section: CmsSection }) {
  const items = section.items ?? [];
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <div className="text-center">
          {section.subtitle && (
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
              {section.subtitle}
            </p>
          )}
          <h2 className="mt-3 text-2xl font-light text-[#1A1A1A] md:text-3xl">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        </div>
      )}

      <div className="mt-12 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-5 rounded-sm border border-[#E8DDD4] bg-white p-6"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E8DDD4] text-sm font-semibold text-[#C9A27E]">
              {(item.value ?? String(index + 1)).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A]">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-[#1A1A1A]/60">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PoliciesSection({ section }: { section: CmsSection }) {
  const items = section.items ?? [];
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#1A1A1A] md:text-3xl">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        </div>
      )}

      <div className={`mt-12 grid gap-6 ${items.length > 2 ? "md:grid-cols-2" : "grid-cols-1"}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-sm border border-[#E8DDD4] bg-white p-7"
          >
            <div className="mb-3 flex items-center gap-3">
              {item.icon && (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DDD4]">
                  <SectionIcon item={item} />
                </span>
              )}
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1A1A1A]">
                {item.title}
              </h3>
            </div>
            {item.description && (
              <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
                {item.description}
              </p>
            )}
            {item.keywords && (
              <ul className="mt-3 space-y-1.5">
                {item.keywords.map((kw) => (
                  <li key={kw} className="flex items-center gap-2 text-sm text-[#1A1A1A]/70">
                    <span className="h-1 w-1 rounded-full bg-[#C9A27E]" />
                    {kw}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListSection({ section }: { section: CmsSection }) {
  const items = section.items ?? [];
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#1A1A1A] md:text-3xl">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
        </div>
      )}

      <div className="mt-12 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-sm border border-[#E8DDD4] bg-white px-6 py-4"
          >
            {item.icon ? (
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center">
                <SectionIcon item={item} />
              </span>
            ) : (
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A27E]" />
            )}
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-sm text-[#1A1A1A]/60">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextSection({ section }: { section: CmsSection }) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {section.title && (
        <h2 className="text-2xl font-light text-[#1A1A1A] md:text-3xl">
          {section.title}
        </h2>
      )}
      {section.subtitle && (
        <p className="mt-2 text-sm uppercase tracking-widest text-[#C9A27E]">
          {section.subtitle}
        </p>
      )}
      <div className="mt-4 space-y-4">
        {(section.body ?? "").split("\n").filter(Boolean).map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-[#1A1A1A]/70">
            {para}
          </p>
        ))}
        {section.items?.map((item) => (
          <p key={item.id} className="text-sm leading-relaxed text-[#1A1A1A]/70">
            {item.title}
            {item.description ? ` — ${item.description}` : ""}
          </p>
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({ section }: { section: CmsSection }) {
  switch (section.type) {
    case "hero":
      return <HeroSection section={section} />;
    case "values":
    case "perks":
    case "feature":
      return <ItemsGridSection section={section} />;
    case "milestones":
      return <MilestonesSection section={section} />;
    case "steps":
      return <StepsSection section={section} />;
    case "policies":
      return <PoliciesSection section={section} />;
    case "list":
    case "roles":
      return <ListSection section={section} />;
    case "text":
    default:
      return <TextSection section={section} />;
  }
}

export default function CmsPageView({
  slug,
  breadcrumbLabel,
}: {
  slug: string;
  breadcrumbLabel: string;
}) {
  const { page, isLoading, error } = usePage(slug);

  return (
    <section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: breadcrumbLabel },
        ]}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-32 text-[#1A1A1A]/50">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
          <p className="text-sm">Loading...</p>
        </div>
      ) : error ? (
        <EmptyState
          icon={FileText}
          title="Couldn't Load This Page"
          description={error}
        />
      ) : !page ? (
        <EmptyState
          icon={FileText}
          title="Page Not Available"
          description="This page isn't published yet. Please check back soon."
        />
      ) : (
        <div className="space-y-20 py-8">
          {page.content.map((section, i) => (
            <div
              key={section.id}
              className={i % 2 === 1 ? "bg-white/50 py-20" : "py-8"}
            >
              <SectionRenderer section={section} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}