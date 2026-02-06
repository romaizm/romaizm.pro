"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/cv", key: "cv" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At top of page - always expanded
      if (currentScrollY < 20) {
        setIsCompact(false);
      }
      // Scrolling down - compact
      else if (currentScrollY > lastScrollYRef.current) {
        setIsCompact(true);
      }
      // Scrolling up - expanded
      else {
        setIsCompact(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      {/* Floating centered navigation bar */}
      <nav
        className={cn(
          "mx-auto rounded-full px-4 py-2 transition-all duration-500",
          "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md",
          "gradient-border",
          isCompact
            ? "max-w-4xl shadow-xl shadow-neutral-900/10"
            : "max-w-7xl"
        )}
      >
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  pathname === item.href
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[-1] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "md:hidden mt-2 mx-auto origin-top",
                isCompact ? "max-w-4xl" : "max-w-7xl"
              )}
            >
              <div className="bg-neutral-50/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-4">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                          pathname === item.href
                            ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                            : "text-neutral-900 dark:text-white"
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="pt-3 mt-2 border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <LanguageSwitcher />
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
