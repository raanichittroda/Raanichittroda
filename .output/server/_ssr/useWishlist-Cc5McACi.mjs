import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useWishlist-Cc5McACi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var WISHLIST_KEY = "aurelia.wishlist.v1";
function useWishlist() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(WISHLIST_KEY) : null;
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	return {
		items,
		toggle: (0, import_react.useCallback)((productId) => {
			setItems((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
		}, []),
		has: (0, import_react.useCallback)((productId) => items.includes(productId), [items])
	};
}
//#endregion
export { useWishlist as t };
