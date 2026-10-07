"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#E8DDD4] text-[#1A1A1A]/60 transition-all duration-300 hover:border-[#C9A27E] hover:text-[#C9A27E] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E8DDD4] disabled:hover:text-[#1A1A1A]/60"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-10 w-8 items-center justify-center text-sm text-[#1A1A1A]/40"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-sm border text-sm font-medium transition-all duration-300",
              page === currentPage
                ? "border-[#C9A27E] bg-[#C9A27E] text-white"
                : "border-[#E8DDD4] text-[#1A1A1A]/70 hover:border-[#C9A27E] hover:text-[#C9A27E]"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#E8DDD4] text-[#1A1A1A]/60 transition-all duration-300 hover:border-[#C9A27E] hover:text-[#C9A27E] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E8DDD4] disabled:hover:text-[#1A1A1A]/60"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}