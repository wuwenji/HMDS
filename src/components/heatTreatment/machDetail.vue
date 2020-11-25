<template>
  <div>
    <table border="1" class="table-list">
      <thead>
      <tr>
        <th>使用炉</th>
        <th>处理工艺</th>
        <th>处理温度(℃)</th>
        <th>冷却方法</th>
        <th>入炉日期</th>
        <th>出炉日期</th>
        <th>处理用时(分)</th>
      </tr>
      </thead>
      <tbody v-for="(item, keys) in orderInfo.mapList" :key="keys">
      <tr>
        <td>{{item.equipmentName}}</td>
        <td>{{item.heatName}}</td>
        <td>{{item.temperature}}</td>
        <td>{{item.coolingMethod}}</td>
        <td>{{$store.getters.getTime(item.startTime)}}</td>
        <td>
          <template v-if="item.endTime">
            {{$store.getters.getTime(item.endTime)}}
          </template>
        </td>
        <td>{{item.processingTime}}</td>
      </tr>
      </tbody>
      <!--<thead>-->
      <!--<tr>-->
        <!--<th>类型</th>-->
        <!--<th>作业炉</th>-->
        <!--<th>入炉时间</th>-->
        <!--<th>入炉人员</th>-->
        <!--<th>出炉时间</th>-->
        <!--<th>出炉人员</th>-->
        <!--<th>检查结果</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody v-for="(item, keys) in orderInfo.mapList" :key="keys">-->
      <!--<tr>-->
        <!--<td>{{item.heatName}}</td>-->
        <!--<td>{{item.equipmentName}}</td>-->
        <!--<td>{{$store.getters.getTime(item.startTime)}}</td>-->
        <!--<td>{{item.userName1}}</td>-->
        <!--<td>-->
          <!--<template v-if="item.endTime">-->
            <!--{{$store.getters.getTime(item.endTime)}}-->
          <!--</template>-->
        <!--</td>-->
        <!--<td>-->
          <!--{{item.userName2}}-->
        <!--</td>-->
        <!--<td>-->
          <!--{{returnStatus(item.heatStatus)}}-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    </table>
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
    console.log(this.orderInfo)
  },
  methods: {
    // 返回状态
    returnStatus (a) {
      if (a === 1) return '完全合格'
      if (a === 2) return '差异合格'
      if (a === 3) return '部分回火'
      if (a === 4) return '流程重做'
      if (a === 5) return '全部报废'
      return ''
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
