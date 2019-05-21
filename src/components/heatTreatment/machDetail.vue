<template>
  <div>
    <div v-if="showContent == 0">
      <table class="table-list" border="1">
        <thead>
          <tr>
            <th>作业名</th>
            <th>行号</th>
            <th>数量</th>
            <th>尺寸</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(item, key) in newLists" :key="'c' + key">
          <tr v-for="(itemItem, nmb) in item.groupData" :key="key + '-' +nmb">
            <td v-if="nmb == 0" :rowspan="item.groupData.length">{{item.taskName}}</td>
            <td>{{itemItem.heatCode}}</td>
            <td>{{itemItem.counts}}</td>
            <td>{{itemItem.sizeNote}}</td>
            <td v-if="nmb == 0" :rowspan="item.groupData.length">
              <el-button
                size="mini"
                @click="seeDetail(item.id, item.treatmentId)"
                type="primary">查看</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <table class="table">
        <tr>
          <td><b>客户：</b></td>
          <td>{{newData.heat.customerName}}</td>
          <td><b>送货地址：</b></td>
          <td>{{newData.heat.finalCustomerName}}</td>
          <td><b>作业名：</b></td>
          <td>{{newData.heat.taskName}}</td>
          <td><b>接单时间：</b></td>
          <td>{{$store.getters.getDate(newData.heat.acceptTime)}}</td>
        </tr>
        <tr>
          <td><b>接单号：</b></td>
          <td>{{newData.heat.orderCode}}</td>
          <td><b>发件人：</b></td>
          <td>{{newData.heat.sender}}</td>
          <td><b></b></td>
          <td></td>
          <td><b>交期时间：</b></td>
          <td>{{$store.getters.getDate(newData.heat.deliveryTime)}}</td>
        </tr>
      </table>
      <table border="1" class="table-list">
        <thead>
        <tr>
          <th>序号</th>
          <th>钢种</th>
          <th>No</th>
          <th>热处理方式</th>
          <th>品名</th>
          <th>尺寸</th>
          <th>数量</th>
          <th>重量(kg)</th>
          <th>要求硬度</th>
          <th>开始时间</th>
          <th colspan="2">完成时间</th>
        </tr>
        </thead>
        <tbody v-for="(item, key) in newData.list" :key="key">
        <tr>
          <td rowspan="3">{{key + 1}}</td>
          <td rowspan="3">{{item.gradeCd}}</td>
          <td rowspan="3">{{item.heatCode}}</td>
          <td>{{item.taskName}}</td>
          <td>{{item.itemName}}</td>
          <td>{{item.sizeNote}}</td>
          <td>{{item.counts}}</td>
          <td>{{item.wt}}</td>
          <td>{{item.hardnessRequirement}}</td>
          <td>{{$store.getters.getTime(item.startTime)}}</td>
          <td colspan="2">{{$store.getters.getTime(item.endTime)}}</td>
        </tr>
        <tr>
          <td>当前进度</td>
          <td>现在作业炉</td>
          <td>现在作业人员</td>
          <td>入炉时间</td>
          <td>冷却方式</td>
          <td>完成状态</td>
          <td>检查结果</td>
          <td>检测完成时间</td>
          <td>操作</td>
        </tr>
        <tr>
          <td>{{item.type}}</td>
          <td>{{item.equipmentName + item.code}}</td>
          <td>{{item.workName}}</td>
          <td>{{$store.getters.getTime(item.startTime)}}</td>
          <td>{{item.taskName.indexOf('SZ') > -1? '深冷': ''}}</td>
          <td>{{item.status != null? '已完成': '未完成'}}</td>
          <td v-if="item.status != null">{{item.status < 3? '合格': '不合格'}}</td>
          <td v-if="item.status == null"></td>
          <td>{{$store.getters.getTime(item.endTime)}}</td>
          <td>
            <el-button
              size="mini"
              @click="alertDetail(item.id, item.heatCode)"
              type="primary">
              详情
            </el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <p style="text-align: center; margin-top: 20px;">
        <el-button
          @click="showContent = 0"
          type="primary">返回</el-button>
      </p>
      <el-dialog
        width="600px"
        title="详情"
        :modal=false
        top="5vh"
        custom-class="dialogCss"
        :visible.sync="dialog">
        <table border="1" class="tableTwo">
          <tbody v-for="(item, keys) in lists" :key="keys">
          <tr>
            <td colspan="2">作业行号：{{cutCode + '-' + (keys + 1)}} ({{item.counts}})</td>
            <td>类型：QT</td>
            <td>机器：机器</td>
          </tr>
          <template v-for="val in item.heaterList">
            <tr>
              <td>{{val.type}}</td>
              <td>{{val.workName}}</td>
              <td>{{$store.getters.getTime(val.startTime)}}</td>
              <td>{{$store.getters.getTime(val.endTime)}}</td>
            </tr>
            <tr>
              <td>中间检查</td>
              <td>{{val.auditorName}}</td>
              <td>{{$store.getters.getTime(val.endTime)}}</td>
              <td>{{val.status < 2? '合格': '不合格'}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cutDetail',
  props: ['orderInfo'],
  data () {
    return {
      cutDetail: '',
      showContent: 0,
      dialog: false,
      newLists: [],
      newData: '',
      lists: [],
      cutCode: ''
    }
  },
  created () {
    this.getData()
  },
  watch: {
    orderInfo () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.http('/heat/get', this.orderInfo.treatmentId).then(resp => {
        if (resp.success) {
          // console.log(resp)
          this.newLists = resp.data
        }
      })
    },
    alertDetail (id, cutCo) {
      this.cutCode = cutCo
      this.http('/heat/detail', id).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.lists = resp.data.entryList
        }
      })
      this.dialog = true
    },
    returnPrsent (a, b, c, d) {
      if (b === null && c === null && d === 1) {
        return 100
      } else {
        return a
      }
    },
    // 查看单条数据详情
    seeDetail (id, treatmentId) {
      this.http('/heat/getEntryDetail', {
        id,
        treatmentId
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.newData = resp.data
          this.showContent = 1
        }
      })
    }
  }
}
</script>

<style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .table td:nth-child(odd) {
    width:80px;
  }
  .table td:nth-child(even) {
    min-width:80px;
  }
  .table td {
    padding: 7px;
  }
  .table-list {
    border-collapse: collapse;
    width: 100%;
  }
  .table-list td{
    padding: 3px;
  }
  .table-list th {
    padding: 7px 3px;
    background: #e5feff;
  }
  .p-spans span{
    width: 30px;
    display: inline-block;
  }
  .p-spans span:last-child {
    width: 50px;
  }
  .dialogCss {
    box-shadow: 0 0 30px #000;
  }
  .tableTwo {
    width: 100%;
  }
  .tableTwo td {
    padding: 5px;
  }
</style>
