/**
 * Top-level site constants. Centralized so that phone numbers, the canonical
 * URL, and headline stats only need to change in one place.
 */
export const SITE = {
  name: "Rain Tamer",
  legalName: "Rain Tamer LLC",
  /** Update before launch when the production domain is live. */
  url: "https://raintamer.com",
  phone: "(405) 726-8106",
  /** E.164 form, used in tel: links. */
  phoneTel: "+14057268106",
  email: "info@raintamer.com",
  founded: 2012,
  city: "Oklahoma City",
  state: "OK",
  /** Approximate physical address; replace with the legal place of business before launch. */
  address: {
    street: "",
    city: "Oklahoma City",
    region: "OK",
    postal: "73101",
    country: "US",
  },
  socials: {
    google: "https://www.google.com/maps/search/Rain+Tamer+Oklahoma+City",
    facebook: "https://www.facebook.com/raintamer",
  },
  /** Headline stats used across the site. Numbers are intentionally directional, not sworn-to. */
  stats: {
    yearsInBusiness: new Date().getFullYear() - 2012,
    installsCompleted: 5000,
    citiesServed: 11,
    googleRating: 4.9,
    googleReviewCount: 200,
  },
};

export type SiteConfig = typeof SITE;
