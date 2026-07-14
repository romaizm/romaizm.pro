import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

const disallow = ["/api/", "/landing/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI assistants & search crawlers — explicitly welcomed for GEO.
      // Includes AI-training opt-in tokens (Google-Extended, Applebot-Extended,
      // CCBot) since this is a public portfolio meant to be surfaced by AI.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Applebot-Extended",
          "CCBot",
          "Bingbot",
        ],
        allow: "/",
        disallow,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
