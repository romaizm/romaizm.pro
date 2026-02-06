"use client";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { motion, useInView } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";

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
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/* Left fade gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: canScrollLeft ? 1 : 0 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 md:w-32 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent"
      />
      {/* Right fade gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: canScrollRight ? 1 : 0 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 md:w-32 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent"
      />

      <div
        className={cn(
          "flex w-full overflow-x-auto overscroll-x-auto py-10 [scrollbar-width:none] md:py-20",
          "scroll-smooth snap-x snap-mandatory"
        )}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "mx-auto max-w-7xl"
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={"card" + index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.95 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="rounded-3xl first:pl-[5%] md:first:pl-[10%] last:pr-[5%] md:last:pr-[33%] select-none snap-center"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mr-10 flex justify-end gap-2 relative z-30"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Previous slide"
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Next slide"
        >
          <IconArrowNarrowRight className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export const Card = ({
  card,
  index,
}: {
  card: CardData;
  index: number;
}) => {
  return (
    <Link
      href={card.href as "/projects" | `/projects/${string}`}
      className="relative z-10 flex h-80 w-56 flex-col items-start justify-between overflow-hidden rounded-3xl bg-neutral-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 group"
    >
      {/* Top gradient overlay for title readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

      {/* Bottom gradient overlay for tags readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Subtle overall overlay for better contrast */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

      <div className="relative z-40 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-left font-sans text-xs font-medium text-white md:text-sm bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {card.category}
          </span>
          {card.location && (
            <span className="text-left font-sans text-xs text-white/90 md:text-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {card.location}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl drop-shadow-md">
          {card.title}
        </p>
      </div>

      {/* Bottom tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="relative z-40 p-4 md:p-8 w-full">
          <div className="flex flex-wrap gap-1 md:gap-1.5">
            {card.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs text-white bg-black/30 backdrop-blur-sm px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-white/10 whitespace-nowrap md:hidden"
              >
                {tag}
              </span>
            ))}
            {card.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="hidden md:inline-block text-xs text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {card.tags.length > 2 && (
              <span className="text-[10px] md:text-xs text-white bg-black/30 backdrop-blur-sm px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-white/10 whitespace-nowrap md:hidden">
                +{card.tags.length - 2}
              </span>
            )}
            {card.tags.length > 3 && (
              <span className="hidden md:inline-block text-xs text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap">
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
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false);
    }
  }, []);

  return (
    <img
      ref={imgRef}
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
};
