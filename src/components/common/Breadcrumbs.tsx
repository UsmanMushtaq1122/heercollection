import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center flex-wrap gap-1.5", className)}
    >
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "text-xs",
                    isLast
                      ? "font-medium text-[#1A1A1A]"
                      : "text-[#1A1A1A]/50"
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs text-[#C9A27E] transition-colors hover:text-[#C9A27E]/70"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 text-[#1A1A1A]/30" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}