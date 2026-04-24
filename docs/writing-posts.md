# Writing Posts

## Create a new post

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

## Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title, displayed in list and detail page |
| `date` | Yes | Publication date (`YYYY-MM-DD`), used for sorting |
| `description` | Yes | Short summary, shown in post list and SEO metadata |
| `author` | Yes | Author name (auto-filled from config) |
| `category` | No | Category label shown on the detail page |
| `thumbnail` | No | Image filename in `public/posts/<slug>/` |
| `introTitle` | No | HTML intro heading above the post content (raw HTML — use only trusted content) |
| `introDesc` | No | HTML intro description below the intro title (raw HTML — use only trusted content) |
| `highlightWord` | No | Keywords highlighted in the OG image |
| `published` | No | Set to `false` to keep as draft. Omitted or `true` = published |

## Publishing workflow

1. `npm run new-post "slug"` (or `yarn new-post "slug"`) — creates a draft (`published: false`)
2. Write your content in `posts/<slug>/index.mdx`
3. Add images to `public/posts/<slug>/` if needed
4. Set `published: true` when ready
5. Commit and deploy

Drafts (`published: false`) are excluded from the post list and sitemap.

## Adding images

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
