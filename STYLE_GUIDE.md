# Rain Tamer Style Guide

Editorial industrial dark mode. Confidence through restraint. Type does the work.

## Design intent

The site should read as: serious operator, not tech-startup-doing-gutters. Cutting edge through restraint, not ornament. Confidence through whitespace and type, not gradients and animation gimmicks.

References: Stripe Press, Linear, Patek Philippe, Tesla Pro pages, top-tier architecture firm portfolios. We are a tier-one brand that happens to install gutters.

## Color tokens

All colors are exposed as Tailwind tokens via the `@theme` block in [app/globals.css](app/globals.css). Use the token, not the hex.

| Role | Token | Hex |
| --- | --- | --- |
| Page background | `bg-ink-1000` | `#0A0A0B` |
| Section background (alt) | `bg-ink-950` | `#0E0E10` |
| Card / panel | `bg-ink-900` | `#131316` |
| Elevated surface | `bg-ink-800` | `#1C1C20` |
| Headlines | `text-bone-50` | `#F5F5F0` |
| Body | `text-bone-200` / `text-bone-300` | warm off-white |
| Muted / captions | `text-bone-500` | `#6B6B68` |
| Brand accent (CTA, key data) | `bg-rain-500` / `text-rain-500` | `#1F66FF` (Rain Tamer wordmark blue) |
| Accent hover / link | `text-rain-400` | `#5188FF` |
| Warmth (copper callouts only) | `text-copper-500` | `#C66A2C` |
| Hairline borders | `rgba(245,245,240,0.10)` | use `border-bone-50/10` |

Rules:
- Headlines: `text-bone-50`. Body: `text-bone-200` or `bone-300` depending on emphasis.
- Accent blue is jewelry. Use sparingly: primary CTA, eyebrow numbers, hover states, key data.
- Copper exists for premium-metal product callouts. Don't use as a UI color.
- Borders are always hairline. Solid color borders only on focused/active states.

## Typography

Two families plus a mono accent. All loaded via `next/font` in [app/layout.tsx](app/layout.tsx).

- **Display**: Bricolage Grotesque (variable, `opsz` + `wdth` axes). A modern editorial grotesque — sleeker than a traditional serif but with more character than a neutral neo-grotesque. Weight ~500–600 with very tight letter-spacing.
- **Body / UI**: Geist.
- **Mono**: Geist Mono. Used for eyebrows, stats labels, section labels, specs.

Headlines lean medium (500–600) at very large sizes with tight tracking (`-0.04em` and below). The variable `opsz` axis automatically refines the strokes at display sizes — letting headlines breathe without the weight. Real italic variants on Bricolage are used for thematic emphasis ("Oklahoma weather.", "the next storm.").

### Type scale

| Use | Class pattern |
| --- | --- |
| Hero / homepage finale | `font-display font-medium tracking-[-0.045em] text-[clamp(3.25rem,11vw,11rem)] leading-[0.88]` |
| Section H2 | `font-display font-medium tracking-[-0.04em] text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]` |
| Card / page H3 | `font-display text-2xl sm:text-3xl font-medium tracking-[-0.02em]` |
| Body | base sans, `text-[15px]` to `text-[17px]`, `leading-[1.55]` to `leading-[1.6]`, `text-bone-300` |
| Eyebrow | `<Eyebrow>` component (mono, 10.5px, 22% tracking, all-caps) |
| Numbers / stats | `.num` utility (Bricolage Grotesque + tabular-nums) |

Don't go below 13px for body. Don't go above 14px for mono eyebrows.

## Spacing & layout

- **Sections**: `py-24 lg:py-36`. Big breathing room. Confidence reads as restraint.
- **Container**: `<Container size="full">` (max 1640px) for almost everything. `size="narrow"` (max 2xl) for blog post bodies.
- **Page padding**: `px-6 md:px-10 lg:px-16`.
- **Grids**: 12-column with `gap-10 lg:gap-16`. Common split: 5/7 (label/content), 7/5 (lead/aside), or 12 (full bleed).
- **Section labels**: every major section opens with `<SectionLabel number="0X" label="..." />`.

## Components

Reusable primitives live in `components/ui/`:

- `Button` — three variants: `primary` (rain-500 fill), `outline` (hairline border), `ghost` (transparent). Two sizes: `md` (h-11), `lg` (h-14). Slight 3px radius. Never pill.
- `Eyebrow` — mono uppercase 10.5px, 22% tracking, `text-bone-500`.
- `SectionLabel` — number + rule + label. The site's wayfinding system.
- `Badge` — tiny mono tag for metadata.
- `Reveal` — scroll-driven fade-up. IntersectionObserver based, no Framer Motion.
- `Container`, `Input`, `TextArea`, `Select`, `Label`, `FieldError`

## Motion

Subtle. Section entries use `<Reveal>` for a soft fade-up (16px Y, 600ms ease). That's it for ambient motion.

- **Hover**: link colors shift, photo tiles scale a tiny `1.03` over 1.2s ease-out. No quick lifts, no glow rings.
- **Buttons**: background color change only. No glow.
- **FAQ accordion**: grid-template-rows from 0fr to 1fr (smooth height animation, no layout shift).
- **Configurator**: instant state changes. No animated swap.
- **prefers-reduced-motion**: clamped via globals.css. Reveal snaps to visible. Carousel auto-advance disabled.

No Framer Motion in the new system; CSS transitions and IntersectionObserver cover everything.

## Iconography

- **Library**: Lucide React. Strokes only.
- **Sizing**: `size-4` (16px) for inline / button icons; `size-5` (20px) for cards. Larger only in deliberate hero contexts.
- **Color**: `text-bone-500` resting, `text-rain-400` on hover/active. Never icon backgrounds.

## Imagery

- **Less, larger**. One signature photo per major section, not nine grids of tiles.
- All photos use `next/image` with explicit `fill` + `sizes` or `width`/`height`.
- Hover treatment: slow `scale-[1.03]` over 1.2s ease-out. No filters, no overlays beyond a thin bottom gradient where text reads over photo.
- Stock photography (current state) lives in `public/images/stock/`. See [public/images/stock/ATTRIBUTION.md](public/images/stock/ATTRIBUTION.md). Replace with real Rain Tamer photography before launch.

## Configurator

The configurator is a product spec page, not a toy:

- Header strip with eyebrow + current selection state.
- Four-zone grid: profile selector (left), product preview (center), spec sheet (right), live sample bar + color matrix (full-width below).
- Profile schematics use hairline engineering-drawing strokes with dimension ticks. No 3D, no perspective.
- Color picker shows all 23 painted swatches in a tight matrix, with the 2 premium metals broken out on a separate row.
- Spec rows use mono labels + sans values. Width, family, capacity, downspout size, material, hangers, sealant.

## Forms

- Always use `Input` / `TextArea` / `Select` from `components/ui/Input.tsx`.
- Labels above fields in mono uppercase.
- Validation errors below fields in copper-500 mono uppercase.
- Required asterisk in accent blue.
- Step indicators are hairline strips (1px high), not pills or dots.
- Quote-form services list is a vertical hairline-divided list with numbered rows, not a card grid.

## Accessibility

- WCAG 2.2 AA across the dark theme. The most fragile pairing is `text-bone-500` on `bg-ink-1000`; use that only at ≥ 11px mono and never for content reading.
- Skip-to-content link present, brand-blue background on focus.
- Focus rings: 2px brand-blue with 3px offset, 2px radius.
- All animation gates behind `prefers-reduced-motion: reduce`.
- Every interactive element keyboard-reachable; every icon-only button has `aria-label`.

## Don't

- Don't use gradient text on headlines. The serif is the texture.
- Don't introduce a third font family.
- Don't use pill buttons.
- Don't add per-section background images that fight the editorial dark scene.
- Don't reintroduce Framer Motion. The `Reveal` + CSS transitions cover everything.
- Don't reach for new Tailwind plugins. Core only.
- Don't use stock photography in production. Replace before launch.
- Don't crowd a section with too many images. Less is more.

## Do

- Do let headlines breathe. Whitespace = confidence.
- Do use Fraunces italic for thematic emphasis on a single word per page (max).
- Do present technical data as data. Spec rows, dimension ticks, capacities, hanger spacing.
- Do treat every section like a magazine spread, not a CMS template.
