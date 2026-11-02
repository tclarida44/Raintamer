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
      "Continuous seamless runs, hand-mitered corners, 28 baked-enamel painted colors plus copper, Galvalume, Zinc, and Steel.",
    intro:
      "Seamless gutters are formed on site from a single coil of aluminum, sized to the exact length of each roof run. No factory joints means fewer leak points and a cleaner line down the eave. Pair the right profile and color with our internal-hanger install standards and the result is a system that disappears into the architecture and quietly does its job for decades.",
    bullets: [
      "K-Style 5\" and 6\", Box 5\" and 6\", Half Round 6\"",
      "28 baked-enamel painted colors plus solid copper, Galvalume, Zinc, and Steel",
      "Hand-mitered, riveted, and sealed corners",
      "Hidden support hangers spaced every 24″",
      "Outlet tubes at every downspout for unrestricted flow",
    ],
  },
  {
    slug: "commercial-gutters",
    shortTitle: "Commercial Gutters",
    title: "Commercial Gutter Systems",
    eyebrow: "Commercial",
    tagline: "Custom-fabricated steel systems for every roof type.",
    blurb:
      "Box gutters from 5″ to 9″, oversized steel downspouts, and Kynar-finished profiles for offices, warehouses, schools, and multifamily.",
    intro:
      "Commercial roofs shed more water than a home does. We spec 6, 7, 8, and in some cases larger commercial-grade steel gutter systems, custom-made for whatever the roof type. Flat-roof systems in many cases are pitched to drain through scuppers and then to decorative steel collector boxes. Whatever the roof type — we know exactly what size and profile it needs.",
    bullets: [
      "24- and 26-gauge steel with Kynar painted finish",
      "5\", 6\", 7\", 8\", 9\" box-style gutters in many profiles and colors",
      "Oversized 4×4, 4×5, 5×5, 5×6 and larger 24-/26-gauge steel downspouts with Kynar finish",
      "Custom decorative collector boxes and scuppers for flat-roof drainage",
      "Certified crews trained on install methods and jobsite safety",
    ],
  },
  {
    slug: "french-drains",
    shortTitle: "Drains",
    title: "Drainage Systems",
    eyebrow: "Drainage",
    tagline: "The right drain for the actual water problem.",
    blurb:
      "Downspout drains, surface drains, catch basins, and true French drains. We spec the correct system for how water actually moves on your lot.",
    intro:
      "Gutters only capture water off the roof — they still have to put it somewhere. We install downspout drains, surface drains, catch basins, and French drains of every size and profile. Not all drains are created equal. We spec the correct system to capture and disperse rain water in the most effective way for your property.\n\nA true French drain is a perforated pipe buried 24″ below ground and encased in gravel, meant to capture sub-surface ground water through the perforations as the trench fills up. In many cases that's not the right drain for Oklahoma — especially for water coming off your roof.\n\nFor roof water we use solid PVC pipe (no perforations) buried 8–12″ below grade to carry water to the street or a designated area away from your home. The same solid pipe feeds catch basins — 6×6, 9×9, 12×12, 18×18, and 24×24 — that capture surface water and disperse it through a pop-up emitter or a cored curb outlet.\n\nMost jobs work by gravity, sloping the pipe underground. In flat areas with no slope we install a pump basin to move the water out to the designated area.",
    bullets: [
      "True French drain: perforated pipe, filter fabric, washed gravel envelope",
      "Downspout drains: solid PVC buried 8–12″ to the street or a designated outlet",
      "Catch basins in 6×6, 9×9, 12×12, 18×18, and 24×24",
      "Pop-up emitters or cored curb outlets to daylight the water",
      "Pump basins where the site is too flat to run by gravity",
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
