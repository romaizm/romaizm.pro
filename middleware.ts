import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - Static files with extensions
    // - Landing pages (separate from i18n)
    "/",
    "/(en|ru)/:path*",
    "/((?!api|_next|_vercel|landing|.*\\..*).*)",
  ],
};
