import QRCode from "qrcode";

import {
  RETURN_ADDRESS,
  getLogoUrl,
  getSiteUrl,
  getWhiteLogoUrl,
} from "~/config/site";
import { formatPrice, productMindHealLabel } from "~/utils/format";

function escapeHtml(text) {
  if (text == null) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getWhiteLogoUrlForPrint() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/assets/img/white_logo.png`;
  }
  return getWhiteLogoUrl();
}

function getLogoUrlForPrint() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/assets/img/logo.png`;
  }
  return getLogoUrl();
}

async function fetchImageDataUrl(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function fetchWhiteLogoDataUrl() {
  return fetchImageDataUrl(getWhiteLogoUrlForPrint());
}

async function fetchLogoDataUrl() {
  return fetchImageDataUrl(getLogoUrlForPrint());
}

function buildSlipHtml(order, siteUrl, qrDataUrl, whiteLogoDataUrl, watermarkLogoDataUrl) {
  const returnLines = RETURN_ADDRESS.lines.map(escapeHtml).join("<br>");

  const itemsRows = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td class="mh">${escapeHtml(productMindHealLabel(item.mindHealNo))}</td>
        <td class="name">${escapeHtml(item.name)}</td>
        <td class="qty">× ${item.quantity}</td>
      </tr>`
    )
    .join("");

  const address = [
    order.shippingAddress,
    [order.city, order.state].filter(Boolean).join(", "),
    order.pincode ? `PIN: ${order.pincode}` : "",
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>");

  const dateStr = new Date(order.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const notesBlock = order.notes
    ? `<div class="notes"><strong>Note:</strong> ${escapeHtml(order.notes)}</div>`
    : "";

  const qrBlock = qrDataUrl
    ? `<img src="${qrDataUrl}" width="96" height="96" alt="QR Code" class="qr-img" />`
    : `<p class="qr-fallback">Visit: ${escapeHtml(siteUrl)}</p>`;

  const logoSrc = whiteLogoDataUrl || escapeHtml(getWhiteLogoUrlForPrint());
  const watermarkStyle = watermarkLogoDataUrl
    ? `background-image: url('${watermarkLogoDataUrl}');`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Delivery ${escapeHtml(order.orderNumber)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11px;
      line-height: 1.35;
      color: #111;
      padding: 10mm;
      max-width: 100mm;
    }
    .slip {
      border: 2px solid #1a3c2e;
      border-radius: 6px;
      overflow: hidden;
    }
    .head {
      background: #1a3c2e;
      color: #fff;
      padding: 10px;
      text-align: center;
    }
    .head-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .head-logo {
      width: auto;
      max-width: 52px;
      max-height: 44px;
      height: auto;
      object-fit: contain;
    }
    .head-text { text-align: left; }
    .head h1 { font-size: 14px; letter-spacing: 0.5px; line-height: 1.2; }
    .head p { font-size: 9px; opacity: 0.9; margin-top: 2px; }
    .body {
      padding: 10px;
      position: relative;
      overflow: hidden;
    }
    .body::before {
      content: "";
      position: absolute;
      inset: 0;
      ${watermarkStyle}
      background-repeat: no-repeat;
      background-position: center 42%;
      background-size: 58%;
      opacity: 0.07;
      pointer-events: none;
      z-index: 0;
    }
    .body-inner { position: relative; z-index: 1; }
    .order-no {
      font-size: 13px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px dashed #ccc;
    }
    .section { margin-bottom: 8px; }
    .label {
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      color: #2d6a4f;
      letter-spacing: 0.4px;
      margin-bottom: 3px;
    }
    .return-box {
      padding: 6px 8px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 9px;
    }
    .return-name { font-weight: 700; font-size: 10px; }
    .deliver-to { font-size: 12px; font-weight: 700; }
    .phone { font-size: 11px; margin-top: 2px; }
    .addr { font-size: 10px; margin-top: 4px; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9px;
      margin-top: 4px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 4px 5px;
      vertical-align: top;
    }
    th {
      background: #f0fdf4;
      font-size: 8px;
      text-transform: uppercase;
    }
    .mh { white-space: nowrap; font-weight: 700; width: 28%; }
    .qty { text-align: center; width: 12%; font-weight: 700; }
    .cod {
      margin-top: 8px;
      padding: 6px 8px;
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 4px;
      text-align: center;
      font-weight: 700;
      font-size: 12px;
    }
    .notes {
      margin-top: 6px;
      font-size: 9px;
      font-style: italic;
      color: #444;
    }
    .qr-section {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #ccc;
      text-align: center;
    }
    .qr-img {
      display: block;
      margin: 4px auto;
      image-rendering: pixelated;
    }
    .qr-url {
      font-size: 9px;
      font-weight: 700;
      color: #1a3c2e;
      word-break: break-all;
    }
    .qr-hint {
      font-size: 8px;
      color: #666;
      margin-top: 2px;
    }
    .qr-fallback { font-size: 9px; font-weight: 700; }
    .foot {
      margin-top: 8px;
      font-size: 8px;
      text-align: center;
      color: #666;
    }
    @media print {
      body { padding: 0; max-width: none; }
      @page { size: 100mm auto; margin: 5mm; }
      .qr-img,
      .head-logo { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="slip">
    <div class="head">
      <div class="head-brand">
        <img src="${logoSrc}" alt="Mind Heal" class="head-logo" />
        <div class="head-text">
          <h1>MIND HEAL</h1>
          <p>Bach Flower Remedies · Delivery Slip</p>
        </div>
      </div>
    </div>
    <div class="body">
    <div class="body-inner">
      <div class="order-no">${escapeHtml(order.orderNumber)}</div>
      <p style="text-align:center;font-size:9px;color:#666;margin-bottom:8px;">${dateStr}</p>

      <div class="section">
        <div class="label">Return / Sender address</div>
        <div class="return-box">
          <div class="return-name">${escapeHtml(RETURN_ADDRESS.name)}</div>
          <div>${returnLines}</div>
          <div>Tel: ${escapeHtml(RETURN_ADDRESS.phone)}</div>
        </div>
      </div>

      <div class="section">
        <div class="label">Deliver to</div>
        <div class="deliver-to">${escapeHtml(order.shippingName)}</div>
        <div class="phone">Tel: ${escapeHtml(order.phone)}</div>
        <div class="addr">${address}</div>
      </div>

      <div class="section">
        <div class="label">Products in this box</div>
        <table>
          <thead>
            <tr>
              <th>MH No.</th>
              <th>Product</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>
      </div>

      <div class="cod">COD: Collect ${escapeHtml(formatPrice(Number(order.subtotal)))}</div>
      ${notesBlock}

      <div class="qr-section">
        <div class="label">Scan QR — visit our website</div>
        ${qrBlock}
        <div class="qr-url">${escapeHtml(siteUrl)}</div>
        <div class="qr-hint">Order more Mind Heal Bach Flower mixes online</div>
      </div>

      <div class="foot">Stick on package · Handle with care</div>
    </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;
}

export async function printDeliverySlip(order) {
  if (!order) return;

  const siteUrl = getSiteUrl();

  const [qrDataUrl, whiteLogoDataUrl, watermarkLogoDataUrl] = await Promise.all([
    QRCode.toDataURL(siteUrl, {
      width: 256,
      margin: 1,
      errorCorrectionLevel: "M",
    }).catch(() => null),
    fetchWhiteLogoDataUrl(),
    fetchLogoDataUrl(),
  ]);

  const html = buildSlipHtml(
    order,
    siteUrl,
    qrDataUrl,
    whiteLogoDataUrl,
    watermarkLogoDataUrl
  );

  const win = window.open("", "_blank", "width=420,height=720");
  if (!win) {
    alert("Please allow popups to print the delivery slip.");
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
