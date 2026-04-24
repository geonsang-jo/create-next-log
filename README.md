# create-next-log

A CLI scaffolder for personal developer blogs, powered by Next.js 15 and MDX.

Generate a fully configured, production-ready blog with one command. Write posts in MDX, customize with a single config file, and deploy anywhere.

```bash
npx create-next-log        # npm
yarn dlx create-next-log   # yarn
pnpm dlx create-next-log   # pnpm
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
npx create-next-log        # npm
yarn dlx create-next-log   # yarn
pnpm dlx create-next-log   # pnpm
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

Everything inside `app/` works out of the box.

## Writing Posts

### Create a new post

```bash
npm run new-post "my-first-post"   # or: yarn new-post "my-first-post"
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

1. `npm run new-post "slug"` (or `yarn new-post "slug"`) — creates a draft (`published: false`)
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

MDX lets you use React components inside Markdown. The following components are built-in and available in any post without importing.

---

#### Timeline

An accordion-based timeline. Each item has a title, a summary (always visible), and expandable detail content. Click to expand/collapse.

**Props:**

| Component | Prop | Type | Description |
|-----------|------|------|-------------|
| `Timeline` | `children` | `ReactNode` | `TimelineItem` elements |
| `TimelineItem` | `title` | `string` | Heading text (e.g. year, milestone) |
| `TimelineItem` | `summary` | `string` | Short description, always visible |
| `TimelineItem` | `children` | `ReactNode` | Expandable detail content (Markdown, lists, etc.) |

**Example:**

```mdx
<Timeline>
  <TimelineItem title="2025 Q1" summary="Launched the MVP with core blogging features.">
    - MDX post support
    - Dark/light mode
    - Automatic sitemap generation
  </TimelineItem>
  <TimelineItem title="2025 Q2" summary="Added resume page and OG image generation.">
    - Dynamic OG images via `next/og`
    - Resume auto-detection in nav
    - Syntax highlighting with Prism
  </TimelineItem>
  <TimelineItem title="2025 Q3" summary="Open-sourced as create-next-log.">
    Published to npm. Anyone can scaffold a blog with one command.
  </TimelineItem>
</Timeline>
```

**Rendered behavior:**
- Each item shows the title and summary
- Click anywhere on an item to expand the detail content
- Multiple items can be open at the same time

---

#### FileTree

An interactive file tree with folder expand/collapse animations and tree line connectors. Great for showing project structures.

**Props:**

| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| `FileTree` | `children` | `ReactNode` | | Root container — wrap `Folder` and `File` elements |
| `Folder` | `name` | `string` | | Folder name |
| `Folder` | `defaultOpen` | `boolean` | `false` | Whether the folder starts expanded |
| `Folder` | `children` | `ReactNode` | | Nested `Folder` and `File` elements |
| `File` | `name` | `string` | | File name |

**Example:**

```mdx
<FileTree>
  <Folder name="my-blog" defaultOpen>
    <Folder name="posts" defaultOpen>
      <Folder name="hello-world">
        <File name="index.mdx" />
      </Folder>
    </Folder>
    <Folder name="app">
      <File name="layout.tsx" />
      <File name="page.tsx" />
    </Folder>
    <File name="next-log.config.ts" />
    <File name="package.json" />
  </Folder>
</FileTree>
```

**Rendered behavior:**
- Folders show a chevron and folder icon, click to toggle
- Files show a file icon
- Tree lines connect nested items visually
- Animated expand/collapse transitions
- Displayed on a grid background with a frosted glass card

---

#### Adding your own components

You can create custom components and use them in MDX. Add your component to `app/components/mdx/` and register it in `app/components/mdx/index.ts`:

```typescript
// app/components/mdx/index.ts
import { Timeline, TimelineItem } from "./Timeline";
import { FileTree, Folder, File } from "./FileTree";
import { MyComponent } from "./MyComponent";  // your component

export const mdxComponents = {
  Timeline,
  TimelineItem,
  FileTree,
  Folder,
  File,
  MyComponent,  // register it here
};
```

Then use it in any MDX file without importing:

```mdx
<MyComponent prop="value" />
```

## Table of Contents

A table of contents is **automatically generated** from your post's headings. No configuration needed — just use `##` and `###` headings in your MDX.

**How it works:**
- `## Heading` (h2) → top-level TOC entry
- `### Subheading` (h3) → nested under the preceding h2

**Example:**

```mdx
## Getting Started          ← TOC entry

Some content here...

### Installation            ← nested under "Getting Started"

More content...

### Configuration           ← nested under "Getting Started"

More content...

## Advanced Usage           ← TOC entry

Some content...

### Custom Plugins          ← nested under "Advanced Usage"
```

**Rendered behavior:**
- **Desktop (xl+):** appears as a sticky sidebar on the right side of the post
- **Mobile:** hidden (screen too narrow for sidebar)
- The current section is highlighted as you scroll
- Click any entry to smooth-scroll to that section

**Notes:**
- `# Heading` (h1) is **not** included — use h1 only for the post title
- Headings are slugified for anchor links (e.g. `## My Section` → `#my-section`)
- Korean headings are supported in slug generation

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

Set via `theme.primaryColor` in `next-log.config.ts`. The value is applied as a CSS variable (`--primary`) on the `<html>` tag at runtime, overriding the default in `globals.css`. You can also edit the CSS directly for fine-grained control.

## Resume Page

Generate a resume page with a guide template:

```bash
npm run new-resume   # or: yarn new-resume
```

This creates `app/resume/page.tsx` with example sections:
- Experience
- Skills
- Projects

The header navigation **automatically detects** the resume page — when `app/resume/page.tsx` exists, a "Resume" link appears. Delete the file to remove it.

## How Sitemap Works

The sitemap is **automatically generated** at build time by `app/sitemap.ts`.

It includes:
- `/` — the main posts listing page
- `/post/<slug>` — every published post, with `lastModified` set from the post's `date` field
- `/resume` — if the resume page exists

**Priorities:**
| Page | Priority | Change Frequency |
|------|----------|-----------------|
| `/` | 1.0 | weekly |
| `/post/<slug>` | 0.7 | monthly |
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

Theme switching is built-in:
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
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MDX rendering |
| [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus) | Syntax highlighting |

## Available Scripts

| Command | Description |
|---------|-------------|
| `dev` | Start development server |
| `build` | Production build |
| `start` | Start production server |
| `lint` | Run Next.js linter |
| `new-post "slug"` | Create a new blog post |
| `new-resume` | Generate the resume page |

Run with your package manager: `npm run <command>`, `yarn <command>`, or `pnpm <command>`.

## License

MIT
