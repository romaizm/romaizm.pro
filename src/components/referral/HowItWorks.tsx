"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

const steps = ["recommend", "contact", "work", "commission"] as const;

const stepIcons = {
  recommend: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  contact: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  work: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  commission: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
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
        {/* Step number badge */}
        <div className="flex items-center gap-3 mb-fluid-xs">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
            {index + 1}
          </div>
          <div className="icon-gradient">
            {stepIcons[step]}
          </div>
        </div>

        <h3 className="text-fluid-h6 font-semibold text-neutral-900 dark:text-white mb-fluid-2xs">
          {t(`howItWorks.steps.${step}.title`)}
        </h3>

        <p className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 flex-grow">
          {t(`howItWorks.steps.${step}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

function Arrow() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <svg
        className="w-6 h-6 text-cyan-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

export function HowItWorks() {
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
            {t("howItWorks.title")}
          </h2>
        </motion.div>

        {/* Desktop: cards with arrows between them */}
        <div className="hidden lg:flex items-stretch gap-4 md:gap-6">
          <div className="flex-1">
            <StepCard step="recommend" index={0} />
          </div>
          <Arrow />
          <div className="flex-1">
            <StepCard step="contact" index={1} />
          </div>
          <Arrow />
          <div className="flex-1">
            <StepCard step="work" index={2} />
          </div>
          <Arrow />
          <div className="flex-1">
            <StepCard step="commission" index={3} />
          </div>
        </div>

        {/* Mobile/Tablet: simple grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:hidden">
          {steps.map((step, index) => (
            <StepCard key={step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
