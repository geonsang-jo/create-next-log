"use client";

import { usePathname, useRouter } from "next/navigation";
import LangIcon from "~components/icon/langIcon";
import { Button } from "~components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import { Languages } from "~types/translation";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (target: Languages) => {
    const segments = pathname.split("/");
    if (segments[1] === target) return;
    segments[1] = target;
    router.push(segments.join("/") || "/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} className="w-9 shrink-9 px-0">
          <LangIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant={"ghost"} onClick={() => changeLanguage("en")}>
            English
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={"ghost"} onClick={() => changeLanguage("ko")}>
            한국어
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
