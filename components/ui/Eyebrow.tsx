import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
