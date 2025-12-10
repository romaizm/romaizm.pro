import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/mdx/projects";
import { getAlternates, getOgImageUrl } from "@/lib/seo/alternates";
import { ProjectsPageClient } from "./ProjectsPageClient";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: getAlternates("/projects"),
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

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getAllProjects(locale);

  // Extract unique categories for filtering
  const categories = [...new Set(projects.map((p) => p.category))].sort();

  return <ProjectsPageClient projects={projects} categories={categories} />;
}
