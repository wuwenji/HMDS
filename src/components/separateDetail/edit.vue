<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="searchKeywords"
        label="标签关键词">
        <el-input placeholder="请用英文逗号隔开" v-model="dynamicValidateForm.searchKeywords"></el-input>
      </el-form-item>
      <el-form-item
        prop="excludeKeywords"
        label="不显示关键词">
        <el-input placeholder="请用英文逗号隔开" v-model="dynamicValidateForm.excludeKeywords"></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 60px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  props: ['editData'],
  data () {
    return {
      dynamicValidateForm: {}
    }
  },
  created () {
    this.getUser()
  },
  watch: {
    editData () {
      this.getUser()
    }
  },
  methods: {
    getUser () {
      this.dynamicValidateForm = JSON.parse(JSON.stringify(this.editData))
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/label/update', {
            labelType: 1,
            ...this.dynamicValidateForm
          }).then(resp => {
            if (resp.success) {
              this.$message({
                message: '修改成功',
                duration: 1000,
                type: 'success'
              })
              setTimeout(() => {
                this.resetForm()
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
    resetForm () {
      this.$parent.$parent.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
