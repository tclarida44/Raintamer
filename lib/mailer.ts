import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Gmail SMTP transport for lead-notification emails.
 *
 * Auth via a Gmail app password (16 chars, generated at
 * https://myaccount.google.com/apppasswords). Env:
 *   GMAIL_USER           — the mailbox to send FROM (raintamerok@gmail.com)
 *   GMAIL_APP_PASSWORD   — the app password, spaces stripped
 *
 * Replaces the previous Formsubmit dependency. Formsubmit had recurring
 * outages that silently swallowed ad leads; sending straight through
 * Gmail SMTP eliminates the third-party single point of failure.
 */

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  if (cachedTransport) return cachedTransport;
  cachedTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return cachedTransport;
}

export type LeadEmail = {
  subject: string;
  body: string;
};

export async function sendLeadEmail({ subject, body }: LeadEmail) {
  const t = getTransport();
  const from = process.env.GMAIL_USER;
  const to = process.env.GMAIL_USER;
  if (!t || !from || !to) {
    console.warn("[mailer] Gmail SMTP env not set — lead not delivered:\n" + body);
    return { delivered: false, reason: "smtp_env_missing" as const };
  }
  try {
    const info = await t.sendMail({
      from: `"Rain Tamer Website" <${from}>`,
      to,
      subject,
      text: body,
    });
    return { delivered: true, messageId: info.messageId };
  } catch (err) {
    console.error("[mailer] Gmail SMTP send failed:", err);
    return { delivered: false, reason: "smtp_send_failed" as const };
  }
}
