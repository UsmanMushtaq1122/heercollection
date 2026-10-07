"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Ruler, Info, Loader2 } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import { SITE_NAME } from "@/lib/constants";
import { useSizeGuide } from "@/hooks";

const HOW_TO = [
  {
    step: "Bust / Chest",
    description:
      "Measure around the fullest part of your bust, keeping the tape parallel to the floor. Do not pull too tight.",
  },
  {
    step: "Waist",
    description:
      "Measure around your natural waistline — the narrowest part of your torso, typically 1 inch above your navel.",
  },
  {
    step: "Hips",
    description:
      "Stand with feet together and measure around the fullest part of your hips, about 8 inches below your natural waist.",
  },
  {
    step: "Length / Inseam",
    description:
      "Measure from the shoulder to the desired hemline for kameez length, or from the crotch seam to the ankle for inseam.",
  },
];

export default function SizeGuidePage() {
  const { entries, isLoading, error } = useSizeGuide();

  const topChart = entries.slice(0, Math.ceil(entries.length / 2));
  const bottomChart = entries.slice(Math.ceil(entries.length / 2));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Size Guide" }]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-14 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A27E] mb-3">
          Find Your Perfect Fit
        </p>
        <h1 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] md:text-4xl lg:text-5xl">
          Size Guide
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-[#C9A27E]" />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/60">
          All measurements are in <strong>inches</strong> unless otherwise noted.
          If you&apos;re between sizes, we recommend sizing up for a more comfortable fit.
        </p>
      </div>

      {/* Tip Banner */}
      <div className="mb-10 flex items-start gap-3 rounded-sm border border-[#C9A27E]/30 bg-[#C9A27E]/5 px-5 py-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A27E]" />
        <p className="text-sm leading-relaxed text-[#1A1A1A]/70">
          <strong className="text-[#1A1A1A]">Pro Tip:</strong> For the most accurate measurements,
          have a friend measure you while you stand straight and relaxed. Use a soft measuring tape
          and measure over light clothing.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#1A1A1A]/50">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A27E]" />
          <p className="text-sm">Loading size guide...</p>
        </div>
      ) : error ? (
        <EmptyState
          icon={Ruler}
          title="Couldn't Load Size Guide"
          description={error}
        />
      ) : entries.length === 0 ? (
        <EmptyState
          icon={Ruler}
          title="No Size Guide Available"
          description="We're updating our size guide. Please check back soon."
        />
      ) : (
        <>
          {/* Top / Garment Size Chart */}
          {topChart.length > 0 && (
            <div className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <Ruler className="h-5 w-5 text-[#C9A27E]" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#1A1A1A]">
                  {SITE_NAME} Size Chart
                </h2>
              </div>
              <div className="overflow-x-auto rounded-sm border border-[#E8DDD4]">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-[#1A1A1A] text-white">
                    <tr>
                      {["Size", "Bust (in)", "Waist (in)", "Hips (in)", "Length (in)"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-widest">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topChart.map((row, i) => (
                      <tr
                        key={row.size}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#FDFAF7]"}
                      >
                        <td className="px-5 py-3 font-semibold text-[#C9A27E]">{row.size}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.bust}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.waist}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.hips}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.length ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trouser / Bottom Size Chart */}
          {bottomChart.length > 0 && (
            <div className="mb-14">
              <div className="mb-5 flex items-center gap-3">
                <Ruler className="h-5 w-5 text-[#C9A27E]" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#1A1A1A]">
                  Trouser / Bottom Size Chart
                </h2>
              </div>
              <div className="overflow-x-auto rounded-sm border border-[#E8DDD4]">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-[#1A1A1A] text-white">
                    <tr>
                      {["Size", "Waist (in)", "Hips (in)", "Inseam (in)"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-widest">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bottomChart.map((row, i) => (
                      <tr
                        key={row.size}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#FDFAF7]"}
                      >
                        <td className="px-5 py-3 font-semibold text-[#C9A27E]">{row.size}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.waist}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.hips}</td>
                        <td className="px-5 py-3 text-[#1A1A1A]/70">{row.inseam ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How to Measure */}
          <div className="mb-14">
            <h2 className="mb-8 text-center text-lg font-light uppercase tracking-[0.2em] text-[#1A1A1A]">
              How to Measure
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HOW_TO.map((item) => (
                <div key={item.step} className="rounded-sm border border-[#E8DDD4] bg-[#FDFAF7] p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#C9A27E]">
                    {item.step}
                  </p>
                  <p className="text-sm leading-relaxed text-[#1A1A1A]/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Still unsure */}
      <div className="rounded-sm border border-[#E8DDD4] bg-white p-8 text-center">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1A1A1A]">
          Still Unsure of Your Size?
        </h2>
        <p className="mb-5 text-sm text-[#1A1A1A]/60">
          Our styling team is happy to help you find the perfect fit.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-sm bg-[#1A1A1A] px-7 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#C9A27E]"
        >
          Ask a Stylist
        </Link>
      </div>
    </div>
  );
}