<template>
  <div>
    <div class="carousel">
      <div :style="{opacity: opacOne}" class="carousel-item">
        <br/>
        <br/>
        <table class="table" border="1" borderColor="#000">
          <thead>
          <tr>
            <th rowspan="3"></th>
            <th rowspan="3">当日急件数量</th>
            <th rowspan="3">产能</th>
            <th colspan="4">纳期分布</th>
            <th rowspan="3">当日累计接单</th>
            <th rowspan="3">当日累累计完成</th>
          </tr>
          <tr>
            <th colspan="2">今天</th>
            <th>明天</th>
            <th>后天</th>
          </tr>
          <tr>
            <th>纳期数量</th>
            <th>未完成数量</th>
            <th>纳期数量</th>
            <th>纳期数量</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>切断组</td>
            <td class="john-right" v-for="(item, key) in productTable[0]" :key="'a' +key">
              <!--{{item}}-->
              {{$store.getters.toThousand(item, 3)}}
            </td>
          </tr>
          <tr>
            <td>加工组</td>
            <td class="john-right" v-for="(item, key) in productTable[1]" :key="'b' +key">
              <!--{{item}}-->
              {{$store.getters.toThousand(item, 3)}}
            </td>
          </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <br/>
        <div class="left-table">
          <table class="table" border="1" borderColor="#000">
            <thead>
            <tr>
              <th></th>
              <th colspan="2">当天<br>({{days[0].date}}/{{days[0].week}})</th>
              <th colspan="3">明天<br>({{days[1].date}}/{{days[1].week}})</th>
              <th colspan="3">后天<br>({{days[2].date}}/{{days[2].week}})</th>
              <th colspan="3">第三天<br>({{days[3].date}}/{{days[3].week}})</th>
            </tr>
            <tr>
              <th>炉名</th>
              <th>入炉重量</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
            </tr>
            </thead>
            <tbody class="td-first-left">
            <tr v-for="(item, key) in heatPlan" :key="'VQ1' + key">
              <td v-for="(val, index) in item" :key="key + '' + index"  class="john-right">
                {{$store.getters.toThousand(val, 3)}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="right-table">
          <table class="table" border="1" borderColor="#000">
            <tr>
              <th colspan="3">当天<br/>({{days[0].date}}/{{days[0].week}})</th>
            </tr>
            <tr>
              <th>种类</th>
              <th>未处理单数</th>
              <th>未处理重量</th>
            </tr>
            <tr>
              <td>QT</td>
              <td class="john-right">
                <!--{{qtNvg.QT.notDoneOrderCount}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.QT.notDoneOrderCount), 3)}}
              </td>
              <td class="john-right">
                <!--{{qtNvg.QT.notDoneWeight}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.QT.notDoneWeight), 3)}}
              </td>
            </tr>
            <tr>
              <td>NVG</td>
              <td class="john-right">
                <!--{{qtNvg.NVG.notDoneOrderCount}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.NVG.notDoneOrderCount), 3)}}
              </td>
              <td class="john-right">
                <!--{{qtNvg.NVG.notDoneWeight}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.NVG.notDoneWeight), 3)}}
              </td>
            </tr>
          </table>
        </div>
        <!--<div class="cl-nowPic"></div>-->
      </div>
      <div :style="{opacity: opacTwo}" class="carousel-item">
        <div class="nowPic">
          <table style="table-layout:fixed;" class="table nowPicTable" border="1">
            <tr>
              <td></td>
              <td class="green" ref="tdWidth">平</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td></td>
            </tr>
            <tr>
              <td>时间</td>
              <td v-for="item in 17" :key="'a' + item">{{item + 7}}</td>
              <td v-for="item in 7" :key="'b' + item">{{item}}</td>
              <td>备注</td>
            </tr>
            <tbody class="john-tbody" v-for="(item, index) in nowPic" :key="'tb' + index">
            <tr>
              <td style="position: relative;" rowspan="2">
                {{item.name}}
                <div v-if="isShow(item.startTime, item.endTime)" :style="getStyle(item.startTime, item.endTime)" class="midLine">
                  <img class="line-left" src="../../../static/images/left.png" alt="">
                  <img class="line-right" src="../../../static/images/right.png" alt="">
                </div>
                <div v-if="isShow(item.startTime, item.endTime)"  style="white-space:nowrap;" :style="getStyle(item.startTime, item.endTime)" class="explan">
                  {{item.showStr}}
                </div>
              </td>
              <td style="border-bottom: 1px dashed #000;" v-for="index in 24" :key="index"></td>
              <td rowspan="2">
              </td>
            </tr>
            <tr>
              <td style="border-top: 1px dashed #000;" v-for="index in 24" :key="index"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'doBusiness',
  data () {
    return {
      widthTd: '',
      days: [],
      setInterval: '',
      qtNvg: {
        NVG: {
          notDoneOrderCount: 0,
          notDoneWeight: 0
        },
        QT: {
          notDoneOrderCount: 0,
          notDoneWeight: 0
        }
      },
      heatPlan: [],
      opacOne: 1,
      opacTwo: 0,
      pageNum: 1,
      carouseing: '',
      productTable: [],
      nowPic: ['VQ1', 'VQ2', 'VQ3', '半VQ', 'VD']
    }
  },
  created () {
    this.days = this.getDays(3)
    this.heatTime()
    this.getQtNvg()
    this.getHeatPlanData()
    this.setInterval = setInterval(() => {
      this.days = this.getDays(3)
      this.heatTime()
      this.getQtNvg()
      this.getHeatPlanData()
    }, 600000)
  },
  mounted () {
    this.$nextTick(() => {
      this.widthTd = this.$refs.tdWidth.clientWidth
      console.log(this.widthTd)
    })
    this.carousel()
  },
  beforeDestroy () {
    clearInterval(this.carouseing)
    clearInterval(this.setInterval)
  },
  methods: {
    // 获取日期
    getDays (dayCount) {
      var date = new Date()
      var dates = []
      var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      for (var i = 0; i <= dayCount; i++) {
        var d = null
        var date1 = date.getDate()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        if (date1 < 10) {
          date1 = '0' + date1
        }
        d = date.getFullYear() + '-' + month + '-' + date1
        var weeks = ''
        var day = new Date(d)
        var z = day.getDay()
        weeks = week[z]
        dates.push({
          'date': d,
          'week': weeks
        })
        date.setDate(date.getDate() + 1)
      }
      return dates
    },
    // 轮播
    carousel () {
      this.carouseing = setInterval(() => {
        this.toggleTable()
        this.toggleEchart()
        clearInterval(this.carouseing)
        this.carousel()
      }, 10000)
    },
    // 显隐表格
    toggleTable () {
      if (this.opacOne > 0) {
        let setOne = setInterval(() => {
          if (this.opacOne > 0) {
            this.opacOne -= 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      } else {
        let setOne = setInterval(() => {
          if (this.opacOne < 1) {
            this.opacOne += 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      }
    },
    // 右上角数据表格
    getHeatPlanData () {
      this.http('/show/getHeatPlanData', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.heatPlan = resp.data
        }
      })
    },
    // 显隐图表
    toggleEchart () {
      if (this.opacTwo > 0) {
        let setOne = setInterval(() => {
          if (this.opacTwo > 0) {
            this.opacTwo -= 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      } else {
        let setOne = setInterval(() => {
          if (this.opacTwo < 1) {
            this.opacTwo += 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      }
    },
    // QT、NVG处理
    getQtNvg () {
      this.http('/show/getHeatTotalData', {}).then(resp => {
        if (resp.success) {
          this.qtNvg = resp.data
        }
      })
      this.http('/show/getProduceCutMachiningTable', {}).then(resp => {
        if (resp.success) {
          this.productTable = resp.data
        }
      })
    },
    // 热处理时间表
    heatTime () {
      this.http('/show/getHeatTimeData', {}).then(resp => {
        if (resp.success) {
          console.log(resp)
          // this.nowPic = resp.data
          // let arrt = [
          //   {
          //     endTime: 1559275186,
          //     name: '真空淬火炉',
          //     showStr: '客户：null。材质：null',
          //     startTime: 1559275186
          //   },
          //   {
          //     endTime: null,
          //     name: '真空淬火',
          //     showStr: '客户：null。材质：null',
          //     startTime: 1559275186
          //   }
          // ]
          this.nowPic = resp.data.map(item => {
            if (item.startTime > 0) {
              let sh = new Date(item.startTime).getHours()
              let eh = null
              if (item.endTime > 0) {
                eh = new Date(item.endTime).getHours()
              } else {
                eh = new Date().getHours()
              }
              item.startTime = sh
              item.endTime = eh
            }
            return item
          })
        }
      })
    },
    // 当开始时间为null时，不显示
    isShow (start, end) {
      if (start === null) return false
      return true
    },
    handleCurrentChange (val) {
      console.log(parseInt(`$(val)`))
    },
    getClass (a) {
      if (a === 1) return 'red'
      if (a === 2) return 'blue'
    },
    getStyle (a, b) {
      let c = b - a + 1
      a = a > 7 ? (a - 7) : (a + 17)
      let d = 0
      if (c < 6) {
        d = -7
      } else if (c < 10 && c >= 6) {
        d = -4
      } else if (c < 14 && c >= 10) {
        d = 1
      } else if (c < 18 && c >= 14) {
        d = 4
      } else if (c < 22 && c >= 18) {
        d = 9
      } else if (c >= 22) {
        d = 14
      }

      let left = 'left:' + (a * this.widthTd + 6 + a) + 'px;'
      let width = 'width:' + (c * this.widthTd + d) + 'px;'
      return left + width
    }
  }
}
</script>

<style scoped>
  *{
    font-size: 17px;
  }
  .td-first-left td:first-child {
    text-align: center;
  }
.table {
  text-align: center;
  width: 100%;
}
.title {
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  padding-top: 30px;
}

.table td,.table th {
  padding: 20px 10px;
  font-size: 25px;
  font-weight: bold;
}
  .table th {
    font-size: 20px;
  }
.page {
  text-align: right;
  margin-top: 5px;
}
.line {
  height: 300px;
}
.prog li {
  float: left;
  margin: 0 5px;
  list-style: none;
}
.prog li span {
  width: 30px;
  height: 10px;
  border: 1px solid #0070c0;
  border-radius: 2px;
  display: block;
  background: #efefef
}
.prog li span.red {
  background: #ff0000;
}
.prog li span.blue {
  background: #0070c0;
}
.gaotie,.feiji {
  width: 115px;
  cursor: pointer;
}
.mid-table {
  float: right;
}
.mid-table td{
  padding: 5px;
  color: #0070c0;
}
.left-table {
  width: 70%;
  float: left;
}
.right-table {
  width: calc(30% - 20px);
  margin-left: 20px;
  float: left;
}
.total {
  text-align: right;
  margin-top: 50px;
}
.green {
  background: #00b050;
}
.red {
  background: #ff0000;
}
.cl-nowPic {
  height: 20px;
  clear: both;
}
.total span {
  padding: 4px 20px;
  background: #0070c0;
  color: #fff;
  display: inline-block;
  border-radius: 4px;
}
.nowPicTable td{
  height: 40px;
  padding: 5px 0;
  /*width: calc(100%/26);*/
  /*width: 20px;*/
}
.midLine {
  background: #4a7ebb;
  position: relative;
  height: 2px;
  position: absolute;
  left: 20px;
  top: 17px;
}
.explan {
  background: #fdeada;
  position: absolute;
  left: 20px;
  padding: 4px 0;
  top: 39px;
  color: red;
  border: 1px solid #4a7ebb;
}
.line-left {
  position: absolute;
  left: -6px;
  width: 10px;
  top: -4px;
  height: 10px;
}
.line-right {
  position: absolute;
  right: -6px;
  top: -4px;
  width: 10px;
  height: 10px;
}
  .carousel {
    height: 1050px;
    position: relative;
  }
  .carousel-item {
    height: 1050px;
    position: absolute;
    top: 0;
    width: 100%;
  }
</style>
