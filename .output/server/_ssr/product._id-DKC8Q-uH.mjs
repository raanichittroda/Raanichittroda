import { A as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getProduct } from "./products-BfsKOQuQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-DKC8Q-uH.js
var $$splitComponentImporter = () => import("./product._id-DP5ih_ec.mjs");
var $$splitNotFoundComponentImporter = () => import("./product._id-wOFmMWl8.mjs");
var Route = createFileRoute("/product/$id")({
	loader: ({ params }) => {
		const product = getProduct(params.id);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.product.name} — Aurelia` },
		{
			name: "description",
			content: loaderData.product.description
		},
		{
			property: "og:title",
			content: `${loaderData.product.name} — Aurelia`
		},
		{
			property: "og:description",
			content: loaderData.product.description
		},
		{
			property: "og:image",
			content: loaderData.product.image
		}
	] : [] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
