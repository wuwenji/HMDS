<template>
  <div class="container">
    <div class="position">
      所在的位置：热处理管理 -> <span>打印成绩书</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="orderCode">
          <el-input v-model="formData.orderCode" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="acceptTime">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.acceptTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="contDueDate">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.contDueDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="类型" prop="source">
          <el-select v-model="formData.source" placeholder="类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="客户来料" :value="0"></el-option>
            <el-option label="营业下单" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(5)" :class="{active: johnTab == 5}">热处理</li>
        <li @click="tabClick(6)" :class="{active: johnTab == 6}">切断&加工&热处理</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="orderCode"
          label="成绩书编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="收货人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="送货地址">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="contDueDate"
          label="交货预期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="material"
          label="钢种"
          width="80">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="数量"
          align="right"
          width="50">
        </el-table-column>
        <el-table-column
          prop="totalWeight"
          label="重量"
          align="right"
          width="50">
        </el-table-column>
        <el-table-column
          prop="source"
          label="类型"
          width="80">
          <template slot-scope="scope">
            {{scope.row.source == 1? '营业下单': '客户来料'}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="160"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="downBook(scope.row)">下载成绩书</el-button>
            <el-button
              size="mini"
              type="text"
              @click="inputScore(scope.$index, scope.row)">成绩书</el-button>
              <!--@click="inputScore(scope.$index, scope.row)">录入成绩书</el-button>-->
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
      title="成绩书"
      width="1400px"
      :visible.sync="dialog">
      <inputCommod v-if="dialog" :inputDate="inputDate"/>
      <!--<scorBook/>-->
    </el-dialog>
    <el-dialog
      title="下载成绩书"
      width="270px"
      :visible.sync="downDialog">
      <el-select v-model="downOption" placeholder="请选择">
        <el-option
          v-for="item in downOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="cl"></div>
      <p style="text-align: center; margin-top: 20px;">
        <el-button @click="downLoad" type="primary">下载</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import inputCommod from './inputCommod'
import scorBook from './scorBook'
import { getExcel } from '../../http'
export default {
  name: 'index',
  data () {
    return {
      johnTab: 5,
      pageSize: 10,
      pageNum: 1,
      dialogTyep: 0,
      dialog: false,
      downDialog: false,
      workInstCd: 5,
      downId: '',
      downCode: '',
      total: 0,
      inputDate: '',
      formData: {
        orderCode: '',
        acceptTime: '',
        contDueDate: '',
        source: ''
      },
      listData: [],
      downOptions: [
        {
          value: '1',
          label: '常用版本'
        },
        {
          value: '2',
          label: '比亚迪'
        },
        {
          value: '3',
          label: '阿雷热处理'
        },
        {
          value: '4',
          label: '阿雷氮化'
        },
        {
          value: '5',
          label: '导新热处理'
        },
        {
          value: '6',
          label: '导新氮化'
        },
        {
          value: '7',
          label: '型腔氮化'
        },
        {
          value: '8',
          label: '德奥(日文)'
        },
        {
          value: '9',
          label: '安特'
        },
        {
          value: '10',
          label: '爱信'
        },
        {
          value: '11',
          label: '华钧永伸'
        },
        {
          value: '12',
          label: '格力'
        }
      ],
      downOption: '1'
    }
  },
  created () {
    this.getList(10, 1)
  },
  methods: {
    // 获取数据
    getList (pageSize, pageNum) {
      this.http('/heat/deliveryList', {
        pageSize,
        pageNum,
        type: this.johnTab
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 查询
    onSubmit (pageSize, pageNum) {
      this.formData.type = this.johnTab
      this.formData.pageNum = pageNum
      this.formData.pageSize = pageSize
      this.http('/heat/deliveryList', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 弹出下载框
    downBook (row) {
      this.downId = row.id
      this.downCode = row.orderCode
      this.downDialog = true
    },
    // 下载
    downLoad () {
      this.http('/heatTreatment/getHeatExcel', {
        id: this.downId,
        sheetNo: this.downOption
      }).then(resp => {
        if (resp.success) {
          getExcel('/heatTreatment/getExcelById', {
            id: resp.data.heatExcelId
          }).then(res => {
            const blob = new Blob([res])
            const fileName = this.downCode + '.xls'
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
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    inputScore (index, row) {
      this.inputDate = row
      this.dialog = true
    },
    addFun (index, row) {
      console.log(index, row)
    },
    tabClick (index) {
      this.johnTab = index
      this.pageSize = 10
      this.pageNum = 1
      this.getList(this.pageSize, this.pageNum)
    }
  },
  computed: {
  },
  components: {
    inputCommod,
    scorBook
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
  #downLoad {
    display: none;
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
</style>
