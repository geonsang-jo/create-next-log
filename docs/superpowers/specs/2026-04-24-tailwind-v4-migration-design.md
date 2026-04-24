# Tailwind CSS v3 → v4 Migration Spec

## Overview

Migrate `packages/template` from Tailwind CSS v3.3 to v4.x. Replace JS-based config with CSS-first configuration, remove deprecated plugins, and implement animations directly in CSS.

## Changes

### 1. Configuration Migration

**Remove:** `tailwind.config.js`

**Replace with:** CSS `@theme` block in `globals.css`

Migrate all customizations:
- Custom colors (HSL variables) → `@theme` color definitions
- Custom font family (Pretendard) → `@theme --font-sans`
- Custom font sizes → `@theme --text-*`
- Custom border radius → `@theme --radius-*`
- Custom container → `@utility container`
- Custom keyframes/animations → `@keyframes` in CSS
- Dark mode class strategy → `@variant dark`

### 2. PostCSS Config

**Before:**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**After:**
```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Remove `autoprefixer` from dependencies (built into v4).

### 3. CSS Directives

**Before:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After:**
```css
@import "tailwindcss";
```

### 4. Color System

Convert bare HSL triplets to full values:

**Before (v3):**
```css
--background: 0 0% 100%;
/* Used as: hsl(var(--background)) in tailwind.config.js */
```

**After (v4):**
```css
--background: hsl(0 0% 100%);
/* Used directly as: var(--background) */
```

All CSS variables in `:root` and `.dark` must be converted.

### 5. Animations — Replace `tailwindcss-animate`

**Remove:** `tailwindcss-animate` dependency

**Implement directly in CSS:**
- `accordion-down` / `accordion-up` — used by Accordion/Timeline
- `animate-in` / `animate-out` with `fade-in/out`, `slide-in/out` — used by Sheet, Dialog

### 6. Plugins

| Plugin | Action |
|--------|--------|
| `tailwindcss` v3 | Upgrade to v4 |
| `@tailwindcss/typography` | Upgrade to v4-compatible, use `@plugin` directive |
| `tailwindcss-animate` | Remove, replace with direct CSS |
| `autoprefixer` | Remove (built into v4) |

### 7. `prism.css` Internal Variables

Replace Tailwind v3 internal variables with standard CSS:
- `--tw-ring-offset-shadow` → remove/replace
- `--tw-ring-shadow` → remove/replace  
- `--tw-shadow` / `--tw-shadow-colored` → standard `box-shadow`
- `--tw-text-opacity` → direct `color` value

### 8. Component Updates

Files using `ring-offset-background`, `ring-ring`, or other v3-specific utility patterns need updating:
- `button.tsx`
- `sheet.tsx`
- `dialog.tsx`
- `accordion.tsx`

### 9. Dependencies

**Add:**
- `tailwindcss` v4
- `@tailwindcss/postcss`
- `@tailwindcss/typography` (v4-compatible)

**Remove:**
- `tailwindcss` v3
- `autoprefixer`
- `tailwindcss-animate`
- `postcss` (check if still needed or bundled)

## Out of Scope

- Tailwind v4 CSS-only features not needed by template (container queries, etc.)
- Original next-log blog migration (separate task)
