import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Services } from "@/components/home/Services";
import { ContactCTA } from "@/components/home/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPersonSchema, getWebsiteSchema } from "@/lib/seo/schemas";
import { getAllProjects } from "@/lib/mdx/projects";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getAllProjects(locale);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <JsonLd data={getPersonSchema(locale)} />
      <JsonLd data={getWebsiteSchema()} />
      <Hero />
      {/* Opaque sheet that slides over the pinned hero on scroll */}
      <div className="relative z-10 bg-white dark:bg-neutral-950 rounded-t-3xl border-t border-neutral-200 dark:border-neutral-800">
        <AboutPreview />
        <FeaturedProjects projects={featuredProjects} />
        <Services />
        <ContactCTA />
      </div>
    </>
  );
}
