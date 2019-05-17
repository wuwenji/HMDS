<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>设备</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="查询范围" prop="type">
          <el-select v-model="formData.type" placeholder="昨日完成">
            <el-option label="昨日完成" value="0"></el-option>
            <el-option label="本周完成" value="1"></el-option>
            <el-option label="本月完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="起始时间">
          <el-col>
            <el-form-item prop="oneDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.oneDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="最后时间">
          <el-col>
            <el-form-item prop="twoDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.twoDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="绩效部门" prop="type">
          <el-select v-model="formData.type" placeholder="绩效部门">
            <el-option label="制造部门" value="0"></el-option>
            <el-option label="热处理部门" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="绩效指标" prop="type">
          <el-select v-model="formData.type" placeholder="绩效指标">
            <el-option label="制造部门" value="0"></el-option>
            <el-option label="热处理部门" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit">导出</el-button>
          <el-button type="success" plain>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab" style="margin-bottom: 20px;">
      <div style="margin-left: 10px;margin-bottom: 10px;">
        <el-select v-model="formData.type" >
          <el-option label="切断" value="0"></el-option>
          <el-option label="热处理" value="1"></el-option>
        </el-select>
        <el-select v-model="formData.type" >
          <el-option label="移动率(运行率)" value="0"></el-option>
          <el-option label="表面积" value="1"></el-option>
        </el-select>
      </div>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="oneAddress"
          label="设备编号">
        </el-table-column>
        <el-table-column
          prop="twoNumb"
          label="昨日完成">
        </el-table-column>
        <el-table-column
          prop="twoAddress"
          label="本周完成">
        </el-table-column>
        <el-table-column
          prop="oneDate"
          label="本月完成">
        </el-table-column>
        <el-table-column
          prop="oneDate"
          label="自定义">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
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
      currentPage: 1,
      johnTab: 0,
      formData: {
        id: '',
        oneDate: '',
        twoDate: '',
        type: '全部'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    cutFun (index, row) {
      console.log(index, row)
    },
    addFun (index, row) {
      console.log(index, row)
    },
    tabClick (index) {
      this.johnTab = index
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
    height: calc(100% - 180px);
  }
</style>
