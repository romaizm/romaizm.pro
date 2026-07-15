"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { sendContactEmail, type ContactFormState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Field, FieldArea } from "./FormField";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const MESSAGE_MAX = 5000;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [messageLength, setMessageLength] = useState(0);
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <div className="rounded-2xl card-line">
      <div className="bg-neutral-50 dark:bg-neutral-950 rounded-2xl p-fluid-lg">
        <div className="mb-fluid-md flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_0_4px] shadow-primary-400/15"
          />
          <h2 className="text-fluid-h5 font-semibold text-neutral-900 dark:text-white">
            {t("formTitle")}
          </h2>
        </div>

        <motion.form
          action={formAction}
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <input type="hidden" name="locale" value={locale} />
          {/* Honeypot field - hidden from users, bots will fill it */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <motion.div variants={item} className="grid gap-5 sm:grid-cols-2">
            <Field
              name="name"
              label={t("name")}
              placeholder={t("placeholders.name")}
              error={state.errors?.name?.[0]}
              required
              minLength={2}
              maxLength={80}
            />
            <Field
              name="email"
              type="email"
              label={t("email")}
              placeholder={t("placeholders.email")}
              error={state.errors?.email?.[0]}
              required
              maxLength={254}
            />
          </motion.div>

          <motion.div variants={item}>
            <Field
              name="subject"
              label={t("subject")}
              placeholder={t("placeholders.subject")}
              error={state.errors?.subject?.[0]}
              required
              minLength={5}
              maxLength={120}
            />
          </motion.div>

          <motion.div variants={item}>
            <FieldArea
              name="message"
              label={t("message")}
              placeholder={t("placeholders.message")}
              rows={6}
              error={state.errors?.message?.[0]}
              required
              minLength={20}
              maxLength={MESSAGE_MAX}
              count={{ current: messageLength, max: MESSAGE_MAX }}
              onChange={(e) => setMessageLength(e.target.value.length)}
            />
          </motion.div>

          <motion.div variants={item} className="pt-1">
            <Magnetic className="block">
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="group w-full gap-2"
              >
                {isPending ? (
                  t("sending")
                ) : (
                  <>
                    {t("send")}
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </Button>
            </Magnetic>
          </motion.div>

          {state.message && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
              className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                state.success
                  ? "bg-primary-400/10 text-primary-800 dark:text-primary-300"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              <span aria-hidden="true" className="mt-0.5 shrink-0">
                {state.success ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                )}
              </span>
              <span>{state.message}</span>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
}
