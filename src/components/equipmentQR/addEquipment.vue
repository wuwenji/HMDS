<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="id"
        label="设备编号"
        :rules="[
      { required: true, message: '设备编号不能为空', trigger: 'blur' },
      { validator: checkNum, trigger: 'blur'}
    ]"
      >
        <el-input v-model="dynamicValidateForm.id"></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="设备名"
        :rules="[
      { required: true, message: '设备名不能为空', trigger: 'blur' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="type"
        label="部门"
        :rules="[
      { required: true, message: '请选择部门', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.type" placeholder="请选择部门">
          <el-option label="切断部门" value="1"></el-option>
          <el-option label="加工部门" value="2"></el-option>
          <el-option label="热处理部门" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="code"
        label="工厂编号"
      >
        <el-input v-model="dynamicValidateForm.code"></el-input>
      </el-form-item>
      <el-form-item
        prop="manufacturer"
        label="生产厂家"
        :rules="[
      { required: true, message: '生产厂家不能为空', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.manufacturer"></el-input>
      </el-form-item>
      <el-form-item
        prop="model"
        label="型号规格"
      >
        <el-input v-model="dynamicValidateForm.model"></el-input>
      </el-form-item>
      <el-form-item
        prop="status"
        label="状态"
        :rules="[
      { required: true, message: '请选择部门', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.status" placeholder="请选择状态">
          <el-option label="正常" value="0"></el-option>
          <el-option label="故障" value="1"></el-option>
          <el-option label="报废" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left: 60px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">添加</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
      dynamicValidateForm: {
        id: '',
        name: '',
        type: '',
        code: '',
        manufacturer: '',
        model: '',
        status: ''
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
        callback(new Error('只能填数字'));
      } else {
        callback();
      }
    }
  }
}
</script>

<style scoped>

</style>
