import { sendMail } from "../lib/mailer.js";
import {
  orderPlacedEmail,
  orderStatusEmail,
  passwordOtpEmail,
} from "../lib/emailTemplates.js";

export async function sendPasswordOtpEmail({ email, name, otp }) {
  const html = passwordOtpEmail({ name, otp });
  const result = await sendMail({
    to: email,
    subject: "Your Mind Heal Password Reset OTP",
    html,
  });
  return result;
}

export async function sendOrderPlacedEmail(order) {
  const email = order.user?.email;
  if (!email) return false;

  const html = orderPlacedEmail({
    order,
    userName: order.user?.name || order.shippingName,
  });

  const result = await sendMail({
    to: email,
    subject: `Order Received — ${order.orderNumber}`,
    html,
  });
  return result.ok;
}

export async function sendOrderStatusChangeEmail(order, status) {
  const email = order.user?.email;
  if (!email) return false;

  const payload = orderStatusEmail({
    order,
    status,
    userName: order.user?.name || order.shippingName,
  });
  if (!payload) return false;

  const result = await sendMail({
    to: email,
    subject: payload.subject,
    html: payload.html,
  });
  return result.ok;
}
