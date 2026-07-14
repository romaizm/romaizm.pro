"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false,
  );
}

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum travel distance in px */
  strength?: number;
}

/**
 * Leans its content a few pixels toward the cursor and springs back on
 * leave. Only active on fine-pointer hover devices without reduced motion;
 * everywhere else it renders a plain wrapper.
 */
export function Magnetic({ children, className, strength = 4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const enabled = useFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.6 });

  if (reducedMotion || !enabled) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
