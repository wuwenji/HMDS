<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic">
      <el-form-item
        prop="name"
        label="场所名称"
        :rules="[
      { required: true, message: '场所名称不能为空', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <!--<el-form-item-->
        <!--prop="code"-->
        <!--label="代号">-->
        <!--<el-input v-model="dynamicValidateForm.code"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item
        prop="storageType"
        label="类型"
        :rules="[
      { required: true, message: '请选择部门', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.storageType" placeholder="请选择类型">
          <el-option label="地面" value="1"></el-option>
          <el-option label="货架" value="2"></el-option>
          <el-option label="特殊货架" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left: 20px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  props: ['placeInfo'],
  data () {
    return {
      dynamicValidateForm: {
        id: '',
        name: '',
        // code: '',
        storageType: '',
        parentId: 0
      }
    }
  },
  created () {
    this.getData()
  },
  watch: {
    placeInfo () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.dynamicValidateForm.name = this.placeInfo.name
      this.dynamicValidateForm.code = this.placeInfo.code
      this.dynamicValidateForm.id = this.placeInfo.id
      this.dynamicValidateForm.storageType = this.placeInfo.storageType
      console.log(this.dynamicValidateForm)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http('/tStorageLocation/saveOrUpdate', this.dynamicValidateForm).then(resp => {
            if (resp.success) {
              this.$message({
                message: '修改成功',
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
    }
  }
}
</script>

<style scoped>

</style>
