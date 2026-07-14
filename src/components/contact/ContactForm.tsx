"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContactEmail, type ContactFormState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot field - hidden from users, bots will fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Input
        name="name"
        label={t("name")}
        placeholder={t("placeholders.name")}
        error={state.errors?.name?.[0]}
        required
        minLength={2}
        maxLength={80}
      />

      <Input
        name="email"
        type="email"
        label={t("email")}
        placeholder={t("placeholders.email")}
        error={state.errors?.email?.[0]}
        required
        maxLength={254}
      />

      <Input
        name="subject"
        label={t("subject")}
        placeholder={t("placeholders.subject")}
        error={state.errors?.subject?.[0]}
        required
        minLength={5}
        maxLength={120}
      />

      <Textarea
        name="message"
        label={t("message")}
        placeholder={t("placeholders.message")}
        rows={6}
        error={state.errors?.message?.[0]}
        required
        minLength={20}
        maxLength={5000}
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? t("sending") : t("send")}
      </Button>

      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm text-center ${
            state.success
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
