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
  /** Text messages go to a separate line (the owner's cell) so the office
      phone stays free for voice. Used ONLY in sms: links. */
  textPhone: "(405) 888-1389",
  textPhoneTel: "+14058881389",
  email: "info@raintamer.com",
  founded: 2011,
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
  /**
   * Hosted invoice payment portal. Bryt Wired handles card capture / PCI; we
   * just deep-link to it from the /payments page so we never touch card data.
   */
  paymentUrl: "https://pay.brytewired.com/raintamer",
  /** Headline stats used across the site. Real numbers from the owner. */
  stats: {
    yearsInBusiness: 15,
    installsCompleted: 42_000,
    gutterFeetInstalled: 8_000_000,
    drainsFeetInstalled: 105_000,
    citiesServed: 11,
    googleRating: 4.9,
    googleReviewCount: 650,
  },
};

export type SiteConfig = typeof SITE;
