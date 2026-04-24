# Sitemap

## How sitemap works

The sitemap is **automatically generated** at build time by `app/sitemap.ts`.

It includes:
- `/` — the main posts listing page
- `/post/<slug>` — every published post, with `lastModified` set from the post's `date` field
- `/resume` — if the resume page exists

## Priority table

| Page | Priority | Change Frequency |
|------|----------|-----------------|
| `/` | 1.0 | weekly |
| `/post/<slug>` | 0.7 | monthly |
| `/resume` | 0.5 | monthly |

## Robots.txt

The sitemap URL is registered in `app/robots.ts` so search engines can find it automatically. No manual sitemap management needed — just publish posts and deploy.

**To verify:** After building, visit `/sitemap.xml` to see the generated sitemap.
