import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Search, s as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { a as products, t as categories } from "./products-BfsKOQuQ.mjs";
import { t as Route } from "./collections-f2W9AAwt.mjs";
import { t as ProductCard } from "./ProductCard-BKHe0rRT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections-DqVAVrZb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var maxPrice = Math.max(...products.map((p) => p.price));
function Collections() {
	const { category } = Route.useSearch();
	const [active, setActive] = (0, import_react.useState)(category ?? "all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [priceCap, setPriceCap] = (0, import_react.useState)(maxPrice);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [sortBy, setSortBy] = (0, import_react.useState)("latest");
	(0, import_react.useMemo)(() => setActive(category ?? "all"), [category]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		let result = products.filter((p) => {
			if (active !== "all" && p.category !== active) return false;
			if (p.price > priceCap) return false;
			if (q && !`${p.name} ${p.id}`.toLowerCase().includes(q)) return false;
			return true;
		});
		if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
		else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
		else if (sortBy === "popular") result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
		else if (sortBy === "latest") result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
		return result;
	}, [
		active,
		query,
		priceCap,
		sortBy
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "The Collections"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl sm:text-6xl",
						children: "Find your forever piece"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base",
						children: "Filter by craft, price, or search by name and product ID."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-12 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1fr_auto_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search by name or product ID",
							className: "w-full border border-border bg-background py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none",
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowFilters((s) => !s),
						className: "grid h-12 w-12 place-items-center border border-border text-foreground sm:hidden",
						"aria-label": "Toggle filters",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden text-xs tracking-[0.24em] uppercase text-muted-foreground sm:block",
						children: [filtered.length, " pieces"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `${showFilters ? "block" : "hidden"} md:block`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "eyebrow",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/collections",
								className: `block text-sm transition ${active === "all" ? "text-gold" : "text-foreground hover:text-gold"}`,
								children: "All Collections"
							}) }), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/collections",
								search: { category: c.slug },
								className: `block text-sm transition ${active === c.slug ? "text-gold" : "text-foreground hover:text-gold"}`,
								children: c.name
							}) }, c.slug))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "eyebrow",
								children: "Price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 1e3,
									max: maxPrice,
									step: 500,
									value: priceCap,
									onChange: (e) => setPriceCap(Number(e.target.value)),
									className: "w-full accent-[oklch(0.72_0.13_80)]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between text-[10px] tracking-[0.2em] uppercase text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Up to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", priceCap.toLocaleString("en-IN")] })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "eyebrow",
								children: "Sort By"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSortBy("latest"),
										className: `block text-sm transition ${sortBy === "latest" ? "text-gold" : "text-foreground hover:text-gold"}`,
										children: "Latest"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSortBy("popular"),
										className: `block text-sm transition ${sortBy === "popular" ? "text-gold" : "text-foreground hover:text-gold"}`,
										children: "Popular"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSortBy("price-low"),
										className: `block text-sm transition ${sortBy === "price-low" ? "text-gold" : "text-foreground hover:text-gold"}`,
										children: "Price: Low to High"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSortBy("price-high"),
										className: `block text-sm transition ${sortBy === "price-high" ? "text-gold" : "text-foreground hover:text-gold"}`,
										children: "Price: High to Low"
									}) })
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-dashed border-border p-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "No pieces match."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try clearing filters or a different search."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 lg:grid-cols-3",
					children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				}) })]
			})]
		})]
	});
}
//#endregion
export { Collections as component };
