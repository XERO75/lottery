import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
