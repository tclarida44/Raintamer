# Image Placeholders

All image files in this directory tree are intentional placeholders. They follow
the Rain Tamer dark color palette and are clearly labeled with their filename so
they're easy to spot and swap before launch.

## Replace before launch

- `/blog/cleaning-cover.svg` - cover for "How often should you clean gutters in Oklahoma?"
- `/blog/profiles-cover.svg` - cover for "K-Style vs. Half Round vs. Box"
- `/blog/french-drain-cover.svg` - cover for "What is a French drain"
- `/projects/*` - empty directory; drop project photos here
- `/services/*` - empty directory; drop service detail hero photography here

## Adding photography

When real photography is delivered:

1. Save originals as `.jpg` or `.webp` (next/image will optimize from there).
2. Replace the SVG placeholders by updating the cover image reference in each
   blog post's frontmatter (`coverImage:`) or in the relevant component.
3. Use `next/image` everywhere for automatic optimization, lazy-loading, and
   responsive `srcset`.
4. Always include meaningful `alt` text. "Gutter installation" is fine; "image"
   is not.

## Per the project brief

We are intentionally not using stock photography. Solid-color, labeled
placeholder tiles are the v1 stand-in until real photos are shot.
