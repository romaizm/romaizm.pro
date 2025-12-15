"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

const termKeys = [
  "commission",
  "minimum",
  "qualifies",
  "recurring",
  "repeat",
  "expiration",
] as const;

const termIcons = {
  commission: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  minimum: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  qualifies: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  recurring: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  repeat: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  expiration: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function TermCard({ termKey, index }: { termKey: (typeof termKeys)[number]; index: number }) {
  const t = useTranslations("referral");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg h-full"
    >
      <div className="h-full rounded-xl bg-neutral-50 dark:bg-neutral-900 p-fluid-sm flex flex-col">
        <div className="icon-gradient mb-fluid-xs">
          {termIcons[termKey]}
        </div>

        <h3 className="text-fluid-h6 font-semibold text-neutral-900 dark:text-white mb-fluid-2xs">
          {t(`terms.items.${termKey}.label`)}
        </h3>

        <p className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line flex-grow">
          {t(`terms.items.${termKey}.value`)}
        </p>
      </div>
    </motion.div>
  );
}

export function Terms() {
  const t = useTranslations("referral");
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-xl"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white">
            {t("terms.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {termKeys.map((key, index) => (
            <TermCard key={key} termKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
