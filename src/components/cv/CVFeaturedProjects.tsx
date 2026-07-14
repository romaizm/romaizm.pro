import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { Project } from "@/types";

interface CVFeaturedProjectsProps {
  projects: Project[];
}

export function CVFeaturedProjects({ projects }: CVFeaturedProjectsProps) {
  const t = useTranslations("cv.featuredProjects");

  return (
    <section className="py-fluid-section border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-fluid-container">
        <div className="max-w-2xl mb-fluid-lg">
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("title")}
          </h2>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-x-fluid-lg md:grid-cols-2">
          {projects.slice(0, 6).map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-[2rem_1fr_auto] items-start gap-3 border-t border-neutral-200 py-fluid-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:border-neutral-800"
            >
              <span className="text-fluid-caption tabular-nums text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-fluid-h6 font-semibold text-neutral-900 dark:text-white">
                  {project.title}
                </span>
                <span className="mt-1 block text-fluid-body-sm text-neutral-500 dark:text-neutral-400">
                  {project.platform} · {project.clientLocation}
                </span>
              </span>
              <span aria-hidden="true" className="text-primary-700 transition-transform group-hover:translate-x-1 dark:text-primary-400">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-fluid-md">
          <Link href="/projects" className="inline-flex min-h-11 items-center border-b border-current text-sm font-semibold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:text-primary-400">
            {t("viewAll")} <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
