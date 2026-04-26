# Configuration

All blog settings live in `next-log.config.ts`:

```typescript
import type { SiteConfig } from "./types/config";

const config = {
  // Blog info
  title: "My Dev Blog",
  description: "Thoughts on web development",
  url: "https://myblog.com",        // Used for sitemap, OG images, SEO
  language: "en",                    // HTML lang attribute & RSS language

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

  // Analytics (optional)
  googleAnalyticsId: "",             // e.g. "G-XXXXXXXXXX"
} satisfies SiteConfig;

export default config;
```

## Language

The `language` value sets the HTML `lang` attribute and RSS feed `<language>` tag. Selected during CLI setup (English, 한국어, 日本語, 中文). You can change it to any valid [BCP 47 language tag](https://www.w3.org/International/articles/language-tags/) (e.g. `fr`, `de`, `es`).

## Primary color

The `primaryColor` value controls:
- Link hover states
- Active navigation indicators
- Accent highlights throughout the UI

Set via `theme.primaryColor` in `next-log.config.ts`. The value is applied as a CSS variable (`--primary`) on the `<html>` tag at runtime, overriding the default in `globals.css`. You can also edit the CSS directly for fine-grained control.

## Social links

Add your profile URLs under the `social` key. Supported platforms:

- `github` — GitHub profile URL
- `linkedin` — LinkedIn profile URL

Leave a field empty or omit it to hide that icon from the header.

## Favicon

Replace the default favicon with your own. The template uses SVG favicons with light/dark mode support:

```
public/
├── favicon-light.svg    ← shown in light mode
└── favicon-dark.svg     ← shown in dark mode
```

Replace these files with your own SVG icons. The filenames must stay the same.

**Tips:**
- Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate favicons from an image
- SVG favicons support dark/light mode via `prefers-color-scheme` in the `<link>` tag
- Keep the SVG simple — it displays at 16x16 or 32x32 pixels

## SEO settings

- `url` — Your blog's production URL. Used for sitemap generation, OG image URLs, and canonical links.
- `googleVerification` — Google Search Console verification token. See the [deploy guide](./deploy.md) for setup instructions.
- `googleAnalyticsId` — Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`). When set, the GA tracking script is automatically injected.
