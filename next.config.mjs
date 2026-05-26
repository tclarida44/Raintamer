import createMDX from "@next/mdx";

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

const cityRedirects = cities.map((c) => ({
  source: `/seamless-gutter-${c}`,
  destination: `/service-areas/${c}`,
  permanent: true,
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 85],
  },
  async redirects() {
    return [
      { source: "/seamless-gutters", destination: "/services/seamless-gutters", permanent: true },
      { source: "/commercial-gutters", destination: "/services/commercial-gutters", permanent: true },
      { source: "/french-drains", destination: "/services/french-drains", permanent: true },
      { source: "/gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/gutter-guards", destination: "/services/gutter-guards", permanent: true },
      { source: "/our-company", destination: "/about", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      ...cityRedirects,
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
