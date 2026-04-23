import { MetadataRoute } from "next";
import {
  getPostSlugs,
  getAvailableLocales,
  getPostBySlug,
} from "~utils/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://if-geon.xyz";
const LOCALES = ["ko", "en"] as const;

function buildPostAlternates(slug: string): Record<string, string> {
  const available = getAvailableLocales(slug);
  const languages: Record<string, string> = {};
  for (const locale of available) {
    languages[locale] = `${SITE_URL}/${locale}/posts/${slug}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getPostSlugs();
  const entries: MetadataRoute.Sitemap = [];

  // Posts index per locale
  for (const lang of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${lang}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko/posts`,
          en: `${SITE_URL}/en/posts`,
        },
      },
    });
  }

  // Resume per locale
  for (const lang of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${lang}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko/resume`,
          en: `${SITE_URL}/en/resume`,
        },
      },
    });
  }

  // Posts: one entry per available locale per slug
  for (const slug of slugs) {
    const available = getAvailableLocales(slug);
    if (available.length === 0) continue;

    const alternates = buildPostAlternates(slug);
    const samplePost = getPostBySlug(slug, available[0]);
    const lastModified = samplePost
      ? new Date(samplePost.metadata.date)
      : new Date();

    for (const lang of available) {
      entries.push({
        url: `${SITE_URL}/${lang}/posts/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
