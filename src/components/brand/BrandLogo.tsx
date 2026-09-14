import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  href?: string;
  width?: number;
};

export function BrandLogo({
  className,
  priority = false,
  href = "/",
  width = 220,
}: BrandLogoProps) {
  const image = (
    <Image
      src="/assets/brand/logo-horizontal.png"
      alt="Autoaliado"
      width={2172}
      height={724}
      priority={priority}
      sizes={`${width}px`}
      className="h-auto w-full"
    />
  );

  return (
    <Link
      href={href}
      aria-label="Autoaliado, inicio"
      className={cn("block shrink-0", className)}
      style={{ width }}
    >
      {image}
    </Link>
  );
}
