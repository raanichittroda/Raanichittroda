import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { B as Funnel, d as Search, r as Upload } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.media-CseBgi8p.js
var import_jsx_runtime = require_jsx_runtime();
function MediaLibraryCMS() {
	const mockImages = Array(12).fill("https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=400&q=80");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-gray-900 tracking-tight",
				children: "Media Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500 mt-1",
				children: "Manage all your product and website images."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }), "Upload Files"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white border border-gray-200 rounded-lg shadow-sm p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search media...",
						className: "w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "p-2 text-gray-500 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-4 h-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
				children: mockImages.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `Media ${i}`,
						className: "w-full h-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-white text-xs font-medium px-3 py-1.5 border border-white rounded hover:bg-white/20 transition-colors",
							children: "Select"
						})
					})]
				}, i))
			})]
		})]
	});
}
//#endregion
export { MediaLibraryCMS as component };
