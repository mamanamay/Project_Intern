export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BdcQpoAZ.js",app:"_app/immutable/entry/app.Cd57wo_I.js",imports:["_app/immutable/entry/start.BdcQpoAZ.js","_app/immutable/chunks/PuqQD8uo.js","_app/immutable/chunks/jvBz_kll.js","_app/immutable/chunks/BCDCTfMj.js","_app/immutable/entry/app.Cd57wo_I.js","_app/immutable/chunks/jvBz_kll.js","_app/immutable/chunks/zYyjMW_Y.js","_app/immutable/chunks/BCDCTfMj.js","_app/immutable/chunks/Cla-nNw9.js","_app/immutable/chunks/C8aWryKX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
