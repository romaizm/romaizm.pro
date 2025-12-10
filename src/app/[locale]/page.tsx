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
      <AboutPreview />
      <FeaturedProjects projects={featuredProjects} />
      <Services />
      <ContactCTA />
    </>
  );
}
