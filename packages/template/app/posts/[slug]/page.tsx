import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";

import { getPostBySlug, getAllPosts, getAvailableLocales } from "~utils/posts";
import { MdxRenderer } from "~components/mdx/MdxRenderer";
import { parseToc } from "~core/blog/serializeMdx";
import TableOfContents from "~components/toc/TableOfContents";
import "~styles/prism.css";

type Props = { params: { lang: string; slug: string } };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://if-geon.xyz";

const PostPage = async ({ params }: Props) => {
  const { lang, slug } = params;
  const post = getPostBySlug(slug, lang);
  if (!post) notFound();

  const toc = parseToc(post.content);

  const fomattedDate = (date: string) => {
    const formattedDateKr = dayjs(date).format("YYYY년 MM월 DD일");
    const formattedDateEn = dayjs(date).format("MMMM DD, YYYY");
    return lang === "ko" ? formattedDateKr : formattedDateEn;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: new Date(post.metadata.date).toISOString(),
    inLanguage: lang === "ko" ? "ko-KR" : "en-US",
    author: {
      "@type": "Person",
      name: "Geon",
      url: `${SITE_URL}/${lang}/resume`,
    },
    url: `${SITE_URL}/${lang}/posts/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose dark:prose-invert max-w-none prose-pre:rounded-[9px] my-16">
        <div className="max-w-[1000px] m-auto text-center">
          <h1>{post.metadata.title}</h1>
          {post.metadata.thumbnail && (
            <Image
              src={`/posts/${post.slug}/${post.metadata.thumbnail}`}
              alt="post_thumbnail"
              className="rounded-[14px]"
              sizes="(max-width: 1000px) 100vw, 1000px"
              style={{ width: "100%", height: "auto" }}
              width={0}
              height={0}
              priority
            />
          )}
          <p>
            {post.metadata.category} | {fomattedDate(post.metadata.date)}
          </p>
        </div>
        <div className="relative max-w-[800px] m-auto">
          <TableOfContents toc={toc} />
          <div className="flex-col my-12">
            <h3
              dangerouslySetInnerHTML={{ __html: post.metadata.introTitle }}
            />
            <span
              dangerouslySetInnerHTML={{ __html: post.metadata.introDesc }}
            />
          </div>
          <hr className="border-1 w-4/12 m-auto mb-20" />
          <MdxRenderer source={post.content} />
        </div>
      </article>
    </>
  );
};

export default PostPage;

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = params;
  const post = getPostBySlug(slug, lang);
  if (!post) return {};

  const availableLocales = getAvailableLocales(slug);

  const highlightParam = post.metadata.highlightWord
    ? `&highlightWord=${encodeURIComponent(post.metadata.highlightWord)}`
    : "";
  const ogImageUrl = post.metadata.thumbnail
    ? `${SITE_URL}/posts/${slug}/${post.metadata.thumbnail}`
    : `${SITE_URL}/api/og/${slug}?title=${encodeURIComponent(
        post.metadata.title
      )}${highlightParam}`;

  const languages: Record<string, string> = {};
  if (availableLocales.includes("ko")) languages.ko = `/ko/posts/${slug}`;
  if (availableLocales.includes("en")) languages.en = `/en/posts/${slug}`;
  languages["x-default"] = availableLocales.includes("en")
    ? `/en/posts/${slug}`
    : `/ko/posts/${slug}`;

  const ogLocale = lang === "ko" ? "ko_KR" : "en_US";
  const ogAlternate = lang === "ko" ? "en_US" : "ko_KR";

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    authors: {
      name: "Geon",
      url: `${SITE_URL}/${lang}/resume`,
    },
    alternates: {
      canonical: `/${lang}/posts/${slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      locale: ogLocale,
      alternateLocale: ogAlternate,
      title: post.metadata.title,
      description: post.metadata.description,
      url: `/${lang}/posts/${slug}`,
      publishedTime: new Date(post.metadata.date).toISOString(),
      authors: ["Geon"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [ogImageUrl],
    },
  };
}

export const generateStaticParams = async () => {
  const locales = ["ko", "en"] as const;
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    const posts = getAllPosts(lang);
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
};
