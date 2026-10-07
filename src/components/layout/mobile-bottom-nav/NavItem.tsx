"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export default function NavItem({ href, label, active, badge, children }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-xl px-1 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]/30"
    >
      <motion.span
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className={cn(
          "relative flex min-w-16 flex-col items-center justify-center gap-1 text-[12px] leading-none transition-colors duration-200",
          active ? "font-semibold text-[#111111]" : "font-medium text-[#9CA3AF]"
        )}
      >
        <span className="relative flex h-7 w-8 items-center justify-center">{children}{badge}</span>
        <span>{label}</span>
      </motion.span>
    </Link>
  );
}
