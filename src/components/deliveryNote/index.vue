<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>送货单打印</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="soNo">
          <el-input v-model="formData.soNo" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="订购商" prop="contName">
          <el-input v-model="formData.contName" placeholder="订购商名称"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="是否完成" prop="status">
          <el-select v-model="formData.status" placeholder="订单类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="contDueDateStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.contDueDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="soDateStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.soDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="cl" style="margin-top: 5px;"></div>
        <el-form-item class="form-item" label="营业员" prop="sUserName">
          <el-input v-model="formData.sUserName" placeholder="营业员"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="发件人" prop="entryUserName">
          <el-input v-model="formData.entryUserName" placeholder="发件人"></el-input>
        </el-form-item>
        <el-form-item class="print-date" label="打印日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              style="width: 100%;"
              v-model="formData.tempStartTime"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              style="width: 100%;"
              type="date"
              v-model="formData.tempEndTime"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="research(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
          <el-button type="success" plain @click="alertDialog('导出')">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(2)" :class="{active: johnTab == 2}">未打印整条</li>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">未打印其它</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">已打印货单</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0 || johnTab == 2"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="custName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isOutward"
          label="外发"
          width="100">
          <template slot-scope="scope">
            {{scope.row.isOutward == 1? '外发': '没外发'}}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="160">
          <template slot-scope="scope">
            {{getType(scope.row.workInstCd)}}
          </template>
        </el-table-column>
        <el-table-column
          label="全部完成"
          width="80">
          <template slot-scope="scope">
            {{scope.row.status == 1? '是': '否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            {{scope.row.relationMoth === 1 ? '是' : '否'}}
            <!--<el-switch-->
            <!--v-model="scope.row.relationMoth"-->
            <!--@change="switchChange(scope.row.id, scope.row.relationMoth)"-->
            <!--active-text="是"-->
            <!--inactive-text="否">-->
            <!--</el-switch>-->
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small">{{scope.row.show}}</el-button>-->
            {{scope.row.isShowAmount === 1 ? '是' : '否'}}
            <!--<el-switch-->
            <!--v-model="scope.row.isShowAmount"-->
            <!--@change="switchChange(scope.row.id, scope.row.isShowAmount)"-->
            <!--active-text="是"-->
            <!--inactive-text="否">-->
            <!--</el-switch>-->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="johnTab === 2"
              size="mini"
              type="text"
              @click="alertDialog('修改重量', scope.row)">修改重量</el-button>
            <el-button
              size="mini"
              type="text"
              @click="printOrder(scope.$index, scope.row)">打印送货单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 1"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="custName"
          label="订购商名称">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isOutward"
          label="外发"
          width="100">
          <template slot-scope="scope">
            {{scope.row.isOutward == 1? '外发': '没外发'}}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="160">
          <template slot-scope="scope">
            {{getType(scope.row.workInstCd)}}
          </template>
        </el-table-column>
        <el-table-column
          label="全部完成"
          width="80">
          <template slot-scope="scope">
            {{scope.row.status == 1? '是': '否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            {{scope.row.relationMoth === 1 ? '是' : '否'}}
            <!--<el-switch-->
              <!--v-model="scope.row.relationMoth"-->
              <!--@change="switchChange(scope.row.id, scope.row.relationMoth)"-->
              <!--active-text="是"-->
              <!--inactive-text="否">-->
            <!--</el-switch>-->
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small">{{scope.row.show}}</el-button>-->
            {{scope.row.isShowAmount === 1 ? '是' : '否'}}
            <!--<el-switch-->
              <!--v-model="scope.row.isShowAmount"-->
              <!--@change="switchChange(scope.row.id, scope.row.isShowAmount)"-->
              <!--active-text="是"-->
              <!--inactive-text="否">-->
            <!--</el-switch>-->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="printOrder(scope.$index, scope.row)">打印送货单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      width="400px"
      :visible.sync="weightDialog">
      <div v-if="title === '修改重量'">
        <div class="weight-table">
          <table border="1" borderColor="#ddd" class="table">
            <tr>
              <th>接单行号</th>
              <th>重量</th>
            </tr>
            <tr v-for="(item, index) in weights" :key="index">
              <td>
                {{item.soNo + '-' + item.soLnNo}}
              </td>
              <td>
                <el-input size="mini" v-model="item.outwardWeight"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <p style="text-align: center;margin-top: 20px;">
          <el-button @click="changeWeightSubmit" type="primary">提交</el-button>
        </p>
      </div>
      <div v-if="title === '导出'">
        <el-form>
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="exportData.tempStartTime"
              style="width: 100%;"
              type="date"
              value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="exportData.tempEndTime"
              value-format="timestamp"
              style="width: 100%;"
              type="date"></el-date-picker>
          </el-form-item>
        </el-form>
        <p style="text-align: center;margin-top: 20px;">
          <el-button @click="exportExcel" type="primary">导出</el-button>
        </p>
      </div>
    </el-dialog>
    <el-dialog
      width="1120px"
      title="送货单"
      :visible.sync="dialog"
      >
      <orderDetail v-if="dialog" :orderInfo="sentData"/>
    </el-dialog>
  </div>
</template>

<script>
import orderDetail from './orderDetail'
import { getExcel } from '../../http'

export default {
  name: 'index',
  data () {
    return {
      pageSize: 10,
      title: '',
      weights: [],
      pageNum: 1,
      johnTab: 2,
      sentData: '',
      dialog: false,
      weightDialog: false,
      total: 0,
      exportData: {
        tempStartTime: '',
        tempEndTime: ''
      },
      formData: {
        soNo: '',
        soDateStr: '',
        tempStartTime: '',
        tempEndTime: '',
        contName: '',
        contDueDateStr: '',
        pageSize: 10,
        pageNum: 1,
        entryUserName: '',
        sUserName: '',
        status: ''
      },
      listData: []
    }
  },
  created () {
    this.getList(10, 1, 2)
  },
  methods: {
    // 导出
    exportExcel () {
      getExcel('/tSalesOrder/getDeliveryHistory', this.exportData).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = '送货单.xls'
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
        } else {
          alert('数据为0，请重新选择日期！')
        }
      })
    },
    alertDialog (string, row = {}) {
      this.title = string
      if (string === '修改重量') {
        this.changeWeight(row)
      } else {
        this.weightDialog = true
      }
    },
    // 修改提交
    changeWeightSubmit () {
      let parms = []
      this.weights.map(item => {
        parms.push({
          outwardWeight: item.outwardWeight,
          soLnNo: item.soLnNo,
          soNo: item.soNo
        })
      })
      this.http('/tSalesOrder/inputWeight', parms).then(resp => {
        if (resp.success) {
          this.$message({
            message: '修改成功',
            duration: 1000,
            type: 'success'
          })
          this.weightDialog = false
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    // 修改重量
    changeWeight (row) {
      this.http('/tSalesOrder/detail', {
        // soNo: 100341398
        soNo: row.soNo,
        workInstCd: row.workInstCd
      }).then(resp => {
        if (resp.success) {
          console.log('送货单', resp)
          this.weights = resp.data
          this.weightDialog = true
        } else {
          this.$message.error(resp.message)
        }
      })
    },

    // 获取订单类型
    getType (numb) {
      if (numb === '1') return '整条'
      if (numb === '2') return '切断'
      if (numb === '3') return '切断&加工'
      if (numb === '5') return '热处理'
      if (numb === '6') return '切断&加工&热处理'
    },
    getList (pageSize, pageNum, type) {
      this.http('/tSalesOrder/list', {
        pageSize,
        pageNum,
        isDelivery: type // 1:已打印  0：未打印
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list.filter(item => {
            item.relationMoth = item.isShowMaterial
            // if (item.isShowAmount === '1') {
            //   item.isShowAmount = true
            // } else {
            //   // item.isShowAmount = false
            //   item.isShowAmount = true
            // }
            return item
          })
          this.total = resp.data.total
        }
      })
    },
    printOrder (a, b) {
      this.sentData = b
      this.dialog = true
    },
    switchChange (id, b) {
      let isShowAmount = b ? '1' : '0'
      this.http('/tSalesOrder/saveShowAmount', {
        id,
        isShowAmount
      }).then(resp => {
        console.log(resp)
      })
    },
    onSubmit () {
      console.log(this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum)
    },
    cutFun (index, row) {
      console.log(index, row)
    },
    addFun (index, row) {
      console.log(index, row)
    },
    tabClick (index) {
      this.johnTab = index
      this.pageSize = 10
      this.pageNum = 1
      this.research(this.pageSize, this.pageNum)
    },
    research (pageSize, pageNum) {
      this.formData.isDelivery = this.johnTab
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tSalesOrder/list', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data.list.filter(item => {
            item.relationMoth = item.isShowMaterial
            // item.relationMoth = false
            // if (item.isShowAmount === '1') {
            //   item.isShowAmount = true
            // } else {
            //   // item.isShowAmount = false
            //   item.isShowAmount = true
            // }
            return item
          })
          this.total = resp.data.total
        }
      })
    }
  },
  computed: {
  },
  components: {
    orderDetail
  }
}
</script>

<style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .weight-table {
    height: 350px;
    overflow-y: auto;
  }
  .table td {
    padding: 5px ;
  }
  .table th {
    background: #eee;
    line-height: 50px;
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
    height: calc(100% - 215px);
  }
</style>
