import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { getAlternates, getOgImageUrl } from "@/lib/seo/alternates";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("pageTitle");
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: getAlternates("/contact"),
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <section className="pt-32 pb-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-fluid-xl">
            <h1 className="text-fluid-h1 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
              {t("pageTitle")}
            </h1>
            <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-fluid-grid-md">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
