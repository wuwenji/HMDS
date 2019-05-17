<template>
  <div class="container">
    <div class="position">
      所在的位置：盘点管理 -> <span>设备二维码</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="所属部门" prop="type">
          <el-select v-model="formData.type" placeholder="所属部门">
            <el-option label="全部" value=""></el-option>
            <el-option label="切断部门" :value="1"></el-option>
            <el-option label="加工部门" :value="2"></el-option>
            <el-option label="热处理部门" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="机器编号" prop="code">
          <el-input v-model="formData.code" placeholder="机器编号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="设备名" prop="name">
          <el-input v-model="formData.name" placeholder="设备名"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="型号规格" prop="model">
          <el-input v-model="formData.model" placeholder="型号规格"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" plain @click="addEquipment">添加</el-button>
          <el-button type="success" plain @click="onSubmit">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="type"
          label="所属部门">
          <template slot-scope="scope">
            {{getType(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="机器编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂家">
        </el-table-column>
        <el-table-column
          prop="model"
          label="型号规格">
        </el-table-column>
        <el-table-column
          label="设备状态">
          <template slot-scope="scope">
            {{getStatus(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="170"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="getDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="text"
              @click="printQr(scope.$index, scope.row)">打印二维码</el-button>
            <el-button
              size="mini"
              type="text"
              @click="removeList(scope.$index, scope.row.id, listData)">删除</el-button>
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
      width="1000px"
      :title="dialogTitle"
      :visible.sync="elDialog">
      <addEquipment :orderInfo="setInfo" v-if="dialogTitle == '添加设备'" />
      <equipDetail :orderInfo="setInfo" v-if="dialogTitle == '详情' && dialogType == 1"/>
      <equipDetail :orderInfo="setInfo" v-if="dialogTitle == '详情' && dialogType == 2"/>
      <heatDetail :orderInfo="setInfo" v-if="dialogTitle == '详情' && dialogType == 3"/>
      <div class="qr-content" v-if="dialogTitle == '打印二维码'">
        <div class="printContent cl">
          <img :src="qrUrl" alt="">
          <div class="printContRight">
            <p>
              <span>机器名称:</span>{{printDat.name}}</p>
            <p>
              <span>机器编号:</span>{{printDat.code}}</p>
            <p>
              <span>购入年限:</span>{{printDat.buyingTime}}</p>
          </div>
        </div>
        <p>
          <el-button v-print="'.printContent'" type="primary">打印</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addEquipment from './addEquipment'
import equipDetail from './equipDetail'
import heatDetail from './heatDetail'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      johnTab: 0,
      setInfo: '',
      total: 0,
      qrUrl: '',
      printDat: {},
      dialogType: 1,
      dialogTitle: '添加设备',
      elDialog: false,
      multipleSelection: [],
      formData: {
        type: '',
        code: '',
        name: '',
        model: '',
        pageSize: 10,
        pageNum: 1
      },
      listData: []
    }
  },
  created () {
    this.getList(10, 1)

  },
  mounted () {
  },
  methods: {
    // 获取列表
    getList (pageSize, pageNum) {
      this.http('/equipment/list', {
        pageSize,
        pageNum,
        type: this.formData.type
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 返回设备状态
    getStatus (a) {
      if (a === 0) return '正常'
      if (a === 1) return '故障'
      if (a === 2) return '报废'
    },
    // 返回所属部门
    getType (a) {
      if (a === 1) return '切断部门'
      if (a === 2) return '加工部门'
      if (a === 3) return '热处理部门'
    },
    // 条件查询
    onSubmit () {
      console.log(this.formData)
      this.http('/equipment/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageNum = 1
          this.pageSize = 10
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 添加设备
    addEquipment () {
      this.dialogTitle = '添加设备'
      this.elDialog = true
    },
    // 详情
    getDetail (index, row) {
      this.dialogTitle = '详情'
      this.dialogType = row.type
      this.setInfo = row
      this.elDialog = true
    },
    // 打印二维码
    printQr (index, row) {
      this.dialogTitle = '打印二维码'
      this.printDat = row
      // row.name row.code row.buyingTime
      this.qrUrl = this.$store.state.qrUrl + row.qrCode + '&w=450&h=450'
      this.elDialog = true
    },
    // 删除
    removeList (index, id, row) {
      this.http('/equipment/delete', id).then(resp => {
        console.log(resp)
        if (resp.success) {
          row.splice(index, 1)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.getList(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.getList(this.pageSize, this.pageNum)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
  },
  components: {
    addEquipment,
    equipDetail,
    heatDetail
  }
}
</script>

<style scoped>
  .john-tab b {
    margin-left: 10px;
  }
  .qr-content {
    text-align: center;
  }
  .qr-content p {
    margin-top: 40px;
  }
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
    /*width:180px;*/
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
  .printContent {
    /*width: 873.2px;*/
    text-align: center;
  }
  .printContent img {
    float: left;
  }
  .printContent div {
    float: left;
  }
  .printContent div p {
    font-size: 35px;
    margin-left: 20px;
    line-height: 80px;
    margin-top: 0;
    text-align: left;
    margin-bottom: 70px;
  }
  .printContent div p span {
    font-weight: bold;
    margin-right: 30px;
    float: left;
  }
</style>
