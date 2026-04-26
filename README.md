# create-next-log

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/geonsang-jo/create-next-log/actions/workflows/ci.yml/badge.svg)](https://github.com/geonsang-jo/create-next-log/actions/workflows/ci.yml)

A CLI scaffolder for personal developer blogs, powered by Next.js 15 and MDX. Fully responsive — works on desktop, tablet, and mobile.

![Demo](https://github.com/user-attachments/assets/d9aabdaf-53c8-4888-b2d8-ebaa56ad429e)

## Quick Start

### Option 1: One-click deploy

Deploy directly to Vercel and get a blog running in seconds:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgeonsang-jo%2Fcreate-next-log%2Ftree%2Fmain%2Fpackages%2Ftemplate)

Then customize `next-log.config.ts` in your new repo.

### Option 2: CLI (recommended)

Create a fully customized blog with interactive prompts:

```bash
npx create-next-log        # npm
yarn dlx create-next-log   # yarn
pnpm dlx create-next-log   # pnpm
```

```bash
cd my-blog
npm run dev   # or: yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — your blog is ready.

## Project Structure

```
my-blog/
├── posts/                      # Your content lives here
│   └── hello-world/
│       └── index.mdx
├── public/
│   └── posts/                  # Post images
│       └── hello-world/
├── app/                        # Blog engine (no need to touch)
│   ├── layout.tsx              # Root layout with theme & header
│   ├── page.tsx                # Post list (root page)
│   ├── post/[slug]/            # Post detail page
│   ├── components/             # UI components
│   ├── styles/                 # CSS & theme
│   ├── utils/posts.ts          # Post loading logic
│   └── api/og/[slug]/          # Dynamic OG image generation
├── scripts/
│   ├── new-post.js             # Post scaffolding script
│   └── new-resume.js           # Resume page generator
├── next-log.config.ts          # Blog configuration
└── package.json
```

**You only need to care about:**
- `posts/` — where you write
- `public/posts/` — where post images go
- `next-log.config.ts` — your blog settings

## Configuration

All settings live in `next-log.config.ts`:

```typescript
import type { SiteConfig } from "./types/config";

const config = {
  title: "My Dev Blog",
  description: "Thoughts on web development",
  url: "https://myblog.com",
  language: "en",
  author: { name: "Jane Doe" },
  social: {
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
  },
  theme: { primaryColor: "#1db954" },
  googleVerification: "",
  googleAnalyticsId: "",
} satisfies SiteConfig;

export default config;
```

See [docs/configuration.md](docs/configuration.md) for full details.

## Deploy

### Vercel (recommended)

1. Push your blog to GitHub
2. Import at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected
3. Click **Deploy**

Every `git push` to `main` triggers an automatic redeploy.

See [docs/deploy.md](docs/deploy.md) for domain setup, Google Search Console, Netlify, and static export.

## Documentation

| Guide | Description |
|-------|-------------|
| [Writing Posts](docs/writing-posts.md) | Creating posts, frontmatter fields, images, publishing workflow |
| [MDX Components](docs/mdx-components.md) | Timeline, FileTree, code blocks, Table of Contents, custom components |
| [Configuration](docs/configuration.md) | Full config file reference, theme, social links |
| [Deploy](docs/deploy.md) | Vercel, Netlify, static export, domain & SEO setup |
| [Resume](docs/resume.md) | Generate and customize the resume page |
| [Sitemap](docs/sitemap.md) | Auto-generated sitemap, priorities, robots.txt |

## Demo

[create-next-log-demo.vercel.app](https://create-next-log-demo.vercel.app)

## Use Case

- [if-geon.xyz](https://if-geon.xyz) — the blog that inspired create-next-log

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org) | Framework (App Router) |
| [MDX](https://mdxjs.com) | Rich content with React components |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Radix UI](https://www.radix-ui.com) | Accessible component primitives |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MDX rendering |
| [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus) | Syntax highlighting |

## License

MIT
