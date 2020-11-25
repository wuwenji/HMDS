<template>
  <div class="container">
    <div class="position">
      所在的位置：设置管理 -> <span>特别事项关联表</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="客户名" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="客户名"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="导入人" prop="entryUserName">
          <el-input v-model="formData.entryUserName" placeholder="导入人"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="search(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <b>
        <el-upload
          class="upload-demo"
          style="float: left;margin-right:10px;margin-left: 10px;"
          :action="$store.state.httpUrl + '/attention/importAttentionExcel'"
          :on-error="errorUpload"
          :headers="myHeaders"
          :on-progress="progress"
          :before-upload="beforeUpload"
          :on-success="successUpload"
          :show-file-list="false">
          <el-button size="small" type="primary">导入</el-button>
        </el-upload>
        <el-button @click="dialog = true" type="primary" size="small">导出</el-button>
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
          prop="customerName"
          width="100"
          label="客户名">
        </el-table-column>
        <el-table-column
          prop="attention"
          label="注意事项">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          width="100"
          label="导入人">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="导入时间">
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
    <el-dialog
      title="导出特别事项关联表"
      :visible.sync="dialog"
      width="350px">
      <el-form label-width="80px">
        <el-form-item label="开始时间">
          <el-date-picker type="date" v-model="exportTime.tempStarTime"></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="结束时间">
          <el-date-picker type="date" v-model="exportTime.tempEndTime"></el-date-picker>
        </el-form-item>
      </el-form>
      <p style="text-align: center; margin: 40px;">
        <el-button type="primary" @click="exportExcel">确定导出</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { getExcel } from '../../http'
let token = localStorage.getItem('hmdsUsers') ? JSON.parse(localStorage.getItem('hmdsUsers')).token : ''

export default {
  name: 'index',
  data () {
    return {
      myHeaders: {token: token},
      dialog: false,
      logDialog: false,
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
        customerName: '',
        entryUserName: ''
      },
      exportTime: {
        tempStarTime: '',
        tempEndTime: ''
      },
      listData: []
    }
  },
  created () {
    this.getLits(this.pageNum, this.PageSize)
  },
  methods: {
    exportExcel () {
      getExcel('/attention/exportAttentionExcel', this.exportTime).then(res => {
        const blob = new Blob([res])
        const fileName = '特别事项关联表.xls'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
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
      this.http('/attention/list', {
        pageNum: num,
        pageSize: size
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
    search (pageS, pageN) {
      this.formData.pageSize = pageS
      this.formData.pageNum = pageN
      this.http('/attention/list', this.formData).then(resp => {
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
