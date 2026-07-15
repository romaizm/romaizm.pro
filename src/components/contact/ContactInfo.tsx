"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const EMAIL = "r@romaizm.pro";
const GITHUB_URL = "https://github.com/romaizm";
const TIME_ZONE = "Asia/Vladivostok";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Live clock in Roman's timezone, plus whether it's day or night there. */
function useVladivostokTime() {
  const [parts, setParts] = useState<{
    hh: string;
    mm: string;
    ss: string;
    isDay: boolean;
  } | null>(null);

  useEffect(() => {
    const tick = () => {
      const map = Object.fromEntries(
        timeFormatter.formatToParts(new Date()).map((p) => [p.type, p.value])
      );
      const hour = Number(map.hour);
      setParts({
        hh: map.hour,
        mm: map.minute,
        ss: map.second,
        isDay: hour >= 6 && hour < 20,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return parts;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const tContact = useTranslations("contact");
  const time = useVladivostokTime();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card-line bg-neutral-50 dark:bg-neutral-950 rounded-2xl p-fluid-lg h-full flex flex-col justify-center"
    >
      {/* Live clock — the panel's heartbeat */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <p className="text-fluid-overline text-neutral-500 dark:text-neutral-400">
            {t("localTime")}
          </p>
          <DayNightBadge isDay={time?.isDay ?? true} />
        </div>

        <div className="mt-2 flex items-baseline gap-1 font-semibold tabular-nums text-neutral-900 dark:text-white">
          {time ? (
            <>
              <span className="text-5xl md:text-6xl tracking-tight leading-none">
                {time.hh}
              </span>
              <span className="text-5xl md:text-6xl leading-none clock-colon" aria-hidden="true">
                :
              </span>
              <span className="text-5xl md:text-6xl tracking-tight leading-none">
                {time.mm}
              </span>
              <span className="ml-1 text-lg text-primary-700 dark:text-primary-400 leading-none">
                {time.ss}
              </span>
            </>
          ) : (
            // Server / pre-hydration placeholder keeps layout stable.
            <span className="text-5xl md:text-6xl tracking-tight leading-none tabular-nums text-neutral-300 dark:text-neutral-700">
              --:--
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Vladivostok, Russia · GMT+10
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="my-6 h-px bg-neutral-200 dark:bg-neutral-800"
      />

      {/* Email — the primary channel, as a tactile tile */}
      <motion.div
        variants={itemVariants}
        className="group flex items-center gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-4 transition-colors hover:border-primary-500/50 hover:bg-white dark:hover:bg-neutral-900"
      >
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-400/15 text-primary-700 dark:text-primary-400"
        >
          <MailIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-fluid-overline text-neutral-500 dark:text-neutral-400">
            {t("email")}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="block truncate font-medium text-neutral-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
          >
            {EMAIL}
          </a>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? t("copied") : t("copyEmail")}
          className="hit-target grid h-9 w-9 shrink-0 place-items-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-primary-700 dark:hover:bg-neutral-800 dark:hover:text-primary-400 transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </motion.div>

      {/* Footer — status + connect, pinned to the bottom so the panel fills its height */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full bg-primary-400/10 px-3.5 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-400">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          {tContact("available")}
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500/50 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <GithubIcon />
          GitHub
          <svg
            className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

function DayNightBadge({ isDay }: { isDay: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400"
      aria-hidden="true"
    >
      {isDay ? (
        <svg className="h-3.5 w-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeWidth={1.5} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </span>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
