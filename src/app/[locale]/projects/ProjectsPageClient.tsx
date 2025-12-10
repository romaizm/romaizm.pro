"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import type { Project } from "@/types";

interface ProjectsPageClientProps {
  projects: Project[];
  categories: string[];
}

export function ProjectsPageClient({
  projects,
  categories,
}: ProjectsPageClientProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProjects = activeFilter
    ? projects.filter((p) => p.category === activeFilter)
    : projects;

  return (
    <section className="pt-32 pb-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-xl"
        >
          <h1 className="text-fluid-h1 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("title")}
          </h1>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProjectFilter
            categories={categories}
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
          />
        </motion.div>

        <ProjectGrid projects={filteredProjects} />
      </div>
    </section>
  );
}
