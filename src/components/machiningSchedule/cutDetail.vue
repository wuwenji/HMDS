<template>
  <div>
    <table class="table">
      <tr>
        <td><b>客户：</b></td>
        <td>{{cutDetail.customerName}}</td>
        <td><b>最终客户：</b></td>
        <td>{{cutDetail.finalCustomerName}}</td>
        <td><b>加工类型：</b></td>
        <td>切断</td>
        <td><b>接单时间：</b></td>
        <td>{{$store.getters.getDate(cutDetail.acceptTime, 2)}}</td>
      </tr>
      <tr>
        <td><b>接单号：</b></td>
        <td>{{cutDetail.orderCode}}</td>
        <td><b>营业员：</b></td>
        <td>{{cutDetail.salesName}}</td>
        <td><b>发件人：</b></td>
        <td>{{cutDetail.sender}}</td>
        <td><b>交期时间：</b></td>
        <td>{{$store.getters.getDate(cutDetail.deliveryTime, 2)}}</td>
      </tr>
    </table>
    <table border="1" class="table-list">
      <thead>
      <tr>
        <th>序号</th>
        <th>钢种</th>
        <th>No</th>
        <th>任务</th>
        <!--<th>库存类别</th>-->
        <!--<th>库存备注</th>-->
        <th>指示数量</th>
        <th>开始时间</th>
        <th>完成时间</th>
        <th>完成重量(kg)</th>
        <!--<th>完成尺寸</th>-->
        <th>已完成数量</th>
        <th>设备名</th>
        <th>人员</th>
        <!--<th>是否合格</th>-->
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tr v-for="(item, key) in cutDetail.cutMiddleList" :key="key">
        <td>{{key + 1}}</td>
        <td>{{item.material}}</td>
        <td>{{item.cutCode}}</td>
        <td>
          客户要求尺寸<br/>
          <p class="p-spans">
            <span>交期</span>
            <span>单位</span>
            <span>数量</span>
            <span>kg重量</span>
          </p>
          <p class="p-spans">
            <!--{{item.machineTolerance.replace(/\((.+?)\)/g, '')}}-->
          </p>
          <!--<p style="width: 170px;">{{item.instRemarks1}}</p>-->
          <p>
            <span style="font-size: 10px">{{$store.getters.getDate(cutDetail.deliveryTime, 2)}}</span>
            <span>{{item.unitWtCd == 1? 'KG': '个'}}</span>
            <span>{{item.soQty}}</span>
            <span>{{item.soWt}}</span>
          </p>
        </td>
        <!--<td>-->
          <!--<p>现品管理</p>-->
          <!--<p>No</p>-->
        <!--</td>-->
        <!--<td>-->
          <!--<p>库存备注</p>-->
          <!--<p>-->
            <!--<span>溶解编号</span>-->
            <!--<span>库存尺寸</span>-->
            <!--<span>切断指示尺寸</span>-->
          <!--</p>-->
        <!--</td>-->
        <td>
          {{item.counts}}
        </td>
        <td>
          {{$store.getters.getDate(item.startTime)}}
        </td>
        <td>{{$store.getters.getDate(item.endTime)}}</td>
        <td>{{item.totalWeight}}</td>
        <!--<td>{{item.size3}}*{{item.size2}}*{{item.size1}}</td>-->
        <td>{{item.confirmCount}}</td>
        <td>{{item.equipmentName}}</td>
        <td>{{item.workName}}</td>
        <!--<td>是否合格</td>-->
        <td>{{item.status == 0? '未完成': '已完成'}}</td>
        <td>
          <el-button
            size="mini"
            @click="alertDetail(item.id, item.cutCode)"
            type="primary">
            详情
          </el-button>
        </td>
      </tr>
    </table>
    <el-dialog
      width="1000px"
      title="详情"
      :modal=false
      top="25vh"
      custom-class="dialogCss"
      :visible.sync="dialog">
      <table border="1" class="table">
        <thead>
          <tr>
            <th>切断行号</th>
            <th>数量</th>
            <th>作业员</th>
            <th>目前刀数</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>总用时(分)</th>
            <th>设备</th>
            <th>完成尺寸</th>
            <th>产品重量</th>
            <!--<th>理论重量</th>-->
          </tr>
        </thead>
        <tbody v-for="(item, key) in lists" :key="'a' + key">
          <tr v-for="(val, index) in item.cutters" :key="'C' + index">
            <td v-if="index == 0" :rowspan="item.cutters.length">
              <p>{{cutCode + '-' + (key + 1)}}</p>
            </td>
            <td>{{item.counts}}</td>
            <td>{{val.userName}}</td>
            <td>{{val.cutterMiddleList.length}}</td>
            <td>{{$store.getters.getDate(val.startTime)}}</td>
            <td>{{$store.getters.getDate(val.endTime)}}</td>
            <td>{{userTime(val.cutterMiddleList)}}</td>
            <td>{{item.equipmentName}}</td>
            <!--<td>{{returnPrsent(item.completion1, item.completion2, item.completion3, item.status)}}%</td>-->
            <td>{{item.size1}}X<template v-if="item.size2 > 0">{{item.size2}}X</template>{{item.size3}}</td>
            <td>{{item.actualWeight}}</td>
            <!--<td>{{item.actualWeight}}</td>-->
          </tr>
        </tbody>
        <!--<tr v-for="(item, key) in lists" :key="'a' + key">-->
          <!--<td>{{item.id}}</td>-->
          <!--<td>{{item.auditorName}}</td>-->
          <!--<td>{{$store.getters.getDate(item.startTime)}}</td>-->
          <!--<td>{{$store.getters.getDate(item.endTime)}}</td>-->
          <!--<td>{{item.completion1}}%</td>-->
        <!--</tr>-->
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'cutDetail',
  props: ['orderInfo'],
  data () {
    return {
      cutDetail: '',
      dialog: false,
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
    // 获取使用时间
    userTime (item) {
      let sum = 0
      item.map(item => {
        sum += item.estimateTime
      })
      return sum
    },
    getData () {
      this.http('/cut/find', this.orderInfo.id).then(resp => {
        if (resp.success) {
          console.log(resp)
          this.cutDetail = resp.data
        }
      })
    },
    alertDetail (id, cutCo) {
      this.cutCode = cutCo
      // console.log(id)
      this.http('/cut/findEntry', id).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.lists = resp.data
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
    /*width:80px;*/
  }
  .table td:nth-child(even) {
    /*min-width:80px;*/
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
  .table th {
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
</style>
