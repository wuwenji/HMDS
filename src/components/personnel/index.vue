<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>人员</span>
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
            <el-option label="切断部门" value="1"></el-option>
            <el-option label="加工部门" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="绩效指标" prop="performanceIndex">
          <el-select v-model="formData.performanceIndex" placeholder="绩效指标">
            <el-option label="数量" value="1"></el-option>
            <el-option label="重量" value="2"></el-option>
            <el-option label="表面积" value="3"></el-option>
            <el-option label="工作时长" value="4"></el-option>
            <!--<el-option label="切断理论时长" value="5"></el-option>-->
            <!--<el-option label="加工理论时长" value="6"></el-option>-->
            <!--<el-option label="达成率" value="7"></el-option>-->
            <!--<el-option label="稼动时间" value="8"></el-option>-->
            <!--<el-option label="稼动率" value="9"></el-option>-->
            <!--<el-option label="故障时间" value="10"></el-option>-->
            <!--<el-option label="故障率" value="11"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
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
          prop="department"
          label="部门">
          <template slot-scope="scope">
            {{getDepartment(scope.row.department)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="作业员">
        </el-table-column>
        <el-table-column
          prop="workNumber"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="position"
          :formatter="formatter"
          label="职务">
        </el-table-column>
        <el-table-column
          prop="theoreticalCounts"
          label="理论值">
        </el-table-column>
        <el-table-column
          prop="actualCounts"
          label="实际值">
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
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      listData: [],
      formData: {
        dateType: '1',
        endTime: '',
        startTime: '',
        department: '1',
        performanceIndex: '1',
        equipmentType: '1'
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    // 获取部门
    getDepartment (numb) {
      if (numb === 1) return '切断部门'
      if (numb === 2) return '加工部门'
      return '热处理部门'
    },
    onSubmit () {
      this.formData.pageNum = this.pageNum
      this.formData.pageSize = this.pageSize
      this.http('/statistics/workerPerformanceStatistics', this.formData).then(resp => {
        console.log(1)
        console.log(resp)
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
  }
}
</script>

<style scoped>
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
</style>
