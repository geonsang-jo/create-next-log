"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import MenuIcon from "~components/icon/menuIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~components/ui/sheet";

function extractLang(pathname: string): "ko" | "en" {
  const seg = pathname.split("/")[1];
  return seg === "ko" ? "ko" : "en";
}

function NavSheet() {
  const pathname = usePathname();
  const lang = extractLang(pathname);
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/ge-logo-dark.png" : "/ge-logo-light.png";

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="text-left">
          <SheetTitle>
            <Link className="flex items-center" href={`/${lang}/posts`}>
              <Image src={logoSrc} alt="Geon" width={24} height={24} className="mr-2 rounded-md" />
              <span className="font-bold">Geon</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="relative overflow-hidden my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${lang}/posts`}
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Posts
              </Link>
              <Link
                href={`/${lang}/resume`}
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Resume
              </Link>
              <Link
                href="https://github.com/geonsang-jo"
                target="_blank"
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/geonsang-jo-5a570612b/"
                target="_blank"
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavSheet;
