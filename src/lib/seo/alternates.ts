import { routing } from "@/lib/i18n/routing";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

export function getAlternates(path: string = "", locale: string = "en") {
  const languages: Record<string, string> = {};

  routing.locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}${path}`;
  });
  languages["x-default"] = `${baseUrl}/en${path}`;

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages,
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
}

export function getPageMetadata({
  title,
  description,
  path,
  locale,
  image,
}: PageMetadataOptions): Metadata {
  const canonical = `${baseUrl}/${locale}${path}`;
  const ogImage = image || getOgImageUrl(title, description, locale);
  const ogLocale = locale === "ru" ? "ru_RU" : "en_US";

  return {
    title,
    description,
    alternates: getAlternates(path, locale),
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Roman Izmestev",
      locale: ogLocale,
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function getOgImageUrl(
  title: string,
  description: string,
  locale: string = "en"
) {
  const params = new URLSearchParams({
    title,
    description,
    locale,
  });
  return `${baseUrl}/api/og?${params.toString()}`;
}
