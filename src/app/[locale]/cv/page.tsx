import { setRequestLocale, getTranslations } from "next-intl/server";
import { CVHero } from "@/components/cv/CVHero";
import { TechStack } from "@/components/cv/TechStack";
import { ExperienceTabs } from "@/components/cv/ExperienceTabs";
import { CVFeaturedProjects } from "@/components/cv/CVFeaturedProjects";
import { Education } from "@/components/cv/Education";
import { CVContact } from "@/components/cv/CVContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPersonSchema } from "@/lib/seo/schemas";
import { getFeaturedProjects } from "@/lib/mdx/projects";
import { getAlternates, getOgImageUrl } from "@/lib/seo/alternates";

interface CVPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CVPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = tMeta("cv.description");

  return {
    title,
    description,
    alternates: getAlternates("/cv", locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: getOgImageUrl(title, description, locale),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CVPage({ params }: CVPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pdfUrl =
    locale === "ru"
      ? "/cv/Resume_Roman_Izmestev_RU.pdf"
      : "/cv/Resume_Roman_Izmestev_EN.pdf";

  const featuredProjects = await getFeaturedProjects(locale);

  return (
    <>
      <JsonLd data={getPersonSchema(locale)} />
      <CVHero pdfUrl={pdfUrl} />
      <TechStack />
      <ExperienceTabs />
      <Education />
      <CVFeaturedProjects projects={featuredProjects} />
      <CVContact />
    </>
  );
}
