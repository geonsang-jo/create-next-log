import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMetadata } from "~types/post";
import i18nConfig from "../../next-i18next.config";

const postsDirectory = path.join(process.cwd(), "app/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => {
    const fullPath = path.join(postsDirectory, file);
    const stat = fs.statSync(fullPath);
    return stat.isDirectory() && file !== "[slug]";
  });
}

function resolvePostPath(slug: string, lang: string): string | null {
  const decodedSlug = decodeURIComponent(slug);
  const realSlug = decodedSlug.replace(/\.mdx?$/, "");
  const slugDirectoryPath = path.join(postsDirectory, realSlug);

  const mdxPath = path.join(slugDirectoryPath, `index.${lang}.mdx`);
  if (fs.existsSync(mdxPath)) return mdxPath;

  const mdPath = path.join(slugDirectoryPath, `index.${lang}.md`);
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

export function getPostBySlug(slug: string, lang?: string): Post | null {
  const detectedLanguage = lang || i18nConfig.defaultLocale;
  const fullPath = resolvePostPath(slug, detectedLanguage);
  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.date instanceof Date) {
    data.date = data.date.toISOString();
  }

  const decodedSlug = decodeURIComponent(slug).replace(/\.mdx?$/, "");
  return { slug: decodedSlug, metadata: data as PostMetadata, content };
}

export function getAvailableLocales(slug: string): ("ko" | "en")[] {
  const locales: ("ko" | "en")[] = [];
  if (resolvePostPath(slug, "ko")) locales.push("ko");
  if (resolvePostPath(slug, "en")) locales.push("en");
  return locales;
}

export function getAllPosts(lang?: string): Post[] {
  const slugs = getPostSlugs();
  const detectedLanguage = lang || i18nConfig.defaultLocale;

  const posts: Post[] = slugs
    .map((slug) => getPostBySlug(slug, detectedLanguage))
    .filter((post): post is Post => post !== null);

  posts.sort((post1, post2) => {
    const date1 = new Date(post1.metadata.date);
    const date2 = new Date(post2.metadata.date);
    return date2.getTime() - date1.getTime();
  });

  return posts;
}
