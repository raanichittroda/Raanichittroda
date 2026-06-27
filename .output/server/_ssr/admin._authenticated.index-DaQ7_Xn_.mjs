import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as ClipboardList, a as TrendingUp, h as Package, k as FolderTree } from "../_libs/lucide-react.mjs";
import { t as getAdminStore } from "./adminStore-COWgJyqx.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.index-DaQ7_Xn_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [stats, setStats] = (0, import_react.useState)({
		products: 0,
		categories: 0,
		orders: 0
	});
	(0, import_react.useEffect)(() => {
		const store = getAdminStore();
		setStats({
			products: store.products.length,
			categories: store.categories.length,
			orders: store.orders.length || 0
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-gray-900 tracking-tight",
					children: "Dashboard Overview"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Total Products",
						value: stats.products,
						icon: Package,
						trend: "+12%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Total Categories",
						value: stats.categories,
						icon: FolderTree
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Total Orders",
						value: stats.orders,
						icon: ClipboardList,
						trend: "+5%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "WhatsApp Inquiries",
						value: 45,
						icon: TrendingUp,
						trend: "+22%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold text-gray-900 mb-6",
						children: "Orders this week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: [
									{
										name: "Mon",
										orders: 4
									},
									{
										name: "Tue",
										orders: 3
									},
									{
										name: "Wed",
										orders: 7
									},
									{
										name: "Thu",
										orders: 5
									},
									{
										name: "Fri",
										orders: 8
									},
									{
										name: "Sat",
										orders: 12
									},
									{
										name: "Sun",
										orders: 9
									}
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "#E5E7EB"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: {
											fill: "#6B7280",
											fontSize: 12
										},
										dy: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										axisLine: false,
										tickLine: false,
										tick: {
											fill: "#6B7280",
											fontSize: 12
										},
										dx: -10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "#F3F4F6" },
										contentStyle: {
											borderRadius: "8px",
											border: "none",
											boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "orders",
										fill: "#111827",
										radius: [
											4,
											4,
											0,
											0
										],
										maxBarSize: 40
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-gray-900",
							children: "Recent Activity"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 pb-4 border-b border-gray-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 mt-2 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-gray-900",
									children: "New WhatsApp Order Received"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500",
									children: "2 minutes ago"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 pb-4 border-b border-gray-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 mt-2 rounded-full bg-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-gray-900",
									children: "Product \"Lotus Filigree Rakhi\" stock updated"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500",
									children: "1 hour ago"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 mt-2 rounded-full bg-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-gray-900",
									children: "Category \"Gold Jewellery\" created"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500",
									children: "3 hours ago"
								})] })]
							})
						]
					})]
				})]
			})
		]
	});
}
function StatCard({ title, value, icon: Icon, trend }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-gray-500",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-3xl font-bold text-gray-900 mt-2",
				children: value
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 bg-gray-50 rounded-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-6 h-6 text-gray-700" })
			})]
		}), trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-green-600 font-medium",
				children: trend
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gray-500 ml-2",
				children: "from last month"
			})]
		})]
	});
}
//#endregion
export { Dashboard as component };
