"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  type: "formal" | "self-study";
}

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
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
      <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-5 h-full flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="icon-gradient flex-shrink-0">
            {item.type === "self-study" ? (
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            ) : (
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            )}
          </div>
        <div className="min-w-0">
          <h3 className="text-fluid-body font-semibold text-neutral-900 dark:text-white leading-tight">
            {item.degree}
          </h3>
          <p className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {item.institution}
          </p>
          <p className="text-fluid-caption text-neutral-500 dark:text-neutral-500 mt-1">
            {item.location} &bull; {item.period}
          </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Education() {
  const t = useTranslations("cv.education");
  const items = t.raw("items") as EducationItem[];
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });

  return (
    <section className="py-fluid-section border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-lg"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white">
            {t("title")}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, index) => (
              <EducationCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
