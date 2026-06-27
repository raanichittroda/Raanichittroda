import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatINR } from "./products-BfsKOQuQ.mjs";
import { n as useCart } from "./cart-DVYtTolR.mjs";
import { n as checkoutMessage, t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-B2U4rNG4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	customerName: stringType().trim().min(1, "Please enter your name").max(80),
	mobile: stringType().trim().min(7, "Please enter a valid mobile number").max(20),
	email: stringType().trim().email("Please enter a valid email"),
	city: stringType().trim().min(1, "Please enter your city").max(50),
	state: stringType().trim().min(1, "Please enter your state").max(50),
	address: stringType().trim().min(5, "Please enter your full address").max(300),
	note: stringType().trim().max(500).optional()
});
function Checkout() {
	const { detailed, subtotal, count } = useCart();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		customerName: "",
		mobile: "",
		email: "",
		city: "",
		state: "",
		address: "",
		note: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	if (count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto grid min-h-[60vh] max-w-md place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hairline" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-4xl",
				children: "Your bag is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Add a few pieces to begin."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/collections",
				className: "btn-gold mt-8",
				children: "Shop Collections"
			})
		] })
	});
	function handleSubmit(e) {
		e.preventDefault();
		const result = schema.safeParse(form);
		if (!result.success) {
			const errs = {};
			result.error.issues.forEach((i) => errs[i.path[0]] = i.message);
			setErrors(errs);
			return;
		}
		const fullAddress = `${form.address}, ${form.city}, ${form.state}`;
		const msg = checkoutMessage({
			customerName: form.customerName,
			mobile: form.mobile,
			address: fullAddress,
			items: detailed.map((d) => ({
				name: d.product.name,
				id: d.product.id,
				quantity: d.quantity,
				price: d.product.price
			})),
			totalAmount: formatINR(subtotal)
		});
		window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-6 py-12 text-center sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl sm:text-5xl",
						children: "Complete your order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground",
						children: "We confirm availability, final pricing and shipping personally on WhatsApp."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "border border-border p-8 sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Your details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Full Name",
								value: form.customerName,
								onChange: (v) => setForm({
									...form,
									customerName: v
								}),
								error: errors.customerName,
								maxLength: 80
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Mobile Number",
								value: form.mobile,
								onChange: (v) => setForm({
									...form,
									mobile: v
								}),
								error: errors.mobile,
								maxLength: 20,
								inputMode: "tel",
								placeholder: "+91 99999 99999"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Email",
								value: form.email,
								onChange: (v) => setForm({
									...form,
									email: v
								}),
								error: errors.email,
								maxLength: 100,
								inputMode: "email",
								placeholder: "hello@example.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "City",
									value: form.city,
									onChange: (v) => setForm({
										...form,
										city: v
									}),
									error: errors.city,
									maxLength: 50
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "State",
									value: form.state,
									onChange: (v) => setForm({
										...form,
										state: v
									}),
									error: errors.state,
									maxLength: 50
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Address",
								value: form.address,
								onChange: (v) => setForm({
									...form,
									address: v
								}),
								error: errors.address,
								maxLength: 300,
								placeholder: "Flat, House no., Building, Company, Apartment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
								children: "Note (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.note,
								onChange: (e) => setForm({
									...form,
									note: e.target.value
								}),
								rows: 4,
								maxLength: 500,
								placeholder: "Gift wrap, engraving, delivery preference…",
								className: "mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-gold mt-8 w-full",
						children: "Send Order on WhatsApp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: "No payment is taken here. We confirm everything on WhatsApp first."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border border-border bg-secondary p-8 sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 divide-y divide-border",
						children: detailed.map(({ product, quantity }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[60px_1fr_auto] gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.name,
									className: "h-20 w-16 object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-display text-base",
											children: product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-[0.24em] uppercase text-muted-foreground",
											children: product.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: ["Qty ", quantity]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: formatINR(product.price * quantity)
								})
							]
						}, product.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-baseline justify-between border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
							children: "Estimated Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-3xl",
							children: formatINR(subtotal)
						})]
					})
				]
			})]
		})]
	});
}
function Input({ label, value, onChange, error, maxLength, inputMode, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value,
			inputMode,
			maxLength,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-destructive",
			children: error
		})
	] });
}
//#endregion
export { Checkout as component };
