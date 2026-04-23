"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useIsRouteActive from "~hooks/useIsActive";
import { cn } from "~lib/utils";
import NavSheet from "../navSheet";

function extractLang(pathname: string): "ko" | "en" {
  const seg = pathname.split("/")[1];
  return seg === "ko" ? "ko" : "en";
}

function PageNav() {
  const pathname = usePathname();
  const lang = extractLang(pathname);
  const isArticleActive = useIsRouteActive(`/${lang}/posts`);
  const isResumeActive = useIsRouteActive(`/${lang}/resume`);

  return (
    <div className="md:flex">
      <Link
        href={`/${lang}/posts`}
        className="hidden md:flex mr-6 items-center space-x-2"
      >
        <span className="font-bold sm:inline-block">Geon</span>
      </Link>
      <nav className="hidden md:flex gap-6 items-center font-medium text-sm">
        <Link
          href={`/${lang}/posts`}
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            isArticleActive && "text-foreground"
          )}
        >
          Posts
        </Link>
        <Link
          href={`/${lang}/resume`}
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            isResumeActive && "text-foreground"
          )}
        >
          Resume
        </Link>
      </nav>
      <NavSheet />
    </div>
  );
}

export default PageNav;
