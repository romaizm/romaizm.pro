import { routing } from "@/lib/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

export function getAlternates(path: string = "", locale: string = "en") {
  const languages: Record<string, string> = {};

  routing.locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}${path}`;
  });

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages,
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
