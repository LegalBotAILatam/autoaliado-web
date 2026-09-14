import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  withArrow?: boolean;
};

export function Button({
  className,
  variant = "primary",
  withArrow = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-aa-coral-500 text-white shadow-[var(--aa-shadow-coral)] hover:-translate-y-px hover:bg-aa-coral-600 focus-visible:outline-aa-blue-500",
        variant === "secondary" &&
          "border-[1.5px] border-aa-navy-900 bg-white text-aa-navy-900 hover:-translate-y-px hover:bg-aa-gray-50 focus-visible:outline-aa-blue-500",
        variant === "ghost" &&
          "text-aa-navy-900 hover:bg-aa-surface-soft focus-visible:outline-aa-blue-500",
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />}
    </button>
  );
}
