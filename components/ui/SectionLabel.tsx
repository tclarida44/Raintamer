import { cn } from "@/lib/utils";

/**
 * Editorial section index label: number + rule + label.
 * Designed to sit at the top of each section as a wayfinding marker.
 */
export function SectionLabel({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500",
        className,
      )}
    >
      <span className="text-rain-500">{number}</span>
      <span className="h-px w-8 bg-bone-50/15" />
      <span>{label}</span>
    </div>
  );
}
