import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rain Tamer official logo. Source PNG is 782×319 — transparent background,
 * blue wordmark "Rain Tamer" with the sweeping arc and splash. No tagline
 * to crop, so we show the full lockup at the natural aspect ratio.
 */
export function Logo({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "full";
}) {
  const isCompact = variant === "compact";
  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        isCompact
          ? "aspect-[782/319] w-[210px] sm:w-[240px]"
          : "aspect-[782/319] w-[300px] sm:w-[360px]",
        className,
      )}
      aria-label="Rain Tamer"
    >
      <Image
        src="/images/rain-tamer-logo.png"
        alt="Rain Tamer"
        fill
        priority={isCompact}
        sizes={isCompact ? "240px" : "360px"}
        className="select-none object-contain object-left"
      />
    </span>
  );
}
