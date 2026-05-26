import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-rain-500 text-ink-1000 border border-rain-500 hover:bg-rain-400 hover:border-rain-400",
  ghost:
    "bg-transparent text-bone-50 border border-transparent hover:bg-bone-50/5",
  outline:
    "bg-transparent text-bone-50 border border-bone-50/15 hover:border-bone-50/40 hover:bg-bone-50/[0.03]",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2.5 rounded-[3px] font-medium tracking-tight transition-colors duration-200 will-change-transform";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
