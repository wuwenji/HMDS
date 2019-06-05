<template>
  <div>
    <table class="table" border="1" borderColor="#ddd">
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
          {{item}}
        </td>
      </tr>
      <tr>
        <td>加工组</td>
        <td class="john-right" v-for="(item, key) in productTable[1]" :key="'b' +key">
          {{item}}
        </td>
      </tr>
      </tbody>
    </table>
    <br/>
    <br/>
    <div class="left-table">
      <table class="table" border="1" borderColor="#ddd">
        <thead>
        <tr>
          <th></th>
          <th colspan="2">当天<br>(日期/星期)</th>
          <th colspan="3">明天(日期/星期)</th>
          <th colspan="3">后天(日期/星期)</th>
          <th colspan="3">第三天(日期/星期)</th>
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
        <tbody>
        <tr>
          <td>VQ1</td>
          <td class="john-right"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>VQ2</td>
          <td class="john-right"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right-table">
        <table class="table" border="1" borderColor="#ddd">
          <tr>
            <th colspan="3">当天<br/>(日期/星期)</th>
          </tr>
          <tr>
            <th>种类</th>
            <th>未处理单数</th>
            <th>未处理重量</th>
          </tr>
          <tr>
            <td>QT</td>
            <td class="john-right">{{qtNvg.QT.notDoneOrderCount}}</td>
            <td class="john-right">{{qtNvg.QT.notDoneWeight}}</td>
          </tr>
          <tr>
            <td>NVG</td>
            <td class="john-right">{{qtNvg.NVG.notDoneOrderCount}}</td>
            <td class="john-right">{{qtNvg.NVG.notDoneWeight}}</td>
          </tr>
        </table>
    </div>
    <div class="cl-nowPic"></div>
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
</template>

<script>
export default {
  name: 'doBusiness',
  data () {
    return {
      widthTd: '',
      qtNvg: {},
      pageNum: 1,
      productTable: [],
      nowPic: ['VQ1', 'VQ2', 'VQ3', '半VQ', 'VD']
    }
  },
  created () {
    this.heatTime()
    this.getQtNvg()
  },
  mounted () {
    this.$nextTick(() => {
      this.widthTd = this.$refs.tdWidth.clientWidth
      console.log(this.widthTd)
    })
  },
  methods: {
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
  padding: 12px 10px;
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
</style>
