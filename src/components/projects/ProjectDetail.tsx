"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations("projects");

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("viewAll")}
          </Link>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="primary">{project.platform}</Badge>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {project.clientLocation}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {project.launchDate}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                {project.title}
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                {project.description}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto">
                    {t("visitSite")}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Button>
                </a>
              )}
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {project.content.split("\n").reduce((acc: React.ReactNode[], line, i) => {
                  // Skip empty lines
                  if (!line.trim()) return acc;

                  // H2 headers
                  if (line.startsWith("## ")) {
                    acc.push(
                      <h2 key={i} className="text-2xl font-bold mt-8 mb-4 first:mt-0">
                        {line.replace("## ", "")}
                      </h2>
                    );
                    return acc;
                  }

                  // List items - collect consecutive items
                  if (line.startsWith("- ")) {
                    const prevElement = acc[acc.length - 1];
                    // Check if previous element is a list
                    if (prevElement && typeof prevElement === 'object' && 'type' in (prevElement as any) && (prevElement as any).type === 'ul') {
                      // Add to existing list - need to recreate
                      const existingItems = ((prevElement as any).props.children as any[]) || [];
                      acc[acc.length - 1] = (
                        <ul key={`list-${i}`} className="list-disc pl-6 space-y-2 my-4">
                          {existingItems}
                          <li key={i}>{line.replace("- ", "")}</li>
                        </ul>
                      );
                    } else {
                      // Start new list
                      acc.push(
                        <ul key={`list-${i}`} className="list-disc pl-6 space-y-2 my-4">
                          <li key={i}>{line.replace("- ", "")}</li>
                        </ul>
                      );
                    }
                    return acc;
                  }

                  // Regular paragraph
                  acc.push(<p key={i} className="mb-4">{line}</p>);
                  return acc;
                }, [])}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image + Details */}
          <div className="lg:order-last order-first lg:sticky lg:top-24 lg:self-start">
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              {project.images && project.images.length > 0 ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-xl flex items-center justify-center">
                  <span className="text-8xl font-bold text-primary-500/30 dark:text-primary-400/30">
                    {project.client.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Project Details Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                  {t("client")} Details
                </h3>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("client")}
                    </dt>
                    <dd className="font-medium text-neutral-900 dark:text-white">
                      {project.client}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("location")}
                    </dt>
                    <dd className="font-medium text-neutral-900 dark:text-white">
                      {project.clientLocation}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("launched")}
                    </dt>
                    <dd className="font-medium text-neutral-900 dark:text-white">
                      {project.launchDate}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("platform")}
                    </dt>
                    <dd className="font-medium text-neutral-900 dark:text-white">
                      {project.platform}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                      {t("technologies")}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}
