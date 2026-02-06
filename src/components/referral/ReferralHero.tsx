"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

// Priority projects at the END of each column for maximum visibility (bottom = most visible)
// The array is split into 4 columns, so positions 5, 11, 17, 23 are column ends
const projectImages = [
  // Column 1 - priority at bottom
  "/images/projects/cgpc/hero.webp",
  "/images/projects/freycouture/hero.webp",
  "/images/projects/vladcar125/hero.webp",
  "/images/projects/yuwab-coaching/hero.webp",
  "/images/projects/oloaa-granola/hero.webp",
  "/images/projects/autozakaz-auctions/hero.webp",
  // Column 2 - priority at bottom
  "/images/projects/ceh-one/hero.webp",
  "/images/projects/jplab-shop/hero.webp",
  "/images/projects/univclinic/hero.webp",
  "/images/projects/samolet-parking24/hero.webp",
  "/images/projects/nord43-perfumes/hero.webp",
  "/images/projects/fattl-textiles/hero.webp",
  // Column 3 - priority at bottom
  "/images/projects/freycouture/hero.webp",
  "/images/projects/cgpc/hero.webp",
  "/images/projects/vladcar125/hero.webp",
  "/images/projects/yuwab-coaching/hero.webp",
  "/images/projects/autozakaz-auctions/hero.webp",
  "/images/projects/autozakaz-website/hero.webp",
  // Column 4 - priority at bottom
  "/images/projects/ceh-one/hero.webp",
  "/images/projects/jplab-shop/hero.webp",
  "/images/projects/univclinic/hero.webp",
  "/images/projects/samolet-parking24/hero.webp",
  "/images/projects/autozakaz-website/hero.webp",
  "/images/projects/hikor/hero.webp",
];

export function ReferralHero() {
  const t = useTranslations("referral");

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Content overlay */}
      <div className="relative z-20 mx-auto max-w-4xl px-fluid-container text-center">
        <h1 className="text-3xl font-bold text-balance text-neutral-900 dark:text-white md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 dark:text-neutral-300 md:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-fluid-xs">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t("cta.button")}
            </Button>
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              {t("howItWorks.title")}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overlay using standard background colors */}
      <div className="absolute inset-0 z-10 h-full w-full bg-white/90 dark:bg-neutral-950/85" />

      {/* 3D Marquee background */}
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={projectImages}
      />
    </div>
  );
}
