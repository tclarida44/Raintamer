export type GutterColor = {
  name: string;
  /**
   * Display hex sampled to approximate the painted-aluminum chip. Not a coating
   * spec — the actual finish ships from Englert / Berger coil with their own
   * proprietary paint formulas. These values are for visual reference only.
   */
  hex: string;
  /** Marks the natural metals (copper variants, Galvalume) that ship at a premium. */
  premium?: boolean;
  /** Coarse color family for filtering and visual grouping. */
  family:
    | "white"
    | "cream"
    | "tan"
    | "gray"
    | "brown"
    | "bronze"
    | "earth"
    | "green"
    | "red"
    | "blue"
    | "black"
    | "metal";
};

/**
 * Painted-aluminum and premium-metal gutter colors offered across the industry
 * by Englert, Berger, and other major coil suppliers that Rain Tamer stocks.
 * Ordered roughly from lightest to darkest so the color card reads as a real
 * sample book rather than an arbitrary grid.
 *
 * Sources (industry catalogs, public color cards):
 *  - Englert standard color card
 *  - Berger gutter / trim coil catalog
 *  - Riverside Sheet Metal color reference
 *  - Today's Homeowner gutter color guide
 */
export const GUTTER_COLORS: GutterColor[] = [
  // ─── Whites & creams ──────────────────────────────────────────────
  { name: "White",          hex: "#F2F0EA", family: "white" },
  { name: "Antique Ivory",  hex: "#E8DCC4", family: "cream" },
  { name: "Heritage Cream", hex: "#E2D2A8", family: "cream" },
  { name: "Eggshell",       hex: "#ECE4D0", family: "cream" },
  { name: "Linen",          hex: "#DDD0B5", family: "cream" },

  // ─── Tans & wickers ───────────────────────────────────────────────
  { name: "Almond",         hex: "#CFB892", family: "tan" },
  { name: "Wicker",         hex: "#B89968", family: "tan" },
  { name: "Sandstone",      hex: "#B59874", family: "tan" },

  // ─── Grays (light → dark) ─────────────────────────────────────────
  { name: "Pearl Gray",     hex: "#B7B6B0", family: "gray" },
  { name: "Dove Gray",      hex: "#93908A", family: "gray" },
  { name: "Colonial Gray",  hex: "#6E6D67", family: "gray" },
  { name: "Tuxedo Gray",    hex: "#3F3F40", family: "gray" },
  { name: "Charcoal Gray",  hex: "#2A2A2C", family: "gray" },

  // ─── Earth & clay tones ───────────────────────────────────────────
  { name: "Terratone",      hex: "#9A7E55", family: "earth" },
  { name: "Clay",           hex: "#8B5A3C", family: "earth" },

  // ─── Browns ───────────────────────────────────────────────────────
  { name: "Buckskin Brown", hex: "#6C5240", family: "brown" },
  { name: "Royal Brown",    hex: "#4A2E1F", family: "brown" },
  { name: "Musket Brown",   hex: "#3F2A20", family: "brown" },

  // ─── Bronzes ──────────────────────────────────────────────────────
  { name: "Light Bronze",   hex: "#5A4A38", family: "bronze" },
  { name: "Dark Bronze",    hex: "#2F2723", family: "bronze" },

  // ─── Statement colors ─────────────────────────────────────────────
  { name: "Hartford Green", hex: "#2A3B2A", family: "green" },
  { name: "Forest Green",   hex: "#21392A", family: "green" },
  { name: "Colonial Red",   hex: "#7A2520", family: "red" },
  { name: "Colonial Blue",  hex: "#2D3D54", family: "blue" },

  // ─── Black ────────────────────────────────────────────────────────
  { name: "Matte Black",    hex: "#171717", family: "black" },

  // ─── Premium metals ───────────────────────────────────────────────
  { name: "Solid Copper",         hex: "#B5662F", premium: true, family: "metal" },
  { name: "Patina Copper",        hex: "#5B6F5F", premium: true, family: "metal" },
  { name: "Galvalume Plus Steel", hex: "#A8AAAC", premium: true, family: "metal" },
];

export type GutterProfile = {
  id: string;
  label: string;
  /** Width in inches */
  size: number;
  /** Profile family used to choose an SVG path. */
  family: "k-style" | "box" | "half-round";
  description: string;
};

export const GUTTER_PROFILES: GutterProfile[] = [
  {
    id: "k-5",
    label: "K-Style 5\"",
    size: 5,
    family: "k-style",
    description: "The standard residential profile. Crown-molded face, holds about 1.2 gallons per linear foot.",
  },
  {
    id: "k-6",
    label: "K-Style 6\"",
    size: 6,
    family: "k-style",
    description: "Same crown-molded look, 40% more capacity. The right call for steep or large roofs.",
  },
  {
    id: "box-5",
    label: "Box 5\"",
    size: 5,
    family: "box",
    description: "Clean rectangular profile. Modern look, popular on contemporary builds.",
  },
  {
    id: "box-6",
    label: "Box 6\"",
    size: 6,
    family: "box",
    description: "High-capacity rectangular profile. Common on commercial and modern residential.",
  },
  {
    id: "hr-6",
    label: "Half Round 6\"",
    size: 6,
    family: "half-round",
    description: "A traditional half-round profile, often specified in copper for historic homes.",
  },
];
