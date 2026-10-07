"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MapPin, ArrowRight, Loader2, Briefcase } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import { SITE_NAME } from "@/lib/constants";
import { useCareers } from "@/hooks";
import type { Career } from "@/types/content";

const TYPE_LABELS: Record<Career["type"], string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const DEPARTMENT_ICONS = {
  Creative: "✦",
  Digital: "◈",
  Marketing: "●",
  "Customer Care": "♡",
  "Supply Chain": "△",
  Technology: "◇",
} as const;

function RoleIcon({ department }: { department: string }) {
  return (
    <span className="text-[#C9A27E]">
      {DEPARTMENT_ICONS[department as keyof typeof DEPARTMENT_ICONS] ?? "✦"}
    </span>
  );
}

export default function CareersPage() {
  const { careers, isLoading, error } = useCareers();
  const openRoles = careers.filter((role) => role.isActive !== false);

  const perks =
    openRoles.length > 0
      ? []
      : [
          {
            title: "Employee Discounts",
            description: "Enjoy exclusive discounts on our collections.",
          },
          {
            title: "Growth & Learning",
            description: "Support for skill development and industry events.",
          },
        ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-14 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A27E] mb-3">
          Join Our Team
        </p>
        <h1 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] md:text-4xl lg:text-5xl">
          Careers at {SITE_NAME}
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-[#C9A27E]" />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/60">
          We are a team of designers, storytellers, craftspeople, and innovators
          united by a love for Pakistani fashion. If you share our passion, we&apos;d
          love to hear from you.
        </p>
      </div>

      {/* Perks */}
      {perks.length > 0 && (
        <div className="mb-16 grid gap-5 sm:grid-cols-2">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] p-6 text-center"
            >
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]">
                {perk.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#1A1A1A]/60">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Open Roles */}
      <div className="mb-14">
        <h2 className="mb-8 text-center text-lg font-light uppercase tracking-[0.2em] text-[#1A1A1A]">
          Open Positions
        </h2>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#1A1A1A]/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
            <p className="text-sm">Loading open positions...</p>
          </div>
        ) : error ? (
          <EmptyState
            icon={Briefcase}
            title="Couldn't Load Positions"
            description={error}
          />
        ) : openRoles.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No Open Positions"
            description="We don't have any open roles at the moment, but we're always happy to hear from talented people."
          />
        ) : (
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.id}
                className="group rounded-sm border border-[#E8DDD4] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-[#F0E8DF] px-3 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[#C9A27E]">
                        <RoleIcon department={role.department} />
                        {role.department}
                      </span>
                    </div>
                    <h3 className="mb-1 text-base font-semibold text-[#1A1A1A]">
                      {role.title}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-[#1A1A1A]/60">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#1A1A1A]/50">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#C9A27E]" />
                        {role.location}
                      </span>
                      {role.type && (
                        <span className="flex items-center gap-1.5">
                          {TYPE_LABELS[role.type] ?? role.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`mailto:careers@${SITE_NAME.toLowerCase().replace(/\s+/g, "")}.com?subject=Application: ${encodeURIComponent(role.title)}`}
                    className="shrink-0 inline-flex items-center gap-2 rounded-sm border border-[#1A1A1A] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#1A1A1A] transition-all group-hover:border-[#C9A27E] group-hover:text-[#C9A27E]"
                  >
                    Apply
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Spontaneous Application */}
      <div className="rounded-sm bg-[#1A1A1A] px-10 py-12 text-center">
        <h2 className="mb-3 font-serif text-2xl font-light text-white">
          Don&apos;t See a Role That Fits?
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-white/60">
          We&apos;re always on the lookout for passionate, talented people. Send us
          your CV and a brief note about yourself — we&apos;d love to keep you in mind
          for future opportunities.
        </p>
        <Link
          href="mailto:careers@heercollection.com?subject=Spontaneous Application"
          className="inline-flex items-center gap-2 rounded-sm bg-[#C9A27E] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#B8916D]"
        >
          Send Your CV
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}