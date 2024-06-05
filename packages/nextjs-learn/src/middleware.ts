import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";

export const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // 默认语言不重定向
  localePrefix: "as-needed",
});

const authMiddleware = auth((req) => {
  console.log("PX-middle", req.auth);
  if (req.auth) return intlMiddleware(req);
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `/api/auth/signin?callbackUrl=${encodeURIComponent(reqUrl?.pathname)}`,
        req.url,
      ),
    );
  }
});

const publicPages = ["/", "/login"];

export default auth((req) => {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(req);
  }
  if (req.auth) return intlMiddleware(req);
  const reqUrl = new URL(req.url);
  return NextResponse.redirect(
    new URL(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(reqUrl?.pathname)}`,
      req.url,
    ),
  );
});
export const config = {
  matcher: [
    // "/((?!api|_next|_vercel|.*\\..*).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|_vercel|.*\\..*).*)",
  ],
};
