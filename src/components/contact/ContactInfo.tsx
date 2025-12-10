"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SocialLinks } from "@/components/shared/SocialLinks";

const contactDetails = [
  {
    key: "email",
    value: "romikizm@gmail.com",
    href: "mailto:romikizm@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "location",
    value: "Vladivostok, Russia",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: "timezone",
    value: "GMT+10 (Vladivostok Time)",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold text-neutral-900 dark:text-white mb-6"
      >
        {t("title")}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {contactDetails.map((item, index) => (
          <motion.div
            key={item.key}
            variants={itemVariants}
            className="flex items-start gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-primary-600 dark:text-primary-400 mt-0.5"
            >
              {item.icon}
            </motion.div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t(item.key)}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-neutral-900 dark:text-white">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700"
      >
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          {t("availability")}
        </p>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span className="text-sm font-medium">
            {useTranslations("contact")("available")}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <SocialLinks />
      </motion.div>
    </motion.div>
  );
}
