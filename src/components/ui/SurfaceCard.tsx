import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SurfaceCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-aa-border bg-white shadow-[var(--aa-shadow-sm)]",
        className,
      )}
      {...props}
    />
  );
}
