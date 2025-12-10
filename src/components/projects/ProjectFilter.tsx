"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

interface ProjectFilterProps {
  categories: string[];
  onFilterChange: (category: string | null) => void;
  activeFilter: string | null;
}

export function ProjectFilter({
  categories,
  onFilterChange,
  activeFilter,
}: ProjectFilterProps) {
  const t = useTranslations("projects");

  return (
    <div className="mb-fluid-md">
      <div className="flex flex-wrap gap-fluid-2xs">
        <button
          onClick={() => onFilterChange(null)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeFilter === null
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          )}
        >
          {t("all")}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              activeFilter === category
                ? "bg-primary-600 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            )}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
