import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/lottery/lottery', // 抽奖
      name: 'lottery',
      component (resolve) {
        require.ensure(['../src/views/lottery/lottery.vue'], () => {
          resolve(require('../src/views/lottery/lottery.vue'))
        })
      }
    },
    {
      path: '/lottery/lotteryRecord', // 获奖记录
      name: 'lotteryRecord',
      component (resolve) {
        require.ensure(['../src/views/lottery/lotteryRecord.vue'], () => {
          resolve(require('../src/views/lottery/lotteryRecord.vue'))
        })
      }
    }
  ]
})
