<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="userAccount"
        label="用户名"
        :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.userAccount"></el-input>
      </el-form-item>
      <el-form-item
        prop="userName"
        label="姓名"
        :rules="[
      { required: true, message: '姓名不能为空', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.userName"></el-input>
      </el-form-item>
      <el-form-item
        prop="department"
        label="所属部门"
      >
        <el-input v-model="dynamicValidateForm.department"></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        label="电话"
      >
        <el-input v-model="dynamicValidateForm.phone"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 60px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">更新</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'edit',
  props: ['editData'],
  data () {
    return {
      dynamicValidateForm: {
        id: '',
        userAccount: '',
        userName: '',
        department: '',
        phone: '',
        email: ''
      }
    }
  },
  created () {
    this.updata()
  },
  watch: {
    editData () {
      this.updata()
    }
  },
  methods: {
    updata () {
      this.dynamicValidateForm = {
        id: this.editData.id,
        userAccount: this.editData.userAccount,
        userName: this.editData.userName,
        department: this.editData.department,
        phone: this.editData.phone,
        email: this.editData.email
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/sysUser/update', this.dynamicValidateForm).then(resp => {
            console.log(this.dynamicValidateForm.id)
            if (resp.success) {
              this.$message({
                message: '修改成功',
                duration: 1000,
                type: 'success'
              })
              setTimeout(() => {
                this.resetForm()
                this.$parent.$parent.getUsers(1, 10)
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
    resetForm () {
      this.$parent.$parent.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
