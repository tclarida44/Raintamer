export type City = {
  slug: string;
  name: string;
  /** Latitude/longitude for map markers (approximate city centers) */
  lat: number;
  lng: number;
  /** Short, human-written intro snippet used on the dynamic /service-areas/[city] page. */
  intro: string;
  /** A neighborhood or local landmark, used to make city pages feel hand-written rather than templated. */
  localDetail: string;
};

/**
 * Service areas served by Rain Tamer.
 * Sourced from the Context section of the project brief plus the legacy site footer.
 * Coordinates are city-center approximations and only used for the metro map.
 */
export const CITIES: City[] = [
  {
    slug: "oklahoma-city",
    name: "Oklahoma City",
    lat: 35.4676,
    lng: -97.5164,
    intro:
      "Oklahoma City homes face the full range of plains weather, from spring squall lines to summer downpours that can dump an inch of rain in twenty minutes. Rain Tamer has been protecting OKC properties since 2012.",
    localDetail: "From the historic homes near Mesta Park to new builds in Deer Creek, we install seamless gutters across every OKC zip code.",
  },
  {
    slug: "edmond",
    name: "Edmond",
    lat: 35.6528,
    lng: -97.4781,
    intro:
      "Edmond's larger lot sizes and mature tree canopy make gutter guards and French drains a real investment, not an upsell. We install both like the foundation depends on it, because it does.",
    localDetail: "We work neighborhoods across Edmond from Oak Tree to Coffee Creek, with crews that know the local soil and drainage quirks.",
  },
  {
    slug: "norman",
    name: "Norman",
    lat: 35.2226,
    lng: -97.4395,
    intro:
      "Norman's mix of older campus-area homes and growing east-side developments puts a premium on water management. We size gutters to the roof, not to a one-size-fits-all spec.",
    localDetail: "Whether you're near OU campus or out by Lake Thunderbird, our installs hold up to the runoff Norman storms throw at them.",
  },
  {
    slug: "moore",
    name: "Moore",
    lat: 35.3395,
    lng: -97.4867,
    intro:
      "Moore residents know what severe weather can do. Our seamless aluminum gutters, internal hangers every two feet, and properly sloped runs are built to handle the worst of it.",
    localDetail: "From rebuilds in older Moore neighborhoods to homes near the Warren Theatre, we tailor each install to the property.",
  },
  {
    slug: "mustang",
    name: "Mustang",
    lat: 35.3842,
    lng: -97.7245,
    intro:
      "Mustang's growth has brought a lot of new construction, and a lot of builders who skimped on gutters. We replace and upgrade systems across Mustang every week.",
    localDetail: "Newer neighborhoods like Trails of Mustang Creek often need an upgrade from builder-grade gutters within just a few years.",
  },
  {
    slug: "yukon",
    name: "Yukon",
    lat: 35.5067,
    lng: -97.7625,
    intro:
      "Yukon homeowners get a lot of wind off the open prairie, which is exactly why we hand-miter and rivet every corner. Wind-loaded gutters need stronger seams.",
    localDetail: "We install seamless gutters across Yukon from Surrey Hills to neighborhoods near Mustang Road.",
  },
  {
    slug: "bethany",
    name: "Bethany",
    lat: 35.5187,
    lng: -97.6322,
    intro:
      "Bethany's older established homes often have undersized gutters from the original build. Stepping up to 6-inch K-style or box gutters makes a real difference.",
    localDetail: "We've replaced systems on classic homes near Lake Overholser and on streets all through central Bethany.",
  },
  {
    slug: "warr-acres",
    name: "Warr Acres",
    lat: 35.5226,
    lng: -97.6189,
    intro:
      "Warr Acres has a lot of mid-century homes with original-era gutters that have long outlived their service life. New seamless aluminum is a one-day upgrade with a lifetime of payoff.",
    localDetail: "We see plenty of replacement work in Warr Acres, especially on homes that have never had downspout outlet tubes installed.",
  },
  {
    slug: "nichols-hills",
    name: "Nichols Hills",
    lat: 35.555,
    lng: -97.5414,
    intro:
      "Nichols Hills properties expect a finish quality that matches the home. Hand-mitered corners, hidden hangers, and copper or premium painted aluminum: this is where our craftsmanship shows.",
    localDetail: "Many of our copper and half-round installs are in Nichols Hills, where the architecture deserves the upgrade.",
  },
  {
    slug: "the-village",
    name: "The Village",
    lat: 35.5631,
    lng: -97.5611,
    intro:
      "The Village's compact streets and tight setbacks demand neat, well-aligned gutter runs. Our seamless installs are cut on site to fit the home, not to fit a stock length.",
    localDetail: "We service The Village regularly, from ranch-style homes near Britton Road to remodels closer to May Avenue.",
  },
  {
    slug: "tuttle",
    name: "Tuttle",
    lat: 35.2917,
    lng: -97.8136,
    intro:
      "Tuttle properties often sit on larger acreage where French drains and downspout extensions matter as much as the gutter itself. We design the whole drainage path, not just the roof edge.",
    localDetail: "Acreage homes around Tuttle frequently need a full gutter-and-drain plan, and that's exactly what we install.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
