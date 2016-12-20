module.exports = {
	// 接口代理配置
	API_PROXY_CONFIG: {
		// 接口服务器配置
		API_HOST: process.env.API_HOST || 'http://livetest.ocopebc.com:8018',
		API_PATH: process.env.API_PATH || '/live',
		changeOrigin: true,
		websockets: false,
		// 本地存储键值
		STORAGE_KEY: {
			TOKEN: '',
			UID: ''
		},
		// 测试环境帐号
		TEST_ACCOUNT: {
			TOKEN: '',
			UID: ''
		},
		// pathRewrite: 规则重写
		pathRewrite: {
			
		}
	},
	// 需要裁剪uid的路径
	NEED_CUT_UID_PATH: []
};
