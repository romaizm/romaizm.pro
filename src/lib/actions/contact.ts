"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import {
  checkContactRateLimit,
  createRateLimitIdentifier,
} from "@/lib/security/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const limits = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5_000,
} as const;

type Locale = "en" | "ru";

const copy = {
  en: {
    rateLimited: "Too many messages were sent from this device. Please try again later.",
    validation: "Please review the highlighted fields and try again.",
    sendFailed: "I couldn't send your message. Please try again or email me directly.",
    success: "Message sent. I'll get back to you soon.",
    name: `Enter between 2 and ${limits.name} characters.`,
    email: "Enter a valid email address.",
    subject: `Enter between 5 and ${limits.subject} characters.`,
    message: `Enter between 20 and ${limits.message.toLocaleString("en-US")} characters.`,
  },
  ru: {
    rateLimited: "С этого устройства отправлено слишком много сообщений. Попробуйте позже.",
    validation: "Проверьте выделенные поля и попробуйте снова.",
    sendFailed: "Не удалось отправить сообщение. Попробуйте ещё раз или напишите мне напрямую.",
    success: "Сообщение отправлено. Я отвечу в ближайшее время.",
    name: `Введите от 2 до ${limits.name} символов.`,
    email: "Введите корректный email-адрес.",
    subject: `Введите от 5 до ${limits.subject} символов.`,
    message: `Введите от 20 до ${limits.message.toLocaleString("ru-RU")} символов.`,
  },
} as const;

function getContactSchema(locale: Locale) {
  const messages = copy[locale];
  return z.object({
    name: z.string().trim().min(2, messages.name).max(limits.name, messages.name),
    email: z.string().trim().max(limits.email, messages.email).email(messages.email),
    subject: z.string().trim().min(5, messages.subject).max(limits.subject, messages.subject),
    message: z.string().trim().min(20, messages.message).max(limits.message, messages.message),
    website: z.string().max(0),
  });
}

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    website: (formData.get("website") as string) || "",
  };

  const locale: Locale = formData.get("locale") === "ru" ? "ru" : "en";
  const messages = copy[locale];

  // Give bots a generic success response without spending rate-limit or email
  // capacity. The field is visually and semantically hidden from people.
  if (rawData.website) {
    return { success: true, message: messages.success };
  }

  const validatedFields = getContactSchema(locale).safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: messages.validation,
      errors,
    };
  }

  const headersList = await headers();
  const clientIp =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";
  const identifier = createRateLimitIdentifier(
    clientIp,
    headersList.get("user-agent") || "unknown"
  );
  const rateLimit = await checkContactRateLimit(identifier);

  if (!rateLimit.success) {
    return { success: false, message: messages.rateLimited };
  }

  const { name, email, subject, message } = validatedFields.data;

  // If no API key, fail in production but simulate success in dev
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set in production — email not sent");
      return {
        success: false,
        message: messages.sendFailed,
      };
    }
    console.log("Contact form submission (dev mode):", { name, email, subject, message });
    return {
      success: true,
      message: messages.success,
    };
  }

  try {
    await resend.emails.send({
      from: "Roman Izmestev <hello@romaizm.pro>",
      to: "r@romaizm.pro",
      replyTo: email,
      subject: `[Portfolio] ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #aff33e; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #475569; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${escapeHtml(email)}" style="color: #4d7c0f;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #475569;"><strong>Message:</strong></p>
            <p style="margin: 0; color: #0f172a; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
            Sent from romaizm.pro contact form
          </p>
        </div>
      `,
    });

    return {
      success: true,
      message: messages.success,
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: messages.sendFailed,
    };
  }
}
