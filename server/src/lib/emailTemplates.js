const DEFAULT_LOGO_URL =
  "https://moccasin-hollow-wolf-48.mypinata.cloud/ipfs/bafkreiazw2idwfqkj7ozuboejnugfhqbuto5pebgioh6l5dfppgvvxzlc4";

function getLogoUrl() {
  return process.env.EMAIL_LOGO_URL || DEFAULT_LOGO_URL;
}

function escapeHtml(text) {
  if (text == null) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPrice(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function getSiteUrl() {
  return (
    process.env.SITE_URL ||
    process.env.CLIENT_URL ||
    "https://mindheal.in"
  ).replace(/\/$/, "");
}

function baseLayout({ title, bodyHtml }) {
  const logo = escapeHtml(getLogoUrl());
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#000;padding:28px 24px;text-align:center;">
              <img src="${logo}" alt="Mind Heal — Bach Flower Remedies" width="220" style="max-width:220px;width:100%;height:auto;display:inline-block;border:0;outline:none;">
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;color:#333;font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;background:#f8f9fa;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee;">
              Mind Heal — Bach Flower Remedies<br>
              Aadil Nagar, Tehri Pulia, Lucknow, U.P. 226022<br>
              <a href="mailto:mindhealbbfr@gmail.com" style="color:#2d6a4f;">mindhealbbfr@gmail.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function orderItemsTable(items) {
  const rows = (items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;">${escapeHtml(item.name)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.unitPrice)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(Number(item.unitPrice) * item.quantity)}</td>
      </tr>`
    )
    .join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:16px 0;font-size:14px;">
      <thead>
        <tr style="background:#f0f7f4;">
          <th style="padding:10px 8px;text-align:left;color:#2d6a4f;">Product</th>
          <th style="padding:10px 8px;text-align:center;color:#2d6a4f;">Qty</th>
          <th style="padding:10px 8px;text-align:right;color:#2d6a4f;">Price</th>
          <th style="padding:10px 8px;text-align:right;color:#2d6a4f;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function orderSummaryBlock(order) {
  const address = [
    order.shippingAddress,
    [order.city, order.state].filter(Boolean).join(", "),
    order.pincode ? `PIN: ${order.pincode}` : "",
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>");

  return `
    <p style="margin:0 0 8px;"><strong>Order:</strong> ${escapeHtml(order.orderNumber)}</p>
    <p style="margin:0 0 8px;"><strong>Payment:</strong> Cash on Delivery — ${formatPrice(order.subtotal)}</p>
    <p style="margin:0 0 16px;"><strong>Deliver to:</strong><br>${escapeHtml(order.shippingName)}<br>${address}</p>
    ${orderItemsTable(order.items)}
    <p style="margin:16px 0 0;font-size:16px;"><strong>Total: ${formatPrice(order.subtotal)}</strong></p>`;
}

export function passwordOtpEmail({ name, otp }) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  return baseLayout({
    title: "Password Reset OTP — Mind Heal",
    bodyHtml: `
      <h2 style="margin:0 0 16px;color:#2d6a4f;font-size:20px;">Password Reset</h2>
      <p style="margin:0 0 16px;">${greeting}</p>
      <p style="margin:0 0 16px;">Your OTP to reset your Mind Heal account password is:</p>
      <p style="margin:0 0 24px;font-size:32px;font-weight:bold;letter-spacing:6px;color:#2d6a4f;text-align:center;">${escapeHtml(otp)}</p>
      <p style="margin:0 0 8px;color:#666;font-size:14px;">This OTP is valid for 15 minutes. Do not share it with anyone.</p>
      <p style="margin:16px 0 0;color:#666;font-size:14px;">If you did not request this, you can safely ignore this email.</p>`,
  });
}

export function orderPlacedEmail({ order, userName }) {
  const siteUrl = getSiteUrl();
  const greeting = userName ? `Hi ${escapeHtml(userName)},` : "Hi,";
  return baseLayout({
    title: `Order Received — ${order.orderNumber}`,
    bodyHtml: `
      <h2 style="margin:0 0 16px;color:#2d6a4f;font-size:20px;">Thank you for your order!</h2>
      <p style="margin:0 0 16px;">${greeting}</p>
      <p style="margin:0 0 16px;">We have received your order and will confirm it shortly. Pay cash when your order is delivered.</p>
      ${orderSummaryBlock(order)}
      <p style="margin:24px 0 0;text-align:center;">
        <a href="${siteUrl}/orders/${order.id}" style="display:inline-block;background:#2d6a4f;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;">View Order</a>
      </p>`,
  });
}

const STATUS_MESSAGES = {
  CONFIRMED: {
    subject: "Order Confirmed",
    heading: "Your order is confirmed!",
    message:
      "We have confirmed your order and it will be prepared for delivery soon.",
  },
  SHIPPED: {
    subject: "Order Shipped",
    heading: "Your order is on the way!",
    message: "Your order has been shipped and will reach you soon.",
  },
  DELIVERED: {
    subject: "Order Delivered",
    heading: "Your order has been delivered!",
    message: "Thank you for shopping with Mind Heal. We hope our remedies help you.",
  },
  CANCELLED: {
    subject: "Order Cancelled",
    heading: "Your order has been cancelled",
    message:
      "Your order has been cancelled. If you have any questions, please contact us.",
  },
};

export function orderStatusEmail({ order, status, userName }) {
  const info = STATUS_MESSAGES[status];
  if (!info) return null;

  const siteUrl = getSiteUrl();
  const greeting = userName ? `Hi ${escapeHtml(userName)},` : "Hi,";

  return {
    subject: `${info.subject} — ${order.orderNumber}`,
    html: baseLayout({
      title: `${info.subject} — ${order.orderNumber}`,
      bodyHtml: `
        <h2 style="margin:0 0 16px;color:#2d6a4f;font-size:20px;">${info.heading}</h2>
        <p style="margin:0 0 16px;">${greeting}</p>
        <p style="margin:0 0 16px;">${info.message}</p>
        ${orderSummaryBlock(order)}
        <p style="margin:24px 0 0;text-align:center;">
          <a href="${siteUrl}/orders/${order.id}" style="display:inline-block;background:#2d6a4f;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;">View Order</a>
        </p>`,
    }),
  };
}
