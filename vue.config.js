module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',
	// baseUrl: '/',
	//baseUrl: './',
	devServer:{
		// port:8080, //端口号
		// https:false,
		// open:false, //配置自动启动浏览器
		// proxy:{ //配置跨域处理,只有一个代理
		// 	'/':{
		// 		target: 'https://localhost:8080/',
		// 		ws:true,
		// 		changeOrigin:true,
		// 	}
		// }
	}
}