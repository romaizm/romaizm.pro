import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo/alternates";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/privacy", locale),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

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
                {t("sections.introduction.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.introduction.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.dataCollection.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.dataCollection.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.dataUse.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.dataUse.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.cookies.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.cookies.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.thirdParty.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.thirdParty.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.dataSecurity.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.dataSecurity.content")}
              </p>
            </section>

            <section>
              <h2 className="text-fluid-h4 font-semibold text-neutral-900 dark:text-white mb-3">
                {t("sections.rights.title")}
              </h2>
              <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("sections.rights.content")}
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
