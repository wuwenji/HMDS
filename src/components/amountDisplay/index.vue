<template>
  <div class="container">
    <div class="position">
      所在的位置：分单管理 -> <span>送货单金额</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="客户名" prop="deliveryAddress">
          <el-input v-model="formData.deliveryAddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="search(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <b>
        <!--<el-button-->
          <!--size="mini"-->
          <!--style="float: left;margin-right:10px;margin-left: 10px;"-->
          <!--type="primary">导入表格</el-button>-->
        <el-upload
          class="upload-demo"
          style="float: left;margin-right:10px;margin-left: 10px;"
          :action="$store.state.httpUrl + '/label/excel/upload'"
          :on-error="errorUpload"
          :on-progress="progress"
          :before-upload="beforeUpload"
          :on-success="successUpload"
          :show-file-list="false">
          <el-button size="small" type="primary">导入表格</el-button>
        </el-upload>
        <el-progress v-if="percentFlg" class="progress" type="circle" :percentage="percentage">
        </el-progress>
      </b>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="labelName"
          width="100"
          label="客户代码">
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="客户名称地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="80"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="removeUser(scope.$index, listData, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      percentage: 0,
      percentFlg: false,
      submitFlg: true,
      title: '',
      qrCodes: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      editData: '',
      formData: {
        labelName: '',
        deliveryAddress: '',
        labelType: 3
      },
      listData: []
    }
  },
  created () {
    this.getLits(this.pageNum, this.PageSize)
  },
  methods: {
    beforeUpload (file) {
      this.percentFlg = true
    },
    progress (event, file, fileList) {
      this.percentage = parseInt((event.loaded / event.total) * 100)
    },
    errorUpload (file) {
      this.$message({
        message: '导入失败',
        duration: 1000,
        type: 'error'
      })
      this.percentFlg = false
    },
    successUpload (file) {
      this.$message({
        message: '导入成功',
        duration: 1000,
        type: 'success'
      })
      this.percentFlg = false
      this.getLits(this.pageNum, this.PageSize)
    },
    getLits (num, size) {
      this.http('/label/list', {
        pageNum: num,
        pageSize: size,
        labelType: 3
      }).then(resp => {
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.search(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.search(this.pageSize, this.pageNum)
    },
    removeUser (index, rows, item) {
      this.http('/label/delete', {
        labelId: item.labelId
      }).then(resp => {
        if (resp.success) {
          rows.splice(index, 1)
          this.total -= 1
        }
      })
    },
    search (pageS, pageN) {
      this.formData.pageSize = pageS
      this.formData.pageNum = pageN
      this.http('/label/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageS
          this.pageNum = pageN
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    }
  }
}
</script>

<style scoped>
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
  }
  .progress {
    position: absolute;
    z-index: 999;
    left: 50%;
    background: #fff;
    box-shadow: 0 0 15px #666;
    border-radius: 50%;
  }
  .position span {
    color: #409EFF;
  }
  .form {
    border:1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  .data-list {
    margin: 10px;
  }
  .form-item {
    width:220px;
  }
  .btns {
    float: right;
  }
  .block {
    text-align: right;
    padding: 20px 10px;
    background: #efefef;
    border: 1px solid #ddd;
    border-top: none;
  }
  .data-list {
    height: calc(100% - 170px);
  }
  #printAl ul {
  }
  #printAl ul li {
    float: left;
    width: 300px;
    list-style: none;
    padding: 5px;
    margin: 2px 0;
  }
  #printAl ul li img {
    width: 250px;
  }
  .printContent p {
    font-size: 25px;
    line-height: 40px;
    margin-top: 0;
    text-align: left;
    margin-bottom: 20px;
  }
  .printContent p span {
    font-weight: bold;
    margin-right: 30px;
  }
</style>
