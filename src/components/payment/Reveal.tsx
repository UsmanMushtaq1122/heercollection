"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_LUXURY } from "@/lib/constants";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_LUXURY, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}