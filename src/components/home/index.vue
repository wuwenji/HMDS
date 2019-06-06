<template>
    <div class="container">
      <el-row class="home">
        <el-col :span="12">
          <div class="row-item">
            <div class="title">
              制造部门
            </div>
            <div class="john-row">
              <div class="john-item john-col-m3 john-col-x6">
                <div class="john-content">
                  <p>今日新接<br/>切断订单</p>
                  <p><span>{{todayData[0]}}</span></p>
                </div>
              </div>
              <div class="john-item john-col-m3 john-col-x6">
                <div class="john-content">
                  <p>今日新接切断<br/>&加工订单</p>
                  <p><span>{{todayData[1]}}</span></p>
                </div>
              </div>
              <div class="john-item john-col-m3 john-col-x6">
                <div class="john-content">
                  <p>切断<br/>正在处理</p>
                  <p><span>{{todayData[4]}}</span></p>
                </div>
              </div>
              <div class="john-item john-col-m3 john-col-x6">
                <div class="john-content">
                  <p>切断&加工<br/>正在处理</p>
                  <p><span>{{todayData[5]}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="row-item">
            <div class="title">
              热处理部门
            </div>
            <div class="john-row">
              <div class="john-item john-col-m6 john-col-x12">
                <div class="john-content">
                  <p>今日新接<br/>热处理订单</p>
                  <p><span>{{todayData[2]}}</span></p>
                </div>
              </div>
              <div class="john-item john-col-m6 john-col-x12">
                <div class="john-content">
                  <p>热处理<br/>正在处理</p>
                  <p><span>{{todayData[6]}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="row-item">
            <div class="title">
              外发内容
            </div>
            <div class="john-row">
              <div class="john-item john-col-m6 john-col-x12">
                <div class="john-content">
                  <p><br/>加工外发</p>
                  <p><span>{{todayData[3]}}</span></p>
                </div>
              </div>
              <div class="john-item john-col-m6 john-col-x12">
                <div class="john-content">
                  <p><br/>热处理外发</p>
                  <p><span>{{todayData[7]}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
        <heatTreatment :class="{'send-screen': allScreen == 1}" v-if="showCommd ==3"/>
        <prodPage :class="{'send-screen': allScreen == 1}" v-if="showCommd ==4"/>
      </div>
    </div>
</template>

<script>
import doBusiness from './doBusiness'
import manufacture from './manufacture'
import heatTreatment from './heatTreatment'
import prodPage from './production'
import cutCommod from './cut'
export default {
  name: 'index',
  data () {
    return {
      showCommd: 0,
      allScreen: 0,
      todayData: []
    }
  },
  created () {
    this.aPlus = 5
    this.getToday()
  },
  methods: {
    // 获取今日处理数量
    getToday () {
      this.http('/show/getNowTitleShowData', {}).then(resp => {
        if (resp.success) {
          this.todayData = resp.data
        }
      })
    },
    // 按ESC键取消全屏
    showScreen () {
      let c = this.showCommd
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
.title {
  font-size: 25px;
  margin-top: 10px;
  color: #666;
}
.john-item {
  float: left;
}
  .john-col-x12 {
    width: calc(100% - 20px);
    margin: 10px;
  }
  .john-col-x6 {
    width: calc(50% - 20px);
    margin: 10px;
  }
/*@media (min-width: 1800px) {*/
  /*.john-col-m3 {*/
    /*width: calc(25% - 20px);*/
    /*margin: 10px;*/
  /*}*/
  /*.john-col-m6 {*/
    /*width: calc(50% - 20px);*/
    /*margin: 10px;*/
  /*}*/
/*}*/
/*@media (max-width: 1800px) {*/
  /*.john-col-x12 {*/
    /*width: calc(100% - 20px);*/
    /*margin: 10px;*/
  /*}*/
  /*.john-col-x6 {*/
    /*width: calc(50% - 20px);*/
    /*margin: 10px;*/
  /*}*/
/*}*/
.john-content {
  border: 1px solid #aaa;
  height: 140px;
  background: #efefef;
  font-size: 18px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #666;
}
.john-content span {
  font-size: 35px;
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
  .row-item {
    text-align: center;
    background: #d4eefa;
    border: 1px solid #8ad1f2;
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 20px;
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
