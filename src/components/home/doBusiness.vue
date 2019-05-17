<template>
  <div>
    <table class="table" border="1">
      <tr>
        <td rowspan="4" align="center">
          制<br/>造<br/>部<br/>︵<br/>P<br/>C<br/>S<br/>︶
        </td>
        <td>时间</td>
        <td colspan="2">今天</td>
        <td colspan="3">明天</td>
        <td colspan="3">后天</td>
      </tr>
      <tr>
        <td>能力管理</td>
        <td>接单未完成</td>
        <td>超过能力</td>
        <td>接单能力</td>
        <td>已接单数量</td>
        <td>剩余能力</td>
        <td>接单能力</td>
        <td>已接单数量</td>
        <td>剩余能力</td>
      </tr>
      <tr>
        <td>切断</td>
        <td v-for="(item, index) in tableData.cutList" :key="'cut' + index">{{item}}</td>
      </tr>
      <tr>
        <td>加工</td>
        <td v-for="(item, index) in tableData.machineList" :key="'mac' + index">{{item}}</td>
      </tr>
      <tr class="tr-box">
        <td colspan="10"></td>
      </tr>
      <tr>
        <td rowspan="2" align="center">
          热处理部门<br/>(KG)
        </td>
        <td>QT</td>
        <td v-for="(item, index) in tableData.qtList" :key="'qt' + index">{{item}}</td>
      </tr>
      <tr>
        <td>NVG</td>
        <td v-for="(item, index) in tableData.nvgList" :key="'nvg' + index">{{item}}</td>
      </tr>
    </table>
    <drawEchart title="切断部机器负荷表" type="切断" :xAxis="cutEchart.cutCode" :oneData="cutEchart.cutCapacity" :twoData="cutEchart.cutCompletedCount"/>
    <drawEchart title="加工部机器负荷" type="加工" :xAxis="macEchart.macCode" :oneData="macEchart.macCapacity" :twoData="macEchart.macCompletedCount"/>
  </div>
</template>

<script>
import drawEchart from './lineEchart'
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
        cutCode: [],
        cutCapacity: [],
        cutCompletedCount: []
      },
      macEchart: {
        macCode: [],
        macCapacity: [],
        macCompletedCount: []
      }
    }
  },
  created () {
    this.getTableData()
    this.getCutData()
    this.getMacData()
  },
  mounted () {
  },
  methods: {
    // 切断图表数据
    getCutData () {
      this.http('/show/getCutShowList', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.cutEchart.cutCapacity = []
          this.cutEchart.cutCode = []
          this.cutEchart.cutCompletedCount = []
          resp.data.map(item => {
            this.cutEchart.cutCapacity.push(item.capacity)
            this.cutEchart.cutCode.push(item.code)
            this.cutEchart.cutCompletedCount.push(item.completedCount)
          })
        }
      })
    },
    // 加工图表数据
    getMacData () {
      this.http('/show/getMachiningList', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.macEchart.macCode = []
          this.macEchart.macCapacity = []
          this.macEchart.macCompletedCount = []
          resp.data.map(item => {
            this.macEchart.macCapacity.push(item.capacity)
            this.macEchart.macCode.push(item.code)
            this.macEchart.macCompletedCount.push(item.completedCount)
          })
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
