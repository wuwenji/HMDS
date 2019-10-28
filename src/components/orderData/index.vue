<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>接单数据</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单日期">
          <el-date-picker
            type="date"
            placeholder="接单日期"
            value-format="timestamp"
            v-model="formData.soDate"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-item" label="客户名称" prop="contKname">
          <el-input v-model="formData.contKname" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="钢种" prop="gradeCd">
          <el-input v-model="formData.gradeCd" placeholder="钢种"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="接单号" prop="soNo">
          <el-input v-model="formData.soNo" placeholder="接单号"></el-input>
        </el-form-item>
        <div class="cl" style="height: 10px;"></div>
        <el-form-item class="form-item" label="接单类型" prop="workInstCd">
          <el-select
            multiple
            collapse-tags
            v-model="workInstCd">
            <!--<el-option value="" label="全部"></el-option>-->
            <el-option value="1" label="整条"></el-option>
            <el-option value="2" label="切断"></el-option>
            <el-option value="3" label="切断&加工"></el-option>
            <el-option value="5" label="热处理"></el-option>
            <el-option value="6" label="切断&加工&热处理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="加工规格" prop="tempMachineSpecCd">
          <el-input v-model="formData.tempMachineSpecCd" placeholder="加工规格"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="纳期" prop="contDueDate">
          <el-date-picker
            type="date"
            placeholder="纳期"
            value-format="timestamp"
            v-model="formData.contDueDate"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="exportDialog = true">导出</el-button>
          <el-button type="primary" plain @click="onSubmit">查询</el-button>
          <el-button type="success" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          min-width="100"
          label="接单日期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="soNo"
          min-width="100"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contKname"
          min-width="250"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="gradeCd"
          min-width="90"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="workInstCd"
          min-width="90"
          label="接单类型">
          <template slot-scope="scope">
            {{getOrderType(scope.row.workInstCd)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="tempMachineSpecCd"
          min-width="90"
          label="加工规格">
        </el-table-column>
        <el-table-column
          prop="contDueDateStr"
          min-width="100"
          label="纳期">
        </el-table-column>
        <el-table-column
          prop="soQty"
          min-width="70"
          align="right"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="bigMaterial"
          min-width="70"
          align="right"
          label="大料">
        </el-table-column>
        <el-table-column
          prop="quickly"
          min-width="100"
          label="急件">
        </el-table-column>
        <el-table-column
          prop="deliveryStatus"
          min-width="100"
          label="完成状况">
          <!--1.完成   其它不显示-->
          <template slot-scope="scope">
            {{scope.row.deliveryStatus === 1 ? '完成' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="deliveryTimeStr"
          min-width="100"
          label="完成日期">
        </el-table-column>
        <el-table-column
          prop="monthlyCompliance"
          min-width="100"
          label="纳期遵守">
          <!--1是 0否-->
          <template slot-scope="scope">
            {{scope.row.monthlyCompliance === 1 ? '是' : ''}}
            {{scope.row.monthlyCompliance === 0 ? '否' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="cutCount"
          min-width="80"
          align="right"
          label="切断数量">
        </el-table-column>
        <el-table-column
          prop="cutWeight"
          min-width="80"
          align="right"
          label="切断重量">
        </el-table-column>
        <el-table-column
          prop="machineCount"
          min-width="80"
          align="right"
          label="加工数量">
        </el-table-column>
        <el-table-column
          prop="machineWeight"
          min-width="80"
          align="right"
          label="加工重量">
        </el-table-column>
        <el-table-column
          prop="outwardCount"
          min-width="80"
          align="right"
          label="外发数量">
        </el-table-column>
        <el-table-column
          prop="outwardWeight"
          min-width="80"
          align="right"
          label="外发重量">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
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
        <el-form-item label="日期">
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
            <el-button @click="exportExcel" type="primary">
              导出
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getExcel } from '../../http'
export default {
  name: 'index',
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      listData: [],
      exportDialog: false,
      exportType: 1,
      exoprt: {
        tempStartTime: '',
        tempEndTime: '',
        isDownload: 1
      },
      workInstCd: [],
      formData: {
        soDate: '',
        contKname: '',
        gradeCd: '',
        soNo: '',
        tempMachineSpecCd: '',
        contDueDate: ''
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    // 导出
    exportExcel () {
      getExcel('/statistics/orderPerformanceStatistics', {
        ...this.exoprt
      }).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = '接单数据汇总.xls'
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
        } else {
          alert('数据为0，请重新选择日期！')
        }
      })
    },
    // 搜索数据
    onSubmit () {
      this.formData.pageSize = this.pageSize
      this.formData.pageNum = this.pageNum
      let workInstCd = this.workInstCd.join(',')
      this.http('/statistics/orderPerformanceStatistics', {
        ...this.formData,
        workInstCd
      }).then(resp => {
        console.log('接单数据', resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 返回部门
    getOrderType (num) {
      if (num === '1') return '整条'
      if (num === '2') return '切断'
      if (num === '3') return '切断&加工'
      if (num === '5') return '热处理'
      if (num === '6') return '切断&加工&热处理'
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.onSubmit()
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .table {
    margin: 10px;
    width: calc(100% - 20px);
    border: 1px solid #ccc;
  }
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
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
    height: calc(100% - 180px);
  }
  .export-form .el-select {
    width: 100%;
  }
</style>
