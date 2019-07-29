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
        border
        height="calc(100% - 75px)">
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="managementNumber"
          label="成绩书号">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="material"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          align="right"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="totalWeight"
          align="right"
          label="重量">
        </el-table-column>
        <el-table-column
          label="入炉时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.startTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成日期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.endTime, 2)}}
          </template>
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
        startTime: ''
      }
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    onSubmit () {
      this.formData.pageNum = this.pageNum
      this.formData.pageSize = this.pageSize
      this.http('/statistics/heatPerformanceStatistics', this.formData).then(resp => {
        if (resp.success) {
          console.log('列表', resp)
          this.listData = resp.data.list.list
          this.total = resp.data.list.total
          this.totalWeight = resp.data.allWeight
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
