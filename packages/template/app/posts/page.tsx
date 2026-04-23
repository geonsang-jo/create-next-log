import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Post } from "~types/post";
import { getAllPosts } from "~utils/posts";
import { Skeleton } from "~components/ui/skeleton";

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const description =
    lang === "ko"
      ? "웹 개발과 기술에 대한 글 모음"
      : "A collection of writing on web development and technology";
  return {
    title: "Posts",
    description,
    openGraph: {
      title: "Posts | Geon log",
      description,
    },
    alternates: {
      canonical: `/${lang}/posts`,
      languages: {
        ko: "/ko/posts",
        en: "/en/posts",
        "x-default": "/en/posts",
      },
    },
  };
}

const getPosts = async (lang: string): Promise<Post[]> => {
  return getAllPosts(lang);
};

const Article = async ({ params }: Props) => {
  const lang = params.lang;
  const posts = await getPosts(lang);

  const fomattedDate = (date: string) => {
    const formattedDateKr = dayjs(date).format("YYYY년 MM월 DD일");
    const formattedDateEn = dayjs(date).format("MMMM DD, YYYY");
    return lang === "ko" ? formattedDateKr : formattedDateEn;
  };

  return (
    <section className="flex pt-12 pb-14 w-full md:w-[900px] m-auto px-4 md:px-0">
      <ul className="flex flex-col gap-y-10 md:gap-y-20">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className="group transition-transform ease-in-out duration-200 "
          >
            <Link
              href={`/${lang}/posts/${post.slug}`}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-x-12"
            >
              {post.metadata.thumbnail && (
                <Image
                  src={`/posts/${post.slug}/${post?.metadata.thumbnail ?? ""}`}
                  alt={`${post.slug} thumbnail`}
                  width={240}
                  height={240}
                  priority={index === 0}
                  className="rounded-[14px] object-cover group-hover:-translate-y-1 transition-transform ease-in-out duration-200 w-full md:w-[240px] h-auto md:h-[240px]"
                />
              )}
              <div className="flex flex-col">
                <span className="text-2xl md:text-4xl font-bold mb-3 transition-colors duration-300 ease-in-out group-hover:text-blue">
                  {post.metadata.title}
                </span>
                <span className="text-base md:text-lg mb-2.5">
                  {post.metadata.description}
                </span>
                <span className="text-sm text-slate-400">
                  {fomattedDate(post.metadata.date)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Article;
