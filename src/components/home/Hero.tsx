"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";

// Lazy load SparklesCore to avoid blocking initial render
const SparklesCore = dynamic(
  () => import("@/components/ui/SparklesCore").then((mod) => mod.SparklesCore),
  { ssr: false }
);

export function Hero() {
  const t = useTranslations("hero");
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-fluid-container relative z-20">
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
          <div className="max-w-3xl text-center">
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-fluid-2xs mb-fluid-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {t("status")}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-fluid-display font-bold text-neutral-900 dark:text-white mb-fluid-sm">
              {t("name")}
            </h1>

            {/* Title */}
            <p className="text-fluid-h3 text-neutral-600 dark:text-white relative z-20">
              {t("title")}
            </p>

            {/* Sparkles under title */}
            <div className="w-full max-w-2xl mx-auto h-24 relative mt-4 mb-fluid-xs origin-center">
              {/* Gradient lines */}
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] w-3/4 blur-sm origin-center" />
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 origin-center" />
              <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent h-[5px] w-1/4 blur-sm origin-center" />
              <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent h-px w-1/4 origin-center" />

              {/* Sparkles */}
              <SparklesCore
                id="hero-sparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor={resolvedTheme === "dark" ? "#FFFFFF" : "#0891b2"}
              />

              {/* Radial gradient mask */}
              <div className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
            </div>

            {/* Subtitle */}
            <p className="text-fluid-body-lg text-neutral-500 dark:text-neutral-300 mb-fluid-lg">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-fluid-xs">
              <Link href="/projects" className="w-full sm:w-auto">
                <Button asChild size="lg" className="rounded-full px-8 w-full sm:w-auto">
                  {t("cta")}
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 w-full sm:w-auto">
                  {t("contact")}
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-fluid-sm mt-fluid-lg">
              <a
                href="https://github.com/romaizm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://t.me/romaizm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
