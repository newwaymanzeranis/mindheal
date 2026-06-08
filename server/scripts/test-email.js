import "dotenv/config";
import nodemailer from "nodemailer";
import { passwordOtpEmail } from "../src/lib/emailTemplates.js";

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

console.log("\n=== Mind Heal Email Test ===\n");
console.log("SMTP_USER:", user || "(missing)");
console.log("SMTP_PASS:", pass ? `${pass.length} characters` : "(missing)");

if (!user || !pass) {
  console.error("\n❌ SMTP_USER ya SMTP_PASS server/.env mein set nahi hai.\n");
  process.exit(1);
}

if (pass.length < 16 && pass.includes("!")) {
  console.warn(
    "\n⚠️  Aap normal Gmail password use kar rahe ho — ye kaam NAHI karega!"
  );
  console.warn("   Gmail ke liye 16-character App Password chahiye.\n");
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user, pass },
});

try {
  console.log("Connecting to Gmail SMTP...");
  await transport.verify();
  console.log("✅ SMTP login successful!\n");

  const to = process.argv[2] || user;
  console.log(`Sending test email with logo to ${to}...`);
  console.log("Logo URL:", process.env.EMAIL_LOGO_URL || "(default Pinata URL)");
  await transport.sendMail({
    from: process.env.EMAIL_FROM || `"Mind Heal" <${user}>`,
    to,
    subject: "Mind Heal — Email Logo Test",
    html: passwordOtpEmail({ name: "Test User", otp: "123456" }),
  });
  console.log("✅ Test email bhej diya! Inbox check karein.\n");
} catch (err) {
  console.error("\n❌ Email fail:", err.message.split("\n")[0]);
  console.error(`
Gmail App Password banane ke steps:
  1. https://myaccount.google.com par login karein (${user})
  2. Security → 2-Step Verification ON karein
  3. Security → App passwords → Mail → "Mind Heal"
  4. 16-character password copy karein
  5. server/.env mein likhein:
     SMTP_PASS=abcdefghijklmnop
  6. Server restart: cd server && npm run dev
  7. Phir run karein: npm run test:email
`);
  process.exit(1);
}
