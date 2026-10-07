"use client";

import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C9A27E]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={cn(
            "mt-3 font-serif text-2xl font-light tracking-wide sm:text-3xl lg:text-4xl",
            tone === "dark" ? "text-[#F8F5F2]" : "text-[#1A1A1A]"
          )}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div
          className={cn(
            "mt-4 h-0.5 w-14 bg-[#C9A27E]",
            align === "center" && "mx-auto"
          )}
        />
      </Reveal>
      {description && (
        <Reveal delay={0.22}>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base",
              tone === "dark" ? "text-[#F8F5F2]/60" : "text-[#1A1A1A]/60",
              align === "left" && "mx-0"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}