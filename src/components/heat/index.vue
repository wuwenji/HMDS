<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>热处理</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="查询范围" prop="dateType">
          <el-select v-model="formData.dateType" placeholder="昨日完成">
            <!--<el-option label="全部" value=""></el-option>-->
            <el-option label="昨日完成" value="1"></el-option>
            <el-option label="本周完成" value="2"></el-option>
            <el-option label="本月完成" value="3"></el-option>
            <el-option label="自定义" value="0"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="formData.dateType == 0">
          <el-form-item class="form-item" label="起始时间">
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
          <el-form-item class="form-item" label="最后时间">
            <el-col>
              <el-form-item prop="endTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="timestamp"
                  v-model="formData.endTime"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </template>
        <el-form-item class="form-item" label="绩效部门" prop="department">
          <el-select v-model="formData.department" placeholder="绩效部门">
            <el-option label="切断部门" :value="1"></el-option>
            <el-option label="加工部门" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="人数" >
          <el-input v-model="humanCounts"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit">查询</el-button>
          <el-button plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p style="margin-left: 15px;">累计重量：<span class="red">{{totalWeight}} (KG)</span>，人均重量：<span class="red">{{averageWeight}} (KG)</span>。</p>
    <div class="data-list">
      <el-table
        :data="listData"
        v-show="department == 1"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="name"
          label="接单日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="成绩单号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="name"
          label="重量">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入炉日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="完成日期">
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
  </div>
</template>

<script>
import diaryPage from './diary'
export default {
  name: 'index',
  data () {
    return {
      type: '1',
      pageNum: 1,
      humanCounts: 1,
      totalWeight: 100,
      pageSize: 10,
      diaryDialog: false,
      total: 0,
      departmentShow: 1,
      department: '1',
      listData: [],
      formData: {
        dateType: '1',
        endTime: '',
        startTime: '',
        department: 1
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
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
    // 求平均重量
    averageWeight () {
      if (parseInt(this.humanCounts) === 0 || this.humanCounts === '') {
        return 0.00
      } else {
        return (this.totalWeight / this.humanCounts).toFixed(2)
      }
    }
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
  .red {
    color: red;
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
    height: calc(100% - 160px);
  }
</style>
