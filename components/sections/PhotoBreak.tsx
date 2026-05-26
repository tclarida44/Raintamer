import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Cinematic full-bleed photo break used to divide major sections. Caption
 * is anchored to one corner and wrapped in a backdrop-blurred scrim so the
 * type pops regardless of how bright the photo is in that region.
 */
type Props = {
  image: string;
  eyebrow: string;
  caption: string;
  sub?: string;
  cta?: { label: string; href: string };
  align?: "bottom-left" | "bottom-right" | "center";
  size?: "compact" | "default" | "tall";
};

const sizeMap = {
  compact: "h-[42svh] min-h-[320px]",
  default: "h-[55svh] min-h-[420px]",
  tall: "h-[75svh] min-h-[560px]",
};

export function PhotoBreak({
  image,
  eyebrow,
  caption,
  sub,
  cta,
  align = "bottom-left",
  size = "default",
}: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden border-b border-bone-50/10 ${sizeMap[size]}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        quality={80}
        className="object-cover"
      />

      {/* Base darkening + corner-anchored scrim for the caption side */}
      <div
        aria-hidden
        className={
          align === "center"
            ? "absolute inset-0 bg-gradient-to-b from-ink-1000/60 via-ink-1000/55 to-ink-1000/85"
            : align === "bottom-right"
            ? "absolute inset-0 bg-gradient-to-bl from-ink-1000/92 via-ink-1000/40 to-ink-1000/20"
            : "absolute inset-0 bg-gradient-to-br from-ink-1000/92 via-ink-1000/40 to-ink-1000/20"
        }
      />
      {/* Bottom half always gets a stronger scrim so captions in the lower zone are unmistakable */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-1000/95 via-ink-1000/55 to-transparent"
      />

      {/* Brand-blue ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(31,102,255,0.18),transparent_70%)]"
      />

      {/* Caption */}
      <Container size="full" className="absolute inset-0 flex">
        <div
          className={`relative flex w-full ${
            align === "center"
              ? "items-center justify-center text-center"
              : align === "bottom-right"
              ? "items-end justify-end pb-12 lg:pb-16"
              : "items-end pb-12 lg:pb-16"
          }`}
        >
          {/* Backdrop-blurred panel behind the type so legibility holds on any photo */}
          <div
            className={`relative max-w-2xl rounded-[3px] border border-bone-50/10 bg-ink-1000/55 p-6 backdrop-blur-md sm:p-8 ${
              align === "center" ? "text-center" : ""
            }`}
          >
            <Eyebrow>
              <span className="text-rain-400">●</span>
              <span className="ml-2.5 text-bone-100">{eyebrow}</span>
            </Eyebrow>
            <p className="mt-5 font-display text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white text-pop-strong">
              {caption}
            </p>
            {sub && (
              <p className="mt-5 max-w-xl text-[17px] leading-[1.55] text-bone-100 text-pop">
                {sub}
              </p>
            )}
            {cta && (
              <Link
                href={cta.href}
                className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-rain-500 px-6 py-3 text-[14px] font-medium text-ink-1000 transition-colors hover:bg-rain-400"
              >
                {cta.label}
                <ArrowUpRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
