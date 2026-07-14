"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Cycles through words with a masked vertical roll while the container's
 * width glides between word lengths. Pauses off-screen; renders the first
 * word statically for reduced-motion users. The animated text is
 * aria-hidden — screen readers get a stable first word.
 */
export function RotatingWord({ words, interval = 2800, className }: RotatingWordProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [widths, setWidths] = useState<number[] | null>(null);
  const hostRef = useRef<HTMLSpanElement>(null);
  const rulerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ruler = rulerRef.current;
    if (!ruler) return;
    const measure = () =>
      setWidths(Array.from(ruler.children).map((c) => c.getBoundingClientRect().width));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ruler);
    return () => ro.disconnect();
  }, [words]);

  useEffect(() => {
    if (reducedMotion || !inView || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reducedMotion, inView, words.length, interval]);

  return (
    <span ref={hostRef} className={className}>
      <span className="sr-only">{words[0]}</span>

      {/* Invisible ruler: measures each word at the inherited font size */}
      <span ref={rulerRef} aria-hidden="true" className="absolute invisible whitespace-nowrap">
        {words.map((word) => (
          <span key={word} className="inline-block">
            {word}
          </span>
        ))}
      </span>

      {reducedMotion ? (
        <span aria-hidden="true">{words[0]}</span>
      ) : (
        <motion.span
          aria-hidden="true"
          className="relative inline-flex justify-center overflow-hidden"
          animate={widths ? { width: widths[index] } : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={index}
              className="whitespace-nowrap"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              exit={{ y: "-115%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      )}
    </span>
  );
}
