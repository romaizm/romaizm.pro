"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  // Honeypot field - should be empty
  website: z.string().max(0, "Bot detected"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Get client IP from request headers
  const headersList = await headers();
  const clientIp =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  // Check rate limit
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      message: "Too many requests. Please try again later.",
    };
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    website: formData.get("website") as string || "", // honeypot
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    // If honeypot triggered, return generic success to fool bots
    if (errors.website) {
      return {
        success: true,
        message: "Message sent successfully!",
      };
    }

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  // If no API key, fail in production but simulate success in dev
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set in production — email not sent");
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      };
    }
    console.log("Contact form submission (dev mode):", { name, email, subject, message });
    return {
      success: true,
      message: "Message sent successfully! (Development mode)",
    };
  }

  try {
    await resend.emails.send({
      from: "Roman Izmestev <hello@romaizm.pro>",
      to: "romikizm@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #171717; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #525252; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #171717;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #525252;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #171717;"><a href="mailto:${escapeHtml(email)}" style="color: #06b6d4;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #525252;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #171717;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #525252;"><strong>Message:</strong></p>
            <p style="margin: 0; color: #171717; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #a3a3a3;">
            Sent from romaizm.pro contact form
          </p>
        </div>
      `,
    });

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  }
}
