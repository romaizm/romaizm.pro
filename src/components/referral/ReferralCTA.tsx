"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function ReferralCTA() {
  const t = useTranslations("referral");
  const tContact = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="rounded-2xl card-line">
            <div className="bg-neutral-50 dark:bg-neutral-950 rounded-2xl p-fluid-lg">
              <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
                {t("cta.title")}
              </h2>

              <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400 mb-fluid-md">
                {t("cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-fluid-xs justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t("cta.button")}
                  </Button>
                </Link>
              </div>

              <p className="mt-fluid-sm text-fluid-body-sm text-primary-700 dark:text-primary-400 font-medium">
                {tContact("available")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
