import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations("projects");
  const [leadProject, ...supportingProjects] = projects.slice(0, 5);

  if (!leadProject) return null;

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <div className="mb-fluid-lg max-w-2xl">
          <p className="mb-3 text-fluid-overline font-semibold text-primary-700 dark:text-primary-400">
            01 — {t("featured")}
          </p>
          <h2 className="font-display text-fluid-h2 font-medium text-neutral-900 dark:text-white">
            {t("subtitle")}
          </h2>
        </div>

        <div className="grid gap-fluid-grid-md lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
          <Link href={`/projects/${leadProject.slug}`} className="group block min-w-0">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={leadProject.thumbnail || leadProject.images[0]}
                alt={leadProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-6 border-t border-neutral-300 pt-4 dark:border-neutral-700">
              <div className="min-w-0">
                <p className="text-fluid-caption text-neutral-500 dark:text-neutral-400">
                  {leadProject.platform} · {leadProject.clientLocation}
                </p>
                <h3 className="mt-2 font-display text-fluid-h4 font-medium text-neutral-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
                  {leadProject.title}
                </h3>
              </div>
              <span aria-hidden="true" className="mt-1 text-2xl font-light text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-neutral-500">
                ↗
              </span>
            </div>
          </Link>

          <div className="min-w-0 border-t border-neutral-300 dark:border-neutral-700">
            {supportingProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 border-b border-neutral-200 py-5 dark:border-neutral-800"
              >
                <span className="pt-1 text-xs tabular-nums text-neutral-400 dark:text-neutral-600">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-fluid-caption text-neutral-500 dark:text-neutral-400">
                    {project.platform}
                  </span>
                  <span className="mt-1 block text-fluid-h6 font-medium text-neutral-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
                    {project.title}
                  </span>
                </span>
                <span aria-hidden="true" className="pt-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-neutral-600">
                  →
                </span>
              </Link>
            ))}

            <Link
              href="/projects"
              className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-neutral-400 text-sm font-medium text-neutral-800 transition-colors hover:border-primary-700 hover:text-primary-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:border-primary-400 dark:hover:text-primary-400"
            >
              {t("viewAll")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
