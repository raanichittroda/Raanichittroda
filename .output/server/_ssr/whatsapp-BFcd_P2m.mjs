//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-BFcd_P2m.js
var WHATSAPP_NUMBER = "919999999999";
function buildWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
function productInquiryMessage(opts) {
	return `Hello Aurelia, I would like to inquire about:\n\n• ${opts.name}\n• Product ID: ${opts.id}\n\nPlease share availability and details. Thank you.`;
}
function checkoutMessage(opts) {
	const lines = [];
	lines.push("Hello,\n");
	lines.push("I would like to order these products.\n");
	lines.push("Customer Details\n");
	lines.push(`Name: ${opts.customerName}`);
	lines.push(`Phone: ${opts.mobile}`);
	lines.push(`Address: ${opts.address}\n`);
	lines.push("Products:\n");
	opts.items.forEach((it) => {
		lines.push(`Product Name: ${it.name}`);
		lines.push(`Product ID: ${it.id}`);
		lines.push(`Quantity: ${it.quantity}`);
		lines.push(`Price: ${it.price}\n`);
	});
	lines.push(`Total Amount: ${opts.totalAmount}\n`);
	lines.push("Please contact me regarding this order.");
	return lines.join("\n");
}
//#endregion
export { checkoutMessage as n, productInquiryMessage as r, buildWhatsAppUrl as t };
