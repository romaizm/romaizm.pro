"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
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
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <Input
        name="name"
        label={t("name")}
        placeholder={t("placeholders.name")}
        error={state.errors?.name?.[0]}
        required
      />

      <Input
        name="email"
        type="email"
        label={t("email")}
        placeholder={t("placeholders.email")}
        error={state.errors?.email?.[0]}
        required
      />

      <Input
        name="subject"
        label={t("subject")}
        placeholder={t("placeholders.subject")}
        error={state.errors?.subject?.[0]}
        required
      />

      <Textarea
        name="message"
        label={t("message")}
        placeholder={t("placeholders.message")}
        rows={6}
        error={state.errors?.message?.[0]}
        required
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? t("sending") : t("send")}
      </Button>

      {state.message && (
        <p
          className={`text-sm text-center ${
            state.success
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {state.success ? t("success") : state.message}
        </p>
      )}
    </form>
  );
}
