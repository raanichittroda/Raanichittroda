import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAdminAuth } from "./adminAuth-7572ujPi.mjs";
import { S as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-CmBUzBLC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const { login, user, isLoading } = useAdminAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (user && !isLoading) navigate({ to: "/admin" });
	}, [
		user,
		isLoading,
		navigate
	]);
	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (login(email, password)) navigate({ to: "/admin" });
		else setError("Invalid credentials. Try admin@aurelia.com / admin123");
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gray-50 flex items-center justify-center",
		children: "Loading..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:mx-auto sm:w-full sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-gold" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight",
					children: "Sign in to Admin CMS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-gray-600",
					children: "Manage your products, orders, and website content."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-6",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium text-gray-700",
							children: "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-gray-900",
								placeholder: "admin@aurelia.com"
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium text-gray-700",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-gray-900"
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "remember-me",
									name: "remember-me",
									type: "checkbox",
									className: "h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "remember-me",
									className: "ml-2 block text-sm text-gray-900",
									children: "Remember me"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										alert("Mock: Password reset sent.");
									},
									className: "font-medium text-gold hover:text-yellow-600",
									children: "Forgot your password?"
								})
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-red-600 text-sm font-medium bg-red-50 p-3 rounded-md border border-red-200",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors",
							children: "Sign in"
						}) })
					]
				})
			})
		})]
	});
}
//#endregion
export { AdminLogin as component };
