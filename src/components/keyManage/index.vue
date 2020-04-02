<template>
  <div class="container">
    <div class="position">
      所在的位置：分单管理 -> <span>关键词管理</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="标签内容" prop="labelName">
          <el-input v-model="formData.labelName" placeholder="标签内容"></el-input>
          <!--<el-select v-model="formData.position" placeholder="请选择">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="副部长" value="1"></el-option>-->
            <!--<el-option label="主任" value="2"></el-option>-->
            <!--<el-option label="副主任" value="3"></el-option>-->
            <!--<el-option label="科长" value="4"></el-option>-->
            <!--<el-option label="技术工程师" value="5"></el-option>-->
            <!--<el-option label="作业班长" value="6"></el-option>-->
            <!--<el-option label="作业员工" value="7"></el-option>-->
            <!--<el-option label="管员" value="8"></el-option>-->
            <!--<el-option label="司机" value="9"></el-option>-->
            <!--<el-option label="文员" value="10"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <!--<el-form-item class="form-item" label="送货地址" prop="deliveryAddress">-->
          <!--<el-input v-model="formData.deliveryAddress" placeholder="地址"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item class="btns">
          <el-button type="success" plain @click="search(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <b>
        <!--仓库共计材料：      件   本场所查询结果：   {{total}}  件-->
        <el-button
          size="mini"
          style="float: left;margin-right:10px;margin-left: 10px;"
          type="primary"
          @click="addUser">添加标签</el-button>
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
          label="标签内容">
        </el-table-column>
        <el-table-column
          prop="searchKeywords"
          label="标签关键词">
        </el-table-column>
        <el-table-column
          prop="excludeKeywords"
          label="不显示关键词">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editUser(scope.$index, scope.row)">修改</el-button>
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
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      custom-class="john-dialog"
      width="450px">
      <addUser :submitFlg.sync="submitFlg" v-if="title == '添加标签'"></addUser>
      <edit v-if="title == '标签修改'" :editData="editData"></edit>
    </el-dialog>
  </div>
</template>

<script>
import addUser from './addUser'
import edit from './edit'

export default {
  name: 'index',
  data () {
    return {
      dialog: false,
      logDialog: false,
      submitFlg: true,
      title: '',
      qrCodes: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      editData: '',
      formData: {
        labelName: '',
        labelType: 2
      },
      listData: []
    }
  },
  created () {
    this.getLits(this.pageNum, this.PageSize)
  },
  methods: {
    getLits (num, size) {
      this.http('/label/list', {
        pageNum: num,
        pageSize: size,
        labelType: 2
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
    addUser () {
      this.title = '添加标签'
      this.submitFlg = true
      this.dialog = true
    },
    editUser (index, item) {
      this.editData = item
      this.title = '标签修改'
      this.dialog = true
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
  },
  components: {
    addUser,
    edit
  }
}
</script>

<style scoped>
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
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
