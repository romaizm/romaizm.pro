import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServicesBento, FAQ } from "@/components/services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getAllProjects } from "@/lib/mdx/projects";
import { getAlternates, getOgImageUrl } from "@/lib/seo/alternates";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getWebPageSchema,
} from "@/lib/seo/schemas";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const title = t("title");
  const description = t("metaDescription");

  return {
    title,
    description,
    alternates: getAlternates("/services", locale),
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

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const projects = await getAllProjects(locale);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          name: t("title"),
          description: t("metaDescription"),
          url: `/${locale}/services`,
          locale,
          dateModified: "2025-12-01",
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: locale === "ru" ? "Главная" : "Home", url: `/${locale}` },
          { name: t("title"), url: `/${locale}/services` },
        ])}
      />
      <JsonLd data={getFAQPageSchema(faqItems)} />

      {/* Hero Section */}
      <section className="pt-32 pb-fluid-md">
        <div className="container mx-auto px-fluid-container text-center">
          <h1 className="text-fluid-h1 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("title")}
          </h1>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <ServicesBento />

      {/* FAQ Section */}
      <FAQ />

      {/* Featured Projects */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
