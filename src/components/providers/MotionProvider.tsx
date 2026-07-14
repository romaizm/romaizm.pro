"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation respect the user's OS-level
 * prefers-reduced-motion setting: transform/layout animations are
 * skipped while opacity fades are kept.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
