"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { GUTTER_COLORS, GUTTER_PROFILES, type GutterProfile, type GutterColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

/**
 * Compact configurator with photoreal-feeling preview.
 *
 * Preview rendering is pure SVG but composited as a product-shot:
 *   - Studio backdrop (soft radial spot)
 *   - Cast shadow ellipse beneath the section
 *   - Base color fill
 *   - Bowl ambient-occlusion (inside the curve)
 *   - Surface gradient tuned per material (painted / copper / galvalume)
 *   - Top-edge specular highlight
 *   - Subtle texture overlays (brushed lines on galv, patina spots on copper)
 *   - Edge stroke for definition
 *
 * Same treatment is applied to the long sample bar below the cross-section.
 */
export function GutterConfigurator({ id }: { id?: string }) {
  const [profile, setProfile] = useState<GutterProfile>(GUTTER_PROFILES[1]);
  const [color, setColor] = useState<GutterColor>(GUTTER_COLORS[0]);

  const contactHref = useMemo(
    () =>
      `/contact?profile=${encodeURIComponent(profile.label)}&color=${encodeURIComponent(color.name)}`,
    [profile, color],
  );

  return (
    <div id={id} className="border border-bone-50/10 bg-ink-950">
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone-50/10 px-6 py-4 lg:px-8">
        <Eyebrow>Configurator · Live preview</Eyebrow>
        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300">
          <SwatchChip color={color} />
          {profile.label} · {color.name}
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* LEFT — Preview */}
        <div className="relative border-b border-bone-50/10 lg:col-span-7 lg:border-b-0 lg:border-r">
          <Preview profile={profile} color={color} />
        </div>

        {/* RIGHT — Controls */}
        <div className="px-6 py-7 lg:col-span-5 lg:px-8 lg:py-9">
          <Eyebrow>01 · Profile</Eyebrow>
          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {GUTTER_PROFILES.map((p) => (
              <ProfileTab
                key={p.id}
                profile={p}
                active={p.id === profile.id}
                onClick={() => setProfile(p)}
              />
            ))}
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.55] text-bone-300">{profile.description}</p>

          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <Eyebrow>02 · Color</Eyebrow>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">
                {color.premium ? "Premium metal" : `Painted aluminum`}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-7 lg:grid-cols-6">
              {GUTTER_COLORS.map((c) => (
                <Swatch
                  key={c.name}
                  c={c}
                  active={c.name === color.name}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-bone-50/10 pt-5">
            <SpecCell term="Width" value={`${profile.size}″`} />
            <SpecCell term="Family" value={titleCase(profile.family.replace("-", " "))} />
            <SpecCell term="Capacity" value={profile.size === 6 ? "1.7 gal/ft" : "1.2 gal/ft"} />
            <SpecCell term="Downspout" value={profile.size === 6 ? "3 × 4″" : "2 × 3″"} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button href={contactHref} size="md" className="flex-1">
              Add to estimate <ArrowRight className="size-4" />
            </Button>
            <Button href="/services/seamless-gutters" variant="outline" size="md">
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function titleCase(s: string) {
  return s
    .split(" ")
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function compactLabel(p: GutterProfile): string {
  if (p.family === "k-style") return `K-${p.size}″`;
  if (p.family === "box") return `Box ${p.size}″`;
  return `HR ${p.size}″`;
}

/* -------------------- Profile tab -------------------- */

function ProfileTab({
  profile,
  active,
  onClick,
}: {
  profile: GutterProfile;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-[3px] border px-2 py-3 transition-colors",
        active
          ? "border-rain-500 bg-rain-500/8 text-rain-400"
          : "border-bone-50/10 bg-ink-1000 text-bone-300 hover:border-bone-50/30 hover:text-bone-50",
      )}
      title={profile.label}
    >
      <ProfileSchematic family={profile.family} className="size-7" />
      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em]">
        {compactLabel(profile)}
      </span>
    </button>
  );
}

function ProfileSchematic({
  family,
  className,
}: {
  family: GutterProfile["family"];
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {family === "k-style" && (
          <path d="M 4 6 L 44 6 L 44 10 Q 42 13 40 14 L 40 28 L 8 28 L 8 14 Q 6 13 4 10 Z" />
        )}
        {family === "box" && <rect x="6" y="6" width="36" height="22" />}
        {family === "half-round" && (
          <path d="M 4 6 L 44 6 L 44 10 Q 44 28 24 28 Q 4 28 4 10 Z" />
        )}
      </g>
    </svg>
  );
}

/* -------------------- Material classification -------------------- */

type Material = "painted" | "copper" | "galv";

function classifyMaterial(c: GutterColor): Material {
  if (c.name.includes("Copper")) return "copper";
  if (c.name.includes("Galvalume")) return "galv";
  return "painted";
}

/* -------------------- Compact swatch chip + selectable swatch -------------------- */

function SwatchChip({ color }: { color: GutterColor }) {
  return (
    <span
      aria-hidden
      className="relative inline-block size-3 overflow-hidden rounded-[2px] border border-bone-50/15"
      style={{ background: color.hex }}
    >
      <MaterialOverlayCSS type={classifyMaterial(color)} />
    </span>
  );
}

function Swatch({
  c,
  active,
  onClick,
}: {
  c: GutterColor;
  active: boolean;
  onClick: () => void;
}) {
  const material = classifyMaterial(c);
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      title={c.name}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-[2px] border transition-transform",
        active
          ? "border-rain-500 ring-2 ring-rain-500/60 scale-105"
          : c.premium
          ? "border-copper-500/40 hover:scale-[1.06]"
          : "border-bone-50/12 hover:border-bone-50/30 hover:scale-[1.06]",
      )}
      style={{ background: c.hex }}
    >
      <MaterialOverlayCSS type={material} />
    </button>
  );
}

/** Quick CSS overlay used inside the small color chips/swatches. */
function MaterialOverlayCSS({ type }: { type: Material }) {
  if (type === "copper") {
    return (
      <>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,210,160,0.6) 0%, rgba(255,255,255,0.15) 35%, rgba(140,70,30,0.5) 75%, rgba(60,25,5,0.55) 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 mix-blend-overlay"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)" }}
        />
      </>
    );
  }
  if (type === "galv") {
    return (
      <>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 35%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-2/5 mix-blend-overlay"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)" }}
        />
      </>
    );
  }
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 mix-blend-overlay"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 mix-blend-overlay"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.22) 0%, transparent 100%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "rgba(255,255,255,0.18)" }}
      />
    </>
  );
}

/* -------------------- Spec cell -------------------- */

function SpecCell({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">{term}</p>
      <p className="mt-1 text-[14px] font-medium text-bone-50">{value}</p>
    </div>
  );
}

/* ====================================================================
   Preview card — the studio "product shot"
   ==================================================================== */

function Preview({ profile, color }: { profile: GutterProfile; color: GutterColor }) {
  const material = classifyMaterial(color);

  return (
    <div className="relative h-full px-6 py-8 lg:px-10 lg:py-10">
      {/* Studio backdrop — soft radial spot + faint vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 38%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.45) 0%, transparent 70%), linear-gradient(180deg, #0E0E10 0%, #0A0A0B 100%)",
        }}
      />
      {/* Hairline grid */}
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full opacity-50"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="cfg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,245,240,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#cfg-grid)" />
      </svg>

      <div className="relative flex h-full min-h-[480px] flex-col gap-6">
        {/* Top meta */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
              Live preview · installed
            </p>
            <p className="mt-1 font-display text-xl font-medium tracking-[-0.02em] text-bone-50">
              {profile.label} · {color.name}
            </p>
          </div>
          {color.premium && (
            <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-copper-500/40 bg-copper-500/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-copper-500">
              <Sparkles className="size-3" /> Premium
            </span>
          )}
        </div>

        {/* Real installed-gutter photograph keyed to the selected profile family.
            Photo stays constant; only the SVG cross-section below recolors. */}
        <ProfilePhoto profile={profile} color={color} />

        {/* Technical cross-section in the chosen color */}
        <div className="flex flex-1 items-center justify-center">
          <BigCrossSection profile={profile} color={color} material={material} />
        </div>

        {/* Long side-elevation "run" preview — same shading treatment, recolors live */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
              Side elevation · 4-foot run
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              {profile.label}
            </span>
          </div>
          <SampleBar profile={profile} color={color} material={material} />
        </div>

        {/* Footer caption */}
        <div className="flex items-center justify-between border-t border-bone-50/10 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
            {material === "painted"
              ? "Painted aluminum — coil from Englert / Berger"
              : material === "copper"
              ? "Solid copper — hand-soldered seams"
              : "Galvalume Plus steel — commercial-grade coil"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
            {color.name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Profile photo (real install, keyed to profile family) --------------------
 *
 * Photo stays constant for the chosen profile family — only the cross-section
 * SVG below recolors when you switch swatches. One example photo per primary
 * profile type, exactly what the user asked for.
 */

const PROFILE_PHOTO: Record<
  GutterProfile["family"],
  { src: string; alt: string; label: string }
> = {
  "k-style": {
    src: "/images/stock/gutter-k-style.jpg",
    alt: "A real installed K-style gutter — close-up of the eave line.",
    label: "K-Style · real install",
  },
  box: {
    src: "/images/stock/gutter-box.jpg",
    alt: "A real installed box-profile gutter on a building eave.",
    label: "Box profile · real install",
  },
  "half-round": {
    src: "/images/stock/gutter-half-round.jpg",
    alt: "A real installed copper half-round gutter on a stucco home.",
    label: "Half-round · real install",
  },
};

function ProfilePhoto({
  profile,
  color,
}: {
  profile: GutterProfile;
  color: GutterColor;
}) {
  const { src, alt, label } = PROFILE_PHOTO[profile.family];

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[3px] border border-bone-50/12">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 480px, 90vw"
        quality={80}
        className="object-cover"
      />

      {/* Vignette + bottom scrim for caption legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(10,10,11,0.65) 100%)",
        }}
      />

      {/* Floating label + color reference chip */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
        <span className="rounded-[2px] border border-bone-50/15 bg-ink-1000/65 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-bone-100 backdrop-blur">
          {label}
        </span>
        <span className="flex items-center gap-2 rounded-[2px] border border-bone-50/15 bg-ink-1000/65 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-bone-100 backdrop-blur">
          <span
            aria-hidden
            className="inline-block size-3 rounded-[1.5px] border border-bone-50/20"
            style={{ background: color.hex }}
          />
          {color.name}
        </span>
      </div>
    </div>
  );
}

/* ====================================================================
   Big cross-section — multi-layer realistic SVG render
   ==================================================================== */

function BigCrossSection({
  profile,
  color,
  material,
}: {
  profile: GutterProfile;
  color: GutterColor;
  material: Material;
}) {
  const W = profile.size === 6 ? 280 : 240;
  const H = profile.size === 6 ? 200 : 180;
  const SX = 30;
  const SY = 20;

  // Outer shape path
  let outline = "";
  // Inner bowl path (for AO inside the gutter)
  let bowl = "";
  // Top edge highlight path (thin sliver along the top rim)
  let topRim = "";

  if (profile.family === "k-style") {
    outline = `
      M ${SX} ${SY}
      L ${SX + W} ${SY}
      L ${SX + W} ${SY + 28}
      Q ${SX + W - 10} ${SY + 50} ${SX + W - 24} ${SY + 64}
      L ${SX + W - 24} ${SY + H - 18}
      Q ${SX + W - 32} ${SY + H} ${SX + W - 50} ${SY + H}
      L ${SX + 50} ${SY + H}
      Q ${SX + 32} ${SY + H} ${SX + 24} ${SY + H - 18}
      L ${SX + 24} ${SY + 64}
      Q ${SX + 10} ${SY + 50} ${SX} ${SY + 28}
      Z
    `;
    bowl = `
      M ${SX + 8} ${SY + 12}
      L ${SX + W - 8} ${SY + 12}
      L ${SX + W - 28} ${SY + 60}
      L ${SX + W - 28} ${SY + H - 22}
      L ${SX + 28} ${SY + H - 22}
      L ${SX + 28} ${SY + 60}
      Z
    `;
    topRim = `M ${SX + 4} ${SY + 4} L ${SX + W - 4} ${SY + 4}`;
  } else if (profile.family === "box") {
    outline = `M ${SX} ${SY} L ${SX + W} ${SY} L ${SX + W} ${SY + H} L ${SX} ${SY + H} Z`;
    bowl = `M ${SX + 6} ${SY + 12} L ${SX + W - 6} ${SY + 12} L ${SX + W - 6} ${SY + H - 6} L ${SX + 6} ${SY + H - 6} Z`;
    topRim = `M ${SX + 4} ${SY + 4} L ${SX + W - 4} ${SY + 4}`;
  } else {
    outline = `
      M ${SX} ${SY}
      L ${SX + W} ${SY}
      L ${SX + W} ${SY + 18}
      Q ${SX + W} ${SY + H} ${SX + W - H / 2 - 8} ${SY + H}
      L ${SX + H / 2 + 8} ${SY + H}
      Q ${SX} ${SY + H} ${SX} ${SY + 18}
      Z
    `;
    bowl = `
      M ${SX + 8} ${SY + 12}
      L ${SX + W - 8} ${SY + 12}
      Q ${SX + W - 12} ${SY + H - 10} ${SX + W - H / 2 - 12} ${SY + H - 10}
      L ${SX + H / 2 + 12} ${SY + H - 10}
      Q ${SX + 12} ${SY + H - 10} ${SX + 8} ${SY + 12}
      Z
    `;
    topRim = `M ${SX + 6} ${SY + 4} L ${SX + W - 6} ${SY + 4}`;
  }

  // Patina spots for copper — fixed pseudo-random positions so they don't
  // change every render
  const patinaSpots =
    material === "copper"
      ? [
          { x: SX + 50, y: SY + 70, r: 5 },
          { x: SX + 120, y: SY + 90, r: 7 },
          { x: SX + 180, y: SY + 50, r: 4 },
          { x: SX + 90, y: SY + 130, r: 6 },
          { x: SX + 200, y: SY + 110, r: 5 },
          { x: SX + 230, y: SY + 70, r: 3 },
          { x: SX + 60, y: SY + 150, r: 4 },
        ]
      : [];

  return (
    <svg
      // Negative y origin gives the dimension callout above the shape room to
      // render without getting clipped at the top edge.
      viewBox={`0 -22 ${W + 60} ${H + 92}`}
      className="w-full max-w-[28rem]"
      aria-hidden
    >
      <defs>
        {/* Studio cast shadow on the "floor" */}
        <radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* Inside-bowl AO — top is darker, bottom soft */}
        <linearGradient id="ao-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0.55" />
          <stop offset="35%" stopColor="black" stopOpacity="0.18" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>

        {/* Painted aluminum: satin sheen */}
        <linearGradient id="surface-painted" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.34" />
          <stop offset="14%" stopColor="white" stopOpacity="0.12" />
          <stop offset="32%" stopColor="white" stopOpacity="0" />
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="75%" stopColor="black" stopOpacity="0.15" />
          <stop offset="100%" stopColor="black" stopOpacity="0.45" />
        </linearGradient>

        {/* Copper: rich tonal range from warm-white top to deep-brown bottom */}
        <linearGradient id="surface-copper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE5C2" stopOpacity="0.88" />
          <stop offset="12%" stopColor="#FFCB8A" stopOpacity="0.7" />
          <stop offset="32%" stopColor="#E08A45" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#8B4416" stopOpacity="0.35" />
          <stop offset="78%" stopColor="#4B1F07" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1F0A02" stopOpacity="0.75" />
        </linearGradient>

        {/* Galv: silvery cool gradient with bright top */}
        <linearGradient id="surface-galv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.78" />
          <stop offset="18%" stopColor="#E8EFF5" stopOpacity="0.42" />
          <stop offset="40%" stopColor="#9CAAB8" stopOpacity="0.18" />
          <stop offset="62%" stopColor="#4F5762" stopOpacity="0.25" />
          <stop offset="85%" stopColor="#1F242B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0A0D11" stopOpacity="0.7" />
        </linearGradient>

        {/* Top-edge specular sliver */}
        <linearGradient id="top-spec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Brushed vertical lines for galv (subtle stripe pattern) */}
        <pattern
          id="brushed"
          x="0"
          y="0"
          width="3"
          height={H + 10}
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="1" height={H + 10} fill="rgba(255,255,255,0.07)" />
          <rect x="2" y="0" width="0.5" height={H + 10} fill="rgba(0,0,0,0.06)" />
        </pattern>

        {/* Strong cinematic drop shadow */}
        <filter id="cs-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#000"
            floodOpacity="0.55"
          />
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="22"
            floodColor="#000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* Floor contact shadow */}
      <ellipse
        cx={SX + W / 2}
        cy={SY + H + 22}
        rx={W * 0.55}
        ry="10"
        fill="url(#floor-shadow)"
      />

      {/* Cross-section, lit */}
      <g filter="url(#cs-shadow)">
        {/* Base color */}
        <path d={outline} fill={color.hex} />

        {/* Surface gradient (per material) */}
        <path
          d={outline}
          fill={
            material === "copper"
              ? "url(#surface-copper)"
              : material === "galv"
              ? "url(#surface-galv)"
              : "url(#surface-painted)"
          }
        />

        {/* Bowl ambient-occlusion (only for shapes with inner concavity) */}
        {profile.family !== "box" && (
          <path d={bowl} fill="url(#ao-inside)" opacity="0.85" />
        )}

        {/* Brushed texture (galv only) */}
        {material === "galv" && <path d={outline} fill="url(#brushed)" opacity="0.55" />}

        {/* Patina spots (copper only) */}
        {material === "copper" &&
          patinaSpots.map((s, i) => (
            <ellipse
              key={i}
              cx={s.x}
              cy={s.y}
              rx={s.r}
              ry={s.r * 0.7}
              fill="#3D5F45"
              opacity="0.18"
            />
          ))}

        {/* Top edge specular highlight */}
        <rect
          x={SX + 2}
          y={SY + 1}
          width={W - 4}
          height="5"
          fill="url(#top-spec)"
          opacity="0.85"
        />

        {/* Edge stroke */}
        <path d={outline} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1.2" />

        {/* Top rim highlight line */}
        <path d={topRim} stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" fill="none" />
      </g>

      {/* Dimension line */}
      <g stroke="rgba(245,245,240,0.4)" strokeWidth="0.75" fill="none">
        <line x1={SX} y1={SY - 10} x2={SX + W} y2={SY - 10} />
        <line x1={SX} y1={SY - 14} x2={SX} y2={SY - 6} />
        <line x1={SX + W} y1={SY - 14} x2={SX + W} y2={SY - 6} />
      </g>
      <text
        x={SX + W / 2}
        y={SY - 14}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="#B5B5B0"
        letterSpacing="2"
      >
        {profile.size}.0″
      </text>
    </svg>
  );
}

/* ====================================================================
   Sample bar — long side elevation with same realism treatment
   ==================================================================== */

function SampleBar({
  profile,
  color,
  material,
}: {
  profile: GutterProfile;
  color: GutterColor;
  material: Material;
}) {
  const h = profile.size === 6 ? 72 : 60;

  let pathD = "";
  if (profile.family === "k-style") {
    pathD = `M 0 0 L 1200 0 L 1200 8 Q 1196 14 1190 18 L 1190 ${h - 8} Q 1190 ${h} 1180 ${h} L 20 ${h} Q 10 ${h} 10 ${h - 8} L 10 18 Q 4 14 0 8 Z`;
  } else if (profile.family === "box") {
    pathD = `M 0 0 L 1200 0 L 1200 ${h} L 0 ${h} Z`;
  } else {
    pathD = `M 0 0 L 1200 0 L 1200 14 Q 1200 ${h} ${1200 - h / 2 - 4} ${h} L ${h / 2 + 4} ${h} Q 0 ${h} 0 14 Z`;
  }

  // Patina spots positioned along the bar for copper
  const patinaSpots =
    material === "copper"
      ? [180, 360, 520, 720, 880, 1040].map((x, i) => ({
          x,
          y: 18 + (i % 3) * 10,
          r: 4 + (i % 3),
        }))
      : [];

  return (
    <svg viewBox={`0 0 1200 ${h + 26}`} className="w-full" aria-hidden>
      <defs>
        <linearGradient id="bar-painted" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.30" />
          <stop offset="14%" stopColor="white" stopOpacity="0.10" />
          <stop offset="32%" stopColor="white" stopOpacity="0" />
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="80%" stopColor="black" stopOpacity="0.18" />
          <stop offset="100%" stopColor="black" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id="bar-copper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE5C2" stopOpacity="0.82" />
          <stop offset="14%" stopColor="#FFCB8A" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#E08A45" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#8B4416" stopOpacity="0.35" />
          <stop offset="88%" stopColor="#4B1F07" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1F0A02" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="bar-galv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="20%" stopColor="#E8EFF5" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#9CAAB8" stopOpacity="0.18" />
          <stop offset="68%" stopColor="#4F5762" stopOpacity="0.28" />
          <stop offset="88%" stopColor="#1F242B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0A0D11" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="bar-top-spec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <pattern id="bar-brushed" x="0" y="0" width="2" height={h} patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="0.6" height={h} fill="rgba(255,255,255,0.07)" />
          <rect x="1.4" y="0" width="0.3" height={h} fill="rgba(0,0,0,0.05)" />
        </pattern>
        <filter id="bar-shadow" x="-2%" y="-30%" width="104%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g transform="translate(0, 8)" filter="url(#bar-shadow)">
        {/* Base color */}
        <path d={pathD} fill={color.hex} />
        {/* Surface gradient */}
        <path
          d={pathD}
          fill={
            material === "copper"
              ? "url(#bar-copper)"
              : material === "galv"
              ? "url(#bar-galv)"
              : "url(#bar-painted)"
          }
        />
        {/* Brushed texture for galv */}
        {material === "galv" && <path d={pathD} fill="url(#bar-brushed)" opacity="0.55" />}
        {/* Patina spots for copper */}
        {material === "copper" &&
          patinaSpots.map((s, i) => (
            <ellipse
              key={i}
              cx={s.x}
              cy={s.y}
              rx={s.r}
              ry={s.r * 0.6}
              fill="#3D5F45"
              opacity="0.16"
            />
          ))}
        {/* Top edge specular sliver */}
        <rect x="2" y="1" width="1196" height="3" fill="url(#bar-top-spec)" opacity="0.9" />
        {/* Edge definition */}
        <path d={pathD} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.6" />
        {/* Bright pin-light at top */}
        <line x1="6" y1="2" x2="1194" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
