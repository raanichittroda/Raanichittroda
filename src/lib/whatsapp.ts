// TODO: replace with the store's real WhatsApp number (country code, no +, no spaces)
export const WHATSAPP_NUMBER = "919999999999";

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(opts: { name: string; id: string }) {
  return `Hello Aurelia, I would like to inquire about:\n\n• ${opts.name}\n• Product ID: ${opts.id}\n\nPlease share availability and details. Thank you.`;
}

export function checkoutMessage(opts: {
  customerName: string;
  mobile: string;
  items: Array<{ name: string; id: string; quantity: number }>;
  subtotal: string;
  note?: string;
}) {
  const lines: string[] = [];
  lines.push("*New Order — Aurelia Jewellery*");
  lines.push("");
  lines.push(`*Customer:* ${opts.customerName}`);
  lines.push(`*Mobile:* ${opts.mobile}`);
  lines.push("");
  lines.push("*Items:*");
  opts.items.forEach((it, idx) => {
    lines.push(`${idx + 1}. ${it.name}`);
    lines.push(`   ID: ${it.id}`);
    lines.push(`   Qty: ${it.quantity}`);
  });
  lines.push("");
  lines.push(`*Estimated Total:* ${opts.subtotal}`);
  if (opts.note?.trim()) {
    lines.push("");
    lines.push(`*Note:* ${opts.note.trim()}`);
  }
  lines.push("");
  lines.push("Please confirm availability and next steps. Thank you.");
  return lines.join("\n");
}