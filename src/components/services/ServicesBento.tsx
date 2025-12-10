"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const serviceIcons = {
  webDev: (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  mobileDev: (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  webApps: (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  otherServices: (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const categoryKeys = ["webDev", "mobileDev", "webApps", "otherServices"] as const;

interface ServiceCardProps {
  categoryKey: string;
  className?: string;
  index: number;
}

function ServiceCard({ categoryKey, className, index }: ServiceCardProps) {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const title = t(`categories.${categoryKey}.title`);
  const description = t(`categories.${categoryKey}.description`);
  const items = t.raw(`categories.${categoryKey}.items`) as string[];
  const technologies = t.raw(`categories.${categoryKey}.technologies`) as string[];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "rounded-2xl gradient-border-hover h-full",
        className
      )}
    >
      <div className="rounded-2xl p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 flex flex-col h-full">
        <div className="icon-gradient mb-4">
        {serviceIcons[categoryKey as keyof typeof serviceIcons]}
      </div>

      <h3 className="text-fluid-h4 font-bold text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-fluid-body text-neutral-600 dark:text-neutral-400 mb-4">
        {description}
      </p>

      <ul className="space-y-2 mb-6 flex-grow">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-fluid-body-sm text-neutral-700 dark:text-neutral-300"
          >
            <svg
              className="w-4 h-4 text-gradient-cyan flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 min-h-[60px]">
        {technologies.length > 0 ? (
          technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 h-fit"
            >
              {tech}
            </span>
          ))
        ) : (
          <span className="text-xs text-neutral-500 dark:text-neutral-500 italic">
            {t("toolsVary")}
          </span>
        )}
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesBento() {
  const t = useTranslations("services");

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        {/* Bento Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Web Development */}
          <ServiceCard categoryKey="webDev" index={0} />

          {/* Mobile Development */}
          <ServiceCard categoryKey="mobileDev" index={1} />

          {/* Web Apps */}
          <ServiceCard categoryKey="webApps" index={2} />

          {/* Digital Services - spans full width */}
          <ServiceCard categoryKey="otherServices" index={3} className="md:col-span-2 lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}
