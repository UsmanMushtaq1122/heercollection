"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

export interface FooterAccordionSection {
  id: string;
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

interface FooterAccordionProps {
  section: FooterAccordionSection;
  openId: string | null;
  onToggle: (id: string) => void;
}

export default function FooterAccordion({ section, openId, onToggle }: FooterAccordionProps) {
  const isOpen = openId === section.id;
  const panelId = `mobile-footer-panel-${section.id}`;

  return (
    <div className="rounded-2xl bg-[#F8F8F8] px-5">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(section.id)}
        className="flex min-h-18 w-full items-center justify-between text-left text-[18px] font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E] focus-visible:ring-inset"
      >
        <span>{section.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden="true"
        >
          <Plus className="h-6 w-6" strokeWidth={1.7} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-label`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <span id={`${panelId}-label`} className="sr-only">{section.title}</span>
            <div className="flex flex-col gap-3 border-t border-[#EAEAEA] pb-5 pt-4">
              {section.links.map((link) => (
                link.external ? (
                  <a
                    key={`${section.id}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] leading-6 text-[#555555] transition-colors hover:text-[#C9A27E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={`${section.id}-${link.href}`}
                    href={link.href}
                    className="text-[15px] leading-6 text-[#555555] transition-colors hover:text-[#C9A27E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
