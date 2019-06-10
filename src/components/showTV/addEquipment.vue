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
          label="图片">
          <div class="pic">
            <img :src="imgSrc" alt="">
            <div class="pic-right">
              <span class="el-icon-delete"></span>
              <span class="el-icon-upload">
                <input @change="selectImg($event)" accept="image/jpg, image/jpeg, image/png" class="file" type="file">
              </span>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="type == 2">
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
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'addUser',
  props: ['type'],
  data () {
    return {
      imgSrc: '../../../static/images/suolie.jpg',
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
    // 选中图片
    selectImg (e) {
      console.log(e)
      this.imgSrc = this.getUrl(e.target.files[0])
    },
    // 获取file选中图片路径
    getUrl (value) {
      let url = ''
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(value)
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(value)
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(value)
      }
      return url
    },
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
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped>
.pic {
  position: relative;
}
.pic img {
  border: 1px dashed #ccc;
  width: 130px;
}
.pic-right {
  font-size: 15px;
  width: 15px;
  position: absolute;
  top: 0;
  left: 140px;
}
.pic-right span {
  float: left;
  margin: 3px 0;
  cursor: pointer;
}
.file {
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0px;
  opacity: 0;
  cursor: pointer;
}
</style>
