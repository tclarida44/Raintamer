import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide" | "full";
}) {
  const sizeClasses = {
    narrow: "max-w-2xl",
    default: "max-w-5xl",
    wide: "max-w-7xl",
    full: "max-w-[1640px]",
  };
  return (
    <div className={cn("mx-auto w-full px-6 md:px-10 lg:px-16", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
