import { n as hero_default, t as about_default } from "./hero-CtMFS3yV.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-2wmHVtM3.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate overflow-hidden bg-ink text-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover opacity-50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-8 sm:py-36",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Our House"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl",
								children: ["A small atelier with a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold not-italic",
									children: "long memory."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm text-background/75 sm:text-base",
								children: "Founded in Jaipur in 1962. Still hand-finishing every piece, three generations on."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 sm:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "The Beginning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl sm:text-5xl",
							children: "Cast in 1962."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm leading-relaxed text-muted-foreground",
							children: "Aurelia began with a single bench, a kerosene torch and a stubborn refusal to compromise on purity. Our grandfather, a master silversmith from Jaipur's old city, sold his first piece — a filigree pendant — for ₹40. The buyer's family still wears it today."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "Three generations later, our atelier has grown, but the bench is still where everything begins."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: about_default,
							alt: "Aurelia atelier",
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-secondary py-20 sm:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl px-6 text-center sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Our Promise"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl sm:text-5xl",
							children: "Five quiet commitments."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3",
							children: [
								{
									n: "01",
									t: "Purity",
									d: "Only 925 sterling and 999 fine silver — hallmarked, always."
								},
								{
									n: "02",
									t: "Hand-finish",
									d: "No machine polish. Every surface is hand-buffed."
								},
								{
									n: "03",
									t: "Fair craft",
									d: "Our karigars are paid by piece, with healthcare and pension."
								},
								{
									n: "04",
									t: "Lifetime care",
									d: "Free polishing and re-stringing, for as long as you wear it."
								},
								{
									n: "05",
									t: "Personal service",
									d: "A human on WhatsApp, not a chatbot. Usually within the hour."
								}
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl text-gold",
										children: c.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-xl",
										children: c.t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: c.d
									})
								]
							}, c.n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							className: "btn-gold mt-16",
							children: "Explore the Collections"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { About as component };
