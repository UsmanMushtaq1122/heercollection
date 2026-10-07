"use client";

import { motion } from "framer-motion";

interface CartBadgeProps {
  count: number;
}

export default function CartBadge({ count }: CartBadgeProps) {
  if (count <= 0) return null;

  return (
    <motion.span
      key={count}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111111] px-1 text-[10px] font-semibold leading-none text-white"
      aria-label={`${count} item${count === 1 ? "" : "s"} in bag`}
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}
