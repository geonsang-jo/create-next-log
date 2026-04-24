# Deploy

## Vercel (recommended)

If you selected Vercel during setup, `@vercel/analytics` is already included.

### Step 1: Push to GitHub

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

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** and select your blog repo

### Step 3: Configure project

1. Framework Preset will auto-detect **Next.js**
2. No additional configuration needed — defaults work out of the box

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your blog is live!

After deployment, every `git push` to `main` triggers an automatic redeploy.

### Step 5: Set up your domain (optional)

1. In your Vercel project dashboard, go to **Settings > Domains**
2. Add your custom domain (e.g. `myblog.com`)
3. Update `url` in `next-log.config.ts` to match:

```typescript
url: "https://myblog.com",
```

4. Commit and push — Vercel will auto-deploy with the new URL

### Step 6: Enable Google Search Console (optional)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain and get the verification token
3. Set `googleVerification` in `next-log.config.ts`:

```typescript
googleVerification: "your-verification-token",
```

4. Commit and push

### Step 7: Set up Google Analytics (optional)

1. Create a property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (e.g. `G-XXXXXXXXXX`)
3. Set `googleAnalyticsId` in `next-log.config.ts`:

```typescript
googleAnalyticsId: "G-XXXXXXXXXX",
```

4. Commit and push

## Netlify

### Step 1: Build

```bash
npm run build   # or: yarn build
```

### Step 2: Import to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. New site > Import from Git > select your repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the [Next.js runtime plugin](https://www.netlify.com/with/nextjs/) for full SSR support

## Other platforms

The blog is a standard Next.js app. Deploy anywhere that supports Node.js:

```bash
npm run build
npm run start    # Starts production server on port 3000
```

## Static export

For static hosting (GitHub Pages, S3, etc.), add `output: 'export'` to `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  // ... rest of config
};
```

> **Note:** Static export disables server-side features (API routes, dynamic OG images, RSS feed). Use `thumbnail` in frontmatter for OG images instead of the dynamic generator.
