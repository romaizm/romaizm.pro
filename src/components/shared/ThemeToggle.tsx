"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- SSR hydration guard
  }, []);

  if (!mounted) {
    return (
      <div className={className}>
        <label className={styles.switch}>
          <div className={styles.slider} />
        </label>
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className={className}>
      <label className={styles.switch}>
        <input
          className={styles.input}
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        />
        <div className={`${styles.slider} ${isDark ? styles.dark : ""}`}>
          <div className={`${styles.sunMoon} ${isAnimating ? styles.rotating : ""}`}>
            <svg className={`${styles.moonDot} ${styles.moonDot1}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.moonDot} ${styles.moonDot2}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.moonDot} ${styles.moonDot3}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.lightRay} ${styles.lightRay1}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.lightRay} ${styles.lightRay2}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.lightRay} ${styles.lightRay3}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudDark} ${styles.cloud1}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudDark} ${styles.cloud2}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudDark} ${styles.cloud3}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudLight} ${styles.cloud4}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudLight} ${styles.cloud5}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={`${styles.cloudLight} ${styles.cloud6}`} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
          </div>
          <div className={styles.stars}>
            <svg className={`${styles.star} ${styles.star1}`} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={`${styles.star} ${styles.star2}`} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={`${styles.star} ${styles.star3}`} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={`${styles.star} ${styles.star4}`} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}
