import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8DDD4]">
          <Icon className="h-9 w-9 text-[#C9A27E]" />
        </div>
      )}
      <h2 className="mt-6 text-lg font-light text-[#1A1A1A] md:text-xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-px w-12 bg-[#C9A27E]" />
      {description && (
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#1A1A1A]/60">
          {description}
        </p>
      )}
      {actionLabel &&
        (actionHref ? (
          <Link href={actionHref} className="mt-8">
            <Button
              variant="gold"
              className="text-xs font-medium uppercase tracking-widest"
            >
              {actionLabel}
            </Button>
          </Link>
        ) : (
          <Button
            variant="gold"
            onClick={onAction}
            className="mt-8 text-xs font-medium uppercase tracking-widest"
          >
            {actionLabel}
          </Button>
        ))}
    </div>
  );
}