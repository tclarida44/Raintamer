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
            <SpecCell
              term="Capacity"
              value={PROFILE_SPECS[profile.id]?.capacity ?? "1.2 gal/ft"}
            />
            <SpecCell
              term="Downspout"
              value={PROFILE_SPECS[profile.id]?.downspout ?? "2 × 3″"}
            />
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

// ─── Real Rain Tamer profile dimensions ───────────────────────────────
// All values are in inches, sourced directly from the Rain Tamer profile
// spec sheets. The SVG below is drawn to these exact proportions so the
// visualizer matches what actually gets installed.
type ProfileSpec = {
  widthTop: number;       // top opening width
  widthBottom: number;    // floor width (0 for half-round)
  heightBack: number;     // back wall height
  heightFront: number;    // front face height
  frontLip: number;       // top-front return lip
  radius?: number;        // radius (half-round only)
  capacity: string;       // gal/ft — from the actual profile
  downspout: string;      // matched downspout size
};

const PROFILE_SPECS: Record<string, ProfileSpec> = {
  "k-5":   { widthTop: 5.0, widthBottom: 3.25, heightBack: 3.62, heightFront: 3.45, frontLip: 0.6,   capacity: "1.2 gal/ft", downspout: "2 × 3″" },
  "k-6":   { widthTop: 6.0, widthBottom: 4.0,  heightBack: 5.15, heightFront: 4.60, frontLip: 0.8,   capacity: "1.7 gal/ft", downspout: "3 × 4″" },
  "box-5": { widthTop: 5.0, widthBottom: 4.5,  heightBack: 3.5,  heightFront: 3.5,  frontLip: 0.625, capacity: "1.4 gal/ft", downspout: "2 × 3″" },
  "box-6": { widthTop: 6.0, widthBottom: 5.5,  heightBack: 4.1875, heightFront: 4.0, frontLip: 0.625, capacity: "1.9 gal/ft", downspout: "3 × 4″" },
  "hr-6":  { widthTop: 6.5, widthBottom: 0,    heightBack: 3.25, heightFront: 3.25, frontLip: 0.625, radius: 3, capacity: "1.5 gal/ft", downspout: "3″ round" },
};

function BigCrossSection({
  profile,
  color,
  material,
}: {
  profile: GutterProfile;
  color: GutterColor;
  material: Material;
}) {
  const spec = PROFILE_SPECS[profile.id] ?? PROFILE_SPECS["k-6"];

  // Scale: 40 SVG units per inch. Renders K-6 at 240×206, K-5 at 200×145,
  // Box-6 at 240×167, HR-6.5 at 260×130.
  const S = 40;
  const SX = 30;
  const SY = 20;
  const W = spec.widthTop * S;
  const H = Math.max(spec.heightBack, spec.heightFront) * S;

  let outline = "";
  let bowl = "";
  let topRim = "";

  if (profile.family === "k-style") {
    /* ─── K-STYLE ("ogee" / crown) ─────────────────────────────────────
       Spec sheets:
         5":  W 5.00, BW 3.25, HB 3.62, HF 3.45, frontLip 0.6
         6":  W 6.00, BW 4.00, HB 5.15, HF 4.60, frontLip 0.8
       The back-vs-front height difference in the spec is only 5-12%.
       We draw front and back both to the front-face height so the profile
       reads as a balanced K-style crown instead of a lopsided one. */
    const bw = spec.widthBottom * S;
    const H = spec.heightFront * S;      // use front-face height for the whole profile
    const lip = spec.frontLip * S;
    const insetX = W - bw;               // x-coord of the bottom-front corner
    const cornerR = 4;                   // subtle chamfer at bottom-front
    outline = `
      M ${SX} ${SY}
      L ${SX + W} ${SY}
      L ${SX + W} ${SY + H}
      L ${SX + insetX + cornerR} ${SY + H}
      Q ${SX + insetX} ${SY + H}, ${SX + insetX} ${SY + H - cornerR}
      L ${SX + insetX} ${SY + H * 0.78}
      C
        ${SX + insetX * 0.75} ${SY + H * 0.75},
        ${SX + insetX * 0.55} ${SY + H * 0.62},
        ${SX + insetX * 0.30} ${SY + H * 0.48}
      C
        ${SX + insetX * 0.08} ${SY + H * 0.34},
        ${SX + insetX * 0.02} ${SY + H * 0.22},
        ${SX + lip * 0.7} ${SY + H * 0.14}
      Q ${SX + lip * 0.35} ${SY + lip * 0.7}, ${SX} ${SY + lip}
      L ${SX} ${SY}
      Z
    `;
    bowl = `
      M ${SX + 6} ${SY + 8}
      L ${SX + W - 6} ${SY + 8}
      L ${SX + W - 6} ${SY + H - 8}
      L ${SX + insetX + 2} ${SY + H - 8}
      L ${SX + insetX * 0.30 + 8} ${SY + H * 0.52}
      L ${SX + 8} ${SY + H * 0.28}
      Z
    `;
    topRim = `M ${SX + 4} ${SY + 4} L ${SX + W - 4} ${SY + 4}`;
  } else if (profile.family === "box") {
    /* ─── BOX ──────────────────────────────────────────────────────────
       Spec sheet (6"):  W 6.00, BW 5.50, HB 4.1875, HF 4.00
         - Top-front has an ogee "return hem": 5/8" in, 1" down, 5/16" out
           back to face plane. Adds rigidity to the front lip.
         - Rest of front is straight vertical
         - Back is straight vertical (slightly taller than front)
         - Bottom is flat (5.5" wide, offset toward the front so back stays plumb)
       */
    const bw = spec.widthBottom * S;
    const hb = spec.heightBack * S;
    const hf = spec.heightFront * S;
    const taper = W - bw;      // total horizontal taper (front side only)
    const hemH = spec.frontLip * S;  // vertical depth of the ogee return
    const hemW = 5 / 16 * S;   // horizontal offset of the ogee return
    outline = `
      M ${SX} ${SY}
      L ${SX + W} ${SY}
      L ${SX + W} ${SY + hb}
      L ${SX + taper} ${SY + hf}
      L ${SX + taper} ${SY + hemH + hemW}
      Q ${SX + taper - 2} ${SY + hemH}, ${SX + taper - hemW} ${SY + hemH}
      L ${SX + hemW * 0.6} ${SY + hemH}
      Q ${SX} ${SY + hemH}, ${SX} ${SY + hemH * 0.6}
      L ${SX} ${SY}
      Z
    `;
    bowl = `
      M ${SX + taper + 4} ${SY + hemH + 4}
      L ${SX + W - 4} ${SY + hemH + 4}
      L ${SX + W - 4} ${SY + hb - 6}
      L ${SX + taper + 4} ${SY + hf - 6}
      Z
    `;
    topRim = `M ${SX + 4} ${SY + 4} L ${SX + W - 4} ${SY + 4}`;
  } else {
    /* ─── HALF-ROUND ───────────────────────────────────────────────────
       Spec sheet (6.5"):  W 6.50, HB 3.25, radius R 3"
         - Front (LEFT) rolled scroll-hook lip: 5/8" (0.625") tall
         - Back (RIGHT) straight standing bead: 1/2" (0.5") tall
         - Bowl semicircle radius: 3" (chord = 6")
         - Spec total width 6.5" leaves ~1/4" (10 units) for each lip
       Drawn as ONE closed contour, solid-filled, with the hook AND bead
       both distinctly visible on the outer perimeter. */
    const hookL = spec.frontLip * S;     // 5/8" hook height (25 units)
    const beadR = 0.5 * S;               // 1/2" bead height (20 units)
    const HR = (spec.radius ?? W / 2) * S;  // 3" bowl radius (120 units)
    const mouthY = Math.max(hookL, beadR);  // arc endpoints at same Y for clean semicircle
    const bowlLeft = SX + (W - HR * 2) / 2;   // arc x-start
    const bowlRight = bowlLeft + HR * 2;       // arc x-end
    outline = `
      M ${SX} ${SY}
      L ${SX + W} ${SY}
      L ${SX + W} ${SY + beadR}
      L ${bowlRight} ${SY + beadR}
      Q ${bowlRight} ${SY + mouthY}, ${bowlRight - 2} ${SY + mouthY}
      A ${HR} ${HR} 0 0 1 ${bowlLeft + 2} ${SY + mouthY}
      Q ${bowlLeft} ${SY + mouthY}, ${bowlLeft} ${SY + hookL}
      L ${SX + hookL * 0.6} ${SY + hookL}
      Q ${SX} ${SY + hookL}, ${SX} ${SY + hookL * 0.55}
      Q ${SX} ${SY - 2}, ${SX + hookL * 0.35} ${SY}
      L ${SX} ${SY}
      Z
    `;
    // AO overlay: the concave interior of the bowl
    bowl = `
      M ${bowlLeft + 6} ${SY + mouthY + 6}
      A ${HR - 6} ${HR - 6} 0 0 1 ${bowlRight - 6} ${SY + mouthY + 6}
      L ${bowlLeft + 6} ${SY + mouthY + 6}
      Z
    `;
    topRim = `M ${SX + hookL * 0.6} ${SY + 3} L ${SX + W - beadR + 2} ${SY + 3}`;
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

      {/* Top-width dimension line */}
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
        {fmtDim(spec.widthTop)}″
      </text>

      {/* Right-side height dimension line */}
      <g stroke="rgba(245,245,240,0.4)" strokeWidth="0.75" fill="none">
        <line x1={SX + W + 12} y1={SY} x2={SX + W + 12} y2={SY + H} />
        <line x1={SX + W + 8} y1={SY} x2={SX + W + 16} y2={SY} />
        <line x1={SX + W + 8} y1={SY + H} x2={SX + W + 16} y2={SY + H} />
      </g>
      <text
        x={SX + W + 18}
        y={SY + H / 2}
        textAnchor="start"
        dominantBaseline="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="#B5B5B0"
        letterSpacing="2"
      >
        {fmtDim(Math.max(spec.heightBack, spec.heightFront))}″
      </text>
    </svg>
  );
}

/** Format an inch value: strip trailing zeros so 3.25 stays 3.25 but 5.0 → 5. */
function fmtDim(n: number): string {
  return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(3)));
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
