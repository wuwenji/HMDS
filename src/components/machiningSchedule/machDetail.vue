<template>
  <div>
    <table class="table">
      <tr>
        <td><b>客户：</b></td>
        <td>{{cutDetail.customerName}}</td>
        <td><b>最终客户：</b></td>
        <td>{{cutDetail.finalCustomerName}}</td>
        <td><b>加工类型：</b></td>
        <td>切断&加工</td>
        <td><b>接单时间：</b></td>
        <td>{{$store.getters.getDate(cutDetail.acceptTime)}}</td>
      </tr>
      <tr>
        <td><b>接单号：</b></td>
        <td>{{cutDetail.orderCode}}</td>
        <td><b>营业员：</b></td>
        <td>{{cutDetail.salesName}}</td>
        <td><b>发件人：</b></td>
        <td>{{cutDetail.sender}}</td>
        <td><b>交期时间：</b></td>
        <td>{{$store.getters.getDate(cutDetail.deliveryTime)}}</td>
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
        <!--<th>余材料数量</th>-->
      </tr>
      </thead>
      <tbody v-for="(item, key) in cutDetail.cutMiddleList" :key="key">
        <tr>
          <td rowspan="5">{{key + 1}}</td>
          <td rowspan="5">{{item.material}}</td>
          <td rowspan="5">{{item.cutCode}}</td>
          <td>
            客户要求尺寸<br/>
            <p class="p-spans">
              <span>交期</span>
              <span>单位</span>
              <span>数量</span>
              <span>kg重量</span>
            </p>
            <p class="p-spans">
              {{item.machineTolerance.replace(/\((.+?)\)/g, '')}}
            </p>
            <!--<p style="width: 170px;">{{item.instRemarks1}}</p>-->
            <p>
              <span style="font-size: 10px">{{$store.getters.getDate(cutDetail.deliveryTime)}}</span>
              <span>{{item.unitWtCd == 1? 'KG': '个'}}</span>
              <span>{{item.soQty}}</span>
              <span>{{item.soWt}}</span>
            </p>
          </td>
          <td>
            {{item.counts}}
          </td>
          <td>
            {{$store.getters.getTime(item.startTime)}}
          </td>
          <td>{{$store.getters.getTime(item.endTime)}}</td>
          <td>{{item.totalWeight}}</td>
          <!--<td>{{item.size3}}*{{item.size2}}*{{item.size1}}</td>-->
          <td>{{item.confirmCount}}</td>
          <td>{{item.equipmentName}}</td>
          <td>{{item.workName}}</td>
          <!--<td>是否合格</td>-->
          <td>{{item.status == 0? '未完成': '已完成'}}</td>

        </tr>
        <tr>
          <td>加工工差</td>
          <td>切断指示尺寸</td>
          <td>实际尺寸</td>
          <td>直角度</td>
          <td>平行度</td>
          <td>倒角规格</td>
          <td colspan="2">加工规格</td>
          <td colspan="2">加工指示备注</td>
        </tr>
        <tr>
          <td>
            {{item.machining == null? '': item.machining.machineTolerance}}
          </td>
          <td>
            {{item.instSizeNote}}
          </td>
          <td>{{item.size1}}<template>X{{item.size2}}</template>X{{item.size3}}</td>
          <td>{{item.mRightAngle}}</td>
          <td>{{item.mParallel}}</td>
          <td>{{item.chamferSpec}}</td>
          <td colspan="2">
            {{item.machineSpecCd}}
          </td>
          <td colspan="2">
            {{item.millingRemarks1}}
          </td>
        </tr>
        <tr>
          <td>现在加工设备</td>
          <td>现在加工人员</td>
          <td>加工开始时间</td>
          <td>加工完成时间</td>
          <td>检测完成时间</td>
          <td colspan="2">操作</td>
        </tr>
        <tr>
          <td>
            {{item.machining == null? '': item.machining.equipmentName}}
          </td>
          <td>
            {{item.machining == null? '': item.machining.workName}}
          </td>
          <td>
            {{item.machining == null? '&nbsp;': $store.getters.getTime(item.machining.startTime)}}
          </td>
          <td>
            {{item.machining == null? '&nbsp;': $store.getters.getTime(item.machining.endTime)}}
          </td>
          <td>
            {{item.machining == null? '&nbsp;': $store.getters.getTime(item.machining.endTime)}}
          </td>
          <td colspan="2">
            <el-button
              v-if="item.machining != null"
              size="mini"
              @click="alertDetail(item.id, item.cutCode, item)"
              type="primary">
              详情
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      width="700px"
      title="详情"
      :modal=false
      top="25vh"
      custom-class="dialogCss"
      :visible.sync="dialog">
      <div style="font-weight: bold;">切断：</div>
      <table border="1" class="table">
        <thead>
        <tr>
          <th>切断行号</th>
          <th>作业员</th>
          <th>目前刀数</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>完成尺寸</th>
          <th>重量</th>
        </tr>
        </thead>
        <tbody v-for="(item, key) in listOne" :key="'a' + key">
        <tr v-for="(val, index) in item.cutters" :key="'C' + index">
          <td v-if="index == 0" :rowspan="item.cutters.length">
            <p>{{cutCode + '-' + (key + 1)}}</p>
          </td>
          <td>{{val.userName}}</td>
          <td>{{val.cutterMiddleList.length}}</td>
          <td>{{$store.getters.getDate(val.startTime)}}</td>
          <td>{{$store.getters.getDate(val.endTime)}}</td>
          <!--<td>{{returnPrsent(item.completion1, item.completion2, item.completion3, item.status)}}%</td>-->
          <td>{{item.size1}}X<template v-if="item.size2 > 0">{{item.size2}}X</template>{{item.size3}}</td>
          <td>{{item.actualWeight}}</td>
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
      <div style="margin-top: 20px;font-weight: bold;">加工：
        <span style="float: right;">总数：{{total}}</span>
      </div>
      <table border="1" class="table" width="100%">
        <thead>
        <tr>
          <th>数量</th>
          <th>类型</th>
          <th>人员</th>
          <th>开始时间</th>
          <th>结束时间</th>
        </tr>
        </thead>
        <tbody v-for="(item, numb) in lists" :key="numb">
          <template v-for="(val, valIndex) in item.materialList">
          <tr v-for="(valItem, miKey) in val.machinerList" :key="valIndex + '' + miKey">
            <td v-if="valIndex == 0" :rowspan="item.materialList.length">{{item.totalCount}}{{returnTotal(item.totalCount)}}</td>
            <td v-if="miKey == 0" :rowspan="val.machinerList.length">
              {{val.type == 1? '铣厚度' : ''}}
              {{val.type == 2? '铣长宽' : ''}}
              {{val.type == 3? '研磨' : ''}}
            </td>
            <td>{{valItem.userName}}</td>
            <td>{{$store.getters.getDate(valItem.startTime)}}</td>
            <td>{{$store.getters.getDate(valItem.endTime)}}</td>
          </tr>
          </template>
        <!--<tr v-for="(val, num) in lists" :key="num">-->
          <!--<td>{{item.counts}}{{returnTotal(item.totalCount)}}</td>-->
          <!--<td>{{val.userName}}</td>-->
          <!--<td>-->
            <!--&lt;!&ndash;{{item.materialList[0].type}}&ndash;&gt;-->
            <!--&lt;!&ndash;{{item.materialList.type}}&ndash;&gt;-->
            <!--&lt;!&ndash;{{item.materialList}}&ndash;&gt;-->
            <!--&lt;!&ndash;<div v-if="item.materialList != undefined">&ndash;&gt;-->
              <!--&lt;!&ndash;<p v-if="item.materialList.length > 0">&ndash;&gt;-->
                <!--{{item.type == 1? '铣厚度' : ''}}-->
                <!--{{item.type == 2? '铣长宽' : ''}}-->
                <!--{{item.type == 3? '研磨' : ''}}-->
              <!--&lt;!&ndash;</p>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--</td>-->
          <!--<td width="120">-->
            <!--{{$store.getters.getDate(val.startTime)}}-->
          <!--</td>-->
          <!--<td>{{$store.getters.getDate(val.endTime)}}</td>-->
        <!--</tr>-->
        </tbody>
        <!--<tbody v-for="(item, numb) in lists" :key="numb">-->
          <!--<tr>-->
            <!--<td>1{{cutCode + '-' + (numb + 1)}}</td>-->
            <!--<td>机器：机器</td>-->
            <!--<td>2{{item.auditorName}}</td>-->
            <!--<td>3{{$store.getters.getTime(item.startTime)}} - {{$store.getters.getTime(item.endTime)}}</td>-->
          <!--</tr>-->
          <!--<template v-for="val in 1">-->
            <!--<tr v-for="valCont in 1">-->
              <!--<td colspan="2">4{{getType(val.type)}}</td>-->
              <!--<td>5{{valCont.userName}}</td>-->
              <!--<td>6{{$store.getters.getTime(valCont.startTime)}} - {{$store.getters.getTime(valCont.endTime)}}</td>-->
            <!--</tr>-->
          <!--</template>-->
        <!--</tbody>-->
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
      lists: [{}],
      listOne: [],
      cutCode: '',
      total: 0
    }
  },
  created () {
    // console.log(this.orderInfo.tmpCutId)
    this.getData()
  },
  watch: {
    orderInfo () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.http('/machining/get', this.orderInfo.tmpCutId).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.cutDetail = resp.data
        }
      })
    },
    returnTotal (index) {
      this.total = index
    },
    alertDetail (id, cutCo, item) {
      this.cutCode = cutCo
      // console.log(item)
      this.http('/machining/detail', item.machining.id).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.lists = resp.data
        }
      })
      this.http('/cut/findEntry', id).then(resp => {
        // console.log(resp)
        if (resp.success) {
          this.listOne = resp.data
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
    getType (a) {
      if (a === 1) return '铣厚度'
      if (a === 2) return '铣长宽'
      if (a === 3) return '铣研磨'
      if (a === 4) return '倒角'
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
  .table th {
    padding: 7px 3px;
    background: #e5feff;
  }
  .tableTwo td {
    padding: 3px 0;
  }
  .tableTwo td:nth-child(1) {
    width: 70px;
  }
  .tableTwo td:nth-child(2) {
    width: 120px;
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
