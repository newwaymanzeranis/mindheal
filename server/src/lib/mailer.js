import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS?.replace(/\s/g, ""),
    },
  });
}

export function getEmailFrom() {
  return (
    process.env.EMAIL_FROM ||
    `"Mind Heal" <${process.env.SMTP_USER || "mindhealbbfr@gmail.com"}>`
  );
}

export async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    const msg = "SMTP not configured — set SMTP_USER and SMTP_PASS in server/.env";
    console.warn("[mailer]", msg);
    return { ok: false, error: msg };
  }

  try {
    await createTransporter().sendMail({
      from: getEmailFrom(),
      to,
      subject,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error("[mailer] Failed to send email:", err.message);
    return { ok: false, error: err.message };
  }
}

export async function verifySmtpConnection() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[mailer] SMTP not configured — emails will not be sent");
    return false;
  }

  try {
    await createTransporter().verify();
    console.log("[mailer] SMTP connected:", process.env.SMTP_USER);
    return true;
  } catch (err) {
    console.error(
      "[mailer] SMTP login failed:",
      err.message,
      "\n→ Gmail ke liye App Password chahiye: https://myaccount.google.com/apppasswords"
    );
    return false;
  }
}
