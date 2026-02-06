"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
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

interface ExperienceAccordionItemProps {
  position: Position;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function ExperienceAccordionItem({
  position,
  isOpen,
  onToggle,
  index,
}: ExperienceAccordionItemProps) {
  const t = useTranslations("cv.experience");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <CompanyLogo slug={position.companySlug} company={position.company} />
          <div>
            <span className="text-fluid-body font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors block">
              {position.company}
            </span>
            <span className="text-fluid-caption text-neutral-500 dark:text-neutral-400">
              {position.period}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        >
          <svg
            className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12M6 12h12"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-13">
              <p className="text-fluid-body-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
                {position.title}
              </p>
              <ul className="space-y-1.5 mb-4">
                {position.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                  >
                    <span className="text-primary-500 mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-fluid-caption font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                  {t("mainSkills")}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {position.mainSkills.map((skill) => (
                    <Badge key={skill} variant="primary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ExperienceAccordionProps {
  positions: Position[];
}

export function ExperienceAccordion({ positions }: ExperienceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg">
      <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-4 md:p-6">
        {positions.map((position, index) => (
          <ExperienceAccordionItem
            key={position.id}
            position={position}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
