import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { O as GripVertical, R as SquarePen, o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { t as getAdminStore } from "./adminStore-COWgJyqx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.categories-COlyamjG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoriesCMS() {
	const [categories, setCategories] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setCategories(getAdminStore().categories);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-gray-900 tracking-tight",
				children: "Category Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500 mt-1",
				children: "Organize your store collections."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "Add Category"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white border border-gray-200 rounded-lg shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-gray-200",
					children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "group flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cursor-move text-gray-300 hover:text-gray-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 shrink-0 bg-gray-100 rounded overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: category.image,
									alt: category.name,
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-gray-900 truncate",
									children: category.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 truncate mt-0.5",
									children: category.slug
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "p-2 text-gray-400 hover:text-blue-600 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "p-2 text-gray-400 hover:text-red-600 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								})]
							})
						]
					}, category.slug))
				})
			})
		})]
	});
}
//#endregion
export { CategoriesCMS as component };
