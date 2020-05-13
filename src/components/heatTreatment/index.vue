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
        <el-form-item class="form-item" label="标准货期">
          <el-col>
            <el-form-item prop="planTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.planTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="完成状态">
          <el-col>
            <el-form-item prop="status">
              <el-select v-model="formData.status">
                <el-option label="全部" value=""></el-option>
                <el-option label="未开始" value="1"></el-option>
                <el-option label="未完成" value="2"></el-option>
                <el-option label="外发中" value="3"></el-option>
                <el-option label="已完成" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="客户" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="客户"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="入炉日期">
          <el-col>
            <el-form-item prop="tempStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.tempStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!--<div class="cl" style="margin-top: 5px;"></div>-->
        <el-form-item class="form-item" label="入货时间">
          <el-col>
            <el-form-item prop="acceptTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.acceptTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="计划日">
          <el-col>
            <el-form-item prop="shipmentPlanTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.shipmentPlanTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="出货时间">
          <el-col>
            <el-form-item prop="shipmentTime">
              <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="formData.shipmentTime" style="width: 100%;"></el-date-picker>
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
        <el-form-item class="form-item" label="延迟天数">
          <el-col>
            <el-form-item prop="delayDays">
              <el-select v-model="formData.delayDays">
                <el-option label="全部" value=""></el-option>
                <el-option label="有" value="1"></el-option>
                <el-option label="没有" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="使用炉">
          <el-col>
            <el-form-item prop="equipmentName">
              <el-select v-model="formData.equipmentName">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in equipmentNames" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="exportDialog = true">导出</el-button>
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
          prop="orderCode"
          label="接单号"
          width="110">
        </el-table-column>
        <el-table-column
          width="160"
          label="标准货期">
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
            {{getStatus(scope.row)}}
            <!--{{scope.row.status === '1' ? '已完成' : '未完成'}}-->
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
          width="100"
          label="类型">
          <template v-if="scope.row.mapList.length > 0" slot-scope="scope">
            {{scope.row.mapList[0].heatName}}
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
          label="出炉日期">
          <template v-if="scope.row.mapList.length > 0" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[0].endTime, 2)}}
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
          prop="totalCount"
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 0">
              {{scope.row.mapList[0].equipmentName}}
            </span>
          </template>
        </el-table-column>
        <!--第二组-->
        <el-table-column
          width="100"
          label="类型">
          <template v-if="scope.row.mapList.length > 1" slot-scope="scope">
            {{scope.row.mapList[1].heatName}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="入炉日期">
          <template v-if="scope.row.mapList.length > 1" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[1].startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="出炉日期">
          <template v-if="scope.row.mapList.length > 1" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[1].endTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 1">
              {{scope.row.mapList[1].equipmentName}}
            </span>
          </template>
        </el-table-column>
        <!--第三组-->
        <el-table-column
          width="100"
          label="类型">
          <template v-if="scope.row.mapList.length > 2" slot-scope="scope">
            {{scope.row.mapList[2].heatName}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="入炉日期">
          <template v-if="scope.row.mapList.length > 2" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[2].startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="出炉日期">
          <template v-if="scope.row.mapList.length > 2" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[2].endTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 2">
              {{scope.row.mapList[2].equipmentName}}
            </span>
          </template>
        </el-table-column>
        <!--第四组-->
        <el-table-column
          width="100"
          label="类型">
          <template v-if="scope.row.mapList.length > 3" slot-scope="scope">
            {{scope.row.mapList[3].heatName}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="入炉日期">
          <template v-if="scope.row.mapList.length > 3" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[3].startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="出炉日期">
          <template v-if="scope.row.mapList.length > 3" slot-scope="scope">
            {{$store.getters.getDate(scope.row.mapList[3].endTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="使用炉">
          <template slot-scope="scope">
            <span v-if="scope.row.mapList.length > 3">
              {{scope.row.mapList[3].equipmentName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipmentTime"
          width="100"
          label="出货时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.shipmentTime, 2)}}
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
    </div>
    <el-dialog
      width="500px"
      title="导出"
      :visible.sync="exportDialog">
      <el-form label-width="80px">
        <el-form-item label="入货时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="exoprt.tempStartTime"
              value-format="timestamp"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col :span="2" class="line" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="exoprt.tempEndTime"
              value-format="timestamp"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div style="margin-top: 20px; text-align: center; margin-right: 78px;">
            <el-button @click="exportTabel" type="primary">
              导出
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import { getExcel } from '../../http'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  name: 'index',
  data () {
    return {
      johnTab: 0,
      pageSize: 10,
      title: '设置',
      pageNum: 1,
      total: 0,
      exportDialog: false,
      dialog: false,
      equipmentNames: [],
      sendDate: '',
      exoprt: {
        tempStartTime: '',
        tempEndTime: '',
        isDownload: 1
      },
      formData: {
        managementNumber: '',
        acceptTime: '',
        contDueDate: '',
        customerName: '',
        planTime: '',
        shipmentPlanTime: '',
        delayDays: '',
        tempStr: '',
        equipmentName: ''
      },
      listData: []
    }
  },
  created () {
    this.getData(1, 10)
    this.getEquipmentName()
  },
  methods: {
    // 获取使用炉列表
    getEquipmentName () {
      this.http('/equipment/list', {
        pageSize: 9999,
        pageNum: 1,
        type: 3
      }).then(resp => {
        if (resp.success) {
          this.equipmentNames = []
          resp.data.list.map(item => {
            this.equipmentNames.push(item.code)
          })
        } else {
          console.log(resp)
        }
      })
    },
    // 返回状态
    getStatus (row) {
      // return row.outwardStatus === ''
      console.log(row.outwardStatus, row.status)
      if (row.outwardStatus === null) {
        if (row.status === '1') {
          return '已完成'
        } else {
          if (row.mapList.length < 1) {
            return '未开始'
          } else {
            return '未完成'
          }
        }
      } else {
        if (row.outwardStatus === 1) {
          return '已完成'
        } else {
          return '外发中'
        }
      }
    },
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
      getExcel('/heat/findHeatRecordList', this.exoprt).then(res => {
        const blob = new Blob([res])
        const fileName = '热处理进度.xls'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
      // var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // try {
      //   FileSaver.saveAs(new Blob([wbout],
      //     { type: 'application/octet-stream' }), '热处理进度.xls')
      // } catch (e) {
      //   if (typeof console !== 'undefined') console.log(e, wbout)
      // }
      // return wbout
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
    padding: 10px 10px 0px 10px;
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
    height: calc(100% - 180px);
  }
  .el-form-item::after {
    clear: both;
    margin-bottom: 5px;

  }
</style>
