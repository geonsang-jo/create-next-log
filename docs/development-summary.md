# Development Summary

## Overview

`create-next-log` is a CLI scaffolder for personal developer blogs. It was built by extracting and transforming the [next-log](https://if-geon.xyz) personal blog into a reusable, config-driven template.

**Total commits:** 91
**Period:** 2026-04-23 ~ 2026-04-26

## Architecture

- **Monorepo** with two packages:
  - `packages/create-next-log` — CLI published to npm
  - `packages/template` — Blog template copied by CLI
- Template-copy approach (eject) — generated project has no runtime dependency on next-log

## Major Milestones

### Phase 1: Foundation
- Initialized monorepo, copied blog source from next-log
- Created config system (`next-log.config.ts` + `app/lib/config.ts`)
- Removed i18n (single language only)
- Flattened route structure (`[lang]/posts/[slug]` → `/post/[slug]`)
- Updated all components to read from config instead of hardcoded values

### Phase 2: Template Cleanup
- Removed personal content (posts, resume data, logos, favicon)
- Moved posts directory to project root for better UX
- Created sample posts (Hello World, Getting Started, Writing with MDX, Markdown Guide)
- Added post creation script (`npm run new-post`)
- Added resume generation script (`npm run new-resume`)

### Phase 3: CLI
- Built interactive CLI with prompts (project name, title, author, color, platform)
- Auto-detect package manager (npm/yarn/pnpm)
- Vercel analytics conditional setup
- Template copy + config generation
- Next steps guide on completion

### Phase 4: Modernization
- Upgraded Next.js 14 → 15, React 18 → 19
- Migrated Tailwind CSS v3 → v4 (CSS-first config, `@theme`, `@utility`)
- Replaced `next-themes` with custom theme implementation (zero deps)
- Removed 11 unused dependencies (dayjs, remark, unified, cmdk, sonner, vaul, etc.)

### Phase 5: Features
- RSS feed (`/feed.xml`)
- Dynamic OG image generation (`/api/og/[slug]`)
- Google Analytics support (config-driven)
- SEO improvements (JSON-LD, canonical URLs, security headers, robots.txt)
- Code block copy button
- Code line highlighting (full width)
- Table of Contents (auto-generated, sticky sidebar)
- Resume page with data-driven structure
- Dark/light mode with system preference detection

### Phase 6: Quality & DX
- E2E test script (`scripts/e2e-test.sh`)
- GitHub Actions CI (build CLI, build template, E2E test)
- All dependency versions pinned (no `^`)
- `.nvmrc` (Node 20) + `.npmrc` (save-exact)
- Code review — fixed 21 issues (critical + important + minor)
- Font moved to CDN (package size 2.1MB → 35KB)

### Phase 7: Documentation
- README with demo GIF, badges, deploy options
- 6 detailed docs: writing-posts, mdx-components, configuration, deploy, resume, sitemap
- CHANGELOG for v1.0.0
- MIT LICENSE

### Phase 8: Polish
- Brand-inspired color presets (Emerald, Cobalt, Rose, Crimson, Violet, Amber, Cyan)
- Route restructure: `/` for post list, `/post/[slug]` for detail
- Placeholder favicon with customization guide
- Demo deployed at [create-next-log-demo.vercel.app](https://create-next-log-demo.vercel.app)
- ESLint upgraded to v9
- CSS import order warning fixed

### Phase 9: Pre-publish QA
- XSS fix: removed `dangerouslySetInnerHTML` from introTitle/introDesc
- Moved `eslint-config-next`, `@tailwindcss/cli` to devDependencies
- Config-driven `language` field (HTML lang + RSS language)
- CLI language prompt (English, 한국어, 日本語, 中文)
- CLI color preset preview with terminal color swatches (chalk bgHex)
- `SiteConfig` interface + `satisfies` for type-safe config
- Image alt text improvement (uses post title)
- Hover color uses `--primary` CSS variable instead of hardcoded blue
- Extracted shared `formatDate` utility
- Empty state for zero posts
- `next/image` fill pattern (replaced width={0} height={0})
- Accessibility: skip-to-content link, `<nav aria-label>`, toggle aria-label
- Vercel Analytics pinned to exact version
- 404 page metadata
- npm package fields: homepage, bugs

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.15 | Framework (App Router) |
| React | 19.2.5 | UI library |
| Tailwind CSS | 4.2.4 | Styling (CSS-first config) |
| MDX | next-mdx-remote 6.0.0 | Rich content |
| Radix UI | accordion 1.2.12, dialog 1.1.15 | Component primitives |
| TypeScript | 5.2.2 | Type safety |
| ESLint | 9.39.4 | Linting |

## Project Status

**Ready for npm publish (v1.0.0)**

### Completed
- CLI scaffolder
- Template with all features
- Documentation (README + docs/)
- E2E tests + CI
- Demo site
- Public GitHub repo
- npm pack verified (36KB, 67 files)

### Future (v1.1+)
- Search (Pagefind)
- Comments (Giscus)
- Tags/categories
- Newsletter integration
- Core package for `yarn upgrade` support (v2.0)
