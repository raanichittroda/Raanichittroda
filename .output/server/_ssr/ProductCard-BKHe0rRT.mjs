import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Heart, c as ShoppingBag, j as Eye } from "../_libs/lucide-react.mjs";
import { n as formatINR } from "./products-BfsKOQuQ.mjs";
import { n as useCart } from "./cart-DVYtTolR.mjs";
import { r as productInquiryMessage, t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { t as useWishlist } from "./useWishlist-Cc5McACi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-BKHe0rRT.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { add } = useCart();
	const { toggle, has } = useWishlist();
	const isWishlisted = has(product.id);
	const waUrl = buildWhatsAppUrl(productInquiryMessage({
		name: product.name,
		id: product.id
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: product.id },
			className: "relative block overflow-hidden bg-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/5] w-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.name,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 flex flex-col gap-1",
					children: [
						(product.isNew || product.isBestSeller) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-background/95 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-ink inline-block w-fit",
							children: product.isNew ? "New" : "Bestseller"
						}),
						product.offerBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gold/90 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-ink inline-block w-fit",
							children: product.offerBadge
						}),
						product.inStock === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-red-900/90 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-white inline-block w-fit",
							children: "Out of Stock"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.preventDefault();
						toggle(product.id);
					},
					className: "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-foreground transition hover:bg-background hover:text-gold",
					"aria-label": "Toggle Wishlist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${isWishlisted ? "fill-gold text-gold" : ""}` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 hidden place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 sm:grid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 border border-background bg-background/95 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:bg-background hover:text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " Quick View"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$id",
						params: { id: product.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg leading-tight text-foreground hover:text-gold",
							children: product.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] tracking-[0.24em] uppercase text-muted-foreground",
						children: product.id
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-sm font-medium text-foreground",
					children: formatINR(product.price)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-stretch gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => add(product.id, 1),
						disabled: product.inStock === false,
						className: "flex flex-1 items-center justify-center gap-2 border border-ink bg-ink px-3 py-2.5 text-[10px] uppercase tracking-[0.24em] text-background transition hover:bg-gold hover:border-gold hover:text-ink disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }), " Add to Cart"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: waUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Inquire on WhatsApp",
						className: "grid w-11 place-items-center border border-border text-foreground transition hover:border-gold hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaIcon, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: product.id },
					className: "flex w-full items-center justify-center border border-border px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition hover:border-gold hover:text-gold",
					children: "View Details"
				})]
			})]
		})]
	});
}
function WaIcon({ className = "h-4 w-4" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87a11.8 11.8 0 0 0 1.61 5.94L0 24l6.34-1.66a11.87 11.87 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.4-8.44ZM12.05 21.4h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.76.99 1-3.67-.22-.37a9.51 9.51 0 0 1-1.45-5.04c0-5.25 4.28-9.52 9.54-9.52a9.49 9.49 0 0 1 6.75 2.8 9.49 9.49 0 0 1 2.79 6.74c0 5.25-4.28 9.52-9.45 9.52Zm5.45-7.13c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07s-1.26-.46-2.39-1.47c-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" })
	});
}
//#endregion
export { WaIcon as n, ProductCard as t };
