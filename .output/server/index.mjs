globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/about-B5P6pUsU.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a055-wQtg+K8lZ4heLu9NjdNSoG6Gquk\"",
		"mtime": "2026-06-27T05:01:35.504Z",
		"size": 172117,
		"path": "../public/assets/about-B5P6pUsU.jpg"
	},
	"/assets/about-C_zlb4hf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5a-RueICiSa072GSa9MRqwRx+5KXBE\"",
		"mtime": "2026-06-27T05:01:35.483Z",
		"size": 3418,
		"path": "../public/assets/about-C_zlb4hf.js"
	},
	"/assets/admin.login-DSUzAY05.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e16-C4PxJydZtILJYXpJczA4Qu0J5l0\"",
		"mtime": "2026-06-27T05:01:35.492Z",
		"size": 3606,
		"path": "../public/assets/admin.login-DSUzAY05.js"
	},
	"/assets/admin._authenticated-Da8iS0X1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0d-kdn6uL+4oT1W5LBK123Vna6eDS4\"",
		"mtime": "2026-06-27T05:01:35.484Z",
		"size": 3853,
		"path": "../public/assets/admin._authenticated-Da8iS0X1.js"
	},
	"/assets/admin._authenticated.categories-DRw0DBnD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"995-ddn2gQ/QYRvAdZY+Yz9awBLASjM\"",
		"mtime": "2026-06-27T05:01:35.485Z",
		"size": 2453,
		"path": "../public/assets/admin._authenticated.categories-DRw0DBnD.js"
	},
	"/assets/admin._authenticated.homepage-CI2WRcMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ff-YM6vs0wdEPL8DL4f3wM4bZ/9tBA\"",
		"mtime": "2026-06-27T05:01:35.485Z",
		"size": 767,
		"path": "../public/assets/admin._authenticated.homepage-CI2WRcMm.js"
	},
	"/assets/admin._authenticated.media-NsN_JCX9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e0-DsUgMzfya77OsGvqGaLYZs2s6Qg\"",
		"mtime": "2026-06-27T05:01:35.486Z",
		"size": 2528,
		"path": "../public/assets/admin._authenticated.media-NsN_JCX9.js"
	},
	"/assets/admin._authenticated.orders-DusNY2zS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1391-wsvHH0l50spUjLDzWkVTj7Pu2Xc\"",
		"mtime": "2026-06-27T05:01:35.487Z",
		"size": 5009,
		"path": "../public/assets/admin._authenticated.orders-DusNY2zS.js"
	},
	"/assets/admin._authenticated.products.index-CKe2zAR-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1351-0Cu8DyFYh+KsNIPCK4L6MQVFsqk\"",
		"mtime": "2026-06-27T05:01:35.490Z",
		"size": 4945,
		"path": "../public/assets/admin._authenticated.products.index-CKe2zAR-.js"
	},
	"/assets/admin._authenticated.index-r1Rb8qWX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ebb1-ow3OYA4echmEniDaWpNIUw62j3c\"",
		"mtime": "2026-06-27T05:01:35.486Z",
		"size": 388017,
		"path": "../public/assets/admin._authenticated.index-r1Rb8qWX.js"
	},
	"/assets/admin._authenticated.products.new-BIIyYayH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1a-dGt09QgoTzOr388TlTZSiaV5HMM\"",
		"mtime": "2026-06-27T05:01:35.490Z",
		"size": 7706,
		"path": "../public/assets/admin._authenticated.products.new-BIIyYayH.js"
	},
	"/assets/admin._authenticated.profile-C1RPNVAF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2b-Z3nGMda8EayfDEyi2C9lNB9o0Q4\"",
		"mtime": "2026-06-27T05:01:35.491Z",
		"size": 3627,
		"path": "../public/assets/admin._authenticated.profile-C1RPNVAF.js"
	},
	"/assets/admin._authenticated.settings-NpDiVI6V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ae-tbvia/e2QPx7t6zAk1qQBgowk+0\"",
		"mtime": "2026-06-27T05:01:35.491Z",
		"size": 4526,
		"path": "../public/assets/admin._authenticated.settings-NpDiVI6V.js"
	},
	"/assets/adminStore-DrxSlUWv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271-u19OPbMn+dq0rVUCgTv7zbi57BM\"",
		"mtime": "2026-06-27T05:01:35.492Z",
		"size": 625,
		"path": "../public/assets/adminStore-DrxSlUWv.js"
	},
	"/assets/cat-bracelet-C8_St_U1.jpg": {
		"type": "image/jpeg",
		"etag": "\"d2ce-4QP8eyV2OiZ/czkAt4opeXqIiIk\"",
		"mtime": "2026-06-27T05:01:35.505Z",
		"size": 53966,
		"path": "../public/assets/cat-bracelet-C8_St_U1.jpg"
	},
	"/assets/cat-chain-CkN7nmR5.jpg": {
		"type": "image/jpeg",
		"etag": "\"cff8-6lLrdOq7JeKh0sZV9SqdgVBvljk\"",
		"mtime": "2026-06-27T05:01:35.505Z",
		"size": 53240,
		"path": "../public/assets/cat-chain-CkN7nmR5.jpg"
	},
	"/assets/cat-coin-D3i1R58f.jpg": {
		"type": "image/jpeg",
		"etag": "\"12387-hAz8Wvu62L56p6+xfOy6LI8OaII\"",
		"mtime": "2026-06-27T05:01:35.506Z",
		"size": 74631,
		"path": "../public/assets/cat-coin-D3i1R58f.jpg"
	},
	"/assets/cat-gift-CwkHbVxO.jpg": {
		"type": "image/jpeg",
		"etag": "\"12d8b-CYXWjlvYlp+JXuIU6gT12yEnFPw\"",
		"mtime": "2026-06-27T05:01:35.507Z",
		"size": 77195,
		"path": "../public/assets/cat-gift-CwkHbVxO.jpg"
	},
	"/assets/cat-murti-CRnEKq8i.jpg": {
		"type": "image/jpeg",
		"etag": "\"11fa2-lGsXlt9zI2OnssvwH8YM72QL2W4\"",
		"mtime": "2026-06-27T05:01:35.507Z",
		"size": 73634,
		"path": "../public/assets/cat-murti-CRnEKq8i.jpg"
	},
	"/assets/cat-necklace-Bf3RBgYW.jpg": {
		"type": "image/jpeg",
		"etag": "\"e2bc-6jzoXToCm13EJRSDSowOLgj3nIY\"",
		"mtime": "2026-06-27T05:01:35.508Z",
		"size": 58044,
		"path": "../public/assets/cat-necklace-Bf3RBgYW.jpg"
	},
	"/assets/cat-rakhi-DDrgGcH3.jpg": {
		"type": "image/jpeg",
		"etag": "\"119b4-cn+RuS4izk9+9hVQoaqYPbr6O4I\"",
		"mtime": "2026-06-27T05:01:35.508Z",
		"size": 72116,
		"path": "../public/assets/cat-rakhi-DDrgGcH3.jpg"
	},
	"/assets/checkout-Djl8TDCs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169c-uIr5UL8MDQa42yrIN9ZNboESMt0\"",
		"mtime": "2026-06-27T05:01:35.493Z",
		"size": 5788,
		"path": "../public/assets/checkout-Djl8TDCs.js"
	},
	"/assets/collections-B7B5Jcy4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1596-RmAjaHYkmecUYiyKc3ZgxXMZTdo\"",
		"mtime": "2026-06-27T05:01:35.494Z",
		"size": 5526,
		"path": "../public/assets/collections-B7B5Jcy4.js"
	},
	"/assets/contact-CGCLRlx2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fdf-TgSGOvKp1D/KrRVLKJxxdqCZIto\"",
		"mtime": "2026-06-27T05:01:35.494Z",
		"size": 4063,
		"path": "../public/assets/contact-CGCLRlx2.js"
	},
	"/assets/eye-Bhdi0_39.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-pkJ43YG4FvT0FyGlDhpKI9IA+a8\"",
		"mtime": "2026-06-27T05:01:35.495Z",
		"size": 245,
		"path": "../public/assets/eye-Bhdi0_39.js"
	},
	"/assets/folder-tree-JLRXzBJ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33a-5wLU9DoN2Yq/ic3Jxj4PZVPYyHk\"",
		"mtime": "2026-06-27T05:01:35.495Z",
		"size": 826,
		"path": "../public/assets/folder-tree-JLRXzBJ_.js"
	},
	"/assets/hero-DKS-5OPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52-/pgS2MAJQ+6cWtmpXwJweqxaKiU\"",
		"mtime": "2026-06-27T05:01:35.496Z",
		"size": 82,
		"path": "../public/assets/hero-DKS-5OPL.js"
	},
	"/assets/hero-CWa4T-I0.jpg": {
		"type": "image/jpeg",
		"etag": "\"382ef-dajgcGv0SAUuW/HbdwXlynDl0Ws\"",
		"mtime": "2026-06-27T05:01:35.509Z",
		"size": 230127,
		"path": "../public/assets/hero-CWa4T-I0.jpg"
	},
	"/assets/jsx-runtime-YXoRVzn0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65fb-xDWhND2h0rRfG/3cfVaXf3KHn8w\"",
		"mtime": "2026-06-27T05:01:35.496Z",
		"size": 26107,
		"path": "../public/assets/jsx-runtime-YXoRVzn0.js"
	},
	"/assets/link-C9lIm0QU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35aa-iHuEn9jJPA2nClTqYw/TasaPXAg\"",
		"mtime": "2026-06-27T05:01:35.497Z",
		"size": 13738,
		"path": "../public/assets/link-C9lIm0QU.js"
	},
	"/assets/product._id-BzOXeOCf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a59-D5p6eRyptkyOeg+K4I57H09YYEM\"",
		"mtime": "2026-06-27T05:01:35.498Z",
		"size": 6745,
		"path": "../public/assets/product._id-BzOXeOCf.js"
	},
	"/assets/matchContext-CYALzbE0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-fJi924MceviZQYvi6/QtrA5d/zU\"",
		"mtime": "2026-06-27T05:01:35.497Z",
		"size": 778,
		"path": "../public/assets/matchContext-CYALzbE0.js"
	},
	"/assets/product._id-D7aMuIz0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-D5XBKPDDc+a3p5XMynxpMgaRhk8\"",
		"mtime": "2026-06-27T05:01:35.499Z",
		"size": 478,
		"path": "../public/assets/product._id-D7aMuIz0.js"
	},
	"/assets/ProductCard-BRQ8nf00.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128d-ngNuOs1oS4qUuyHrbLkqHHoI/2Q\"",
		"mtime": "2026-06-27T05:01:35.482Z",
		"size": 4749,
		"path": "../public/assets/ProductCard-BRQ8nf00.js"
	},
	"/assets/routes-MhbkcQ1a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a9-HPfKHzc+HCQkzwoTiJN1wBF1QGk\"",
		"mtime": "2026-06-27T05:01:35.500Z",
		"size": 8617,
		"path": "../public/assets/routes-MhbkcQ1a.js"
	},
	"/assets/save-CK3LZUv9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-bqdH5NeNuuFDIFcFlCkoyrV0+co\"",
		"mtime": "2026-06-27T05:01:35.500Z",
		"size": 316,
		"path": "../public/assets/save-CK3LZUv9.js"
	},
	"/assets/search-D_DsHaj4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-QszMit4q2XV88lb/6OkmB6/RVQY\"",
		"mtime": "2026-06-27T05:01:35.501Z",
		"size": 163,
		"path": "../public/assets/search-D_DsHaj4.js"
	},
	"/assets/styles-Bo_qia-t.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"180a5-Lb9KoA7WOjuNEkDb3Jeh4Gph9cU\"",
		"mtime": "2026-06-27T05:01:35.509Z",
		"size": 98469,
		"path": "../public/assets/styles-Bo_qia-t.css"
	},
	"/assets/trash-2-BkqUs9W2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-tXX0b7JPRP0VPB9OpWgLHgzQnf8\"",
		"mtime": "2026-06-27T05:01:35.501Z",
		"size": 584,
		"path": "../public/assets/trash-2-BkqUs9W2.js"
	},
	"/assets/truck-BuXpA6bc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"445-4hU+SGcBStfU1BGDmWR7Cs7kAWg\"",
		"mtime": "2026-06-27T05:01:35.502Z",
		"size": 1093,
		"path": "../public/assets/truck-BuXpA6bc.js"
	},
	"/assets/upload-BmWvTDVT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-QLTNGAc2KQhRp7wJUciW9vSwxUE\"",
		"mtime": "2026-06-27T05:01:35.502Z",
		"size": 219,
		"path": "../public/assets/upload-BmWvTDVT.js"
	},
	"/assets/useRouter--ClNpheo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-hte2TONccToCUPSOgHuGBHHiQTk\"",
		"mtime": "2026-06-27T05:01:35.503Z",
		"size": 262,
		"path": "../public/assets/useRouter--ClNpheo.js"
	},
	"/assets/useStore-MMsw6_dD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d16-zoKen/AYA5IbezxhvRgJFDDzIrY\"",
		"mtime": "2026-06-27T05:01:35.503Z",
		"size": 19734,
		"path": "../public/assets/useStore-MMsw6_dD.js"
	},
	"/assets/utils-Dy7DS7yL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25e-nKSmVZjBBRnGkDGvMVII3kxKnPM\"",
		"mtime": "2026-06-27T05:01:35.504Z",
		"size": 606,
		"path": "../public/assets/utils-Dy7DS7yL.js"
	},
	"/assets/index-Cs-jpbzs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bcff-a+nOu2HtMB1Vz8Mytm7LjgeDV6s\"",
		"mtime": "2026-06-27T05:01:35.481Z",
		"size": 572671,
		"path": "../public/assets/index-Cs-jpbzs.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_tbWaAv = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_tbWaAv
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
