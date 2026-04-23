import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getPostBySlug, getAllPosts } from "~utils/posts";
import { MdxRenderer } from "~components/mdx/MdxRenderer";
import { parseToc } from "~core/blog/serializeMdx";
import TableOfContents from "~components/toc/TableOfContents";
import { getConfig } from "~lib/config";
import "~styles/prism.css";

type Props = { params: Promise<{ slug: string }> };

const config = getConfig();

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = parseToc(post.content);

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: new Date(post.metadata.date).toISOString(),
    author: {
      "@type": "Person",
      name: config.author.name,
      url: `${config.url}/resume`,
    },
    url: `${config.url}/post/${post.slug}`,
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
            {post.metadata.category} | {formattedDate(post.metadata.date)}
          </p>
        </div>
        <div className="relative max-w-[800px] m-auto">
          <TableOfContents toc={toc} />
          {(post.metadata.introTitle || post.metadata.introDesc) && (
            <div className="flex-col my-12">
              {post.metadata.introTitle && (
                <h3
                  dangerouslySetInnerHTML={{ __html: post.metadata.introTitle }}
                />
              )}
              {post.metadata.introDesc && (
                <span
                  dangerouslySetInnerHTML={{ __html: post.metadata.introDesc }}
                />
              )}
            </div>
          )}
          <hr className="border-1 w-4/12 m-auto mb-20" />
          <MdxRenderer source={post.content} />
        </div>
      </article>
    </>
  );
};

export default PostPage;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const highlightParam = post.metadata.highlightWord
    ? `&highlightWord=${encodeURIComponent(post.metadata.highlightWord)}`
    : "";
  const ogImageUrl = post.metadata.thumbnail
    ? `${config.url}/posts/${slug}/${post.metadata.thumbnail}`
    : `${config.url}/api/og/${slug}?title=${encodeURIComponent(
        post.metadata.title
      )}${highlightParam}`;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    authors: {
      name: config.author.name,
      url: `${config.url}/resume`,
    },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      url: `/post/${slug}`,
      publishedTime: new Date(post.metadata.date).toISOString(),
      authors: [config.author.name],
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
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
};
