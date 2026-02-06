import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo/alternates";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/terms", locale),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("terms");

  return (
    <section className="pt-32 pb-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-fluid-h1 font-bold text-neutral-900 dark:text-white mb-fluid-md">
            {t("title")}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-fluid-lg">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.acceptance.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.acceptance.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.services.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.services.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.intellectualProperty.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.intellectualProperty.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.payment.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.payment.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.confidentiality.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.confidentiality.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.liability.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.liability.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.termination.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.termination.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.changes.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.changes.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.contact.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
