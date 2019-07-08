<template>
  <div class="container">
    <div class="tab">
      <ul>
        <li :class="{active: showCommd == 0}" @click="showCommd = 0">营业部</li>
        <li :class="{active: showCommd == 1}" @click="showCommd = 1">切断部</li>
        <li :class="{active: showCommd == 2}" @click="showCommd = 2">加工部</li>
        <li :class="{active: showCommd == 3}" @click="showCommd = 3">热处理</li>
        <li :class="{active: showCommd == 4}" @click="showCommd = 4">生产管理</li>
      </ul>
    </div>
    <a @click="showCreen" class="all-scrn">全屏</a>
    <div style="margin: 0 10px;">
      <doBusiness :class="{'send-screen': allScreen == 1}" v-if="showCommd == 0"/>
      <cutCommod :class="{'send-screen': allScreen == 1}" v-if="showCommd == 1"/>
      <manufacture :class="{'send-screen': allScreen == 1}" v-if="showCommd == 2"/>
      <heatTreatment :class="{'send-screen': allScreen == 1}" v-if="showCommd == 3"/>
      <prodPage :class="{'send-screen': allScreen == 1}" v-if="showCommd == 4"/>
    </div>
  </div>
</template>

<script>
import doBusiness from '../home/doBusiness'
import manufacture from '../home/manufacture'
import heatTreatment from '../home/heatTreatment'
import cutCommod from '../home/cut'
import prodPage from '../home/production'
export default {
  name: 'index',
  data () {
    return {
      showCommd: 0,
      allScreen: 0,
      fullscreen: false
    }
  },
  mounted () {
    let self = this
    this.$nextTick(function () {
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          if (self.allScreen === 1) {
            self.showScreen()
          }
        }
      })
    })
  },
  methods: {
    // 按ESC键取消全屏
    showScreen () {
      let c = this.showCommd
      this.fullscreen = false
      this.showCommd = 100
      this.allScreen = 0
      setTimeout(() => {
        this.showCommd = c
      }, 0)
    },
    // 全屏
    showCreen () {
      let c = this.showCommd
      this.showCommd = 100
      this.allScreen = 1
      setTimeout(() => {
        this.showCommd = c
      }, 0)
      this.handleFullScreen()
    },
    // 模拟F11
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  },
  components: {
    doBusiness,
    manufacture,
    heatTreatment,
    cutCommod,
    prodPage
  }
}
</script>

<style scoped>
  * {
    font-size: 20px;
  }
  .tab {
    height: 60px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .tab ul {
    width: 770px;
    margin: 0 auto;
  }
  .tab ul li {
    float: left;
    list-style: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 45px;
    background: #7ebce8;
    /*background: -webkit-linear-gradient(#2f94dc, #0070c0);      !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(#2f94dc, #0070c0);              !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(#2f94dc, #0070c0);         !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(#2f94dc, #0070c0);*/
  }
  .tab ul li.active {
    background: #1869a2;
    /*background: -webkit-linear-gradient(#0070c0 , #2f94dc);      !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(#0070c0 , #2f94dc);              !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(#0070c0 , #2f94dc);         !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(#0070c0 , #2f94dc);*/
  }
  .tab ul li:first-child {
    border-radius: 4px 0 0 4px;
  }
  .tab ul li:last-child {
    border-radius: 0 4px 4px 0;
  }
  .all-scrn {
    background: orange;
    color: #fff;
    border-radius: 4px;
    width: 56px;
    text-align: center;
    position: relative;
    top: -20px;
    height: 30px;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }
  .send-screen {
    position: absolute;
    /*width: 1920px;*/
    /*height: 1080px;*/
    top: 0;
    left: 0;
    background: #fff;
    padding: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    overflow: hidden;
  }
</style>
