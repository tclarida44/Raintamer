import createMDX from "@next/mdx";

/**
 * Redirect map for the migration from the legacy raintamer.com to this Next
 * build. Every entry is a permanent (301) redirect so link equity, external
 * bookmarks, Google Business Profile links, and inbound backlinks all keep
 * working after launch. Expand generously — a missed redirect is a lost
 * customer + lost SEO.
 */

const cities = [
  "edmond",
  "norman",
  "moore",
  "mustang",
  "yukon",
  "bethany",
  "warr-acres",
  "nichols-hills",
  "the-village",
  "tuttle",
  "oklahoma-city",
];

/** Common variations of city URLs that legacy sites use. */
function cityVariants(city) {
  const target = { destination: `/service-areas/${city}`, permanent: true };
  return [
    { source: `/seamless-gutter-${city}`, ...target },
    { source: `/seamless-gutters-${city}`, ...target },
    { source: `/gutters-${city}`, ...target },
    { source: `/gutter-installation-${city}`, ...target },
    { source: `/${city}-gutters`, ...target },
    { source: `/${city}-seamless-gutters`, ...target },
    { source: `/service-area-${city}`, ...target },
    { source: `/service-areas-${city}`, ...target },
  ];
}

const cityRedirects = cities.flatMap(cityVariants);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  // Automatically normalize URLs ending in a trailing slash to non-trailing.
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 85],
  },
  // Hard no-store on all HTML: iOS Safari won't serve any stale markup
  // after a deploy. Static assets under /_next/ keep long-lived immutable
  // caching so page loads stay fast — only the HTML shell is uncached.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ────────────────────────── SERVICES ─────────────────────────────
      // Direct legacy service URLs → /services/<slug>
      { source: "/seamless-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/seamless", destination: "/services/seamless-gutters", permanent: true },
      { source: "/gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/gutter", destination: "/services/seamless-gutters", permanent: true },
      { source: "/gutter-installation", destination: "/services/seamless-gutters", permanent: true },
      { source: "/aluminum-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/copper-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/half-round-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/k-style-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/box-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/residential-gutters", destination: "/services/seamless-gutters", permanent: true },

      { source: "/commercial-gutters", destination: "/services/commercial-gutters", permanent: true },
      { source: "/commercial", destination: "/services/commercial-gutters", permanent: true },
      { source: "/commercial-gutter", destination: "/services/commercial-gutters", permanent: true },
      { source: "/commercial-gutter-systems", destination: "/services/commercial-gutters", permanent: true },
      { source: "/steel-gutters", destination: "/services/commercial-gutters", permanent: true },

      { source: "/french-drains", destination: "/services/french-drains", permanent: true },
      { source: "/french-drain", destination: "/services/french-drains", permanent: true },
      { source: "/drains", destination: "/services/french-drains", permanent: true },
      { source: "/drainage", destination: "/services/french-drains", permanent: true },
      { source: "/yard-drains", destination: "/services/french-drains", permanent: true },
      { source: "/yard-drainage", destination: "/services/french-drains", permanent: true },
      { source: "/downspout-drains", destination: "/services/french-drains", permanent: true },
      { source: "/downspout-extension", destination: "/services/french-drains", permanent: true },
      { source: "/downspout-extensions", destination: "/services/french-drains", permanent: true },
      { source: "/catch-basins", destination: "/services/french-drains", permanent: true },
      { source: "/surface-drains", destination: "/services/french-drains", permanent: true },

      { source: "/gutter-guards", destination: "/services/gutter-guards", permanent: true },
      { source: "/gutter-guard", destination: "/services/gutter-guards", permanent: true },
      { source: "/leaf-guards", destination: "/services/gutter-guards", permanent: true },
      { source: "/leaf-guard", destination: "/services/gutter-guards", permanent: true },
      { source: "/leaf-protection", destination: "/services/gutter-guards", permanent: true },
      { source: "/gutter-protection", destination: "/services/gutter-guards", permanent: true },
      { source: "/gutter-covers", destination: "/services/gutter-guards", permanent: true },
      { source: "/micromesh", destination: "/services/gutter-guards", permanent: true },
      { source: "/gutter-screens", destination: "/services/gutter-guards", permanent: true },

      { source: "/gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/gutter-maintenance", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/maintenance", destination: "/services/gutter-cleaning", permanent: true },

      // ────────────────────────── COMPANY / ABOUT ───────────────────────
      { source: "/our-company", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/company", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/who-we-are", destination: "/about", permanent: true },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/our-story", destination: "/about", permanent: true },

      // ────────────────────────── CONTACT / QUOTES ──────────────────────
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/quote", destination: "/contact", permanent: true },
      { source: "/get-quote", destination: "/contact", permanent: true },
      { source: "/get-a-quote", destination: "/contact", permanent: true },
      { source: "/request-quote", destination: "/contact", permanent: true },
      { source: "/request-a-quote", destination: "/contact", permanent: true },
      { source: "/free-quote", destination: "/contact", permanent: true },
      { source: "/estimate", destination: "/contact", permanent: true },
      { source: "/estimates", destination: "/contact", permanent: true },
      { source: "/free-estimate", destination: "/contact", permanent: true },
      { source: "/get-estimate", destination: "/contact", permanent: true },
      { source: "/schedule", destination: "/contact", permanent: true },

      // ────────────────────────── PAYMENTS ──────────────────────────────
      { source: "/onlinepayments", destination: "/payments", permanent: true },
      { source: "/online-payments", destination: "/payments", permanent: true },
      { source: "/online-payment", destination: "/payments", permanent: true },
      { source: "/pay", destination: "/payments", permanent: true },
      { source: "/pay-online", destination: "/payments", permanent: true },
      { source: "/pay-invoice", destination: "/payments", permanent: true },
      { source: "/pay-my-bill", destination: "/payments", permanent: true },
      { source: "/pay-bill", destination: "/payments", permanent: true },
      { source: "/make-payment", destination: "/payments", permanent: true },
      { source: "/make-a-payment", destination: "/payments", permanent: true },
      { source: "/billing", destination: "/payments", permanent: true },
      { source: "/invoice", destination: "/payments", permanent: true },

      // ────────────────────────── GALLERY / WORK ────────────────────────
      { source: "/portfolio", destination: "/gallery", permanent: true },
      { source: "/projects", destination: "/gallery", permanent: true },
      { source: "/our-work", destination: "/gallery", permanent: true },
      { source: "/work", destination: "/gallery", permanent: true },
      { source: "/photos", destination: "/gallery", permanent: true },
      { source: "/photo-gallery", destination: "/gallery", permanent: true },
      { source: "/before-after", destination: "/gallery", permanent: true },
      { source: "/before-and-after", destination: "/gallery", permanent: true },

      // ────────────────────────── VISUALIZER ────────────────────────────
      { source: "/configurator", destination: "/visualizer", permanent: true },
      { source: "/gutter-configurator", destination: "/visualizer", permanent: true },
      { source: "/color-picker", destination: "/visualizer", permanent: true },
      { source: "/color-selector", destination: "/visualizer", permanent: true },
      { source: "/colors", destination: "/visualizer", permanent: true },
      { source: "/pick-a-color", destination: "/visualizer", permanent: true },

      // ────────────────────────── REVIEWS ───────────────────────────────
      { source: "/reviews", destination: "/#reviews", permanent: true },
      { source: "/testimonials", destination: "/#reviews", permanent: true },
      { source: "/our-reviews", destination: "/#reviews", permanent: true },

      // ────────────────────────── BLOG / RESOURCES ──────────────────────
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/resources", destination: "/blog", permanent: true },
      { source: "/tips", destination: "/blog", permanent: true },

      // ────────────────────────── SERVICE AREAS (canonical + variants) ──
      { source: "/service-area", destination: "/service-areas", permanent: true },
      { source: "/areas-served", destination: "/service-areas", permanent: true },
      { source: "/areas", destination: "/service-areas", permanent: true },
      { source: "/service-areas-we-serve", destination: "/service-areas", permanent: true },
      { source: "/coverage", destination: "/service-areas", permanent: true },
      { source: "/locations", destination: "/service-areas", permanent: true },
      ...cityRedirects,

      // ────────────────────────── ROOT / HOME ALIASES ───────────────────
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/home.html", destination: "/", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
