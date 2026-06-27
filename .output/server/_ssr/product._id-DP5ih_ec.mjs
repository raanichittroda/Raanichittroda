import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ShoppingBag, g as Minus, i as Truck, l as ShieldCheck, p as Plus, z as Sparkles } from "../_libs/lucide-react.mjs";
import { a as products, n as formatINR, r as getCategory } from "./products-BfsKOQuQ.mjs";
import { n as useCart } from "./cart-DVYtTolR.mjs";
import { r as productInquiryMessage, t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { n as WaIcon, t as ProductCard } from "./ProductCard-BKHe0rRT.mjs";
import { t as Route } from "./product._id-DKC8Q-uH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-DP5ih_ec.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RECENTLY_VIEWED_KEY = "aurelia.recentlyViewed.v1";
var MAX_ITEMS = 10;
function useRecentlyViewed() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(RECENTLY_VIEWED_KEY) : null;
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	return {
		items,
		addViewed: (0, import_react.useCallback)((productId) => {
			setItems((prev) => {
				return [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
			});
		}, [])
	};
}
function StickyCart({ product }) {
	const { add } = useCart();
	if (product.inStock === false) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: formatINR(product.price)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: product.name
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => add(product.id, 1),
				className: "flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-xs uppercase tracking-[0.24em] text-background transition hover:bg-gold hover:border-gold hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Add"]
			})]
		})
	});
}
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { add } = useCart();
	const { addViewed, items: viewedIds } = useRecentlyViewed();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [activeImage, setActiveImage] = (0, import_react.useState)(0);
	const category = getCategory(product.category);
	const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
	const recentlyViewed = products.filter((p) => viewedIds.includes(p.id) && p.id !== product.id).slice(0, 4);
	const waUrl = buildWhatsAppUrl(productInquiryMessage({
		name: product.name,
		id: product.id
	}));
	(0, import_react.useEffect)(() => {
		addViewed(product.id);
	}, [product.id, addViewed]);
	const mockGallery = [
		product.image,
		product.image,
		product.image
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 py-8 sm:px-8 sm:py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-gold",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							search: { category: product.category },
							className: "hover:text-gold",
							children: category?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: product.name
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-6 pb-16 sm:px-8 md:grid-cols-2 md:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "group relative aspect-[4/5] overflow-hidden bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mockGallery[activeImage],
							alt: product.name,
							className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-150 cursor-crosshair"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4 overflow-x-auto pb-2",
						children: mockGallery.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveImage(idx),
							className: `h-24 w-20 shrink-0 border-2 transition-colors ${activeImage === idx ? "border-gold" : "border-transparent hover:border-border"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img,
								alt: `Gallery ${idx}`,
								className: "h-full w-full object-cover"
							})
						}, idx))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: category?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
							children: ["ID · ", product.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-3xl text-foreground",
							children: formatINR(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Inclusive of all taxes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-px w-full bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-sm leading-relaxed text-muted-foreground",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid grid-cols-2 gap-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Purity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.purity }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Weight (approx.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.weight }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Hallmark"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "BIS Certified" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-stretch gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQty((q) => Math.max(1, q - 1)),
											"aria-label": "Decrease",
											className: "grid h-12 w-12 place-items-center hover:text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-10 text-center text-sm",
											children: qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQty((q) => q + 1),
											"aria-label": "Increase",
											className: "grid h-12 w-12 place-items-center hover:text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => add(product.id, qty),
									disabled: product.inStock === false,
									className: "btn-gold flex-1 disabled:opacity-50",
									children: "Add to Cart"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: waUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "btn-outline-gold gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaIcon, { className: "h-4 w-4" }), " WhatsApp Inquiry"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 grid gap-4 sm:grid-cols-3",
							children: [
								{
									icon: ShieldCheck,
									t: "Hallmarked"
								},
								{
									icon: Truck,
									t: "Insured shipping"
								},
								{
									icon: Sparkles,
									t: "Lifetime polish"
								}
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-4 w-4 text-gold" }),
									" ",
									f.t
								]
							}, f.t))
						})
					]
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-secondary py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center sm:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Pairs Beautifully With"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl sm:text-4xl",
							children: "Related Products"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-6 md:grid-cols-4",
						children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
					})]
				})
			}),
			recentlyViewed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-background py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center sm:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Your History"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl sm:text-4xl",
							children: "Recently Viewed"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-6 md:grid-cols-4",
						children: recentlyViewed.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyCart, { product })
		]
	});
}
//#endregion
export { ProductPage as component };
