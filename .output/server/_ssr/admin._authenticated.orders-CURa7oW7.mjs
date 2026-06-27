import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { H as CircleCheckBig, M as Download, N as Clock, V as CircleX, d as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.orders-CURa7oW7.js
var import_jsx_runtime = require_jsx_runtime();
var mockOrders = [
	{
		id: "ORD-001",
		customer: "Rahul Sharma",
		date: "2026-06-25",
		total: "₹18,500",
		status: "Pending",
		items: 3
	},
	{
		id: "ORD-002",
		customer: "Priya Desai",
		date: "2026-06-26",
		total: "₹5,499",
		status: "Completed",
		items: 1
	},
	{
		id: "ORD-003",
		customer: "Anil Kapoor",
		date: "2026-06-27",
		total: "₹12,000",
		status: "New",
		items: 2
	},
	{
		id: "ORD-004",
		customer: "Sneha Patel",
		date: "2026-06-24",
		total: "₹2,499",
		status: "Cancelled",
		items: 1
	}
];
function OrdersCMS() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-gray-900 tracking-tight",
				children: "Order Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500 mt-1",
				children: "Track WhatsApp inquiries and converted orders."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), "Export CSV"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-b border-gray-200 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search orders by ID or customer...",
						className: "w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "border border-gray-300 rounded-md text-sm px-3 py-2 bg-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "New" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pending" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Completed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cancelled" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-gray-50 text-gray-500 border-b border-gray-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium",
								children: "Order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 font-medium text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-gray-200",
						children: mockOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-gray-50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-medium text-gray-900",
									children: order.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-gray-900",
									children: order.customer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-gray-500",
									children: order.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 text-gray-900",
									children: [
										order.total,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-gray-400 text-xs ml-1",
											children: [
												"(",
												order.items,
												" items)"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4",
									children: [
										order.status === "New" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700",
											children: "New"
										}),
										order.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), " Pending"]
										}),
										order.status === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3" }), " Completed"]
										}),
										order.status === "Cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3 h-3" }), " Cancelled"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-gold hover:text-yellow-600 font-medium text-sm",
										children: "View Details"
									})
								})
							]
						}, order.id))
					})]
				})
			})]
		})]
	});
}
//#endregion
export { OrdersCMS as component };
