"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Carousel, Card, type CardData } from "@/components/ui/AppleCardsCarousel";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations("projects");

  const cards: CardData[] = projects.slice(0, 6).map((project) => ({
    src: project.thumbnail || `/images/projects/${project.slug}/thumbnail.webp`,
    title: project.title,
    category: project.platform,
    location: project.clientLocation,
    tags: project.technologies,
    href: `/projects/${project.slug}`,
  }));

  const carouselItems = cards.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-md"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("featured")}
          </h2>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </motion.div>

        <Carousel items={carouselItems} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-fluid-md"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t("viewAll")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
