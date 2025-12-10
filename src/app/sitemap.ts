import { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { getProjectSlugs } from "@/lib/mdx/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

function getLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  routing.locales.forEach((locale) => {
    languages[locale] = `${baseUrl}/${locale}${path}`;
  });
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getProjectSlugs();
  const staticPages = [
    "",
    "/projects",
    "/cv",
    "/contact",
    "/services",
    "/terms",
    "/privacy",
  ];
  const entries: MetadataRoute.Sitemap = [];

  // Static pages with alternates (one entry per page, not per locale)
  staticPages.forEach((page) => {
    entries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: getLanguageAlternates(page),
    });
  });

  // Project pages with alternates
  projectSlugs.forEach((slug) => {
    entries.push({
      url: `${baseUrl}/en/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: getLanguageAlternates(`/projects/${slug}`),
    });
  });

  return entries;
}
