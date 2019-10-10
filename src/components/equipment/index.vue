<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>设备</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="日期">
          <el-col>
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                v-model="formData.startTime"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="绩效部门" prop="department">
          <el-select v-model="formData.department" placeholder="绩效部门">
            <el-option label="切断部门" value="1"></el-option>
            <el-option label="加工部门" value="2"></el-option>
            <!--<el-option label="热处理部门" value="3"></el-option>-->
          </el-select>
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
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          width="90"
          label="部门">
          <template slot-scope="scope">
            {{getDepart(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="90"
          label="设备名">
        </el-table-column>
        <el-table-column
          width="350"
          class-name="padding0"
          label="切削时间">
          <!--workerProductList-->
          <template slot-scope="scope">
            <table v-if="scope.row.equipmentProductList.length > 0" class="table">
              <tr>
                <td>班次</td>
                <td>时间</td>
              </tr>
              <tr v-for="(item, index) in scope.row.equipmentProductList" :key="item + index">
                <td>{{item.name}}</td>
                <td>{{item.actualTime}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--width="150"-->
          <!--prop="totalMobility"-->
          <!--label="总计切削时间">-->
        <!--</el-table-column>-->
        <el-table-column
          width="150"
          prop="totalMobility"
          label="嫁动率">
          <template slot-scope="scope">
            {{scope.row.totalMobility}}%
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--width="350"-->
          <!--class-name="padding0"-->
          <!--label="稼动率">-->
          <!--&lt;!&ndash;workerProductList&ndash;&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<table v-if="scope.row.equipmentWorkList.length > 0" class="table">-->
              <!--<tr>-->
                <!--<td>班次</td>-->
                <!--<td>稼动率</td>-->
              <!--</tr>-->
              <!--<tr v-for="(item, index) in scope.row.equipmentWorkList" :key="item + index">-->
                <!--<td>{{item.name}}</td>-->
                <!--<td>{{item.cropMobility}}%</td>-->
              <!--</tr>-->
            <!--</table>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          min-width="150"
          class-name="padding0"
          label="待料时间">
          <!--workerProductList-->
          <template slot-scope="scope">
            <table v-if="scope.row.equipmentPendingList.length > 0" class="table">
              <tr>
                <td>班次</td>
                <td>时间(min)</td>
              </tr>
              <tr v-for="(item, index) in scope.row.equipmentPendingList" :key="item + index">
                <td>{{item.name}}</td>
                <td>{{item.actualTime}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          class-name="padding0"
          label="故障时间">
          <!--workerProductList-->
          <template slot-scope="scope">
            <table v-if="scope.row.equipmentFaultList.length > 0" class="table">
              <tr>
                <td>班次</td>
                <td>时间(min)</td>
              </tr>
              <tr v-for="(item, index) in scope.row.equipmentFaultList" :key="item + index">
                <td>{{item.name}}</td>
                <td>{{item.actualTime}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--width="350"-->
          <!--class-name="padding0"-->
          <!--label="参与人员">-->
          <!--&lt;!&ndash;workerProductList&ndash;&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<table v-if="scope.row.participantsList.length > 0" class="table">-->
              <!--<tr>-->
                <!--<td>班次</td>-->
                <!--<td>人员</td>-->
              <!--</tr>-->
              <!--<tr v-for="(item, index) in scope.row.participantsList" :key="item + index">-->
                <!--<td>{{item.name}}</td>-->
                <!--<td>{{item.userName}}</td>-->
              <!--</tr>-->
            <!--</table>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="actualWeight"
          align="right"
          width="100"
          label="重量(kg)">
        </el-table-column>
        <el-table-column
          prop="counts"
          align="right"
          width="100"
          label="件数(個)">
        </el-table-column>
        <el-table-column
          prop="area"
          align="right"
          width="120"
          label="面积(mm²)">
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
              v-model="exoprt.startTime"
              value-format="timestamp"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col :span="2" class="line" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="exoprt.endTime"
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
        startTime: '',
        endTime: ''
      },
      formData: {
        startTime: '',
        department: '1'
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    // 导出
    exportExcel () {
      getExcel('/statistics/equipmentPerformanceStatistics', {
        ...this.exoprt,
        download: 1,
        department: this.formData.department
      }).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = '设备.xls'
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
      this.http('/statistics/equipmentPerformanceStatistics', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 返回部门
    getDepart (num) {
      if (num === 1) return '切断部门'
      if (num === 2) return '加工部门'
      if (num >= 3) return '热处理部门'
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
    height: calc(100% - 130px);
  }
  .export-form .el-select {
    width: 100%;
  }
</style>
