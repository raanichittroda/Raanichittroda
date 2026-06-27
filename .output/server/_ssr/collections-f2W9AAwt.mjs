import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections-f2W9AAwt.js
var $$splitComponentImporter = () => import("./collections-DqVAVrZb.mjs");
var search = objectType({ category: enumType([
	"silver-rakhis",
	"silver-murtis",
	"silver-necklaces",
	"silver-chains",
	"silver-bracelets",
	"silver-rings",
	"silver-coins",
	"silver-gift-articles",
	"gold-jewellery",
	"custom-orders"
]).optional() });
var Route = createFileRoute("/collections")({
	validateSearch: search,
	head: () => ({ meta: [
		{ title: "Collections — Aurelia" },
		{
			name: "description",
			content: "Browse the full Aurelia collection of silver rakhis, murtis, necklaces, chains, bracelets, coins and gift sets."
		},
		{
			property: "og:title",
			content: "Collections — Aurelia"
		},
		{
			property: "og:description",
			content: "Hand-crafted gold and silver, organised by craft."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
