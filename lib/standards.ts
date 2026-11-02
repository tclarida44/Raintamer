/**
 * The Rain Tamer install standards. Pulled from the legacy site's "What sets us apart" section.
 * These are treated like a spec sheet on the homepage.
 */
export type InstallStandard = {
  number: string;
  title: string;
  detail: string;
};

export const STANDARDS: InstallStandard[] = [
  {
    number: "01",
    title: "Internal Support Hangers, Spaced Every 24\"",
    detail:
      "Hidden hangers tie the gutter to the fascia twice as often as the industry-standard 36\". Twice the support, half the sag, no exposed straps over the front face.",
  },
  {
    number: "02",
    title: "Hand-Mitered & Riveted Corners",
    detail:
      "Inside and outside corners are cut and folded by hand on site, then riveted and sealed. No prefab strip miters that pull apart over a few seasons.",
  },
  {
    number: "03",
    title: "Riveted Downspouts",
    detail:
      "Every downspout joint and elbow is fastened with stainless rivets, not screws. Rivets stay tight when the metal expands and contracts.",
  },
  {
    number: "04",
    title: "Outlet Tubes at Every Downspout",
    detail:
      "We install a formed outlet tube at every drop, not a punched hole. Outlets create unrestricted flow and prevent the choke point that causes overflow.",
  },
  {
    number: "05",
    title: "Pitched to Drain, Every Run",
    detail:
      "Every gutter is pitched to drain to the nearest downspout. Gutters that are hung level will never function properly and cause a multitude of issues down the road.",
  },
  {
    number: "06",
    title: "100% Polyurethane Sealant",
    detail:
      "We seal corners and end caps with 100% polyurethane only. It bonds to aluminum, stays flexible, and outlasts the silicone the cheap installs use.",
  },
];
