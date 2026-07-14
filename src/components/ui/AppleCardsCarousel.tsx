"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

export type CardData = {
  src: string;
  title: string;
  category: string;
  location?: string;
  tags?: string[];
  href: string;
};

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const t = useTranslations("controls");
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: canScrollLeft ? 1 : 0 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-white to-transparent md:w-32 dark:from-neutral-950"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: canScrollRight ? 1 : 0 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-white to-transparent md:w-32 dark:from-neutral-950"
      />

      <div
        className={cn(
          "flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20",
        )}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="mx-auto flex max-w-7xl flex-row justify-start gap-4 pl-4">
          {items.map((item, index) => (
            <motion.div
              key={`card${index}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.95 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="snap-center select-none rounded-3xl first:pl-[5%] last:pr-[5%] md:first:pl-[10%] md:last:pr-[33%]"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative z-30 mr-10 flex justify-end gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label={t("previousSlide")}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label={t("nextSlide")}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export const Card = ({ card }: { card: CardData; index: number }) => {
  return (
    <Link
      href={card.href as "/projects" | `/projects/${string}`}
      className="group relative z-10 flex h-80 w-56 flex-col items-start justify-between overflow-hidden rounded-3xl bg-neutral-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-15 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

      <div className="relative z-40 p-6 md:p-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-left font-sans text-xs font-medium text-white backdrop-blur-sm md:text-sm">
            {card.category}
          </span>
          {card.location && (
            <span className="flex items-center gap-1 text-left font-sans text-xs text-white/90 md:text-sm">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {card.location}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white drop-shadow-md [text-wrap:balance] md:text-3xl">
          {card.title}
        </p>
      </div>

      {card.tags && card.tags.length > 0 && (
        <div className="relative z-40 w-full p-4 md:p-8">
          <div className="flex flex-wrap gap-1 md:gap-1.5">
            {card.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm md:hidden">
                {tag}
              </span>
            ))}
            {card.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="hidden whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white backdrop-blur-sm md:inline-block">
                {tag}
              </span>
            ))}
            {card.tags.length > 2 && (
              <span className="whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm md:hidden">
                +{card.tags.length - 2}
              </span>
            )}
            {card.tags.length > 3 && (
              <span className="hidden whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white backdrop-blur-sm md:inline-block">
                +{card.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <BlurImage
        src={card.src}
        alt={card.title}
        className="absolute inset-0 z-10 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
}: {
  src: string;
  className?: string;
  alt: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  );
};
