<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>设备</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="查询范围" prop="dateType">
          <el-select v-model="formData.dateType" placeholder="昨日完成">
            <!--<el-option label="全部" value=""></el-option>-->
            <el-option label="昨日" value="1"></el-option>
            <el-option label="本周" value="2"></el-option>
            <el-option label="本月" value="3"></el-option>
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
        <el-form-item class="form-item" label="绩效部门" prop="equipmentType">
          <el-select v-model="formData.equipmentType" placeholder="绩效部门">
            <el-option label="切断部门" value="1"></el-option>
            <el-option label="加工部门" value="2"></el-option>
            <el-option label="热处理部门" value="3"></el-option>
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
          label="部门">
          <template slot-scope="scope">
            {{getDepart(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="actualWeight"
          align="right"
          label="重量(kg)">
        </el-table-column>
        <el-table-column
          prop="counts"
          align="right"
          label="数量(個)">
        </el-table-column>
        <el-table-column
          prop="area"
          align="right"
          label="表面积(mm²)">
        </el-table-column>
        <el-table-column
          prop="workTime"
          label="稼动时间(分)">
        </el-table-column>
        <el-table-column
          prop="workPercent"
          align="right"
          label="运行率(%)">
        </el-table-column>
        <el-table-column
          prop="power"
          align="right"
          label="达成率(%)">
        </el-table-column>
        <el-table-column
          prop="failTime"
          label="故障时间(分)">
        </el-table-column>
        <el-table-column
          prop="failPercent"
          align="right"
          label="故障率">
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
      pageSize: 10,
      pageNum: 1,
      total: 0,
      listData: [],
      formData: {
        dateType: '1',
        endTime: '',
        startTime: '',
        equipmentType: '1'
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
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
