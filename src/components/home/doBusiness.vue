<template>
  <div>
    <table class="table" border="1" borderColor="#000">
      <tr>
        <td rowspan="4" align="center">
          <b>制造部</b><br/><b>(PCS)</b>
        </td>
        <td><b>时间</b></td>
        <td style="color:red" colspan="2"><b>今天<br/>({{days[0].date + '/' + days[0].week}})</b></td>
        <td colspan="3"><b>明天<br/>({{days[1].date + '/' + days[1].week}})</b></td>
        <td colspan="3"><b>后天<br/>({{days[2].date + '/' + days[2].week}})</b></td>
      </tr>
      <tr>
        <td><b>能力管理</b></td>
        <td><b>接单未完成</b></td>
        <td><b>剩余能力</b></td>
        <td><b>接单能力</b></td>
        <td><b>已接单数量</b></td>
        <td><b>剩余能力</b></td>
        <td><b>接单能力</b></td>
        <td><b>已接单数量</b></td>
        <td><b>剩余能力</b></td>
      </tr>
      <tr>
        <td><b>切断</b></td>
        <td align="right" v-for="(item, index) in tableData.cutList" :key="'cut' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr>
        <td><b>加工</b></td>
        <td align="right" v-for="(item, index) in tableData.machineList" :key="'mac' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr class="tr-box">
        <td colspan="10"></td>
      </tr>
      <tr>
        <td rowspan="2" align="center">
          <b>热处理部</b><br/><b>(KG)</b>
        </td>
        <td><b>QT</b></td>
        <td align="right" v-for="(item, index) in tableData.qtList" :key="'qt' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr>
        <td><b>NVG</b></td>
        <td align="right" v-for="(item, index) in tableData.nvgList" :key="'nvg' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
    </table>
    <div class="echart-all">
      <div class="echart-left">
        <drawEchart
          title="切断部机器负荷表数量(件)"
          :legend="cutEchart.legend"
          stack="1"
          position="top"
          :color="cutEchart.color"
          :xAxis="cutEchart.cutCode"
          :oneData="cutEchart.cutCapacity"/>
      </div>
      <div class="echart-right">
        <drawEchart
          title="接单未完成数量(件)"
          :legend="cutNotFinished.legend"
          stack="0"
          position="inside"
          :color="cutNotFinished.color"
          :xAxis="cutNotFinished.cutCode"
          :oneData="cutNotFinished.cutCapacity"/>
      </div>
    </div>
  </div>
</template>

<script>
import drawEchart from './cutLine'
export default {
  name: 'doBusiness',
  data () {
    return {
      cutCapacuty: [],
      cutCode: [],
      setInterval: '',
      tableData: {},
      days: [],
      cutCompletedCount: [],
      title: '切断部机器负荷表',
      cutEchart: {
        cutCode: ['小机器(单重50KG以下)', '中机器(单重50KG~400KG)', '大机器(单重400KG以上)'],
        cutCapacity: [],
        legend: ['接单数量', '开始切断数量'],
        color: ['#5b9bd5', '#10dc40']
      },
      cutNotFinished: {
        cutCode: ['今天', '明天', '后天'],
        cutCapacity: [],
        legend: ['切断', '切断加工热处理'],
        color: ['#d6bb3b', '#cb2fba']
      }
    }
  },
  created () {
    this.days = this.getDays(2)
    this.getTableData()
    this.getCutData()
    this.setInterval = setInterval(() => {
      this.days = this.getDays(2)
      this.getTableData()
      this.getCutData()
    }, 600000)
  },
  beforeDestroy () {
    clearInterval(this.setInterval)
  },
  mounted () {
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
    // 切断图表数据
    getCutData () {
      this.http('/show/getCutLoadShowData', {}).then(resp => {
        if (resp.success) {
          this.cutEchart.cutCapacity = resp.data
        }
      })
    },
    // 营业部表格
    getTableData () {
      this.http('/show/getSalesDepartmentShow', {}).then(resp => {
        if (resp.success) {
          this.tableData = resp.data
          this.cutNotFinished.cutCapacity = [resp.data.cutList[0],
            resp.data.machineList[0],
            resp.data.cutList[3],
            resp.data.machineList[3],
            resp.data.cutList[6],
            resp.data.machineList[6]]
        }
      })
    }
  },
  components: {
    drawEchart
  }
}
</script>

<style scoped>
  * {
    /*font-size: 17px;*/
  }
.table {
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
}
.table td {
  padding: 2px 10px;
  font-size: 30px;
  font-weight: bold;
}

.tr-box {
  height: 20px;
}
.line {
  height: 300px;
}
  .echart-left {
    width: 55%;
    float: left;
  }
  .echart-right {
    width: 45%;
    float: right;
  }
</style>
