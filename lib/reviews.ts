export type Review = {
  id: string;
  name: string;
  neighborhood: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date: string;
};

/**
 * TODO: Replace these placeholders with real Google Business reviews before launch.
 * Recommended source: pull via the Google Places API and cache nightly to avoid
 * hammering the rate limit. Shape above is the contract; keep it stable.
 */
export const REVIEWS: Review[] = [
  {
    id: "r-1",
    name: "Megan H.",
    neighborhood: "Edmond",
    service: "Seamless Gutters",
    rating: 5,
    quote:
      "Crew showed up exactly when they said they would, finished a full house wrap and downspout reroute in one day, and left the yard cleaner than they found it. The miter corners look like jewelry.",
    date: "2025-09-12",
  },
  {
    id: "r-2",
    name: "David K.",
    neighborhood: "Nichols Hills",
    service: "Half Round Copper Gutters",
    rating: 5,
    quote:
      "I had three companies bid copper half round on a 1939 brick home. Rain Tamer was the only one who walked the roof first. The finished install is the best work that's been done on this house in twenty years.",
    date: "2025-08-04",
  },
  {
    id: "r-3",
    name: "Jenna M.",
    neighborhood: "Norman",
    service: "French Drain",
    rating: 5,
    quote:
      "Our basement flooded twice in two springs. Rain Tamer mapped the lot grade, sized a French drain to actually move the water, and ran it to daylight at the back fence. Two storms since, dry both times.",
    date: "2025-07-21",
  },
  {
    id: "r-4",
    name: "Carlos R.",
    neighborhood: "Moore",
    service: "Gutter Guards",
    rating: 5,
    quote:
      "Three big oaks behind the house meant cleaning gutters every six weeks. The micromesh guards have been on for a full season now and I haven't been on a ladder once.",
    date: "2025-06-09",
  },
  {
    id: "r-5",
    name: "Patricia W.",
    neighborhood: "Yukon",
    service: "Gutter Replacement",
    rating: 5,
    quote:
      "The original builder gutters were undersized and pulling away from the fascia. Rain Tamer stepped us up to 6\" K-style with internal hangers, and it's a different house in a hard rain.",
    date: "2025-05-18",
  },
  {
    id: "r-6",
    name: "Robert F.",
    neighborhood: "Mustang",
    service: "Commercial Gutters",
    rating: 5,
    quote:
      "Replaced the gutters on our office building with 7-inch box and oversized downspouts. They worked nights so we never had a disruption to our tenants. Professionalism start to finish.",
    date: "2025-04-02",
  },
  {
    id: "r-7",
    name: "Sarah L.",
    neighborhood: "Oklahoma City",
    service: "Seamless Gutters",
    rating: 5,
    quote:
      "Got bids from four companies. Rain Tamer was not the cheapest, but the install standards page on their site told me everything I needed to know. The work matches the spec.",
    date: "2025-03-15",
  },
  {
    id: "r-8",
    name: "Tom B.",
    neighborhood: "Bethany",
    service: "Gutter Cleaning",
    rating: 5,
    quote:
      "Twice-a-year cleaning, on schedule, no surprises, photos texted afterward. Exactly what I want from a service company.",
    date: "2025-02-08",
  },
];
