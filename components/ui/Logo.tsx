import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rain Tamer official logo. The source PNG has a transparent background and a
 * black tagline ("SEAMLESS GUTTERS | DRAINAGE SOLUTIONS"). On the dark theme
 * the tagline reads dim; in `compact` mode we shift the logo up so the tagline
 * is cropped out, leaving the unmistakable blue wordmark + droplet splash.
 *
 * TODO(launch): swap in a dark-theme variant of the official logo (tagline in
 * white instead of black) when it's available from the company.
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
        "relative inline-flex items-center overflow-hidden",
        isCompact ? "h-9 w-[140px] sm:h-10 sm:w-[160px]" : "h-20 w-[300px] sm:h-24 sm:w-[360px]",
        className,
      )}
      aria-label="Rain Tamer"
    >
      <Image
        src="/images/rain-tamer-logo.png"
        alt="Rain Tamer"
        fill
        priority={isCompact}
        sizes={isCompact ? "200px" : "400px"}
        className={cn(
          "select-none object-contain object-left",
          /*
           * The official PNG has the tagline beneath the wordmark. In compact
           * mode we scale up and shift down so the visible region is just the
           * wordmark + splash. In full mode we show the entire lockup.
           */
          isCompact && "scale-[1.45] translate-y-[-12%] origin-left",
        )}
      />
    </span>
  );
}
