import { formatINR } from "./products";

// TODO: replace with the store's real WhatsApp number (country code, no +, no spaces)
export const WHATSAPP_NUMBER = "919785090816";

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(opts: { name: string; id: string }) {
  return `Hello Raani Chittroda, I would like to inquire about:\n\n• ${opts.name}\n• Product ID: ${opts.id}\n\nPlease share availability and details. Thank you.`;
}

export function checkoutMessage(opts: {
  customerName: string;
  businessName?: string;
  mobile: string;
  email: string;
  gstNumber?: string;
  city: string;
  state: string;
  address: string;
  orderType: string;
  expectedQuantity?: string;
  items: Array<{ name: string; id: string; quantity: number; price: number }>;
  totalAmount: string;
  note?: string;
}) {
  const lines: string[] = [];
  lines.push("Hello Raani Chittroda,\n");
  lines.push("I would like to enquire about the following products.\n");
  
  lines.push("Customer Name: " + opts.customerName);
  lines.push("Phone: " + opts.mobile);
  if (opts.email) lines.push("Email: " + opts.email);
  if (opts.businessName) lines.push("Business: " + opts.businessName);
  if (opts.gstNumber) lines.push("GST: " + opts.gstNumber);
  lines.push(`Address: ${opts.address}, ${opts.city}, ${opts.state}`);
  lines.push("\nOrder Type: " + opts.orderType.replace(" Order", ""));
  if (opts.expectedQuantity) lines.push("Expected Quantity: " + opts.expectedQuantity);
  
  lines.push("\nProducts:");
  opts.items.forEach((it) => {
    lines.push(it.name);
    lines.push(`Product ID: ${it.id}`);
    lines.push(`Quantity: ${it.quantity} Pieces`);
    lines.push(`Unit Price: ${formatINR(it.price)}`);
    lines.push("");
  });
  
  lines.push(`Estimated Total: ${opts.totalAmount}\n`);
  
  if (opts.note) {
    lines.push("Additional Notes:");
    lines.push(opts.note);
    lines.push("");
  }
  
  lines.push("Please provide the best wholesale quotation.");
  lines.push("Thank you.");
  return lines.join("\n");
}