import { a as products, t as categories } from "./products-BfsKOQuQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adminStore-COWgJyqx.js
var STORE_KEY = "aurelia_admin_store_v1";
var defaultState = {
	products,
	categories,
	orders: [],
	settings: {
		storeName: "Aurelia",
		phone: "+91 99999 99999",
		whatsapp: "919999999999",
		address: "123 Heritage Row, Mumbai",
		seoTitle: "Aurelia — Fine Gold & Silver Jewellery",
		seoDescription: "Modern luxury, timeless craft."
	}
};
function getAdminStore() {
	if (typeof window === "undefined") return defaultState;
	try {
		const raw = localStorage.getItem(STORE_KEY);
		if (raw) return JSON.parse(raw);
	} catch (e) {
		console.error(e);
	}
	return defaultState;
}
function updateAdminStore(newState) {
	if (typeof window === "undefined") return;
	const updated = {
		...getAdminStore(),
		...newState
	};
	try {
		localStorage.setItem(STORE_KEY, JSON.stringify(updated));
	} catch (e) {
		console.error(e);
	}
}
//#endregion
export { updateAdminStore as n, getAdminStore as t };
