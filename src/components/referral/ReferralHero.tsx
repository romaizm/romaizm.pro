import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function ReferralHero() {
  const t = useTranslations("referral");

  return (
    <section className="pt-36 pb-fluid-section-sm md:pt-44">
      <div className="container mx-auto px-fluid-container">
        <div className="grid items-end gap-fluid-grid-lg border-b border-neutral-300 pb-fluid-xl dark:border-neutral-700 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <div className="max-w-4xl">
            <p className="mb-5 text-fluid-overline font-semibold text-primary-700 dark:text-primary-400">
              {t("terms.items.commission.label")}
            </p>
            <h1 className="font-display text-fluid-display font-medium text-balance text-neutral-900 dark:text-white">
              {t("title")}
            </h1>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-300">
              {t("subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
              >
                {t("cta.button")}
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex min-h-11 items-center justify-center border border-neutral-300 px-6 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500"
              >
                {t("howItWorks.title")} <span aria-hidden="true" className="ml-2">↓</span>
              </Link>
            </div>
          </div>
        </div>

        <dl className="grid gap-6 pt-7 sm:grid-cols-3">
          {(["commission", "minimum", "expiration"] as const).map((key) => (
            <div key={key}>
              <dt className="text-fluid-caption text-neutral-500 dark:text-neutral-400">
                {t(`terms.items.${key}.label`)}
              </dt>
              <dd className="mt-1 whitespace-pre-line text-fluid-body font-medium text-neutral-900 dark:text-white">
                {t(`terms.items.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
