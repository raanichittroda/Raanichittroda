import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { F as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AdminAuthProvider } from "./adminAuth-7572ujPi.mjs";
import { A as Facebook, D as Heart, T as Instagram, _ as MessageCircle, b as Mail, c as ShoppingBag, g as Minus, m as Phone, p as Plus, t as X, v as Menu } from "../_libs/lucide-react.mjs";
import { n as formatINR } from "./products-BfsKOQuQ.mjs";
import { n as useCart, t as CartProvider } from "./cart-DVYtTolR.mjs";
import { t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { t as Route$16 } from "./collections-f2W9AAwt.mjs";
import { t as useWishlist } from "./useWishlist-Cc5McACi.mjs";
import { t as Route$17 } from "./product._id-DKC8Q-uH.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CUno7mPH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Bo_qia-t.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function CartDrawer() {
	const { isOpen, close, detailed, setQty, remove, subtotal, count, clear } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onClick: close,
		"aria-hidden": !isOpen,
		className: `fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-label": "Shopping cart",
		className: `fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-6 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Your bag"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-xl",
					children: [
						count,
						" item",
						count === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [detailed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clear,
						className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition",
						children: "Clear Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: close,
						"aria-label": "Close cart",
						className: "p-2 text-foreground hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-6 py-6",
				children: detailed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hairline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-2xl",
							children: "Your bag awaits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Discover heirloom pieces, crafted to last generations."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							onClick: close,
							className: "btn-gold mt-8",
							children: "Shop Collections"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-6",
					children: detailed.map(({ product, quantity }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[80px_1fr_auto] gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: product.name,
								className: "h-24 w-20 object-cover",
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-base text-foreground",
										children: product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground",
										children: product.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: formatINR(product.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 inline-flex items-center border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQty(product.id, quantity - 1),
												className: "grid h-7 w-7 place-items-center hover:text-gold",
												"aria-label": "Decrease",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-8 text-center text-xs",
												children: quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQty(product.id, quantity + 1),
												className: "grid h-7 w-7 place-items-center hover:text-gold",
												"aria-label": "Increase",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(product.id),
								"aria-label": "Remove",
								className: "self-start text-muted-foreground hover:text-gold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					}, product.id))
				})
			}),
			detailed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-background px-6 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.28em] uppercase text-muted-foreground",
							children: "Subtotal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl",
							children: formatINR(subtotal)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Final pricing & availability confirmed on WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						onClick: close,
						className: "btn-gold mt-5 w-full",
						children: "Checkout via WhatsApp"
					})
				]
			})
		]
	})] });
}
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/collections",
		label: "Collections"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const { count, open } = useCart();
	const { items } = useWishlist();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Open menu",
						className: "md:hidden -ml-2 p-2 text-foreground",
						onClick: () => setMobileOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center justify-self-center md:justify-self-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl tracking-[0.18em] text-foreground sm:text-3xl",
							children: "AURELIA"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center justify-center gap-10 md:flex",
						children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: "text-[0.72rem] tracking-[0.28em] uppercase text-foreground/80 transition-colors hover:text-gold",
							activeProps: { className: "text-gold" },
							children: n.label
						}, n.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "relative -mr-2 p-2 text-foreground transition-colors hover:text-gold",
							onClick: () => alert("Wishlist items: " + items.length),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" }), items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink",
								children: items.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: open,
							"aria-label": "Open cart",
							className: "relative -mr-2 p-2 text-foreground transition-colors hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink",
								children: count
							})]
						})]
					})
				]
			})
		}),
		mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 bg-background md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl tracking-[0.18em]",
					children: "AURELIA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setMobileOpen(false),
					"aria-label": "Close menu",
					className: "p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-10 flex flex-col items-center gap-8",
				children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					onClick: () => setMobileOpen(false),
					className: "font-display text-3xl text-foreground",
					children: n.label
				}, n.to))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {})
	] });
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-ink text-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl tracking-[0.18em]",
						children: "AURELIA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-background/70",
						children: "Fine gold & silver jewellery, handcrafted with reverence for tradition and a modern eye."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[0.7rem] tracking-[0.32em] uppercase text-gold",
					children: "Shop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-3 text-sm text-background/75",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							className: "hover:text-gold",
							children: "All Collections"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							search: { category: "silver-necklaces" },
							className: "hover:text-gold",
							children: "Necklaces"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							search: { category: "silver-coins" },
							className: "hover:text-gold",
							children: "Coins"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							search: { category: "gift-collection" },
							className: "hover:text-gold",
							children: "Gift Collection"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[0.7rem] tracking-[0.32em] uppercase text-gold",
					children: "House"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-3 text-sm text-background/75",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-gold",
							children: "Our Story"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-gold",
							children: "Visit Atelier"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-gold",
							children: "Care & Repair"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[0.7rem] tracking-[0.32em] uppercase text-gold",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 space-y-3 text-sm text-background/75",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-gold" }), " +91 99999 99999"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-gold" }), " hello@aurelia.in"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "Instagram",
							className: "grid h-9 w-9 place-items-center border border-background/20 text-background/80 transition hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "Facebook",
							className: "grid h-9 w-9 place-items-center border border-background/20 text-background/80 transition hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
						})]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-background/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-background/50 sm:flex-row sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Aurelia Jewellery. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tracking-[0.28em] uppercase",
					children: "Hallmarked · BIS Certified"
				})]
			})
		})]
	});
}
function FloatingWhatsApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: buildWhatsAppUrl("Hello Aurelia, I have a general inquiry."),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-7 w-7" })
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Aurelia — Fine Gold & Silver Jewellery" },
			{
				name: "description",
				content: "Aurelia crafts heirloom-grade gold and silver jewellery — rakhis, murtis, necklaces, chains, bracelets, coins and gift collections."
			},
			{
				name: "author",
				content: "Aurelia"
			},
			{
				property: "og:title",
				content: "Aurelia — Fine Gold & Silver Jewellery"
			},
			{
				property: "og:description",
				content: "Modern luxury, timeless craft."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	const isAdminRoute = useLocation().pathname.startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			!isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: isAdminRoute ? "" : "min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			!isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			!isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingWhatsApp, {})
		] }) })
	});
}
var $$splitComponentImporter$14 = () => import("./contact-Bxgklp_S.mjs");
var Route$14 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — Aurelia" },
		{
			name: "description",
			content: "Visit our Jaipur atelier or message us on WhatsApp — we reply personally within the hour."
		},
		{
			property: "og:title",
			content: "Contact — Aurelia"
		},
		{
			property: "og:description",
			content: "Speak with a human, on WhatsApp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./checkout-B2U4rNG4.mjs");
var Route$13 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Aurelia" }, {
		name: "description",
		content: "Complete your order on WhatsApp."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-2wmHVtM3.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — Aurelia Jewellery" },
		{
			name: "description",
			content: "Three generations of silversmiths, one quiet philosophy: make pieces worth inheriting."
		},
		{
			property: "og:title",
			content: "About — Aurelia Jewellery"
		},
		{
			property: "og:description",
			content: "Three generations of silversmiths, one quiet philosophy."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./routes-B43hfErO.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Aurelia — Fine Gold & Silver Jewellery" },
		{
			name: "description",
			content: "Discover Aurelia's hand-crafted gold and silver jewellery — necklaces, chains, bracelets, coins, murtis, rakhis and gift collections."
		},
		{
			property: "og:title",
			content: "Aurelia — Fine Gold & Silver Jewellery"
		},
		{
			property: "og:description",
			content: "Modern luxury, timeless craft."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.login-CmBUzBLC.mjs");
var Route$10 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin._authenticated-xAroMjz4.mjs");
var Route$9 = createFileRoute("/admin/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin._authenticated.index-DaQ7_Xn_.mjs");
var Route$8 = createFileRoute("/admin/_authenticated/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin._authenticated.settings-DfC5TAxv.mjs");
var Route$7 = createFileRoute("/admin/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin._authenticated.profile-DH1xoJa_.mjs");
var Route$6 = createFileRoute("/admin/_authenticated/profile")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin._authenticated.orders-CURa7oW7.mjs");
var Route$5 = createFileRoute("/admin/_authenticated/orders")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin._authenticated.media-CseBgi8p.mjs");
var Route$4 = createFileRoute("/admin/_authenticated/media")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin._authenticated.homepage-W0Hu_91r.mjs");
var Route$3 = createFileRoute("/admin/_authenticated/homepage")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin._authenticated.categories-COlyamjG.mjs");
var Route$2 = createFileRoute("/admin/_authenticated/categories")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin._authenticated.products.index-C9oKoKcm.mjs");
var Route$1 = createFileRoute("/admin/_authenticated/products/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin._authenticated.products.new-oYSUppc5.mjs");
var Route = createFileRoute("/admin/_authenticated/products/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ContactRoute = Route$14.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$15
});
var CollectionsRoute = Route$16.update({
	id: "/collections",
	path: "/collections",
	getParentRoute: () => Route$15
});
var CheckoutRoute = Route$13.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$15
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var ProductIdRoute = Route$17.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$15
});
var AdminLoginRoute = Route$10.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$15
});
var AdminAuthenticatedRoute = Route$9.update({
	id: "/admin/_authenticated",
	path: "/admin",
	getParentRoute: () => Route$15
});
var AdminAuthenticatedIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedSettingsRoute = Route$7.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedProfileRoute = Route$6.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedOrdersRoute = Route$5.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedMediaRoute = Route$4.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedHomepageRoute = Route$3.update({
	id: "/homepage",
	path: "/homepage",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedCategoriesRoute = Route$2.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedProductsIndexRoute = Route$1.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedRouteChildren = {
	AdminAuthenticatedCategoriesRoute,
	AdminAuthenticatedHomepageRoute,
	AdminAuthenticatedMediaRoute,
	AdminAuthenticatedOrdersRoute,
	AdminAuthenticatedProfileRoute,
	AdminAuthenticatedSettingsRoute,
	AdminAuthenticatedIndexRoute,
	AdminAuthenticatedProductsNewRoute: Route.update({
		id: "/products/new",
		path: "/products/new",
		getParentRoute: () => AdminAuthenticatedRoute
	}),
	AdminAuthenticatedProductsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CheckoutRoute,
	CollectionsRoute,
	ContactRoute,
	AdminAuthenticatedRoute: AdminAuthenticatedRoute._addFileChildren(AdminAuthenticatedRouteChildren),
	AdminLoginRoute,
	ProductIdRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
