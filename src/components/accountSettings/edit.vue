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
        prop="position"
        label="职位"
        :rules="[
      { required: true, message: '请选择职位', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.position" placeholder="请选择职位">
          <el-option label="总经理" :value="1"></el-option>
          <el-option label="本部长" :value="2"></el-option>
          <el-option label="部长" :value="3"></el-option>
          <el-option label="部长助理" :value="4"></el-option>
          <el-option label="副部长" :value="5"></el-option>
          <el-option label="课长" :value="6"></el-option>
          <el-option label="副课长" :value="7"></el-option>
          <el-option label="主任" :value="8"></el-option>
          <el-option label="副主任" :value="9"></el-option>
          <el-option label="担当" :value="10"></el-option>
          <el-option label="工程师" :value="11"></el-option>
          <el-option label="技术工程师" :value="12"></el-option>
          <el-option label="技术员" :value="13"></el-option>
          <el-option label="文员" :value="14"></el-option>
          <el-option label="营业员" :value="15"></el-option>
          <el-option label="管员" :value="16"></el-option>
        </el-select>
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
        label="邮箱">
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
        email: '',
        position: ''
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
