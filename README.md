# create-next-log

A CLI scaffolder for personal developer blogs, powered by Next.js 15 and MDX.

```bash
npx create-next-log        # npm
yarn dlx create-next-log   # yarn
pnpm dlx create-next-log   # pnpm
```

## Quick Start

```bash
npx create-next-log
cd my-blog
npm run dev
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
const config = {
  title: "My Dev Blog",
  description: "Thoughts on web development",
  url: "https://myblog.com",
  author: { name: "Jane Doe" },
  social: {
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
  },
  theme: { primaryColor: "#1db954" },
  googleVerification: "",
};

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

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org) | Framework (App Router) |
| [React 19](https://react.dev) | UI library |
| [MDX](https://mdxjs.com) | Rich content with React components |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Radix UI](https://www.radix-ui.com) | Accessible component primitives |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MDX rendering |
| [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus) | Syntax highlighting |

## License

MIT
