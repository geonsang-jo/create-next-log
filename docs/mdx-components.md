# MDX Components

MDX lets you use React components inside Markdown. The following components are built-in and available in any post without importing.

## Timeline

An accordion-based timeline. Each item has a title, a summary (always visible), and expandable detail content. Click to expand/collapse.

### Props

| Component | Prop | Type | Description |
|-----------|------|------|-------------|
| `Timeline` | `children` | `ReactNode` | `TimelineItem` elements |
| `TimelineItem` | `title` | `string` | Heading text (e.g. year, milestone) |
| `TimelineItem` | `summary` | `string` | Short description, always visible |
| `TimelineItem` | `children` | `ReactNode` | Expandable detail content (Markdown, lists, etc.) |

### Example

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

### Rendered behavior

- Each item shows the title and summary
- Click anywhere on an item to expand the detail content
- Multiple items can be open at the same time

## FileTree

An interactive file tree with folder expand/collapse animations and tree line connectors. Great for showing project structures.

### Props

| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| `FileTree` | `children` | `ReactNode` | | Root container — wrap `Folder` and `File` elements |
| `Folder` | `name` | `string` | | Folder name |
| `Folder` | `defaultOpen` | `boolean` | `false` | Whether the folder starts expanded |
| `Folder` | `children` | `ReactNode` | | Nested `Folder` and `File` elements |
| `File` | `name` | `string` | | File name |

### Example

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

### Rendered behavior

- Folders show a chevron and folder icon, click to toggle
- Files show a file icon
- Tree lines connect nested items visually
- Animated expand/collapse transitions
- Displayed on a grid background with a frosted glass card

## Code blocks

### Syntax highlighting

Code blocks use Prism for syntax highlighting. Specify the language after the opening backticks:

````mdx
```typescript
const hello = "world";
```
````

### Line highlighting

You can highlight specific lines in code blocks using `{lineNumbers}` syntax (provided by `rehype-prism-plus`).

## Table of Contents

A table of contents is **automatically generated** from your post's headings. No configuration needed — just use `##` and `###` headings in your MDX.

### How it works

- `## Heading` (h2) — top-level TOC entry
- `### Subheading` (h3) — nested under the preceding h2

### Example

```mdx
## Getting Started          <- TOC entry

Some content here...

### Installation            <- nested under "Getting Started"

More content...

### Configuration           <- nested under "Getting Started"

More content...

## Advanced Usage           <- TOC entry

Some content...

### Custom Plugins          <- nested under "Advanced Usage"
```

### Rendered behavior

- **Desktop (xl+):** appears as a sticky sidebar on the right side of the post
- **Mobile:** hidden (screen too narrow for sidebar)
- The current section is highlighted as you scroll
- Click any entry to smooth-scroll to that section

### Notes

- `# Heading` (h1) is **not** included — use h1 only for the post title
- Headings are slugified for anchor links (e.g. `## My Section` -> `#my-section`)
- Korean headings are supported in slug generation

## Adding your own components

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
