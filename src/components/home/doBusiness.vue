<template>
  <div>
    <table class="table" border="1" borderColor="#ddd">
      <tr>
        <td rowspan="4" align="center">
          <b>制造部</b><br/><b>(PCS)</b>
        </td>
        <td><b>时间</b></td>
        <td colspan="2"><b>今天</b></td>
        <td colspan="3"><b>明天</b></td>
        <td colspan="3"><b>后天</b></td>
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
    <drawEchart title="切断部机器负荷表数量(件)" :xAxis="cutEchart.cutCode" :oneData="cutEchart.cutCapacity"/>
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
      tableData: {},
      cutCompletedCount: [],
      title: '切断部机器负荷表',
      cutEchart: {
        cutCode: ['小机器(单重50KG以下)', '中机器(单重50KG~400G以下)', '大机器(单重400KG以上)'],
        cutCapacity: []
      }
    }
  },
  created () {
    this.getTableData()
    this.getCutData()
  },
  mounted () {
  },
  methods: {
    // 切断图表数据
    getCutData () {
      this.http('/show/getCutLoadShowData', {}).then(resp => {
        console.log(resp)
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
    font-size: 17px;
  }
.table {
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
}
.table td {
  padding: 12px 10px;
}
.tr-box {
  height: 20px;
}
.line {
  height: 300px;
}
</style>
