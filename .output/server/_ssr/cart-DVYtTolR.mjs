import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as products } from "./products-BfsKOQuQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DVYtTolR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "aurelia.cart.v1";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	const add = (0, import_react.useCallback)((productId, qty = 1) => {
		setItems((prev) => {
			if (prev.find((i) => i.productId === productId)) return prev.map((i) => i.productId === productId ? {
				...i,
				quantity: i.quantity + qty
			} : i);
			return [...prev, {
				productId,
				quantity: qty
			}];
		});
		setIsOpen(true);
	}, []);
	const remove = (0, import_react.useCallback)((productId) => {
		setItems((prev) => prev.filter((i) => i.productId !== productId));
	}, []);
	const setQty = (0, import_react.useCallback)((productId, qty) => {
		setItems((prev) => qty <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => i.productId === productId ? {
			...i,
			quantity: qty
		} : i));
	}, []);
	const clear = (0, import_react.useCallback)(() => setItems([]), []);
	const detailed = (0, import_react.useMemo)(() => items.map((i) => {
		const product = products.find((p) => p.id === i.productId);
		return product ? {
			product,
			quantity: i.quantity
		} : null;
	}).filter(Boolean), [items]);
	const subtotal = (0, import_react.useMemo)(() => detailed.reduce((s, x) => s + x.product.price * x.quantity, 0), [detailed]);
	const value = {
		items,
		count: (0, import_react.useMemo)(() => items.reduce((s, i) => s + i.quantity, 0), [items]),
		add,
		remove,
		setQty,
		clear,
		detailed,
		subtotal,
		isOpen,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
