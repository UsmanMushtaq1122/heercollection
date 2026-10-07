"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus } from "lucide-react";
import { useCategoryList } from "@/hooks";
import { useUIStore } from "@/store/uiStore";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Category } from "@/types";
import { useSiteSettings } from "@/hooks/useSettings";
import SocialLinks from "@/components/common/SocialLinks";

interface CategoryWithChildren extends Category {
  subcategories: Category[];
}

export default function MobileMenu() {
  const { settings } = useSiteSettings();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { categories, isLoading } = useCategoryList();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Group categories and subcategories from actual catalog data
  const organizedCategories: CategoryWithChildren[] = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    // Filter active categories
    const active = categories.filter((c) => c.isActive !== false);

    // Root categories have parentId === null or parentId undefined
    const roots = active.filter((c) => !c.parentId);

    return roots.map((root) => {
      // Find subcategories either in root.children or where parentId === root.id
      const directChildren = Array.isArray(root.children) ? root.children : [];
      const matchingChildren = active.filter((c) => c.parentId === root.id);

      const mergedMap = new Map<string, Category>();
      directChildren.forEach((child) => mergedMap.set(child.slug || child.id, child));
      matchingChildren.forEach((child) => mergedMap.set(child.slug || child.id, child));

      const subcategories = Array.from(mergedMap.values()).sort(
        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );

      return {
        ...root,
        subcategories,
      };
    }).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [categories]);

  const toggleCategoryExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent
        side="left"
        className="w-full max-w-[340px] sm:max-w-[380px] p-0 bg-white border-r border-[#E8DDD4] flex flex-col h-full shadow-2xl [&>button.absolute]:hidden z-[80]"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse categories and subcategories
        </SheetDescription>

        {/* Header — Brand + Close Button */}
        <div className="flex h-16 sm:h-20 items-center justify-between border-b border-[#E8DDD4] px-6 bg-white shrink-0">
          <Link
            href="/"
            onClick={handleLinkClick}
            style={{
              fontFamily:
                "var(--font-cinzel), 'Cormorant Garamond', var(--font-cormorant), 'Times New Roman', serif",
            }}
            className="text-lg tracking-[0.25em] uppercase font-light text-[#1A1A1A] hover:text-[#C9A27E] transition-colors"
          >
            HEER COLLECTION
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F8F5F2] hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content: Categories + Subcategories Only */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E8DDD4]/60">
          {isLoading && organizedCategories.length === 0 ? (
            <div className="py-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-3/4 animate-pulse rounded bg-[#E8DDD4]/50" />
              ))}
            </div>
          ) : organizedCategories.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#1A1A1A]/50">
              No categories available.
            </div>
          ) : (
            organizedCategories.map((cat) => {
              const hasSubcategories = cat.subcategories.length > 0;
              const isExpanded = !!expandedCategories[cat.id];

              return (
                <div key={cat.id} className="py-3.5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/collections/${cat.slug}`}
                      onClick={handleLinkClick}
                      className="flex-1 text-[13px] sm:text-sm font-normal uppercase tracking-[0.16em] text-[#1A1A1A] hover:text-[#C9A27E] transition-colors"
                    >
                      {cat.name}
                    </Link>

                    {hasSubcategories && (
                      <button
                        onClick={(e) => toggleCategoryExpand(cat.id, e)}
                        className="flex h-9 w-9 items-center justify-center text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors rounded-sm focus:outline-none"
                        aria-label={isExpanded ? `Collapse ${cat.name}` : `Expand ${cat.name}`}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <Minus className="h-4 w-4 stroke-[1.5]" />
                        ) : (
                          <Plus className="h-4 w-4 stroke-[1.5]" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Subcategories (Indented and clearly separated) */}
                  {hasSubcategories && isExpanded && (
                    <div className="mt-2 space-y-1 border-t border-[#E8DDD4]/40 pt-2 pl-4">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id || sub.slug}
                          href={`/collections/${sub.slug}`}
                          onClick={handleLinkClick}
                          className="block py-2 text-[13px] tracking-wide text-[#1A1A1A]/70 hover:text-[#C9A27E] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <SocialLinks
          links={settings.socialLinks}
          className="flex shrink-0 items-center justify-center gap-5 border-t border-[#E8DDD4] px-6 py-5"
          linkClassName="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDD4] text-[#1A1A1A]/65"
          iconClassName="h-4 w-4"
          ariaLabel="Social media"
          useBrandColors={false}
        />
      </SheetContent>
    </Sheet>
  );
}