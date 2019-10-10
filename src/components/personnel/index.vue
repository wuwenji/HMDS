<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>人员</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item>
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
        </el-form-item>
        <!--<el-form-item class="form-item" label="查询范围" prop="dateType">-->
          <!--<el-select v-model="formData.dateType" placeholder="昨日完成">-->
            <!--&lt;!&ndash;<el-option label="全部" value=""></el-option>&ndash;&gt;-->
            <!--<el-option label="昨日完成" value="1"></el-option>-->
            <!--<el-option label="本周完成" value="2"></el-option>-->
            <!--<el-option label="本月完成" value="3"></el-option>-->
            <!--<el-option label="自定义" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<template v-if="formData.dateType == 0">-->
          <!--<el-form-item class="form-item" label="起始时间">-->
            <!--<el-col>-->
              <!--<el-form-item prop="startTime">-->
                <!--<el-date-picker-->
                  <!--type="date"-->
                  <!--placeholder="选择日期"-->
                  <!--value-format="timestamp"-->
                  <!--v-model="formData.startTime"-->
                  <!--style="width: 100%;"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-form-item>-->
          <!--<el-form-item class="form-item" label="最后时间">-->
            <!--<el-col>-->
              <!--<el-form-item prop="endTime">-->
                <!--<el-date-picker-->
                  <!--type="date"-->
                  <!--placeholder="选择日期"-->
                  <!--value-format="timestamp"-->
                  <!--v-model="formData.endTime"-->
                  <!--style="width: 100%;"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-form-item>-->
        <!--</template>-->
        <el-form-item class="form-item" label="绩效部门" prop="department">
          <el-select v-model="formData.department" placeholder="绩效部门">
            <el-option label="切断部门" :value="1"></el-option>
            <el-option label="加工部门" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="exportDialog = true">导出</el-button>
          <el-button type="primary" plain @click="diaryDialog = true">解除日记</el-button>
          <el-button type="success" plain @click="onSubmit">查询</el-button>
          <el-button plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        v-show="department == 1"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="department"
          width="80"
          label="部门">
          <template slot-scope="scope">
            {{getDepartment(department)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="70"
          label="作业员">
        </el-table-column>
        <el-table-column
          prop="workNumber"
          width="70"
          label="工号">
        </el-table-column>
        <el-table-column
          min-width="350"
          label="总出勤时间(min)">
          <el-table-column
            class-name="padding0"
            label="设备">
            <template slot-scope="scope">
              <table v-if="scope.row.attendanceTimeList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.attendanceTimeList" :key="item + index">
                  <td>{{item.equipmentName}}&nbsp;</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            class-name="padding0"
            label="签到时间">
            <template slot-scope="scope">
              <table v-if="scope.row.attendanceTimeList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.attendanceTimeList" :key="item + index">
                  <td>{{item.startTime}}&nbsp;</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            class-name="padding0"
            label="签退时间">
            <template slot-scope="scope">
              <table v-if="scope.row.attendanceTimeList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.attendanceTimeList" :key="item + index">
                  <td>{{item.endTime}}&nbsp;</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            class-name="padding0"
            label="时间(分)">
            <template slot-scope="scope">
              <table v-if="scope.row.attendanceTimeList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.attendanceTimeList" :key="item + index">
                  <td>{{item.attendanceTime}}&nbsp;</td>
                </tr>
              </table>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          min-width="125"
          label="实际切削时间">
          <el-table-column
            class-name="padding0"
            label="时间(分)">
            <template slot-scope="scope">
              <table v-if="scope.row.workerTimeList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.workerTimeList" :key="item + index">
                  <td>{{item.actualTime}}&nbsp;</td>
                </tr>
              </table>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          min-width="125"
          label="人员稼动">
          <el-table-column
            class-name="padding0"
            label="稼动率">
            <template slot-scope="scope">
              <table v-if="scope.row.workerProductList.length > 0" class="table">
                <tr v-for="(item, index) in scope.row.workerProductList" :key="item + index">
                  <td>{{item.cropMobility}}%</td>
                </tr>
              </table>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="actualCounts"
          align="right"
          width="120"
          label="切断件数(個)">
        </el-table-column>
        <el-table-column
          prop="actualWeight"
          align="right"
          width="80"
          label="重量(kg)">
        </el-table-column>
        <el-table-column
          prop="actualArea"
          align="right"
          width="100"
          label="面积(mm²)">
        </el-table-column>
      </el-table>
      <el-table
        :data="listData"
        v-show="department == 2"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="department"
          width="80"
          label="部门">
          <template slot-scope="scope">
            {{getDepartment(department)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="100"
          label="作业员">
        </el-table-column>
        <el-table-column
          prop="workNumber"
          width="100"
          label="工号">
        </el-table-column>
        <el-table-column
          class-name="padding0"
          min-width="350"
          label="总出勤时间(min)">
          <template slot-scope="scope">
            <table v-if="scope.row.attendanceTimeList.length > 0" class="table">
              <tr>
                <td>设备</td>
                <td>签到时间</td>
                <td>签退时间</td>
                <td>时间(分)</td>
              </tr>
              <tr v-for="(item, index) in scope.row.attendanceTimeList" :key="item + index">
                <td>{{item.equipmentName}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.endTime}}</td>
                <td>{{item.attendanceTime}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          class-name="padding0"
          label="实际加工时间">
          <!--workerTimeList-->
          <template slot-scope="scope">
            <table v-if="scope.row.workerTimeList.length > 0" class="table">
              <tr>
                <td>时间(分)</td>
              </tr>
              <tr v-for="(item, index) in scope.row.workerTimeList" :key="item + index">
                <td>{{item.actualTime}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          prop="workNumber"
          class-name="padding0"
          label="人员稼动详情">
          <!--workerProductList-->
          <template slot-scope="scope">
            <table v-if="scope.row.workerProductList.length > 0" class="table">
              <tr>
                <td>稼动率</td>
              </tr>
              <tr v-for="(item, index) in scope.row.workerProductList" :key="item + index">
                <td>{{item.cropMobility}}%</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          prop="actualCounts"
          align="right"
          width="120"
          label="加工件数(個)">
        </el-table-column>
        <el-table-column
          prop="actualWeight"
          align="right"
          width="80"
          label="重量(kg)">
        </el-table-column>
        <el-table-column
          prop="actualArea"
          align="right"
          width="100"
          label="面积(mm²)">
        </el-table-column>
        <el-table-column
          prop="inspectTime"
          align="right"
          width="120"
          label="检查时间(min)">
        </el-table-column>
        <el-table-column
          prop="stampingTime"
          align="right"
          width="130"
          label="打钢印时间(min)">
        </el-table-column>
        <el-table-column
          prop="elseTime"
          align="right"
          width="120"
          label="其它工序(min)">
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
      title="解除日记"
      top="10vh"
      width="1400px"
      :visible.sync="diaryDialog">
      <diaryPage/>
    </el-dialog>
    <el-dialog
      width="500px"
      class="export-form"
      title="导出"
      :visible.sync="exportDialog">
      <el-form label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="exportType">
            <el-option label="稼动导出" :value="1"></el-option>
            <el-option label="切削记录导出" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <div style="height: 10px;"></div>
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
import diaryPage from './diary'
import { getExcel } from '../../http'

export default {
  name: 'index',
  data () {
    return {
      type: '1',
      pageNum: 1,
      pageSize: 10,
      diaryDialog: false,
      total: 0,
      departmentShow: 1,
      department: '1',
      listData: [],
      exportDialog: false,
      exportType: 1,
      exoprt: {
        startTime: '',
        endTime: ''
      },
      formData: {
        startTime: '',
        department: 1
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    // 导出
    exportExcel () {
      let nameStr = this.exportType === 1 ? '人员稼动表' : '切断记录导出表'
      let url = this.exportType === 1 ? '/statistics/workerPerformanceStatistics' : '/statistics/workerPerformanceDetail'
      getExcel(url, {
        ...this.exoprt,
        download: 1,
        department: this.formData.department
      }).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = nameStr + '.xls'
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
    // 根据绩效指标返回不同字段值
    actual (row) {
      if (this.type === '1') {
        if (row.actualCounts === null || row.actualCounts === undefined) {
          return '-'
        } else {
          return row.actualCounts + ' 個'
        }
      }
      if (this.type === '2') {
        if (row.actualWeight === null || row.actualWeight === undefined) {
          return '-'
        } else {
          return row.actualWeight + ' kg'
        }
      }
      if (this.type === '3') {
        if (row.actualArea === null || row.actualArea === undefined) {
          return '-'
        } else {
          return row.actualArea + ' mm²'
        }
      }
      if (this.type === '4') {
        if (row.actualTime === null || row.actualTime === undefined) {
          return '-'
        } else {
          return row.actualTime + ' 分'
        }
      }
    },
    theor (row) {
      if (this.type === '1') {
        if (row.theoreticalCounts === null || row.theoreticalCounts === undefined) {
          return '-'
        } else {
          return row.theoreticalCounts + ' 個'
        }
      }
      if (this.type === '2') {
        if (row.theoreticalWeigh === null || row.theoreticalWeigh === undefined) {
          return '-'
        } else {
          return row.theoreticalWeigh + ' kg'
        }
      }
      if (this.type === '3') {
        if (row.theoreticalArea === null || row.theoreticalArea === undefined) {
          return '-'
        } else {
          return row.theoreticalArea + ' mm²'
        }
      }
      if (this.type === '4') {
        if (row.theoreticalTime === null || row.theoreticalTime === undefined) {
          return '-'
        } else {
          return row.theoreticalTime + ' 分'
        }
      }
    },
    // 获取部门
    getDepartment (numb) {
      if (numb === 1) return '切断部门'
      if (numb === 2) return '加工部门'
      return ''
    },
    onSubmit () {
      this.formData.pageNum = this.pageNum
      this.formData.pageSize = this.pageSize
      this.http('/statistics/workerPerformanceStatistics', this.formData).then(resp => {
        this.type = this.formData.performanceIndex
        this.department = this.formData.department
        console.log('人员', resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.onSubmit()
    },
    formatter (row) {
      if (row.position === 1) return '副部长'
      if (row.position === 2) return '主任'
      if (row.position === 3) return '副主任'
      if (row.position === 4) return '科长'
      if (row.position === 5) return '技术工程师'
      if (row.position === 6) return '作业班长'
      if (row.position === 7) return '作业员工'
      if (row.position === 8) return '管员'
      if (row.position === 9) return '司机'
      if (row.position === 10) return '文员'
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.onSubmit()
    }
  },
  computed: {
  },
  components: {
    diaryPage
  }
}
</script>

<style scoped>
  .table {
    /*margin: 10px;*/
    width: 100%;
    border: 1px solid #ccc;
  }
  .table td {
    padding: 5px;
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
