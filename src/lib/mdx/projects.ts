import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getProjectBySlug(
  slug: string,
  locale: string
): Promise<Project | null> {
  const fullPath = path.join(projectsDirectory, locale, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ProjectFrontmatter;

  return {
    slug,
    content,
    ...frontmatter,
  };
}

export async function getAllProjects(locale: string): Promise<Project[]> {
  const localeDir = path.join(projectsDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const filenames = fs.readdirSync(localeDir);

  const projects = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(localeDir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as ProjectFrontmatter;

      return {
        slug,
        content,
        ...frontmatter,
      } as Project;
    });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectSlugs(): string[] {
  const enDir = path.join(projectsDirectory, "en");

  if (!fs.existsSync(enDir)) {
    return [];
  }

  return fs
    .readdirSync(enDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  const projects = await getAllProjects(locale);
  return projects.filter((p) => p.featured);
}
