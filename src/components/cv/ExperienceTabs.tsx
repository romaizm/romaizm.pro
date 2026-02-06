"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ExperienceTabsDesktop } from "./ExperienceTabsDesktop";
import { ExperienceAccordion } from "./ExperienceAccordion";

interface Position {
  id: string;
  company: string;
  companySlug: string;
  title: string;
  period: string;
  description: string[];
  mainSkills: string[];
}

export function ExperienceTabs() {
  const t = useTranslations("cv.experience");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });

  const positions = t.raw("positions") as Position[];

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- SSR hydration guard
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          {!mounted ? (
            // SSR fallback - render accordion (mobile-first)
            <ExperienceAccordion positions={positions} />
          ) : isMobile ? (
            <ExperienceAccordion positions={positions} />
          ) : (
            <ExperienceTabsDesktop positions={positions} />
          )}
        </div>
      </div>
    </section>
  );
}
