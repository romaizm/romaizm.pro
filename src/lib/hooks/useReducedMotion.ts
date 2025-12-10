"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Custom hook that wraps Framer Motion's useReducedMotion
 * Returns animation variants based on user's motion preference
 */
export function useReducedMotion() {
  const shouldReduceMotion = useFramerReducedMotion();
  return shouldReduceMotion;
}

/**
 * Returns animation props that respect reduced motion preference
 * Use this to get conditional animation values
 */
export function useAnimationProps() {
  const shouldReduceMotion = useFramerReducedMotion();

  return {
    // For fade-in animations
    fadeIn: {
      initial: { opacity: shouldReduceMotion ? 1 : 0 },
      animate: { opacity: 1 },
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },

    // For slide-up animations
    slideUp: {
      initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },

    // For scale animations
    scale: {
      initial: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },

    // Spring config for interactions
    springConfig: shouldReduceMotion
      ? { type: "tween", duration: 0 }
      : { type: "spring", stiffness: 400, damping: 17 },
  };
}
