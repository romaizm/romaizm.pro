"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

interface Position {
  id: string;
  company: string;
  companySlug: string;
  title: string;
  period: string;
  description: string[];
  mainSkills: string[];
}

const logoExtensions: Record<string, string> = {
  freelancer: "text",
  yuwab: "png",
  oloaa: "png",
  ecwid: "svg",
  "korean-air": "svg",
  jti: "svg",
};

function CompanyLogo({ slug, company }: { slug: string; company: string }) {
  const ext = logoExtensions[slug];

  if (ext === "text") {
    return (
      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-neutral-900 dark:text-white">
          R<span className="text-gradient">.</span>
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-white/90 flex-shrink-0 shadow-sm">
      <Image
        src={`/images/companies/${slug}.${ext || "png"}`}
        alt={company}
        fill
        className="object-contain p-1.5"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement("span");
            fallback.className = "text-lg font-bold text-neutral-400";
            fallback.textContent = company[0];
            parent.appendChild(fallback);
            parent.classList.add("flex", "items-center", "justify-center");
          }
        }}
      />
    </div>
  );
}

interface ExperienceTabsDesktopProps {
  positions: Position[];
}

export function ExperienceTabsDesktop({ positions }: ExperienceTabsDesktopProps) {
  const t = useTranslations("cv.experience");
  const [activeIndex, setActiveIndex] = useState(0);
  const activePosition = positions[activeIndex];

  return (
    <div className="flex gap-6 items-stretch">
      {/* Tabs - Left side */}
      <div className="w-72 flex-shrink-0">
        <div className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg h-full">
          <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-2 space-y-1 h-full">
          {positions.map((position, index) => (
            <button
              key={position.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                activeIndex === index
                  ? "bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700"
                  : "hover:bg-white/50 dark:hover:bg-neutral-800/50"
              )}
            >
              <CompanyLogo slug={position.companySlug} company={position.company} />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium truncate transition-colors",
                    activeIndex === index
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {position.company}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                  {position.period}
                </p>
              </div>
              {activeIndex === index && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-8 bg-primary-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Content - Right side */}
      <div className="flex-1 min-w-0">
        <div className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePosition.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-6 h-full"
            >
            <div className="mb-4">
              <h3 className="text-fluid-h4 font-bold text-neutral-900 dark:text-white">
                {activePosition.title}
              </h3>
              <p className="text-fluid-body text-primary-600 dark:text-primary-400 font-medium">
                {activePosition.company}
              </p>
              <p className="text-fluid-body-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {activePosition.period}
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {activePosition.description.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <span className="text-primary-500 mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div>
              <p className="text-fluid-caption font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                {t("mainSkills")}:
              </p>
              <div className="flex flex-wrap gap-2">
                {activePosition.mainSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Badge variant="primary">{skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
