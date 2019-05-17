<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="name"
        label="姓名"
        :rules="[
      { required: true, message: '姓名不能为空', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="position"
        label="职位"
        :rules="[
      { required: true, message: '请选择职位', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.position" placeholder="请选择职位">
          <el-option label="副部长" value="1"></el-option>
          <el-option label="主任" value="2"></el-option>
          <el-option label="副主任" value="3"></el-option>
          <el-option label="科长" value="4"></el-option>
          <el-option label="技术工程师" value="5"></el-option>
          <el-option label="作业班长" value="6"></el-option>
          <el-option label="作业员工" value="7"></el-option>
          <el-option label="管员" value="8"></el-option>
          <el-option label="司机" value="9"></el-option>
          <el-option label="文员" value="10"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="department"
        label="部门"
        :rules="[
      { required: true, message: '请选择部门', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.department" placeholder="请选择职位">
          <el-option label="制造部" value="1"></el-option>
          <el-option label="热处理部" value="2"></el-option>
          <el-option label="加工Gr" value="3"></el-option>
          <el-option label="切断Gr" value="4"></el-option>
          <el-option label="生管Gr" value="5"></el-option>
          <el-option label="作业组" value="6"></el-option>
          <el-option label="仓库" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="technicalGrade"
        label="技能等级"
      >
        <el-input v-model="dynamicValidateForm.technicalGrade"></el-input>
      </el-form-item>
      <el-form-item
        prop="workNumber"
        label="工号"
        :rules="[
      { required: true, message: '工号不能为空', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.workNumber"></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        label="电话"
      >
        <el-input v-model="dynamicValidateForm.phone"></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 60px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
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
        name: '',
        workNumber: '',
        position: '',
        phone: '',
        technicalGrade: '',
        department: ''
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
          this.http('/user/add', this.dynamicValidateForm).then(resp => {
            if (resp.success) {
              this.$message({
                message: '添加成功',
                duration: 1000,
                type: 'success'
              })
              setTimeout(() => {
                this.$parent.$parent.dialog = false
                this.$parent.$parent.getLits(1, 10)
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
    }
  }
}
</script>

<style scoped>

</style>
