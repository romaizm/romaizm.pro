import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <article className="group relative h-full rounded-2xl gradient-border-hover transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/5 dark:hover:shadow-neutral-900/20">
        <div className="relative h-full rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 flex flex-col">
          {/* Thumbnail */}
          <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden">
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-bold text-neutral-200 dark:text-neutral-800">
                  {project.client.charAt(0)}
                </span>
              </div>
            )}
            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-5 h-5 text-neutral-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="p-fluid-sm flex flex-col flex-grow">
            <div className="flex items-center gap-fluid-2xs mb-fluid-2xs flex-wrap">
              <span className="text-fluid-overline font-medium text-neutral-500 dark:text-neutral-400">
                {project.platform}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 flex-shrink-0" />
              <span className="text-fluid-caption text-neutral-400 dark:text-neutral-500">
                {project.clientLocation}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 flex-shrink-0" />
              <span className="text-fluid-caption text-neutral-400 dark:text-neutral-500">
                {project.launchDate}
              </span>
            </div>

            <h3 className="text-fluid-h5 font-semibold text-neutral-900 dark:text-white mb-fluid-2xs group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
              {project.title}
            </h3>

            <p className="text-fluid-body-sm text-neutral-500 dark:text-neutral-400 mb-fluid-xs flex-grow">
              {project.description || `${project.client} - ${project.category}`}
            </p>

            <div className="flex flex-wrap gap-fluid-2xs mt-auto">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="default">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
