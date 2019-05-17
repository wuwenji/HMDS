<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="newPassword"
        label="新密码"
        :rules="[
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]"
      >
        <el-input type="password" v-model="dynamicValidateForm.newPassword"></el-input>
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
  name: 'changePassword',
  props: ['editData'],
  data () {
    return {
      dynamicValidateForm: {
        id: '',
        newPassword: ''
      }
    }
  },
  created () {
    this.dynamicValidateForm.id = this.editData.id
  },
  watch: {
    editData () {
      this.dynamicValidateForm.id = this.editData.id
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/sysUser/update', this.dynamicValidateForm).then(resp => {
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
