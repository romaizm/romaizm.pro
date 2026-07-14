"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Carousel, Card, type CardData } from "@/components/ui/AppleCardsCarousel";
import type { Project } from "@/types";

interface CVFeaturedProjectsProps {
  projects: Project[];
}

export function CVFeaturedProjects({ projects }: CVFeaturedProjectsProps) {
  const t = useTranslations("cv.featuredProjects");
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.1 });

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
    <section className="py-fluid-section border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-md"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white mb-fluid-xs">
            {t("title")}
          </h2>
          <p className="text-fluid-body-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </motion.div>

        <Carousel items={carouselItems} />

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isButtonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-fluid-md"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              {t("viewAll")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
