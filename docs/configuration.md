# Configuration

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

## SEO settings

- `url` — Your blog's production URL. Used for sitemap generation, OG image URLs, and canonical links.
- `googleVerification` — Google Search Console verification token. See the [deploy guide](./deploy.md) for setup instructions.
