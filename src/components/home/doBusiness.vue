<template>
  <div>
    <table class="table" border="1">
      <tr>
        <td rowspan="4" align="center">
          制造部<br/>(PCS)
        </td>
        <td>时间</td>
        <td colspan="2">今天</td>
        <td colspan="3">明天</td>
        <td colspan="3">后天</td>
      </tr>
      <tr>
        <td>能力管理</td>
        <td>接单未完成</td>
        <td>剩余能力</td>
        <td>接单能力</td>
        <td>已接单数量</td>
        <td>剩余能力</td>
        <td>接单能力</td>
        <td>已接单数量</td>
        <td>剩余能力</td>
      </tr>
      <tr>
        <td>切断</td>
        <td align="right" v-for="(item, index) in tableData.cutList" :key="'cut' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr>
        <td>加工</td>
        <td align="right" v-for="(item, index) in tableData.machineList" :key="'mac' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr class="tr-box">
        <td colspan="10"></td>
      </tr>
      <tr>
        <td rowspan="2" align="center">
          热处理部<br/>(KG)
        </td>
        <td>QT</td>
        <td align="right" v-for="(item, index) in tableData.qtList" :key="'qt' + index">{{$store.getters.toThousand(item)}}</td>
      </tr>
      <tr>
        <td>NVG</td>
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
  padding: 6px 10px;
}
.tr-box {
  height: 20px;
}
.line {
  height: 300px;
}
</style>
