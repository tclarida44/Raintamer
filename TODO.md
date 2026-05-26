# Pre-launch TODO

Everything that's stubbed in v1 and needs real wiring before the site goes to production. Search the codebase for `TODO` to find inline references.

## Wiring required

- **Quote form destination** — [app/api/quote/route.ts](app/api/quote/route.ts) currently logs and acks. Wire to one of:
  - HubSpot/Pipedrive/Jobber webhook
  - Resend or Postmark transactional email to ops inbox
  - Slack incoming webhook (recommended for instant notification)
  - Pull `QUOTE_WEBHOOK_URL` from env and POST the payload.
- **Real Google reviews** — [lib/reviews.ts](lib/reviews.ts) has 8 placeholder reviews. Replace with Google Places API pulls (cache nightly). Keep the `Review` type stable; the carousel and Google badge components depend on it.
- **Real Google rating + review count** — `SITE.stats.googleRating` and `googleReviewCount` in [lib/site.ts](lib/site.ts) are stubbed (4.9 / 200). Replace with the real numbers, ideally from the same API call as reviews.
- **Mapbox token** — only needed if/when we swap the homepage SVG metro map for a Mapbox street map. v1 ships without it.
- **Analytics** — no analytics installed. Add Vercel Analytics, Plausible, or GA4 before launch. Plausible recommended for privacy.
- **Phone-call tracking** — if the company wants attribution on inbound calls, swap `SITE.phoneTel` for a CallRail/Invoca number.

## Logo

- **Dark-theme logo variant** — the current PNG at `/public/images/rain-tamer-logo.png` has a black tagline ("SEAMLESS GUTTERS | DRAINAGE SOLUTIONS") that reads dim on the dark navy theme. Header uses `variant="compact"` to crop the tagline out. Get a dark-theme variant of the official logo (tagline in white) from the company and drop it in alongside, then update `components/ui/Logo.tsx` to use it.

## Imagery

The site currently runs on filler Unsplash stock photography in [public/images/stock](public/images/stock) (see [ATTRIBUTION.md](public/images/stock/ATTRIBUTION.md)). Before launch, swap each for real Rain Tamer photography. The wired locations are:

- **Homepage hero** — full-bleed lightning bolt over a stormy sky. Replace with a hero shot of a finished install, ideally during a storm or at twilight, or with the company's own brand video.
- **Projects grid** ([components/sections/ProjectsGrid.tsx](components/sections/ProjectsGrid.tsx)) — six tiles, each currently uses a stock home/install photo with the project metadata overlaid. Replace with real project photography (before/after pairs would be even stronger).
- **Service detail hero photos** ([components/sections/ServiceDetail.tsx](components/sections/ServiceDetail.tsx)) — `SERVICE_HERO_IMAGES` map; swap to install photos that match each service.
- **Service-areas page + per-city pages** — currently use the same lightning-over-city photo. Could be upgraded with city-specific landmark photography.
- **Blog post covers** — set in each post's frontmatter (`coverImage:`).
- **About page** — currently uses the installer-caulk photo. A real team or shop photo would be stronger.
- **OG image** — [app/opengraph-image.tsx](app/opengraph-image.tsx) is type-only. A real photographic OG image would convert better in social shares.

## Content

- **Address** — `SITE.address` in [lib/site.ts](lib/site.ts) has a placeholder ZIP. Update with the legal place of business before launch (LocalBusiness JSON-LD depends on it).
- **Service area copy** — [lib/cities.ts](lib/cities.ts) has hand-written intros, but the `localDetail` field could use a copywriter pass for each city.
- **Blog seed posts** — three are seeded. We may want a fourth before launch (gutter color guide is a candidate; the configurator already does the visual side).
- **About page** — currently sparse. A "meet the crew" or "how we got started" expansion could help conversion.

## Legal

- **Privacy policy** — none yet. Required by GDPR/CCPA if the form collects PII.
- **Terms of service** — typically not required for a marketing site, but add if the company runs promotions/contests.
- **Cookie banner** — no cookies set in v1. Re-evaluate after analytics is added.

## SEO

- **Submit sitemap to Google Search Console** post-deploy.
- **Verify domain in GSC and Bing Webmaster Tools.**
- **301 redirects from legacy URLs** are wired in [next.config.mjs](next.config.mjs). Verify each one resolves correctly after deploy.
- **Update `metadataBase`** — currently uses the production domain. Confirm before going live.

## Performance

- **Run Lighthouse against production URL** post-deploy. Target 95+ Performance, 100 everywhere else.
- **Verify hero rain canvas perf on low-end mobile**. Drop count is already capped, but real-device check is worth it.
- **Image optimization** — once real photos land, audit that all are using `next/image` with proper sizes.

## Accessibility

- **Run axe-core or Lighthouse a11y audit** against each route post-deploy.
- **Manual keyboard test** — tab through every page, confirm focus visibility on every interactive control.
- **Screen reader pass** — at minimum verify the configurator and quote form announce sensibly.

## Hardening

- **Rate limiting** on `/api/quote` to prevent spam submission floods. Vercel Edge Config + KV would do it.
- **Honeypot or hCaptcha** on the form for bot prevention.
- **Server-side phone normalization** before piping to CRM (currently only client-side regex validation).

## Nice-to-haves

- A "before/after" interactive slider component for project photography.
- Service-area-specific reviews (filter the carousel by city when on a city page).
- Blog RSS feed at `/blog/rss.xml`.
- A "request a callback within 15 minutes" CTA on mobile during business hours.
