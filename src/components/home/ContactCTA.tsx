"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";

export function ContactCTA() {
  const t = useTranslations("contact");
  const titleWords = t.raw("titleWords") as string[];
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
          <div className="rounded-2xl p-[1.5px] gradient-border-glow">
            <div className="bg-neutral-50 dark:bg-neutral-950 rounded-[calc(1rem-1.5px)] p-fluid-lg">
              <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
                <span className="block md:inline">{t("title")}</span>{" "}
                <span className="block md:inline">
                  <TypewriterText words={titleWords} />
                </span>
              </h2>

              <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400 mb-fluid-md">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-fluid-xs justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t("sendEmail")}
                  </Button>
                </Link>
                <a href="https://t.me/romaizm" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </Button>
                </a>
              </div>

              <p className="mt-fluid-sm text-fluid-body-sm text-gradient font-medium">
                {t("available")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
