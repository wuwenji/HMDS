<template>
  <div class="container">
    <div class="position">
      所在的位置：设置管理 -> <span>账号设置</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="用户名" prop="userAccount">
          <el-input v-model="formData.userAccount" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="姓名" prop="userName">
          <el-input v-model="formData.userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="状态" prop="isEnable">
          <el-select v-model="formData.isEnable" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="已启用" value="0"></el-option>
            <el-option label="未启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item class="form-item" label="部门" prop="department">-->
          <!--<el-input v-model="formData.department" placeholder="部门"></el-input>-->
          <!--&lt;!&ndash;<el-select v-model="formData.department" placeholder="部门">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="全部" value="0"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="切断" value="1"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="切断&加工" value="2"></el-option>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
        <!--</el-form-item>-->
        <el-form-item class="btns">
          <el-button type="success" plain @click="alertDialog">添加</el-button>
          <el-button type="success" plain @click="search(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="userAccount"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="组织权限">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--size="mini"-->
              <!--type="primary"-->
              <!--@click="cutFun(scope.$index, scope.row)">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作权限">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--size="mini"-->
              <!--type="primary"-->
              <!--@click="cutFun(scope.$index, scope.row)">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="建立时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.isEnable == 0? '已启用': '未启用'}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="260"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="changePassword(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="text"
              @click="jurisdiction(scope.$index, scope.row)">权限</el-button>
            <el-button
              size="mini"
              :type="scope.row.recordStatus == 0? 'text': 'text'"
              @click="changeStatus(scope.$index, scope.row)">{{scope.row.isEnable == 0? '停用': '启用'}}</el-button>
            <el-button
              size="mini"
              type="text"
              @click.native.prevent="deleteRow(scope.$index, listData, scope.row)">删除</el-button>
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
      :visible.sync="dialogVisible"
      custom-class="john-dialog"
      width="500px">
      <addUser v-if="title == '添加用户'" ref="addUser"></addUser>
      <edit v-if="title == '用户修改'" :editData="editData"></edit>
      <changePass v-if="title == '修改密码'" :editData="editData"></changePass>
      <jurisdiction v-if="title == '权限设置'" :editData="editData"></jurisdiction>
    </el-dialog>
  </div>
</template>

<script>
import addUser from './addUser'
import edit from './edit'
import changePass from './changePassword'
import jurisdiction from './jurisdiction'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      dialogVisible: false,
      total: 100,
      editData: '',
      title: '',
      pageSize: 10,
      formData: {
        userAccount: '',
        userName: '',
        isEnable: '',
        department: ''
      },
      listData: []
    }
  },
  created () {
    this.getUsers(1, 10)
  },
  methods: {
    getUsers (pageNum, pageSize) {
      this.http('/sysUser/list', {
        pageNum,
        pageSize
      }).then(resp => {
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    alertDialog () {
      this.title = '添加用户'
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.addUser.resetForm('dynamicValidateForm')
      }, 10)
    },
    onSubmit () {
      console.log(this.formData)
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
    deleteRow (index, rows, item) {
      this.http('/sysUser/update', {
        id: item.id,
        recordStatus: 1
      }).then(resp => {
        if (resp.success) {
          rows.splice(index, 1)
          this.total -= 1
        }
      })
    },
    edit (index, item) {
      this.title = '用户修改'
      this.editData = item
      this.dialogVisible = true
    },
    changePassword (index, item) {
      this.title = '修改密码'
      this.editData = item
      this.dialogVisible = true
    },
    jurisdiction (index, item) {
      this.title = '权限设置'
      this.editData = item
      this.dialogVisible = true
    },
    search (pageSize, pageNum) {
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/sysUser/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    changeStatus (index, item) {
      let isE = item.isEnable === 0 ? 1 : 0
      this.http('/sysUser/update', {
        id: item.id,
        isEnable: isE
      }).then(resp => {
        if (resp.success) {
          this.getUsers(1, 10)
        }
      })
    }
  },
  computed: {
  },
  components: {
    addUser,
    edit,
    changePass,
    jurisdiction
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
    height: calc(100% - 130px);
  }
</style>
