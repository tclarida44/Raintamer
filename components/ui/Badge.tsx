import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[2px] border border-bone-50/10 bg-ink-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
