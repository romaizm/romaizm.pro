import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="sticky top-0 z-0 min-h-svh pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-fluid-container">
        <div className="flex justify-center items-center min-h-[calc(100svh-10rem)]">
          <div className="max-w-3xl text-center hero-exit">
            {/* Status indicator */}
            <div className="hero-drift" style={{ "--drift": "-1.5rem" } as React.CSSProperties}>
              <div className="hero-settle flex items-center justify-center gap-fluid-2xs mb-fluid-md">
                <span className="inline-flex rounded-full h-2.5 w-2.5 bg-green-500" aria-hidden="true"></span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t("status")}
                </span>
              </div>
            </div>

            {/* Main heading — LCP candidate: painted at first frame, never opacity-0 */}
            <div className="hero-drift" style={{ "--drift": "-2.25rem" } as React.CSSProperties}>
              <h1
                className="hero-settle text-fluid-display font-bold text-neutral-900 dark:text-white mb-fluid-sm"
                style={{ "--settle-delay": "0.06s" } as React.CSSProperties}
              >
                {t("name")}
                <span className="text-primary-700 dark:text-primary-400">.</span>
              </h1>
            </div>

            {/* Title */}
            <div className="hero-drift" style={{ "--drift": "-3rem" } as React.CSSProperties}>
              <p
                className="hero-settle text-fluid-h3 text-neutral-600 dark:text-white mb-fluid-md"
                style={{ "--settle-delay": "0.12s" } as React.CSSProperties}
              >
                {t("title")}
              </p>
            </div>

            {/* Subtitle */}
            <div className="hero-drift" style={{ "--drift": "-3.75rem" } as React.CSSProperties}>
              <p
                className="hero-settle text-fluid-body-lg text-neutral-500 dark:text-neutral-300 mb-fluid-lg"
                style={{ "--settle-delay": "0.18s" } as React.CSSProperties}
              >
                {t("subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-drift" style={{ "--drift": "-4.5rem" } as React.CSSProperties}>
              <div
                className="hero-settle flex flex-col sm:flex-row justify-center gap-fluid-xs"
                style={{ "--settle-delay": "0.24s" } as React.CSSProperties}
              >
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
            </div>

            {/* Social links */}
            <div className="hero-drift" style={{ "--drift": "-5.25rem" } as React.CSSProperties}>
              <div
                className="hero-settle flex items-center justify-center gap-fluid-sm mt-fluid-lg"
                style={{ "--settle-delay": "0.3s" } as React.CSSProperties}
              >
                <a
                  href="https://github.com/romaizm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hit-target inline-flex text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
                  className="hit-target inline-flex text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
      </div>

      {/* Scroll cue */}
      <div
        className="hero-cue-fade absolute bottom-8 left-1/2 -ml-px hidden sm:block motion-reduce:hidden"
        aria-hidden="true"
      >
        <div className="hero-cue-line" />
      </div>
    </section>
  );
}
