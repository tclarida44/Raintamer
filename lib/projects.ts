import type { ServiceSlug } from "./services";

export type Project = {
  id: string;
  title: string;
  location: string;
  /** Display label used on tiles and filter pills. */
  service: string;
  /** Maps to a service slug for filtering. */
  serviceSlug: ServiceSlug;
  /** City slug used for cross-linking back to /service-areas. */
  citySlug?: string;
  image: string;
  description?: string;
};

/**
 * Selected installs across the OKC metro. Current images are stock filler;
 * swap each `image` for real Rain Tamer project photography when delivered.
 */
export const PROJECTS: Project[] = [
  {
    id: "p-01",
    title: "Half-round copper at twilight",
    location: "Nichols Hills",
    service: "Seamless Gutters",
    serviceSlug: "seamless-gutters",
    citySlug: "nichols-hills",
    image: "/images/stock/home-twilight.jpg",
    description: "Solid copper half-round on a brick estate. Hand-soldered miters and matching downspouts.",
  },
  {
    id: "p-02",
    title: "Whole-home replacement",
    location: "Edmond",
    service: "Seamless Gutters",
    serviceSlug: "seamless-gutters",
    citySlug: "edmond",
    image: "/images/stock/modern-home.jpg",
    description: "Stepped a builder-grade 5″ system up to 6″ K-style with 3 × 4 downspouts.",
  },
  {
    id: "p-03",
    title: "French drain to daylight",
    location: "Norman",
    service: "French Drains",
    serviceSlug: "french-drains",
    citySlug: "norman",
    image: "/images/stock/installer-caulk.jpg",
    description: "Buried perforated line in a washed-gravel envelope, daylit to the back fence.",
  },
  {
    id: "p-04",
    title: "Micromesh on 6″ K-style",
    location: "Mustang",
    service: "Gutter Guards",
    serviceSlug: "gutter-guards",
    citySlug: "mustang",
    image: "/images/stock/colonial-home.jpg",
    description: "Stainless micromesh installed under heavy oak cover. No more ladder weekends.",
  },
  {
    id: "p-05",
    title: "Storm rebuild",
    location: "Moore",
    service: "Seamless Gutters",
    serviceSlug: "seamless-gutters",
    citySlug: "moore",
    image: "/images/stock/autumn-home.jpg",
    description: "Full system replaced after wind damage. Internal hangers every 24″ for the rebuild.",
  },
  {
    id: "p-06",
    title: "Heritage estate",
    location: "Bethany",
    service: "Seamless Gutters",
    serviceSlug: "seamless-gutters",
    citySlug: "bethany",
    image: "/images/stock/roof-edge.jpg",
    description: "Heritage Cream painted aluminum on a brick exterior. Matching downspouts to the porch line.",
  },
  {
    id: "p-07",
    title: "Twice-yearly cleaning",
    location: "Oklahoma City",
    service: "Gutter Cleaning",
    serviceSlug: "gutter-cleaning",
    citySlug: "oklahoma-city",
    image: "/images/stock/rain-water.jpg",
    description: "Scheduled cleaning on a maple-heavy lot. Photo report with each visit.",
  },
  {
    id: "p-08",
    title: "Commercial box gutters",
    location: "Yukon",
    service: "Commercial Gutters",
    serviceSlug: "commercial-gutters",
    citySlug: "yukon",
    image: "/images/stock/modern-home.jpg",
    description: "7″ box profile in Galvalume Plus on a retail strip. Oversized 4″ round downspouts.",
  },
  {
    id: "p-09",
    title: "Cottonwood mitigation",
    location: "The Village",
    service: "Gutter Guards",
    serviceSlug: "gutter-guards",
    citySlug: "the-village",
    image: "/images/stock/autumn-home.jpg",
    description: "Reverse-curve guards on a property surrounded by cottonwoods. Color-matched to the eave.",
  },
  {
    id: "p-10",
    title: "Acreage drainage plan",
    location: "Tuttle",
    service: "French Drains",
    serviceSlug: "french-drains",
    citySlug: "tuttle",
    image: "/images/stock/installer-caulk.jpg",
    description: "Combined French drain + downspout extension on a five-acre property. Pop-up emitters.",
  },
  {
    id: "p-11",
    title: "Modern minimal install",
    location: "Edmond",
    service: "Seamless Gutters",
    serviceSlug: "seamless-gutters",
    citySlug: "edmond",
    image: "/images/stock/home-twilight.jpg",
    description: "Box profile in Tuxedo Grey on a contemporary build. Hidden hangers throughout.",
  },
  {
    id: "p-12",
    title: "Pre-listing service",
    location: "Warr Acres",
    service: "Gutter Cleaning",
    serviceSlug: "gutter-cleaning",
    citySlug: "warr-acres",
    image: "/images/stock/colonial-home.jpg",
    description: "Deep clean and flow test before a home went on the market. Photographed for the inspection report.",
  },
];

export const SERVICE_FILTERS: { slug: ServiceSlug | "all"; label: string }[] = [
  { slug: "all", label: "All projects" },
  { slug: "seamless-gutters", label: "Seamless Gutters" },
  { slug: "french-drains", label: "French Drains" },
  { slug: "gutter-guards", label: "Gutter Guards" },
  { slug: "gutter-cleaning", label: "Cleaning" },
  { slug: "commercial-gutters", label: "Commercial" },
];
