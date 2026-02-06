import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  ReferralHero,
  HowItWorks,
  Terms,
  CommissionCalculator,
  ReferralFAQ,
  ReferralCTA,
} from "@/components/referral";
import { getAlternates, getOgImageUrl } from "@/lib/seo/alternates";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getWebPageSchema,
} from "@/lib/seo/schemas";

interface ReferralPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ReferralPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "referral" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: getAlternates("/referral"),
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

export default async function ReferralPage({ params }: ReferralPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "referral" });
  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <div className="bg-white dark:bg-neutral-950">
      <JsonLd
        data={getWebPageSchema({
          name: t("title"),
          description: t("description"),
          url: `/${locale}/referral`,
          locale,
          dateModified: "2025-12-01",
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: locale === "ru" ? "Главная" : "Home", url: `/${locale}` },
          { name: t("title"), url: `/${locale}/referral` },
        ])}
      />
      <JsonLd data={getFAQPageSchema(faqItems)} />

      {/* Hero Section with 3D Marquee */}
      <ReferralHero />

      {/* Content sections with consistent background */}
      <div className="bg-white dark:bg-neutral-950">
        {/* How It Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Terms */}
        <Terms />

        {/* Commission Calculator & Examples */}
        <CommissionCalculator />

        {/* FAQ */}
        <ReferralFAQ />

        {/* CTA */}
        <ReferralCTA />
      </div>
    </div>
  );
}
