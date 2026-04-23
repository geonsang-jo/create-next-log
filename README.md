# create-next-log

A CLI scaffolder for personal developer blogs, powered by Next.js 15 and MDX.

Generate a fully configured, production-ready blog with one command. Write posts in MDX, customize with a single config file, and deploy anywhere.

```bash
npx create-next-log
```

## Features

- **Next.js 15** App Router with React 19
- **MDX** for rich content — use React components inside your posts
- **Dark / Light mode** with system preference detection
- **Automatic sitemap** and **SEO metadata** generation
- **Dynamic OG images** generated per post via `next/og`
- **Table of Contents** auto-generated from headings
- **Syntax highlighting** with Prism
- **Resume page** — generate and auto-detect in navigation
- **Custom MDX components** — Timeline, FileTree built-in
- **Config-driven** — one file controls title, author, theme, social links
- **Tailwind CSS** for styling
- **Radix UI** component primitives

## Quick Start

### 1. Create your blog

```bash
npx create-next-log
```

The CLI will ask you:

| Prompt | Description |
|--------|-------------|
| Project name | Directory name for your blog |
| Blog title | Displayed in header, metadata, OG images |
| Blog description | Used in SEO metadata |
| Author name | Shown in posts and OG images |
| Primary color | Theme accent color (presets or custom hex) |
| Deploy platform | Vercel (adds analytics) or Other |

### 2. Start the dev server

```bash
cd my-blog
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) — your blog is ready.

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
│   ├── posts/                  # Post list & detail pages
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

Everything inside `app/` works out of the box.

## Writing Posts

### Create a new post

```bash
npm run new-post "my-first-post"
```

This creates `posts/my-first-post/index.mdx` with scaffolded frontmatter:

```mdx
---
title: "my-first-post"
date: 2024-01-15
description: ""
author: "Your Name"
category: ""
thumbnail: ""
published: false
---

Write your post here.
```

### Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title, displayed in list and detail page |
| `date` | Yes | Publication date (`YYYY-MM-DD`), used for sorting |
| `description` | Yes | Short summary, shown in post list and SEO metadata |
| `author` | Yes | Author name (auto-filled from config) |
| `category` | No | Category label shown on the detail page |
| `thumbnail` | No | Image filename in `public/posts/<slug>/` |
| `introTitle` | No | HTML intro heading above the post content |
| `introDesc` | No | HTML intro description below the intro title |
| `highlightWord` | No | Keywords highlighted in the OG image |
| `published` | No | Set to `false` to keep as draft. Omitted or `true` = published |

### Publishing workflow

1. `npm run new-post "slug"` — creates a draft (`published: false`)
2. Write your content in `posts/<slug>/index.mdx`
3. Add images to `public/posts/<slug>/` if needed
4. Set `published: true` when ready
5. Commit and deploy

Drafts (`published: false`) are excluded from the post list and sitemap.

### Adding images

Place images in `public/posts/<slug>/`:

```
public/
└── posts/
    └── my-first-post/
        ├── cover.png
        └── diagram.png
```

Reference in your MDX:

```mdx
![Alt text](/posts/my-first-post/cover.png)
```

For a thumbnail, set the frontmatter field:

```yaml
thumbnail: "cover.png"
```

### Using MDX components

MDX lets you use React components inside Markdown. Built-in custom components:

#### Timeline

```mdx
<Timeline>
  <TimelineItem title="2024" description="Started the project" />
  <TimelineItem title="2025" description="Launched v1.0" />
</Timeline>
```

#### FileTree

```mdx
<FileTree>
  <Folder name="src" defaultOpen>
    <File name="index.ts" />
    <Folder name="components">
      <File name="Button.tsx" />
    </Folder>
  </Folder>
</FileTree>
```

You can also import and use your own React components in MDX files.

## Configuration

All blog settings live in `next-log.config.ts`:

```typescript
const config = {
  // Blog info
  title: "My Dev Blog",
  description: "Thoughts on web development",
  url: "https://myblog.com",        // Used for sitemap, OG images, SEO

  // Author
  author: {
    name: "Jane Doe",               // Shown in posts, OG images, JSON-LD
  },

  // Social links (optional — leave empty to hide icons)
  social: {
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
  },

  // Theme
  theme: {
    primaryColor: "#1db954",         // Accent color for hover, links, highlights
  },

  // SEO (optional)
  googleVerification: "",            // Google Search Console verification token
};

export default config;
```

### Primary color

The `primaryColor` value controls:
- Link hover states
- Active navigation indicators
- Accent highlights throughout the UI

Defined as a CSS variable (`--primary`) in `app/styles/globals.css`. You can edit the config file to change it, or directly modify the CSS for fine-grained control.

## Resume Page

Generate a resume page with a guide template:

```bash
npm run new-resume
```

This creates `app/resume/page.tsx` with example sections:
- Experience
- Skills
- Projects

The header navigation **automatically detects** the resume page — when `app/resume/page.tsx` exists, a "Resume" link appears. Delete the file to remove it.

## How Sitemap Works

The sitemap is **automatically generated** at build time by `app/sitemap.ts`.

It includes:
- `/posts` — the main posts listing page
- `/posts/<slug>` — every published post, with `lastModified` set from the post's `date` field
- `/resume` — if the resume page exists

**Priorities:**
| Page | Priority | Change Frequency |
|------|----------|-----------------|
| `/posts` | 1.0 | weekly |
| `/posts/<slug>` | 0.7 | monthly |
| `/resume` | 0.5 | monthly |

The sitemap URL is registered in `app/robots.ts` so search engines can find it automatically. No manual sitemap management needed — just publish posts and deploy.

**To verify:** After building, visit `/sitemap.xml` to see the generated sitemap.

## OG Image Generation

Every post gets a **dynamic Open Graph image** generated via the `next/og` API at `/api/og/[slug]`.

The generated image (1200x630) includes:
- Post title (large text)
- Author name (bottom right, from config)
- Dotted background pattern
- Optional keyword highlighting with gradient effect (set via `highlightWord` frontmatter)

If a post has a `thumbnail` set in frontmatter, that image is used instead of the generated one.

## Dark / Light Mode

Theme switching is built-in using `next-themes`:
- Defaults to **system preference**
- Toggle available in the header
- Persisted across page loads
- Both modes have dedicated code syntax highlighting colors

## Deploy

### Vercel (recommended)

If you selected Vercel during setup, `@vercel/analytics` is already included.

#### Step-by-step

1. **Push to GitHub**

```bash
git init
git add -A
git commit -m "Initial commit"
gh repo create my-blog --public --push
```

Or create a repo on [github.com/new](https://github.com/new) and push manually:

```bash
git remote add origin https://github.com/your-username/my-blog.git
git branch -M main
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com/new](https://vercel.com/new)
- Click **"Import Git Repository"** and select your blog repo
- Framework Preset will auto-detect **Next.js**
- Click **Deploy** — no additional configuration needed

3. **Set up your domain (optional)**

- In your Vercel project dashboard, go to **Settings > Domains**
- Add your custom domain (e.g. `myblog.com`)
- Update `url` in `next-log.config.ts` to match:

```typescript
url: "https://myblog.com",
```

4. **Enable Google Search Console (optional)**

- Go to [Google Search Console](https://search.google.com/search-console)
- Add your domain and get the verification token
- Set `googleVerification` in `next-log.config.ts`:

```typescript
googleVerification: "your-verification-token",
```

- Commit, push, and Vercel will auto-deploy

After deployment, every `git push` to `main` triggers an automatic redeploy.

### Netlify

```bash
npm run build
```

- Go to [app.netlify.com](https://app.netlify.com)
- New site > Import from Git > select your repo
- Build command: `npm run build`
- Publish directory: `.next`
- Install the [Next.js runtime plugin](https://www.netlify.com/with/nextjs/) for full SSR support

### Other platforms

The blog is a standard Next.js app. Deploy anywhere that supports Node.js:

```bash
npm run build
npm run start    # Starts production server on port 3000
```

For static hosting (GitHub Pages, S3, etc.), add `output: 'export'` to `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
};
```

Note: Static export disables server-side features (API routes, dynamic OG images). The generated OG images will not work in static mode — use `thumbnail` in frontmatter instead.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org) | Framework (App Router) |
| [React 19](https://react.dev) | UI library |
| [MDX](https://mdxjs.com) | Rich content with React components |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Radix UI](https://www.radix-ui.com) | Accessible component primitives |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MDX rendering |
| [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus) | Syntax highlighting |
| [dayjs](https://day.js.org) | Date formatting |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js linter |
| `npm run new-post "slug"` | Create a new blog post |
| `npm run new-resume` | Generate the resume page |

## License

MIT
