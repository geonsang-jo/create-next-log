import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  const lang = acceptLang.toLowerCase().startsWith("ko") ? "ko" : "en";
  return NextResponse.redirect(new URL(`/${lang}/posts`, request.url));
}

export const config = {
  matcher: ["/"],
};
