import { setRequestLocale, getTranslations } from "next-intl/server";
import { CVHero } from "@/components/cv/CVHero";
import { TechStack } from "@/components/cv/TechStack";
import { ExperienceTabs } from "@/components/cv/ExperienceTabs";
import { CVFeaturedProjects } from "@/components/cv/CVFeaturedProjects";
import { Education } from "@/components/cv/Education";
import { ContactCTA } from "@/components/home/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPersonSchema } from "@/lib/seo/schemas";
import { getFeaturedProjects } from "@/lib/mdx/projects";
import { getPageMetadata } from "@/lib/seo/alternates";

interface CVPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CVPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = tMeta("cv.description");

  return getPageMetadata({ title, description, path: "/cv", locale });
}

export default async function CVPage({ params }: CVPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredProjects = await getFeaturedProjects(locale);

  return (
    <>
      <JsonLd data={getPersonSchema(locale)} />
      <CVHero />
      <TechStack />
      <ExperienceTabs />
      <Education />
      <CVFeaturedProjects projects={featuredProjects} />
      <ContactCTA />
    </>
  );
}
