<template>
  <div class="lottery">
    <div class="wap" v-title="'抽奖'" ref="wap">
      <!-- <div class="banner">
        <img class="bannerImg" src="../../assets/img/lottery/banner.png" alt="">
        <div class="prizeInfoBtn" @click="lotteryRecord" v-show="hasRecord">
          <img class="prizeInfoBtnImg" src="../../assets/img/lottery/prizeInfo.png" alt="">
        </div>
        <div class="priceChanceBtn">
          您有{{remainingTimes}}次抽奖机会
        </div>
        <div class="whiteBar1 whiteBar">
          <img src="../../assets/img/lottery/whiteBar.png" alt="">
        </div>
        <div class="whiteBar2 whiteBar">
          <img src="../../assets/img/lottery/whiteBar.png" alt="">
        </div>
        <div class="whiteBar3 whiteBar">
          <img src="../../assets/img/lottery/whiteBar.png" alt="">
        </div>
        <div class="whiteBar4 whiteBar">
          <img src="../../assets/img/lottery/whiteBar.png" alt="">
        </div>
      </div> -->
      <div class="box">
        <img src="https://i.loli.net/2019/03/11/5c86219789157.png" alt="呼吸底灯" class="img1">
        <img src="https://i.loli.net/2019/03/11/5c8621978d058.png" alt="呼吸灯" class="img2">
        <div v-for="imgLi in prizeList" :key="imgLi.picUrlDesc" ref="pice">
          <img :src="imgLi.picUrlDesc" v-if="imgLi.picUrlDesc" />
        </div>
      </div>

      <div class="announce">
        <h2>活动规则</h2>
        <ol>
          <li>关注公众号 “万可云” 即可进行抽奖；</li>
          <li>中奖后页面会跳转至资讯平台领奖；</li>
          <li>抽奖次数不限，分享链接到微信群可获得抽奖机会，或在万可资讯阅读文章赚取积分获得抽奖机会；</li>
          <li>万可资讯平台20积分，可换取一次抽奖卷，兑换数量不限；</li>
          <li>活动最终解释权归万可传媒所有;</li>
        </ol>
      </div>
      
      <!-- <div class="info">
        <div class="title">
          <div class="squire squire1">
            <img src="../../assets/img/lottery/three.png" alt="">
          </div>
          <span>奖品说明</span>
          <div class="squire squire2">
            <img src="../../assets/img/lottery/three.png" alt="">
          </div>
        </div>
        <div class="infoContent">
          <ul>
            <li v-for="item in prizeDesc"> {{item}}</li>
          </ul>
        </div>
      </div> -->
      <!-- <div class="info">
        <div class="title">
          <div class="squire squire1">
            <img src="../../assets/img/lottery/three.png" alt="">
          </div>
          <span>活动说明</span>
          <div class="squire squire2">
            <img src="../../assets/img/lottery/three.png" alt="">
          </div>
        </div>
        <div class="infoContent">
          <ul>
            <li v-for="item in lotteryDesc"> {{item}}</li>
          </ul>
        </div>
      </div> -->
      <div class="prizers">
        <!-- <div class="prizeBar">
          <img src="../../assets/img/lottery/prizers.png" alt="">
        </div> -->
        <div class="prizer">
          <div class="prizeIcon">
            中奖名单
            <!-- <img src="../../assets/img/lottery/prizeIcon.png" alt=""> -->
          </div>
          <div class="prizerList" id="prizerList">
            <ul id="prizerList1">
              <li v-for="item in prizers" :key="item.id">
                <span>{{item.name}}</span>
                <span>{{item.mobile| mobileTurn}}</span>
                <span class="prizeName">{{item.commodityName}}</span>
              </li>
            </ul>
            <ul id="prizerList2"></ul>
          </div>
        </div>
      </div>
      
      <div class="massage" v-show="prizeInfoShow" @touchmove="touchMove($event)">
        <div class="noPrize" v-if="noPrizeShow">
          <div class="close" @click="close()">
            <img src="../../assets/img/lottery/close.png" alt="">
          </div>
          <p>很遗憾，您没有中奖</p>
          <div class="xiaofu">
            <img src="../../assets/img/lottery/noprizeXF.png" alt="">
          </div>
          <div class="btn" @click="goIndex">
            去逛逛吧
          </div>
        </div>
        <img src="../../assets/img/lottery/circleLight.png" class="circleLight" v-if="havePrizeShow" alt="">
        <div class="havePrize" v-if="havePrizeShow">
          <div class="oneBar">
            <img src="../../assets/img/lottery/yellowCycle.png" />
          </div>
          <p>恭喜您抽中{{prizeName}}</p>
          <div class="proImg">
            <img :src="prizeUrl" alt="">
          </div>
          <div class="btn" @click="lotteryRecord">
            <a>立即领取</a>
          </div>
        </div>
        <div class="haveLottery" v-if="haveLottery">
          <div class="close" @click="close()">
            <img src="../../assets/img/lottery/close.png" alt="">
          </div>
          <div class="xiaofu">
            <img src="../../assets/img/lottery/receivedXF1.png" alt="">
          </div>
          <p>您已经抽过奖啦，不要太贪心哦！</p>
          <div class="btn" @click="close()">
            我知道啦
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import noSelect from '@/assets/img/lottery/border.png'
import isSelect from '@/assets/img/lottery/borderSelect.png'
import notStart from '@/assets/img/lottery/noStart.png'
import endLottery from '@/assets/img/lottery/endLottery.png'
import prizeBtn from '@/assets/img/lottery/prizeBtn.png'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      swiperName: { // 获奖名单
        loop: true, // 当获奖人数大于等于5的时候滚动，否则不滚动
        direction: 'vertical',
        slidesPerView: 5,
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumVelocityRatio: 1,
        autoplay: 1000
      },
      // mobile: '15114785236',
      prizeIndex: 0,
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序
      clickFlage: true, // 点击事件，防止重复点击

      prizeInfoShow: false, // 显示中奖信息的遮罩层
      noPrizeShow: false, // 没中奖
      havePrizeShow: false, // 中奖了
      haveLottery: false, // 已经抽过奖了
      timer1: '',
      timer2: '',
      s1: '',
      s2: '',
      // lotteryDefineId: '3eb7b32ba51b4f9486e3dd368dad24c4', // 抽奖活动的id
      lotteryDefineId: this.$route.query.id, // 抽奖活动的id
      winnerNum: '20',
      prizeDesc: [], // 奖品说明
      lotteryDesc: [], // 活动说明
      hasRecord: false, // 是否显示获奖情况
      remainingTimes: '', // 剩余抽奖次数
      prizeList: [], // 奖项列表
      prizeLevel: '', // 中奖等级
      prizeName: '', // 奖品名称
      prizeUrl: '', // 奖品图片
      prizers: [], // 获奖名单
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      startStatus: '' // 活动开始的状态
    }
  },
  beforeRouteEnter (to, from, next) {
    document.title = '抽奖'
    next()
  },
  mounted () {
    this.$nextTick(() => {
      this.get()
    })
  },

  // 销毁组件重新加载
  deactivated () {
    this.$destroy()
  },
  methods: {

    get () {
      this.$axios.get('../../../static/data/lotteryInfo.json').then((myData) => {
        let res = myData.data
        if (res.success) {
          document.title = res.data.title
          this.remainingTimes = res.data.remainingTimes
          this.hasRecord = res.data.hasDrawed
          this.prizeDesc = res.data.prizeDesc.split('$utf8$')
          this.lotteryDesc = res.data.lotteryDesc.split('$utf8$')
          res.data.prizeInfo.forEach((item) => {
            this.$set(item, 'bgSrc', noSelect)
          })
          res.data.prizeInfo.splice(4, 0, ' ')
          this.prizeList[0] = res.data.prizeInfo[0]
          this.prizeList[6] = res.data.prizeInfo[1]
          this.prizeList[5] = res.data.prizeInfo[2]
          this.prizeList[4] = res.data.prizeInfo[4]
          this.prizeList[2] = res.data.prizeInfo[3]
          this.prizeList[8] = res.data.prizeInfo[5]
          this.prizeList[7] = res.data.prizeInfo[6]
          this.prizeList[1] = res.data.prizeInfo[7]
          this.prizeList[3] = res.data.prizeInfo[8]
          this.prizers = res.data.winners
          this.statusFun(res.data.currTime, res.data.beginTime, res.data.endTime)// 获取状态，开始，未开始，结束
          if (this.prizers && this.prizers.length > 5) {
            this.prizerListScroll()
          }
          this.prizeZhuan()
        } else {
          Toast({
            message: res.bizMessage,
            position: 'middle',
            duration: 1500
          })
        }
      })
    },

    statusFun (c, s, e) {
      this.$nextTick(() => {
        if (c < s) { // 当前时间小于开始时间，未开始
          this.startStatus = 0
          this.$refs.pice[4].style.backgroundImage = 'url(' + notStart + ')'
        } else if (c > s && c < e) { // 当前时间大于开始时间，并且小于结束时间，已经开始未结束
          this.startStatus = 1
          this.$refs.pice[4].style.backgroundImage = 'url(' + prizeBtn + ')'
        } else if (c > e) { // 当前时间大于结束时间，已经结束
          this.startStatus = 2
          this.$refs.pice[4].style.backgroundImage = 'url(' + endLottery + ')'
        }
      })
    },
    move () {
      if (this.prizeIndex === 0) {
        this.$refs.pice[this.arrNum[7]].style.backgroundImage = 'url(' + noSelect + ')'
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage = 'url(' + isSelect + ')'
        this.prizeIndex++
      } else if (this.prizeIndex === 8) {
        this.prizeIndex = 0
        this.$refs.pice[this.arrNum[7]].style.backgroundImage = 'url(' + noSelect + ')'
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage = 'url(' + isSelect + ')'
        this.prizeIndex++
      } else {
        this.$refs.pice[this.arrNum[this.prizeIndex - 1]].style.backgroundImage = 'url(' + noSelect + ')'
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage = 'url(' + isSelect + ')'
        this.prizeIndex++
      }

      if (this.s2 && this.prizeIndex == this.s2) {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        this.stop()
      }

      this.timeFlag += 100
      if (this.timeFlag >= 10000 && !this.prizeName) {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        Toast({
          message: '当前抽奖人数过多，稍后再来',
          position: 'middle',
          duration: 1500
        })
        this.clickFlage = true// 能点击
        setTimeout(() => { // 刷新后重新加载
          location.reload()
        }, 1500)
      }
    },
    // 停止
    stop () {
      this.clickFlage = false// 不能点击
      this.prizeInfo() // 弹出是否中奖
    },
    // 降速
    lowSpeed () {
      clearInterval(this.timer1)
      this.clickFlage = false// 不能点击
      this.timer2 = setInterval(this.move, 300)
      setTimeout(() => { // 顺序打乱
        if (this.prozeLevel == 2) {
          this.s2 = 7
        } else if (this.prozeLevel == 3) {
          this.s2 = 4
        } else if (this.prozeLevel == 4) {
          this.s2 = 3
        } else if (this.prozeLevel == 7) {
          this.s2 = 2
        } else {
          this.s2 = this.prozeLevel
        }
      }, 900)
    },
    // 获奖名单滚动
    prizerListScroll () {
      this.$nextTick(() => {
        var prizerList2 = document.getElementById('prizerList2')
        var prizerList1 = document.getElementById('prizerList1')
        var prizerList = document.getElementById('prizerList')
        prizerList2.innerHTML = prizerList1.innerHTML
        setInterval(() => {
          // if (this.prizerList.scrollTop >= (this.prizerList1.offsetHeight - this.prizerList.offsetHeight)) {
          if (prizerList.scrollTop >= prizerList1.offsetHeight) {
            prizerList.scrollTop = 0
          } else {
            prizerList.scrollTop++
          }
        }, 30)
      })
    },
    prizeZhuan () {
      this.$nextTick(() => {
        this.$refs.pice[4].onclick = () => {
          if (this.remainingTimes > 0) { // 判断剩余抽奖次数
            // console.log(this.$refs.pice)
            if (this.clickFlage) {
              if (this.startStatus === 1) { // 活动开始
                this.clickFlage = false// 不能点击
                this.timer1 = setInterval(this.move, 100)
                this.$axios.get('../../../static/data/prizeInfo.json').then((myData) => {
                  let res = myData.data
                  console.log(res)
                  if (res.success) {
                    this.prozeLevel = res.data.level
                    this.prizeName = res.data.commodityName
                    this.prizeUrl = res.data.picUrlWinning
                    console.log(this.prozeLevel)
                    setTimeout(() => {
                      clearInterval(this.timer1)
                      this.lowSpeed()
                    }, 1200)
                  } else {
                    Toast({
                      message: res.bizMessage,
                      position: 'middle',
                      duration: 1500
                    })
                    this.clickFlage = false// 不能点击
                    clearInterval(this.timer1)
                    clearInterval(this.timer2)
                    // setTimeout(() => { // 刷新后重新加载
                    //   location.reload()
                    // }, 1500)
                  }
                }, false, true)
                // this.timer1 = setInterval(this.move, 100)
                // 请求，返回后给s定值
              } else if (this.startStatus === 0) { // 没开始
                Toast({
                  message: '活动尚未开始',
                  position: 'middle',
                  duration: 1500
                })
              } else if (this.startStatus === 2) { // 已经结束
                Toast({
                  message: '活动已经结束',
                  position: 'middle',
                  duration: 1500
                })
              }
            }
          } else { // 没有抽奖机会了
            this.prizeInfoShow = true
            this.haveLottery = true
          }
        }
      })
    },
    touchMove (e) {
      e.preventDefault()// 禁止滚动
      e.stopPropagation()
    },
    prizeInfo () {
      setTimeout(() => {
        this.prizeInfoShow = true
        this.havePrizeShow = true
      }, 800)
    },
    close () { // 关闭没中奖
      this.prizeInfoShow = false
      this.noPrizeShow = false
      this.haveLottery = false
    },
    goIndex () {
      this.$router.push({ name: 'preferIndex' })
      this.prizeInfoShow = false // 显示中奖信息的遮罩层
      this.noPrizeShow = false// 没中奖
    },
    lotteryRecord () {
      this.$router.push({
        name: 'lotteryRecord',
        query: {
          lotteryDefineId: this.lotteryDefineId
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
.lottery {
  background: #151539;
}
.wap {
  background: url('../../assets/img/lottery/bg.jpg') no-repeat;
  background-size: cover;
  // object-fit: cover;
  .banner {
    width: 100%;
    height: 3.2rem;
    position: relative;
    .bannerImg {
      width: 100%;
      height: 3.2rem;
    }
    .prizeInfoBtn {
      width: 2rem;
      height: 1.27rem;
      position: absolute;
      top: 0;
      right: 0;
      .prizeInfoBtnImg {
        width: 2rem;
        height: 1.27rem;
      }
    }
    .priceChanceBtn {
      height: 0.6rem;
      border-radius: 0.6rem;
      background-color: #ff7a00;
      position: absolute;
      bottom: -0.3rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0.6rem;
      font-size: 0.34rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
      padding: .06rem .4rem;
    }
    .whiteBar {
      position: absolute;
      z-index: 0;
      transform: rotate(-30deg);
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .whiteBar1 {
      top: 4rem;
      left: -3rem;
      width: 7.9rem;
      height: 1.8rem;
    }
    .whiteBar2 {
      top: 4.2rem;
      right: -2rem;
      width: 7.9rem;
      height: 2.3rem;
    }
    .whiteBar3 {
      top: 9.3rem;
      left: -1.8rem;
      width: 7.9rem;
      height: 1.75rem;
    }
    .whiteBar4 {
      top: 9.2rem;
      left: 2.5rem;
      width: 7.9rem;
      height: 1.36rem;
    }
  }
  overflow: hidden;
  .box {
    margin: 4rem auto 1.5rem;
    width: 7.5rem;
    padding-top: .9rem;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    background-size: contain;
    .img1,.img2{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .img2{
      -webkit-animation: breath 3s infinite ease-in-out alternate;
      animation: breath .25s infinite ease-in-out alternate;
    }
    @-webkit-keyframes breath {
      0% {opacity: .3;}50% {opacity: 1;}to {opacity: .1;}
    }
    @keyframes breath {
      0% {opacity: .3;}50% {opacity: 1;}to {opacity: .1;}
    }
    div {
      background: #E0F0FF;
      border-radius: 10px;
      background-size: 100%;
      width: 1.6rem;
      height: 1.6rem;
      margin: 0.15rem 0.3rem;
      position: relative;
      &:nth-child(2n) {
        margin-right: 0;
        margin-left: 0;
      } 
      &:nth-child(7) {
        // background: #017EfC!important;
        // background-size: 100%!important;
        background: url('../../assets/img/lottery/pane/start.png') center/150% no-repeat!important ;
        // object-fit:cover;
      }
      // &:nth-child(7),
      // &:nth-child(8),
      // &:nth-child(9) {
      //   margin-bottom: 0;
      // } 
      // padding:.29rem .33rem;
      box-sizing: border-box;
      img {
        width: .8rem;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .announce {
    position: relative;
    font-size: 13px;
    color: #fff; 
    background: #252153;
    border-radius: 10px;
    width: 70%;
    margin: 0 auto;
    height: 6.5rem;
    h2 {
      font-size: .5rem;
      text-align: center;
      padding: .4rem 0;
    }
    ol {
      text-align: left;
      margin-left: .3rem;
      li {
        padding: .1rem 0;
        line-height: 18px;
        list-style-type:decimal;
        list-style-position:inside;
      }
    }
    /*侧边线*/
    h2:after, h2:before {
      position: absolute;
      top: 9%;
      background: #ddd;
      content: "";
      height: 2px;
      width: 21%;
    }
    /*调整背景横线的左右距离*/
    h2:before {
      left: .8rem;
    }
    h2:after {
      right: .8rem;
    }
  }
  .prizers {
    height: 6rem;
    width: 70%;
    position: relative;
    margin: 1rem auto 0.5rem;
    .prizeBar {
      height: 0.3rem;
      width: 6.9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .prizer {
      height: 5.5rem;
      margin-bottom: .5rem;
      background-color: #252153;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      // padding: 0.25rem 0.2rem 0.45rem;
      overflow: hidden;
      box-sizing: border-box;
      .prizeIcon {
        text-align: center;
        background: #017EFC;
        color: #fff;
        font-size: .45rem /* 8/16 */;
        height: .5rem;
        padding: .2rem 0;
        // width: 5.8rem;
        // height: 0.6rem;
        // margin-bottom: 0.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      } // .swiper-container {
      .prizerList {
        z-index: 0;
        height: 4.2rem;
        margin: 0 .5rem;
        overflow: hidden; // .swiper-slide {
        li {
          line-height: 0.62rem;
          font-size: 0.3rem;
          margin: .25rem 0;
          color: #fff; // margin-bottom: .2rem;
          overflow: hidden;
          span {
            &:first-child {
              display: block;
              float: left;
              margin-right: 0.63rem;
              width: 1rem;
              text-align: justify; //两端对齐
              text-align-last: justify;
            }
            &:nth-child(2) {
              float: left;
              width: 1.75rem;
            }
            &:last-child {
              float: right; // display: inline-block;
              text-align: right;
              display: -webkit-box;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              width: 2.1rem;
            }
          }
        }
      }
    }
  }
  .info {
    // width:6.9rem;
    // margin: 0 auto;
    .title {
      width: 2.5rem;
      height: 0.48rem;
      position: relative;
      overflow: hidden;
      margin-left: 50%;
      transform: translateX(-50%);
      vertical-align: middle;
      .squire1 {
        float: left;
      }
      .squire2 {
        float: right;
      }
      .squire {
        width: 0.37rem;
        height: 0.48rem;
        img {
          display: inline-block;
          line-height: 0.48rem;
          width: 0.37rem;
          height: 0.08rem;
          vertical-align: middle;
        }
      }
      span {
        display: blcok;
        position: absolute;
        text-align: justify; //两端对齐
        text-align-last: justify;
        width: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.34rem;
        color: #fff;
        font-weight: 700;
        float: left;
        line-height: 0.48rem;
      }
    }
    .infoContent {
      width: 6.9rem;
      height: auto;
      margin: 0.3rem;
      background-color: #62abff;
      padding: 0.3rem 0.2rem;
      box-sizing: border-box;
      ul {
        margin-left: 0.3rem;
        li {
          //  list-style-image: url('../../assets/img/lottery/point.png');
          list-style-type: disc;
          list-style-position: outside;
          font-size: 0.26rem;
          color: #fff;
          text-align: left;
          margin-bottom: 0.5rem;
          position: relative;

          img {
            position: absolute;
            top: 0.15rem;
            left: 0.1rem;
            width: 0.1rem;
            height: 0.1rem;
            float: left;
            margin-right: 0.1rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .massage {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .noPrize {
      width: 5.3rem;
      height: 4.4rem;
      background-color: #fff;
      position: absolute;
      top: 3.2rem;
      left: 1.1rem;
      border-radius: 0.4rem;
      .close {
        position: absolute;
        width: 0.51rem;
        height: 0.51rem;
        top: -0.8rem;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 0.3rem;
        color: #707070;
        margin: 0.38rem auto 0.2rem;
        text-align: center;
      }
      .xiaofu {
        width: 1.7rem;
        height: 1.7rem;
        border-radius: 100%;
        margin: 0 auto 0.3rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .btn {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("~@/assets/img/lottery/btn.png") 0 0 no-repeat;
        // background-size: 100%;
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
    .haveLottery {
      width: 5.3rem;
      height: 4.4rem;
      background-color: #fff;
      position: absolute;
      top: 3.2rem;
      left: 1.1rem;
      border-radius: 0.4rem;
      .close {
        position: absolute;
        width: 0.51rem;
        height: 0.51rem;
        top: -0.8rem;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .xiaofu {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.3rem auto 0.2rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      p {
        font-size: 0.3rem;
        color: #707070;
        margin: 0.21rem auto 0.37rem;
        text-align: center;
      }
      .btn {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;

        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
    .circleLight {
      width: 9.22rem;
      height: 9.22rem;
      position: absolute;
      top: 0.8rem;
      left: 50%;
      margin-left: -4.61rem;
      -webkit-animation: rotate 20s infinite linear;
      animation: rotate 20s infinite linear;
      transform-origin: 50% 50%;
    }
    @-webkit-keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .havePrize {
      width: 5.3rem; // height: 6.1rem;
      padding-bottom: 0.5rem;
      border-radius: 0.4rem;
      position: absolute;
      top: 2.42rem;
      left: 1.1rem;
      background: #fff url('../../assets/img/lottery/prizinig.png') no-repeat;
      background-position: top center;
      background-size: 5.3rem 1.42rem;
      .oneBar {
        width: 1.18rem;
        height: 0.46rem;
        position: absolute;
        top: -0.1rem;
        right: 1.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        padding: 0 0.1rem;
        font-size: 0.3rem;
        color: #707070;
        font-weight: 600;
        margin: 1.72rem auto 0.2rem;
        text-align: center;
      }
      .proImg {
        width: 4.1rem;
        height: 2rem;
        margin: 0 auto 0.36rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .btn {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;
        text-align: center;
        a {
          font-size: 0.36rem;
          color: #fff;
          line-height: 0.9rem;
          text-align: center;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
