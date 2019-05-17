<template>
  <div class="container">
    <div class="position">
      所在的位置：设置管理 -> <span>作业人员管理</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="职位" prop="position">
          <!--<el-input v-model="formData.position" placeholder="职位"></el-input>-->
          <el-select v-model="formData.position" placeholder="请选择职位">
            <el-option label="全部" value=""></el-option>
            <el-option label="副部长" value="1"></el-option>
            <el-option label="主任" value="2"></el-option>
            <el-option label="副主任" value="3"></el-option>
            <el-option label="科长" value="4"></el-option>
            <el-option label="技术工程师" value="5"></el-option>
            <el-option label="作业班长" value="6"></el-option>
            <el-option label="作业员工" value="7"></el-option>
            <el-option label="管员" value="8"></el-option>
            <el-option label="司机" value="9"></el-option>
            <el-option label="文员" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="addUser">添加</el-button>
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
          @click="logDialog = true">批量打印二维码</el-button>
      </b>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位">
          <template slot-scope="scope">
            {{position(scope.row.position)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
          <template slot-scope="scope">
            {{department(scope.row.department)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="technicalGrade"
          label="技能等级">
        </el-table-column>
        <el-table-column
          prop="workNumber"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.isEnable == 0? '已启用': '未启用'}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="210"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editUser(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="stop(scope.$index, scope.row)">{{scope.row.isEnable == 0? '停用': '启用'}}</el-button>
            <el-button
              size="mini"
              type="text"
              @click="removeUser(scope.$index, listData, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="text"
              @click="pinkQR(scope.$index, scope.row)">打印二维码</el-button>
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
      width="400px">
      <addUser v-if="title == '添加人员'" ref="addUser"></addUser>
      <edit v-if="title == '人员修改'" :editData="editData"></edit>
      <pinkingQR v-if="title == '打印二维码'" :editData="editData"></pinkingQR>
    </el-dialog>
    <el-dialog
      title="批量打印"
      :visible.sync="logDialog"
      width="970px">
      <div id="printAl">
        <ul>
          <li v-for="(item, keya) in qrCodes" :key="keya">
            <img :src="item.url" alt="">
            <div class="printContent">
              <p><span>姓名：</span>{{item.name}}</p>
              <p><span>部门：</span>{{department(item.department)}}</p>
              <p><span>职务：</span>{{position(item.position)}}</p>
              <p><span>编号：</span>{{item.workNumber}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="cl"></div>
      <p style="text-align: center;margin: 20px 0;">
        <el-button v-print="'#printAl'" type="primary">打印</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import addUser from './addUser'
import edit from './edit'
import pinkingQR from './pinkingQR'
export default {
  name: 'index',
  data () {
    return {
      dialog: false,
      logDialog: false,
      title: '',
      qrCodes: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      editData: '',
      formData: {
        name: '',
        position: '',
        workNumber: ''
      },
      listData: []
    }
  },
  created () {
    this.getLits(this.pageNum, this.PageSize)
  },
  methods: {
    getLits (num, size) {
      this.http('/user/list', {
        pageNum: num,
        pageSize: size
      }).then(resp => {
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    position (num) {
      if (num === 1) return '副部长'
      if (num === 2) return '主任'
      if (num === 3) return '副主任'
      if (num === 4) return '科长'
      if (num === 5) return '技术工程师'
      if (num === 6) return '作业班长'
      if (num === 7) return '作业员工'
      if (num === 8) return '管员'
      if (num === 9) return '司机'
      if (num === 10) return '文员'
    },
    department (num) {
      if (num === 1) return '制造部'
      if (num === 2) return '热处理部'
      if (num === 3) return '加工Gr'
      if (num === 4) return '切断Gr'
      if (num === 5) return '生管Gr'
      if (num === 6) return '作业组'
      if (num === 7) return '仓库'
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
      this.title = '添加人员'
      this.dialog = true
    },
    editUser (index, item) {
      this.editData = item
      this.title = '人员修改'
      this.dialog = true
    },
    pinkQR (index, item) {
      this.editData = item
      this.title = '打印二维码'
      this.dialog = true
    },
    stop (index, item) {
      let isE = item.isEnable === 0 ? 1 : 0
      this.http('/user/update', {
        id: item.id,
        isEnable: isE
      }).then(resp => {
        if (resp.success) {
          this.getLits(this.pageNum, this.PageSize)
        }
      })
    },
    removeUser (index, rows, item) {
      this.http('/user/update', {
        id: item.id,
        recordStatus: 1
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
      this.http('/user/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageS
          this.pageNum = pageN
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    // 选择数据
    handleSelectionChange(val) {
      this.qrCodes = val.map(item => {
        let str = this.$store.state.qrUrl + item.qrCode + '&w=250&h=250'
        let obj = {
          url: str,
          name: item.name,
          department: item.department,
          position: item.position,
          workNumber:item.workNumber
        }
        return obj
      })
    }
  },
  components: {
    addUser,
    edit,
    pinkingQR
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
