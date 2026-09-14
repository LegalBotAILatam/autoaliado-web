import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Pill({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-full border border-aa-border bg-white px-4 text-sm font-medium text-aa-navy-900 transition hover:border-aa-blue-500 hover:bg-aa-surface-soft focus-visible:outline-aa-blue-500",
        className,
      )}
      {...props}
    />
  );
}
