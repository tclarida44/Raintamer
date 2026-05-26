export type ServiceSlug =
  | "seamless-gutters"
  | "commercial-gutters"
  | "french-drains"
  | "gutter-guards"
  | "gutter-cleaning";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  /** Eyebrow used above the headline on detail pages */
  eyebrow: string;
  tagline: string;
  /** Used on the services grid */
  blurb: string;
  /** Long-form intro on the detail page */
  intro: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "seamless-gutters",
    shortTitle: "Seamless Gutters",
    title: "Seamless Aluminum Gutters",
    eyebrow: "Residential / 5\" & 6\"",
    tagline: "Cut on site, formed to your home, built to last.",
    blurb:
      "Continuous aluminum runs, hand-mitered corners, and 23 painted colors plus copper and Galvalume.",
    intro:
      "Seamless gutters are formed on site from a single coil of aluminum, sized to the exact length of each roof run. No factory joints means fewer leak points and a cleaner line down the eave. Pair the right profile and color with our internal-hanger install standards and the result is a system that disappears into the architecture and quietly does its job for decades.",
    bullets: [
      "K-Style 5\" and 6\", Box 5\" and 6\", Half Round 6\"",
      "23 baked-on painted colors plus solid copper and Galvalume Plus steel",
      "Hand-mitered, riveted, and sealed corners",
      "Internal support hangers spaced every two feet",
      "Outlet tubes at every downspout for unrestricted flow",
    ],
  },
  {
    slug: "commercial-gutters",
    shortTitle: "Commercial Gutters",
    title: "Commercial Gutter Systems",
    eyebrow: "Commercial",
    tagline: "Larger profiles, heavier gauges, schedule-friendly crews.",
    blurb:
      "Box gutters, oversized downspouts, and storm-rated fastening for offices, warehouses, schools, and multifamily.",
    intro:
      "Commercial roofs move more water than residential, and they fail differently when drainage is wrong. We size box and K-style profiles to match the actual roof load, specify heavier-gauge aluminum or Galvalume, and coordinate installs around your operating schedule. From single-tenant retail to multi-building campuses, we handle the full scope.",
    bullets: [
      "Heavier-gauge aluminum and Galvalume Plus steel",
      "6\" and 7\" box gutter profiles for high-load roofs",
      "Oversized 4\" round and rectangular downspouts",
      "Stamped engineering documentation on request",
      "Crews that work around your hours of operation",
    ],
  },
  {
    slug: "french-drains",
    shortTitle: "French Drains",
    title: "French Drain Systems",
    eyebrow: "Drainage",
    tagline: "Move water away from the foundation, not just off the roof.",
    blurb:
      "Engineered subsurface drains paired with downspout extensions to keep water out of basements and crawlspaces.",
    intro:
      "A gutter only solves half the problem. The other half is what happens once water hits the ground. French drains capture surface and subsurface water in a perforated pipe wrapped in fabric and gravel, then carry it to a daylight outlet or storm tie-in. We size the system to the actual lot grade, not a guess.",
    bullets: [
      "Site-graded slope, never less than one inch per ten feet",
      "Perforated PVC or HDPE wrapped in non-woven fabric",
      "Washed gravel envelope, not native fill",
      "Daylight or pop-up outlets, never blind ends",
      "Coordinated with downspout extensions and yard drains",
    ],
  },
  {
    slug: "gutter-guards",
    shortTitle: "Gutter Guards",
    title: "Gutter Guards & Leaf Protection",
    eyebrow: "Protection",
    tagline: "Stop climbing the ladder. Start trusting the system.",
    blurb:
      "Stainless micromesh and reverse-curve options that match the gutter profile, not the other way around.",
    intro:
      "The right gutter guard depends on what falls on your roof. Pine needles, oak catkins, cottonwood seed, and standard maple leaves all behave differently. We carry stainless micromesh, surface tension reverse-curve, and traditional screen options, and we recommend based on the trees on your lot rather than what we have in the truck.",
    bullets: [
      "Stainless micromesh for fine debris and shingle grit",
      "Reverse-curve for high-debris locations",
      "Color-matched to your gutter color",
      "Lifetime no-clog warranties available on premium systems",
      "Installed without lifting or modifying shingles",
    ],
  },
  {
    slug: "gutter-cleaning",
    shortTitle: "Gutter Cleaning",
    title: "Gutter Cleaning",
    eyebrow: "Maintenance",
    tagline: "Twice a year, in and out, no mess left behind.",
    blurb:
      "Hand-cleaned gutters and downspouts with bagged debris and a flow test on every run.",
    intro:
      "Even with guards, gutters benefit from a yearly inspection. Without guards, twice a year is the right cadence for most Oklahoma homes. We hand-clean every run, bag the debris off site, flush downspouts to confirm flow, and flag any sealant or hanger issues before they become leaks.",
    bullets: [
      "Hand-removed debris, bagged and hauled off",
      "Downspouts flushed and flow-tested",
      "Visual inspection of hangers, seams, and miter corners",
      "Photos of any flagged repairs",
      "Scheduling reminders for the next service",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
