<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <table class="table">
        <tr>
          <td><span class="required">*</span>设备名：</td>
          <td>
            <el-input v-model="dynamicValidateForm.name"></el-input>
          </td>
          <td><span class="required">*</span>部门：</td>
          <td>
            <el-select v-model="dynamicValidateForm.type" placeholder="请选择部门">
              <el-option label="切断部门" value="1"></el-option>
              <el-option label="加工部门" value="2"></el-option>
              <el-option label="热处理部门" value="3"></el-option>
            </el-select>
          </td>
          <td><span class="required">*</span>工厂编号：</td>
          <td>
            <el-input v-model="dynamicValidateForm.code"></el-input>
          </td>
        </tr>
        <tr>
          <td>型号规格：</td>
          <td>
            <el-input v-model="dynamicValidateForm.model"></el-input>
          </td>
          <td><span class="required">*</span>状态：</td>
          <td>
            <el-select v-model="dynamicValidateForm.status" placeholder="请选择状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="故障" value="1"></el-option>
              <el-option label="报废" value="2"></el-option>
            </el-select>
          </td>
          <td>刀盘直径：</td>
          <td>
            <el-input type="number" v-model.number="dynamicValidateForm.cutterDiameter"></el-input>
          </td>
        </tr>
        <tr>
          <td>加工能力：</td>
          <td>
            <el-input v-model="dynamicValidateForm.ability"></el-input>
          </td>
          <td>购买时间：</td>
          <td>
            <el-input v-model="dynamicValidateForm.buyingTime"></el-input>
          </td>
          <td>日生产能力：</td>
          <td>
            <el-input type="number" v-model.number="dynamicValidateForm.capacity"></el-input>
          </td>
        </tr>
        <tr>
          <td>使用温度：</td>
          <td>
            <el-input v-model="dynamicValidateForm.serviceTemperature"></el-input>
          </td>
          <td>炉内尺寸：</td>
          <td>
            <el-input v-model="dynamicValidateForm.size1"></el-input>
          </td>
          <td>有效加热带：</td>
          <td>
            <el-input v-model="dynamicValidateForm.effectiveRange"></el-input>
          </td>
        </tr>
        <tr>
          <td>功率：</td>
          <td>
            <el-input type="number" v-model.number="dynamicValidateForm.kw"></el-input>
          </td>
          <td>用途：</td>
          <td>
            <el-input v-model="dynamicValidateForm.purpose"></el-input>
          </td>
          <td>温度均一性：</td>
          <td>
            <el-input v-model="dynamicValidateForm.temperatureRange"></el-input>
          </td>
        </tr>
        <tr>
          <td>型式：</td>
          <td>
            <el-input v-model="dynamicValidateForm.pattern"></el-input>
          </td>
          <td>备注：</td>
          <td>
            <el-input v-model="dynamicValidateForm.remark"></el-input>
          </td>
          <td>可处理种类：</td>
          <td>
            <el-input v-model="dynamicValidateForm.heatProcessType"></el-input>
          </td>
        </tr>
        <tr>
          <td>生产厂家：</td>
          <td>
            <el-input v-model="dynamicValidateForm.manufacturer"></el-input>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="center">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">添加</el-button>
        <!--<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>-->
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
      dynamicValidateForm: {
        // id: '',
        corpCd: 833042,
        serviceCd: 100,
        name: '',
        type: '',
        code: '',
        model: '',
        status: '',
        cutterDiameter: 0,
        ability: '',
        buyingTime: '',
        capacity: 0,
        serviceTemperature: '',
        size1: '',
        effectiveRange: '',
        kw: 0,
        purpose: '',
        temperatureRange: '',
        pattern: '',
        remark: '',
        heatProcessType: '',
        manufacturer: ''
      }
    }
  },
  created () {
    // console.log(JSON.parse(localStorage.getItem('hmdsUsers')).token)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/equipment/add', this.dynamicValidateForm).then(resp => {
            console.log(resp)
            if (resp.success) {
              this.$message({
                message: '添加成功',
                duration: 1000,
                type: 'success'
              })
              setTimeout(() => {
                this.$parent.$parent.elDialog = false
                this.$parent.$parent.getList(10, 1)
              }, 1000)
            } else {
              this.$message.error(resp.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 验证输入为数字
    checkNum (rule, value, callback) {
      if (!/^[0-9]*$/.test(value)) {
        callback(new Error('只能填数字'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style scoped>
  .center {
    text-align: center;
    margin-top: 10px;
  }
  .table td {
    padding: 10px 0;
  }
  .table td:nth-child(odd){
    width: 90px;
    padding-right: 5px;
    text-align: right;
  }
  .required {
    color: red;
  }
</style>
