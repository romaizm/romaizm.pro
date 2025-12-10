import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx/projects";
import { getAlternates } from "@/lib/seo/alternates";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectSchema } from "@/lib/seo/schemas";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { routing } from "@/lib/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: getAlternates(`/projects/${slug}`),
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: `${baseUrl}${project.thumbnail}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={getProjectSchema({
          title: project.title,
          description: project.description,
          url: project.url,
          thumbnail: project.thumbnail,
          date: project.date,
          technologies: project.technologies,
        })}
      />
      <ProjectDetail project={project} />
    </>
  );
}
