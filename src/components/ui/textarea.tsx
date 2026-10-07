import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-sm border border-[#1A1A1A]/20 bg-white px-3 py-2 text-sm text-[#1A1A1A] ring-offset-white placeholder:text-[#1A1A1A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]/50 focus-visible:border-[#C9A27E] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
