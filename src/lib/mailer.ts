import nodemailer, { type Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.warn("[mailer] SMTP env vars missing; emails disabled.");
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendMail(opts: SendMailOptions): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return true;
  } catch (err) {
    console.error("[mailer] send failed:", err);
    return false;
  }
}

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export async function sendContactNotification(data: ContactPayload) {
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? process.env.SMTP_USER;
  if (!to) return false;

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <div style="border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-weight: 700;">New Contact Message</h2>
        <p style="margin: 4px 0 0; color: #666; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Growth Catalyst</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #666; width: 100px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #000;">${escapeHtml(data.email)}</a></td></tr>
        ${data.company ? `<tr><td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td><td style="padding: 8px 0;">${escapeHtml(data.company)}</td></tr>` : ""}
        ${data.subject ? `<tr><td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</td><td style="padding: 8px 0;">${escapeHtml(data.subject)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
        <p style="margin: 0 0 12px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.7;">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin-top: 40px; color: #999; font-size: 11px;">Sent via growthcatalyst.com.np contact form</p>
    </div>
  `;

  return sendMail({
    to,
    subject: `New Contact: ${data.subject ?? data.name}`,
    html,
    text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "-"}\nSubject: ${data.subject ?? "-"}\n\n${data.message}`,
    replyTo: data.email,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
