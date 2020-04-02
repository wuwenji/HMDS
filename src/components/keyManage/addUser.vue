<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="labelName"
        label="标签内容"
        :rules="[
      { required: true, message: '标签内容不能为空', trigger: 'blur' },
    ]"
      >
        <el-input maxlength="2" placeholder="最多两个字符" v-model="dynamicValidateForm.labelName"></el-input>
      </el-form-item>
      <el-form-item
        prop="searchKeywords"
        label="标签关键词">
        <el-input placeholder="请用逗号隔开" v-model="dynamicValidateForm.searchKeywords"></el-input>
      </el-form-item>
      <el-form-item
        prop="excludeKeywords"
        label="不显示关键词">
        <el-input placeholder="请用逗号隔开" v-model="dynamicValidateForm.excludeKeywords"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" plain @click="resetForm()">{{returnMesg(checkKeywords)}}</el-button>
        <el-button :disabled="submitFlg" type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  props: ['submitFlg'],
  data () {
    return {
      checkKeywords: 1,
      dynamicValidateForm: {
        labelName: '',
        searchKeywords: '',
        excludeKeywords: '',
        labelType: 2
      }
    }
  },
  created () {
    // console.log(JSON.parse(localStorage.getItem('hmdsUsers')).token)
  },
  watch: {
    submitFlg () {
      if (this.submitFlg && this.checkKeywords === 3) {
        this.checkKeywords = 1
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/label/add', this.dynamicValidateForm).then(resp => {
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
    returnMesg (number) {
      if (number === 1) return '校验关键字'
      if (number === 2) return '校验中...'
      if (number === 3) return '已通过'
    },
    resetForm () {
      this.checkKeywords = 2
      this.http('/label/checkKeywords', this.dynamicValidateForm).then(resp => {
        if (resp.success) {
          this.$emit('update:submitFlg', false)
          this.checkKeywords = 3
        } else {
          this.$message.error(resp.message)
          this.checkKeywords = 1
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
