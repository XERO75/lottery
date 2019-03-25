module.exports = {
    devServer:{
		proxy: 'https://link.jslcoo.com/'
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
	},

    publicPath: './',
    outputDir: undefined,
    assetsDir: 'static',
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
}