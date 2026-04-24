# Deploy

## Vercel (recommended)

If you selected Vercel during setup, `@vercel/analytics` is already included.

### Step-by-step

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

## Netlify

```bash
npm run build
```

- Go to [app.netlify.com](https://app.netlify.com)
- New site > Import from Git > select your repo
- Build command: `npm run build`
- Publish directory: `.next`
- Install the [Next.js runtime plugin](https://www.netlify.com/with/nextjs/) for full SSR support

## Other platforms

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
