import { n as hero_default, t as about_default } from "./hero-CtMFS3yV.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Award, I as ArrowRight, i as Truck, l as ShieldCheck, z as Sparkles } from "../_libs/lucide-react.mjs";
import { a as products, t as categories } from "./products-BfsKOQuQ.mjs";
import { t as buildWhatsAppUrl } from "./whatsapp-BFcd_P2m.mjs";
import { t as ProductCard } from "./ProductCard-BKHe0rRT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B43hfErO.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 4);
	const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
	const featured = categories.slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden bg-ink text-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "Aurelia signature necklace",
					className: "absolute inset-0 h-full w-full object-cover opacity-70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 py-16 sm:px-8 sm:py-24 md:min-h-[88vh] md:justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-gold",
								children: "The Autumn Edit · 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5 font-display text-5xl leading-[1.02] text-background sm:text-6xl md:text-7xl",
								children: ["Quiet luxury, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold not-italic",
									children: "cast in silver."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-md text-sm leading-relaxed text-background/75 sm:text-base",
								children: "Heirloom-grade jewellery, hand-finished in our atelier. From rakhis to murtis, each Aurelia piece is hallmarked and meant to be passed on."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/collections",
									className: "btn-gold",
									children: ["Shop Collections ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/collections",
									search: { category: "gift-collection" },
									className: "inline-flex items-center justify-center gap-2 border border-background/60 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-background transition hover:border-gold hover:text-gold",
									children: "Gift Edit"
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "The House",
			title: "Featured Categories",
			subtitle: "Seven worlds of silver, curated by craft.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4",
				children: featured.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/collections",
					search: { category: c.slug },
					className: "group block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[3/4] overflow-hidden bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: c.name,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-foreground group-hover:text-gold",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: c.blurb
						})]
					})]
				}, c.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "House Favourites",
			title: "Best Selling Pieces",
			subtitle: "What our patrons have been loving.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-6 md:grid-cols-4",
				children: bestsellers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Just In",
			title: "New Arrivals",
			subtitle: "Fresh from the atelier this season.",
			dark: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-6 md:grid-cols-4",
				children: newArrivals.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background py-20 sm:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-12 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[5/6] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: about_default,
							alt: "Aurelia atelier",
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Why Aurelia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl",
							children: "A house built on craft, not noise."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-sm leading-relaxed text-muted-foreground",
							children: "For three generations, we have hand-finished sterling silver and 22k gold for India's most discerning families."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 grid gap-6 sm:grid-cols-2",
							children: [
								{
									icon: ShieldCheck,
									t: "BIS Hallmarked",
									d: "Certified purity, guaranteed for life."
								},
								{
									icon: Award,
									t: "Heirloom Craft",
									d: "Filigree by hand in our Jaipur atelier."
								},
								{
									icon: Truck,
									t: "Insured Shipping",
									d: "Pan-India, with discreet packaging."
								},
								{
									icon: Sparkles,
									t: "Lifetime Polish",
									d: "Complimentary care, always."
								}
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "mt-0.5 h-5 w-5 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg",
									children: f.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: f.d
								})] })]
							}, f.t))
						})
					] })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Patrons",
			title: "Letters to the House",
			subtitle: "A few words from those who carry Aurelia.",
			dark: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					{
						n: "Ananya Mehta",
						c: "Mumbai",
						q: "The filigree on my rakhi is impossibly fine. It felt like unwrapping an heirloom, not a gift."
					},
					{
						n: "Rohan Iyer",
						c: "Bengaluru",
						q: "Bought the Lakshmi murti for my mother. The detail is staggering. The presentation matched the piece."
					},
					{
						n: "Devika Rao",
						c: "New Delhi",
						q: "Their WhatsApp service is what won me. Personal, fast, and they remembered my last order."
					}
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "border border-border bg-background p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 text-gold",
							children: "★★★★★"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-5 font-display text-xl leading-snug text-foreground",
							children: [
								"“",
								r.q,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
							children: [
								r.n,
								" · ",
								r.c
							]
						})
					]
				}, r.n))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "@aurelia.house",
			title: "On Instagram",
			subtitle: "Behind the bench, on the wrist, at home.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-6",
				children: categories.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "group relative block aspect-square overflow-hidden bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-0 transition group-hover:opacity-100 text-background text-xs tracking-[0.28em] uppercase",
							children: "View"
						})
					})]
				}, c.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink py-20 text-background sm:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-6 text-center sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "A Personal Concierge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 font-display text-4xl sm:text-5xl md:text-6xl",
						children: ["Looking for something ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "text-gold not-italic",
							children: "just for you?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm leading-relaxed text-background/70 sm:text-base",
						children: "From bespoke commissions to gifting advice, our team replies personally on WhatsApp — usually within the hour."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-9 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: buildWhatsAppUrl("Hello Aurelia, I would like assistance with a piece."),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "btn-outline-gold",
							children: "Chat on WhatsApp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "inline-flex items-center justify-center gap-2 border border-background/60 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-background transition hover:border-gold hover:text-gold",
							children: "Visit the Atelier"
						})]
					})
				]
			})
		})
	] });
}
function Section({ eyebrow, title, subtitle, children, dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `${dark ? "bg-secondary" : "bg-background"} py-20 sm:py-28`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-12 max-w-2xl text-center sm:mb-16 sm:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl",
						children: title
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground sm:text-base",
						children: subtitle
					})
				]
			}), children]
		})
	});
}
//#endregion
export { Home as component };
