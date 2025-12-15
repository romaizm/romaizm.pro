"use client";

import { useState, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Currency = "USD" | "RUB";

const THRESHOLDS = {
  USD: 5000,
  RUB: 500000,
};

const MINIMUMS = {
  USD: 2000,
  RUB: 150000,
};

const SYMBOLS = {
  USD: "$",
  RUB: "₽",
};

function formatCurrency(value: number, currency: Currency): string {
  const symbol = SYMBOLS[currency];
  const formatted = value.toLocaleString(currency === "RUB" ? "ru-RU" : "en-US");
  return currency === "USD" ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
}

function calculateCommission(
  value: number,
  currency: Currency
): { total: number; firstTier: number; secondTier: number; firstTierAmount: number; secondTierAmount: number } {
  const threshold = THRESHOLDS[currency];

  if (value <= threshold) {
    return {
      total: value * 0.1,
      firstTier: value * 0.1,
      secondTier: 0,
      firstTierAmount: value,
      secondTierAmount: 0,
    };
  }

  const firstTier = threshold * 0.1;
  const secondTierAmount = value - threshold;
  const secondTier = secondTierAmount * 0.05;

  return {
    total: firstTier + secondTier,
    firstTier,
    secondTier,
    firstTierAmount: threshold,
    secondTierAmount,
  };
}

export function CommissionCalculator() {
  const t = useTranslations("referral");
  const [inputValue, setInputValue] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const numericValue = useMemo(() => {
    const cleaned = inputValue.replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  }, [inputValue]);

  const commission = useMemo(
    () => calculateCommission(numericValue, currency),
    [numericValue, currency]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    if (value === "" || parseInt(value, 10) <= 99999999) {
      setInputValue(value);
    }
  };

  const rows = t.raw("examples.rows") as Array<{
    project: string;
    calculation: string;
    commission: string;
  }>;

  return (
    <section className="py-fluid-section">
      <div className="container mx-auto px-fluid-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-fluid-xl"
        >
          <h2 className="text-fluid-h2 font-bold text-neutral-900 dark:text-white">
            {t("calculator.sectionTitle")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg h-full"
          >
            <div className="h-full rounded-xl bg-neutral-50 dark:bg-neutral-900 p-fluid-sm flex flex-col">
              <h3 className="text-fluid-h6 font-semibold text-neutral-900 dark:text-white mb-fluid-xs">
                {t("calculator.title")}
              </h3>

              {/* Currency Toggle */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex rounded-lg bg-neutral-200 dark:bg-neutral-800 p-1">
                  {(["USD", "RUB"] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all",
                        currency === curr
                          ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      )}
                    >
                      {curr === "USD" ? "$ USD" : "₽ RUB"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-lg">
                  {SYMBOLS[currency]}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={t("calculator.placeholder")}
                  className="w-full pl-10 pr-4 py-4 text-lg rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Minimum hint */}
              <p className="text-fluid-body-sm text-neutral-500 dark:text-neutral-400 mb-4 text-center">
                {t("calculator.minimumHint", { amount: formatCurrency(MINIMUMS[currency], currency) })}
              </p>

              {/* Result */}
              <div className="flex-grow flex flex-col justify-end">
                {numericValue > 0 && numericValue < MINIMUMS[currency] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30"
                  >
                    <p className="text-fluid-body-sm text-amber-800 dark:text-amber-300">
                      {t("calculator.belowMinimum", { amount: formatCurrency(MINIMUMS[currency], currency) })}
                    </p>
                  </motion.div>
                )}

                {numericValue >= MINIMUMS[currency] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Total Commission */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 dark:from-cyan-500/20 dark:to-teal-500/20 border border-cyan-500/20">
                      <p className="text-fluid-body-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        {t("calculator.result")}
                      </p>
                      <p className="text-3xl font-bold text-gradient">
                        {formatCurrency(commission.total, currency)}
                      </p>
                    </div>

                    {/* Breakdown */}
                    {commission.secondTierAmount > 0 && (
                      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <p className="text-fluid-body-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                          {t("calculator.breakdown")}
                        </p>
                        <div className="space-y-2 text-fluid-body-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {t("calculator.firstTier", {
                                amount: formatCurrency(commission.firstTierAmount, currency),
                              })}
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {formatCurrency(commission.firstTier, currency)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {t("calculator.secondTier", {
                                amount: formatCurrency(commission.secondTierAmount, currency),
                              })}
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {formatCurrency(commission.secondTier, currency)}
                            </span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                              {t("calculator.total")}
                            </span>
                            <span className="font-bold text-neutral-900 dark:text-white">
                              {formatCurrency(commission.total, currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Examples Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl gradient-border-hover transition-shadow duration-300 hover:shadow-lg h-full"
          >
            <div className="h-full rounded-xl bg-neutral-50 dark:bg-neutral-900 p-fluid-sm flex flex-col">
              <h3 className="text-fluid-h6 font-semibold text-neutral-900 dark:text-white mb-fluid-xs">
                {t("examples.title")}
              </h3>

              <div className="overflow-x-auto rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex-grow">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900/50">
                      <th className="text-left py-3 px-4 text-fluid-body-sm font-semibold text-neutral-900 dark:text-white">
                        {t("examples.columns.project")}
                      </th>
                      <th className="text-left py-3 px-4 text-fluid-body-sm font-semibold text-neutral-900 dark:text-white hidden sm:table-cell">
                        {t("examples.columns.calculation")}
                      </th>
                      <th className="text-right py-3 px-4 text-fluid-body-sm font-semibold text-neutral-900 dark:text-white">
                        {t("examples.columns.commission")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                        className="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-fluid-body-sm text-neutral-700 dark:text-neutral-300">
                          {row.project}
                        </td>
                        <td className="py-3 px-4 text-fluid-body-sm text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">
                          {row.calculation}
                        </td>
                        <td className="py-3 px-4 text-right text-fluid-body-sm font-semibold text-cyan-600 dark:text-cyan-400">
                          {row.commission}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
