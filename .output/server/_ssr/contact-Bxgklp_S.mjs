import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as MessageCircle, b as Mail, m as Phone, y as MapPin } from "../_libs/lucide-react.mjs";
import { t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Bxgklp_S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(1, "Required").max(80),
	mobile: stringType().trim().min(7, "Enter a valid number").max(20),
	message: stringType().trim().min(1, "Required").max(800)
});
function Contact() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		mobile: "",
		message: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	function handleSubmit(e) {
		e.preventDefault();
		const result = schema.safeParse(form);
		if (!result.success) {
			const errs = {};
			result.error.issues.forEach((i) => errs[i.path[0]] = i.message);
			setErrors(errs);
			return;
		}
		setErrors({});
		const msg = `Hello Aurelia,\n\nName: ${form.name}\nMobile: ${form.mobile}\n\n${form.message}`;
		window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-secondary py-20 text-center sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl px-6 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Get in Touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl sm:text-6xl",
						children: "We'd love to hear from you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground sm:text-base",
						children: "Bespoke commissions, gifting advice, or simply a hello — message us, and a human responds."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-8",
					children: [
						{
							icon: MapPin,
							t: "Atelier",
							d: "12, Heritage Lane, Johari Bazaar\nJaipur 302003, India"
						},
						{
							icon: Phone,
							t: "Call",
							d: "+91 99999 99999\nMon–Sat · 10am – 8pm IST"
						},
						{
							icon: Mail,
							t: "Email",
							d: "hello@aurelia.in\nconcierge@aurelia.in"
						},
						{
							icon: MessageCircle,
							t: "WhatsApp",
							d: "The fastest way to reach us."
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[auto_1fr] gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center border border-gold text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: c.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
							children: c.d
						})] })]
					}, c.t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "border border-border bg-background p-8 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Send a note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Your message opens directly in WhatsApp."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Your Name",
									value: form.name,
									onChange: (v) => setForm({
										...form,
										name: v
									}),
									error: errors.name,
									maxLength: 80
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mobile Number",
									value: form.mobile,
									onChange: (v) => setForm({
										...form,
										mobile: v
									}),
									error: errors.mobile,
									maxLength: 20,
									inputMode: "tel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
										children: "Message"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: form.message,
										onChange: (e) => setForm({
											...form,
											message: e.target.value
										}),
										rows: 5,
										maxLength: 800,
										className: "mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
									}),
									errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-destructive",
										children: errors.message
									})
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn-gold mt-8 w-full",
							children: "Send via WhatsApp"
						})
					]
				})]
			})
		})]
	});
}
function Field({ label, value, onChange, error, maxLength, inputMode }) {
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
export { Contact as component };
