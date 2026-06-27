import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as useNavigate, f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAdminAuth } from "./adminAuth-7572ujPi.mjs";
import { C as LayoutTemplate, E as Image, P as ClipboardList, c as ShoppingBag, k as FolderTree, n as User, u as Settings, w as LayoutDashboard, x as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated-xAroMjz4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		label: "Dashboard",
		href: "/admin",
		icon: LayoutDashboard
	},
	{
		label: "Products",
		href: "/admin/products",
		icon: ShoppingBag
	},
	{
		label: "Categories",
		href: "/admin/categories",
		icon: FolderTree
	},
	{
		label: "Orders",
		href: "/admin/orders",
		icon: ClipboardList
	},
	{
		label: "Homepage CMS",
		href: "/admin/homepage",
		icon: LayoutTemplate
	},
	{
		label: "Media Library",
		href: "/admin/media",
		icon: Image
	},
	{
		label: "Settings",
		href: "/admin/settings",
		icon: Settings
	},
	{
		label: "Profile",
		href: "/admin/profile",
		icon: User
	}
];
function AdminLayout() {
	const { user, isLoading, logout } = useAdminAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!isLoading && !user) navigate({ to: "/admin/login" });
	}, [
		user,
		isLoading,
		navigate
	]);
	if (isLoading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center",
		children: "Loading..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-gray-50 text-gray-900 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-gray-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold tracking-wider text-gray-900",
						children: "AURELIA ADMIN"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-4 space-y-1 overflow-y-auto",
					children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: item.href,
						onClick: (e) => {
							e.preventDefault();
							navigate({ to: item.href });
						},
						className: "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "w-5 h-5 opacity-75" }), item.label]
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: user.avatar,
							alt: "Admin",
							className: "w-10 h-10 rounded-full bg-gray-200"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900 truncate",
								children: user.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 truncate",
								children: user.email
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: logout,
						className: "flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), "Sign Out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 max-w-7xl mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})]
	});
}
//#endregion
export { AdminLayout as component };
