<template>
  <div class="container">
    <div class="position">
      所在的位置：进度查询 -> <span>热处理进度</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="成绩书号" prop="managementNumber">
          <el-input v-model="formData.managementNumber" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="客户" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="客户"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="入货时间">
          <el-col>
            <el-form-item prop="acceptTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.acceptTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="出货时间">
          <el-col>
            <el-form-item prop="shipmentPlanTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.shipmentPlanTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="预定货期">
          <el-col>
            <el-form-item prop="contDueDate">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.contDueDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="exportTabel">导出</el-button>
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          label="入货时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="managementNumber"
          label="成绩书号"
          width="110">
        </el-table-column>
        <el-table-column
          width="160"
          label="计划货期">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              @change="changeData(scope.row.id, {planTime: scope.row.planTime})"
              value-format="timestamp"
              placeholder="选择日期"
              v-model="scope.row.planTime"
              style="width: 100%;">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="完成状态">
          <template slot-scope="scope">
            {{scope.row.status === 1 ? '已完成' : '未完成'}}
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          label="出货计划日">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              @change="changeData(scope.row.id, {shipmentPlanTime: scope.row.shipmentPlanTime})"
              value-format="timestamp"
              placeholder="选择日期"
              v-model="scope.row.shipmentPlanTime"
              style="width: 100%;">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerName"
          width="250"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="material"
          width="100"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          align="right"
          width="60"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="totalWeight"
          align="right"
          width="60"
          label="重量">
        </el-table-column>
        <el-table-column
          prop="hardnessRequirement"
          width="100"
          label="硬度要求">
        </el-table-column>
        <el-table-column
          prop="specialMatters"
          width="200"
          label="特别事项">
        </el-table-column>
        <el-table-column
          prop="taskName"
          width="150"
          label="作业名">
        </el-table-column>
        <el-table-column
          width="160"
          label="预定入炉时间">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              @change="changeData(scope.row.id, {bookingHeatTime: scope.row.bookingHeatTime})"
              value-format="timestamp"
              placeholder="选择日期"
              v-model="scope.row.bookingHeatTime"
              style="width: 100%;">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          label="预定货期">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              @change="changeData(scope.row.id, {contDueDate: scope.row.contDueDate})"
              value-format="timestamp"
              placeholder="选择日期"
              v-model="scope.row.contDueDate"
              style="width: 100%;">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="冷却方法">
          <template slot-scope="scope">
            <input @blur="changeData(scope.row.id, {coolingMethod: scope.row.coolingMethod})" v-model="scope.row.coolingMethod" type="text" class="table-input">
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="入炉日期">
          <template v-if="scope.row.mapList.length > 0" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[0].startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="完成状态">
          <template slot-scope="scope">
            {{scope.row.status === 1 ? '已完成' : '未完成'}}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="纳期延迟原因">
          <template slot-scope="scope">
            <input @blur="changeData(scope.row.id, {delayReasons: scope.row.delayReasons})" v-model="scope.row.delayReasons" type="text" class="table-input">
          </template>
        </el-table-column>
        <el-table-column
          prop="delayDays"
          width="100"
          label="延迟天数">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 0">
              {{scope.row.mapList[scope.row.mapList.length - 1].heatName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="cutFun(scope.$index, scope.row, '详情')">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <!--导出-->
      <el-table
        id="out-table"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;display: none;">
        <el-table-column
          label="入货时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="managementNumber"
          label="成绩书号"
          width="110">
        </el-table-column>
        <el-table-column
          width="160"
          label="计划货期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.planTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="完成状态">
          <template slot-scope="scope">
            {{scope.row.status === 1 ? '已完成' : '未完成'}}
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          label="出货计划日">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.shipmentPlanTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="customerName"
          width="250"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="material"
          width="100"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          align="right"
          width="60"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="totalWeight"
          align="right"
          width="60"
          label="重量">
        </el-table-column>
        <el-table-column
          prop="hardnessRequirement"
          width="100"
          label="硬度要求">
        </el-table-column>
        <el-table-column
          prop="specialMatters"
          width="200"
          label="特别事项">
        </el-table-column>
        <el-table-column
          prop="taskName"
          width="150"
          label="作业名">
        </el-table-column>
        <el-table-column
          width="160"
          label="预定入炉时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.bookingHeatTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          label="预定货期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="coolingMethod"
          width="100"
          label="冷却方法">
        </el-table-column>
        <el-table-column
          width="100"
          label="入炉日期">
          <template v-if="scope.row.mapList.length > 0" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[0].startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="delayReasons"
          width="200"
          label="纳期延迟原因">
        </el-table-column>
        <el-table-column
          prop="delayDays"
          width="100"
          label="延迟天数">
        </el-table-column>
        <el-table-column
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 0">
              {{scope.row.mapList[scope.row.mapList.length - 1].heatName}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      width="700px"
      :title="title"
      :visible.sync="dialog">
      <machDetail v-if="dialog" :orderInfo="sendDate"/>
    </el-dialog>
  </div>
</template>

<script>
import machDetail from './machDetail'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'index',
  data () {
    return {
      johnTab: 0,
      pageSize: 10,
      title: '设置',
      pageNum: 1,
      total: 0,
      dialog: false,
      sendDate: '',
      formData: {
        managementNumber: '',
        acceptTime: '',
        contDueDate: '',
        customerName: ''
      },
      listData: []
    }
  },
  created () {
    this.getData(1, 10)
  },
  methods: {
    // 修改属性
    changeData (id, obj) {
      this.http('/heatTreatment/update', {
        id,
        ...obj
      }).then(resp => {
        console.log('修改成功！')
      })
    },
    // 导出
    exportTabel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout],
          { type: 'application/octet-stream' }), '热处理进度.xls')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    getData (pageNum, pageSize) {
      this.http('/heat/findHeatRecordList', {
        pageNum,
        pageSize
      }).then(resp => {
        console.log('热处理列表', resp)
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    onSubmit (pageSize, pageNum) {
      this.formData.pageNum = pageNum
      this.formData.pageSize = pageSize
      this.http('/heat/findHeatRecordList', this.formData).then(resp => {
        if (resp.success) {
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    progress (a, b, c, d) {
      let num = parseInt(a / (b - c) * 100)
      if (b > c) {
        if (num === 100) {
          if (d === 0) {
            return 99
          } else {
            return 100
          }
        } else {
          return num
        }
      } else {
        if (d === 0) {
          return 99
        } else {
          return 100
        }
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    cutFun (index, row, item) {
      // console.log(index, row)
      this.title = item
      this.sendDate = row
      this.dialog = true
    },
    addFun (index, row) {
      console.log(index, row)
    }
  },
  computed: {
  },
  components: {
    machDetail
  }
}
</script>

<style scoped>
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
  }
  .table-input {
    border: none;
    background: none;
  }
  .position span {
    color: #409EFF;
  }
  .form {
    border:1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  .data-list {
    margin: 10px;
  }
  .form-item {
    width:220px;
  }
  .btns {
    float: right;
  }
  .block {
    text-align: right;
    padding: 20px 10px;
    background: #efefef;
    border: 1px solid #ddd;
    border-top: none;
  }
  .data-list {
    height: calc(100% - 130px);
  }
</style>
