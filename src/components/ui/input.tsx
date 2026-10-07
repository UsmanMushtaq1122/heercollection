import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-sm border border-[#1A1A1A]/20 bg-white px-3 py-2 text-sm text-[#1A1A1A] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#1A1A1A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A27E]/50 focus-visible:border-[#C9A27E] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
