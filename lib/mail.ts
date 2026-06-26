import type { LeadFormPayload } from "./contact-message";
import { formatLeadWhatsAppMessage } from "./contact-message";

export type ContactPayload = LeadFormPayload;

const CONTACT_TO = "info@salvadosafe.com";

function formatBody(data: ContactPayload) {
  return formatLeadWhatsAppMessage(data).replace(
    /^Hi Salvado.*\n\n/,
    `New ${data.variant === "service" ? "service request" : "inquiry"} from the Salvado website\n\n`
  );
}

export async function sendContactEmail(data: ContactPayload) {
  const body = formatBody(data);
  const subject = `Website ${data.variant === "service" ? "service request" : "inquiry"} from ${data.name}`;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || CONTACT_TO,
      replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
      subject,
      text: body,
    });

    return { ok: true as const, emailSent: true as const };
  }

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Salvado Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || CONTACT_TO],
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend failed:", err);
      return { ok: true as const, emailSent: false as const };
    }

    return { ok: true as const, emailSent: true as const };
  }

  console.info("[contact]", body);
  return { ok: true as const, emailSent: false as const };
}
