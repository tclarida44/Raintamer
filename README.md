# Rain Tamer

Marketing site for Rain Tamer, an Oklahoma City seamless gutter, French drain, and gutter guard company. Built to look like a tier-one brand, not a local home-services contractor.

Live (when deployed): https://raintamer.com

## Stack

- **Next.js 15** (App Router) with React Server Components by default
- **TypeScript**
- **Tailwind CSS v4** (zero config beyond the import + theme tokens in `app/globals.css`)
- **Framer Motion** for section transitions and the FAQ + carousel + form animations
- **Lucide React** for iconography
- **next/image** and **next/font** (Geist + Geist Mono)
- **React Hook Form + Zod** for the quote form (3 steps, validated)
- **MDX** (file-based) for blog posts via `next-mdx-remote/rsc` plus `gray-matter`
- Deployed on **Vercel**

## Scripts

```bash
pnpm dev        # local dev on http://localhost:3000
pnpm build      # production build
pnpm start      # serve production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # next lint
```

## Environment variables

See [.env.example](./.env.example).

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Used by `metadataBase`, sitemap, OG, JSON-LD. Defaults to `https://raintamer.com`. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | optional | The homepage uses a custom SVG metro map; Mapbox is reserved for a future street-detail map. |
| `QUOTE_WEBHOOK_URL` | TODO | Destination for quote-form submissions. See `app/api/quote/route.ts`. |

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The site is fully responsive and dark-themed by design. There is no light mode.

## Adding a blog post

1. Create `content/blog/<slug>.mdx`. The filename (minus extension) becomes the URL slug.
2. Frontmatter required:
   ```yaml
   ---
   title: "..."
   slug: "..."
   date: "YYYY-MM-DD"
   excerpt: "One sentence."
   coverImage: "/images/blog/<file>.svg"
   tags: ["maintenance", "gutters"]
   author: "Rain Tamer"
   ---
   ```
3. Body is regular MDX. The renderer in [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) already styles `h1`/`h2`/`p`/`ul`/`blockquote`.
4. Posts are sorted by `date` descending. The first three appear on the homepage and the full list on `/blog`.
5. Tags drive the filter pills on the blog index. No setup needed; new tags appear automatically.

## Adding a service area

1. Add a new entry to the `CITIES` array in [lib/cities.ts](lib/cities.ts) with `slug`, `name`, `lat`, `lng`, `intro`, and `localDetail`.
2. Static page generation, sitemap, footer, map, and city list update automatically.
3. Add a redirect for the legacy `/seamless-gutter-<slug>` URL by extending the array in [next.config.mjs](next.config.mjs) if needed.

## Adding a service

1. Add to the `SERVICES` array in [lib/services.ts](lib/services.ts).
2. Create `app/services/<slug>/page.tsx` that calls `<ServiceDetail service={...} />`. Copy one of the existing pages as a template.
3. Update the homepage `LAYOUT` map in [components/sections/ServicesGrid.tsx](components/sections/ServicesGrid.tsx) so the new card has a grid placement.
4. Add an icon mapping in `ServicesGrid.tsx` and the configurator/quote-form services list if relevant.

## Architecture notes

- **Top-level layout** is in [app/layout.tsx](app/layout.tsx). It mounts the header, footer, mobile floating CTA, and the global LocalBusiness JSON-LD.
- **Homepage sections** are independent components in `components/sections/` and composed in [app/page.tsx](app/page.tsx). Each has its own ARIA-correct heading and a sticky monospace section label.
- **Interactive components** (`components/interactive/*`) are all `"use client"`, including the rain canvas, gutter configurator, service map, review carousel, stat counters, and the quote form.
- **Quote form** posts to [app/api/quote/route.ts](app/api/quote/route.ts), which currently logs and returns `{ ok: true }`. See [TODO.md](TODO.md) before launch.
- **Service area map** is a custom SVG that projects each city's lat/lng to viewBox space. We chose this over Mapbox/Leaflet to keep the bundle light. If a richer interactive street map is wanted later, swap in Mapbox; the data model in [lib/cities.ts](lib/cities.ts) is already shaped for it.
- **Redirects** for the legacy WordPress URL structure are in [next.config.mjs](next.config.mjs).

## Deployment notes (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` and `QUOTE_WEBHOOK_URL` in the Vercel project settings.
4. Vercel detects Next.js and Tailwind v4 automatically. No `vercel.json` needed.
5. Set up the production domain (`raintamer.com`) and a `www` redirect.
6. Submit `https://raintamer.com/sitemap.xml` to Google Search Console.

## Accessibility

- WCAG 2.2 AA target across the site.
- Skip-to-content link on the root layout.
- All interactive components have keyboard equivalents.
- All animation respects `prefers-reduced-motion`.
- Color contrast verified against AA on the dark theme.

## Performance

Lighthouse targets:

- Performance 95+
- Accessibility 100
- Best Practices 100
- SEO 100

Tactics in place:

- Static generation everywhere except the API route.
- next/font with `display: swap`.
- next/image is used for any future bitmap photography.
- Hero rain canvas caps at 180 droplets and bails on `prefers-reduced-motion`.
- Map and review carousel are SVG/DOM only, no heavy map tile bundles.

## Pre-launch checklist

See [TODO.md](TODO.md).
