import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const serviceIcons = {
  webDev: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  mobileDev: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  webApps: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  otherServices: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const categoryKeys = ["webDev", "mobileDev", "webApps", "otherServices"] as const;

function ServiceCard({ categoryKey, index }: { categoryKey: string; index: number }) {
  const t = useTranslations("services");

  return (
    <Reveal delay={index * 0.1} className="rounded-xl card-line">
      <div className="h-full rounded-xl bg-neutral-50 dark:bg-neutral-900 p-fluid-sm">
        <div className="text-primary-700 dark:text-primary-400 mb-fluid-xs">
          {serviceIcons[categoryKey as keyof typeof serviceIcons]}
        </div>

        <h3 className="text-fluid-h6 font-semibold text-neutral-900 dark:text-white mb-fluid-2xs">
          {t(`categories.${categoryKey}.title`)}
        </h3>

        <p className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400">
          {t(`categories.${categoryKey}.description`)}
        </p>
      </div>
    </Reveal>
  );
}

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <Reveal className="text-center mb-fluid-xl">
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("title")}
            <span className="text-primary-700 dark:text-primary-400">.</span>
          </h2>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-fluid-lg">
          {categoryKeys.map((key, index) => (
            <ServiceCard key={key} categoryKey={key} index={index} />
          ))}
        </div>

        <Reveal
          delay={0.2}
          className="flex flex-col sm:flex-row gap-fluid-xs justify-center"
        >
          <Link href="/services" className="w-full sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              {t("viewAll")}
            </Button>
          </Link>
          <Link href="/referral" className="w-full sm:w-auto">
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("referralLink")}
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
