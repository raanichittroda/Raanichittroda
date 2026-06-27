import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adminAuth-7572ujPi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AdminAuthContext = (0, import_react.createContext)(null);
var MOCK_ADMIN = {
	name: "Admin User",
	email: "admin@aurelia.com",
	avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
};
function AdminAuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		try {
			if (localStorage.getItem("aurelia_admin_token") === "valid_session") setUser(MOCK_ADMIN);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);
	const login = (email, pass) => {
		if (email === "admin@aurelia.com" && pass === "admin123") {
			localStorage.setItem("aurelia_admin_token", "valid_session");
			setUser(MOCK_ADMIN);
			return true;
		}
		return false;
	};
	const logout = () => {
		localStorage.removeItem("aurelia_admin_token");
		setUser(null);
		router.navigate({ to: "/admin/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthContext.Provider, {
		value: {
			user,
			login,
			logout,
			isLoading
		},
		children
	});
}
function useAdminAuth() {
	const ctx = (0, import_react.useContext)(AdminAuthContext);
	if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
	return ctx;
}
//#endregion
export { useAdminAuth as n, AdminAuthProvider as t };
