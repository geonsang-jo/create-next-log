# Changelog

## 1.0.0 (2026-04-26)

### Initial Release

- CLI scaffolder (`npx create-next-log`)
- Next.js 15 + React 19 + Tailwind CSS v4
- MDX blog with custom components (Timeline, FileTree)
- Dark / Light mode with system preference detection
- Dynamic OG image generation per post
- Auto-generated sitemap and RSS feed
- Resume page generator (`npm run new-resume`)
- Post creation script (`npm run new-post`)
- Config-driven setup (`next-log.config.ts` with `SiteConfig` type + `satisfies`)
- Language selection in CLI (English, 한국어, 日本語, 中文)
- Color preset preview with terminal color swatches
- Google Analytics support
- SEO optimizations (JSON-LD, canonical URLs, robots.txt)
- Accessibility: skip-to-content link, semantic `<nav>`, aria-labels
- Code syntax highlighting with copy button
- Table of Contents auto-generated from headings
