import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-fluid-lg">
        <p className="text-neutral-500 dark:text-neutral-400">
          No projects found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
