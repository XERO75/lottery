import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import 'lib-flexible'

// lottery
import './assets/js/browser.js'
import './assets/js/rem'
import './assets/less/public.less'
// import * as filters from './assets/js/filters'

import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// addroid控制字体不变大
// if (!/ipad|iphone/i.test(navigator.userAgent)) {
//   (function () {
//     if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
//       handleFontSize()
//     } else {
//       if (document.addEventListener) {
//         document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
//       } else if (document.attachEvent) {
//         document.attachEvent('WeixinJSBridgeReady', handleFontSize)
//         document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
//       }
//     }

//     function handleFontSize () {
//       // 设置网页字体为默认大小
//       WeixinJSBridge.invoke('setFontSizeCallback', {
//         'fontSize': 0
//       })
//       // 重写设置网页字体大小的事件
//       WeixinJSBridge.on('menu:setfont', function () {
//         WeixinJSBridge.invoke('setFontSizeCallback', {
//           'fontSize': 0
//         })
//       })
//     }
//   })()
// }

// 过滤器
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
// 自定义指令页面title实时更新
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
