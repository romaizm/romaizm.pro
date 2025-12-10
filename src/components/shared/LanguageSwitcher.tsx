"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "ru") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-2 py-1 text-sm font-medium rounded transition-colors",
          locale === "en"
            ? "text-primary-600 dark:text-primary-400"
            : "text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-neutral-400 dark:text-neutral-500">/</span>
      <button
        onClick={() => switchLocale("ru")}
        className={cn(
          "px-2 py-1 text-sm font-medium rounded transition-colors",
          locale === "ru"
            ? "text-primary-600 dark:text-primary-400"
            : "text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
        )}
        aria-label="Switch to Russian"
      >
        RU
      </button>
    </div>
  );
}
