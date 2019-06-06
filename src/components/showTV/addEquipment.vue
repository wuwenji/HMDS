<template>
  <div>
    <div v-if="type == 0">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic">
        <el-form-item
          prop="name"
          label="标题"
          :rules="[
      { required: true, message: '标题不能为空', trigger: 'blur' }
    ]"
        >
          <el-input v-model="dynamicValidateForm.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="添加日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="dynamicValidateForm.name" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item
          prop="name"
          label="发布日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="dynamicValidateForm.name" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item
          prop="name"
          label="内容">
          <VueEditor v-model="content"/>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="type == 1">

    </div>
    <div v-if="type == 2">

    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'addUser',
  props: ['type'],
  data () {
    return {
      dynamicValidateForm: {
        // id: '',
        name: '',
        type: '',
        code: '',
        manufacturer: '',
        model: '',
        status: ''
      },
      content: ''
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
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped>

</style>
