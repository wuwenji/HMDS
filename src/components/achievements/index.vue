<template>
  <div class="container">
    <div class="position">
      所在的位置：绩效管理 -> <span>生产部门</span>
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
        <!--<el-form-item class="form-item" label="绩效部门" prop="department">-->
          <!--<el-select v-model="formData.department" placeholder="绩效部门">-->
            <!--<el-option label="切断部门" value="1"></el-option>-->
            <!--<el-option label="加工部门" value="2"></el-option>-->
            <!--<el-option label="热处理部门" value="3"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <!--<table border="1" borderColor="#ccc" class="john-table">-->
        <!--<tr>-->
          <!--<td>指标</td>-->
          <!--<td>内部加工(实际计算值)</td>-->
          <!--<td>理论值(系统计算值)</td>-->
          <!--<td v-if="department != 3">外发</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>数量(個)</td>-->
          <!--<td class="john-right" v-for="(item, index) in tableData.counts" :key="'a' + index">{{item}}</td>-->
          <!--<td class="john-right" v-if="department != 3">-</td>-->
          <!--<td class="john-right" v-if="tableData.counts.length < 2">-</td>-->
        <!--</tr>-->
        <!--<tr v-if="department != 3">-->
          <!--<td>表面积(mm²)</td>-->
          <!--<td class="john-right" v-for="(item, index) in tableData.area" :key="'b' + index">{{item}}</td>-->
          <!--<td class="john-right">-</td>-->
          <!--<td class="john-right" v-if="tableData.area.length < 2">-</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>重量（kg）</td>-->
          <!--<td class="john-right" v-for="(item, index) in tableData.weight" :key="'c' + index">{{item}}</td>-->
          <!--<td class="john-right" v-if="department != 3 && tableData.weight.length < 3">-</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>工作时长(分)</td>-->
          <!--<td class="john-right" v-for="(item, index) in tableData.workTime" :key="'c' + index">-->
            <!--{{item}}-->
          <!--</td>-->
          <!--<td class="john-right" v-if="department != 3 && tableData.workTime.length < 3">-</td>-->
        <!--</tr>-->
      <!--</table>-->
      <table border="1" borderColor="#ccc" class="john-table">
        <tr>
          <td>指标</td>
          <td>切断部门实际效率</td>
          <td>切断部门理论数据</td>
          <td>加工部门实际效率</td>
          <td>加工部门理论数据</td>
        </tr>
        <tr>
          <td>数量(個)</td>
          <td class="john-right" v-for="(item, index) in tableData.counts" :key="'a' + index">
            {{item}}
          </td>
          <td class="john-right" v-for="(item, index) in cutMachinData.counts" :key="'aa' + index">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>表面积(mm²)</td>
          <td class="john-right" v-for="(item, index) in tableData.area" :key="'b' + index">
            {{item}}
          </td>
          <td class="john-right" v-for="(item, index) in cutMachinData.area" :key="'bb' + index">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>重量（kg）</td>
          <td class="john-right" v-for="(item, index) in tableData.weight" :key="'c' + index">
            {{item}}
          </td>
          <td class="john-right" v-for="(item, index) in cutMachinData.weight" :key="'cc' + index">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>工作时长(分)</td>
          <td class="john-right" v-for="(item, index) in tableData.workTime" :key="'d' + index">
            {{item}}
          </td>
          <td class="john-right" v-for="(item, index) in cutMachinData.workTime" :key="'dd' + index">
            {{item}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      tableData: {},
      department: '1',
      cutMachinData: {},
      formData: {
        dateType: '1',
        endTime: '',
        startTime: '',
        department: '1'
      }
    }
  },
  created () {
    this.searchData()
  },
  methods: {
    // 初始化数据
    searchData () {
      this.http('/statistics/departmentPerformanceStatistics', {
        ...this.formData,
        department: '1'
      }).then(resp => {
        // 切断
        console.log(resp)
        if (resp.success) {
          this.tableData = resp.data
          let data = this.tableData
          for (let key in data) {
            if (data[key].length >= 2) {
              data[key].length = 2
            } else {
              data[key].push('-')
            }
          }
        }
      })
      this.http('/statistics/departmentPerformanceStatistics', {
        ...this.formData,
        department: '2'
      }).then(resp => {
        // 加工
        console.log(resp)
        if (resp.success) {
          this.cutMachinData = resp.data
          let data = this.cutMachinData
          for (let key in data) {
            if (data[key].length >= 2) {
              data[key].length = 2
            } else {
              data[key].push('-')
            }
          }
        }
      })
    },
    // 搜索数据
    onSubmit () {
      this.department = this.formData.department
      this.searchData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
