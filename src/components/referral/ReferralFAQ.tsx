"use client";

import { useState, useRef, useId } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const buttonId = useId();
  const panelId = useId();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
    >
      <button
        id={buttonId}
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left gap-4 group"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-fluid-body font-medium text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {question}
        </span>
        <span
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        >
          <svg
            className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12M6 12h12"
            />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          className="overflow-hidden"
        >
            <p className="pb-5 text-fluid-body-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {answer}
            </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ReferralFAQ() {
  const t = useTranslations("referral");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-lg"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white">
            {t("faq.title")}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl card-line">
            <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-6 md:p-8">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
