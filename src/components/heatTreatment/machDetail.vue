<template>
  <div>
    <table border="1" class="table-list">
      <thead>
      <tr>
        <th>类型</th>
        <th>工作人员</th>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>结果</th>
      </tr>
      </thead>
      <tbody v-for="(item, keys) in lists" :key="keys">
      <tr>
        <td>{{item.type}}</td>
        <td>{{item.workName}}</td>
        <td>{{$store.getters.getTime(item.startTime)}}</td>
        <td>{{$store.getters.getTime(item.endTime)}}</td>
        <td>
          {{returnStatus(item.status)}}
        </td>
      </tr>
      </tbody>
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
    },
    // 返回状态
    returnStatus (a) {
      if (a === 1) return '合格'
      if (a === 2) return '差异合格'
      if (a === 3) return '该流程重做'
      if (a === 4) return '报废'
      if (a === 5) return '存在部份不合格回火'
      return ''
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
