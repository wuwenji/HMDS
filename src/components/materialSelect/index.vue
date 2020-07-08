<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>选料及打印订单</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="soNo">
          <el-input v-model="formData.soNo" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="订购商" prop="contName">
          <el-input v-model="formData.contName" placeholder="订购商名称"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="发件人" prop="entryUserName">
          <el-input v-model="formData.entryUserName" placeholder="发件人"></el-input>
        </el-form-item>
        <div class="cl" style="height: 10px;"></div>
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="soDateStr">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.soDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="contDueDateStr">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.contDueDateStr"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="research(10, 1, johnTab)">查询</el-button>
          <el-button type="success" plain @click="exportFlg = true">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(3)" :class="{active: johnTab == 3}">整条</li>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">未选料</li>
        <li @click="tabClick(2)" :class="{active: johnTab == 2}">已选料</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">历史记录</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 3"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="printingOne(scope.$index, scope.row, '整条')">打印整条作业指示书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sysName"
          label="选料员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="workInstCd"
          label="类型"
          width="150">
          <template slot-scope="scope">
            {{scope.row.workInstCd === '1' ? '整条' : ''}}
            {{scope.row.workInstCd === '2' ? '切断' : ''}}
            {{scope.row.workInstCd === '3' ? '切断&加工' : ''}}
            {{scope.row.workInstCd === '6' ? '切断&加工&热处理' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否完成"
          width="100">
          <template slot-scope="scope">
            {{scope.row.status === 0 ? '否' : '是'}}
          </template>
        </el-table-column>
        <el-table-column
          label="选料完成时间"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.endTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          prop="contDueDate"
          width="170">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="140"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.isClick === 1 ? 'gray' : ''"
              @click="selectMaterial(scope.$index, scope.row)">选料</el-button>
            <el-button
              size="mini"
              type="text"
              @click="skipSelect(scope.$index, scope.row)">跳过</el-button>
            <el-button
              size="mini"
              type="text"
              @click="chongzhi(scope.$index, scope.row)">重置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 1 || johnTab == 2"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sysName"
          label="选料员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="workInstCd"
          label="类型"
          width="150">
          <template slot-scope="scope">
            {{scope.row.workInstCd === '1' ? '整条' : ''}}
            {{scope.row.workInstCd === '2' ? '切断' : ''}}
            {{scope.row.workInstCd === '3' ? '切断&加工' : ''}}
            {{scope.row.workInstCd === '6' ? '切断&加工&热处理' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否完成"
          width="100">
          <template slot-scope="scope">
            {{scope.row.status === 0 ? '否' : '是'}}
          </template>
        </el-table-column>
        <el-table-column
          label="选料完成时间"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.endTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          prop="contDueDate"
          width="170">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="60"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="dataDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="打印"
          fixed="right"
          width="370">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="alertDialog(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
            <el-button
              v-if="scope.row.workInstCd === '3' || scope.row.workInstCd === '6'"
              size="mini"
              type="text"
              :class="scope.row.machineHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="alertDialog(scope.$index, scope.row, '打印加工作业指示票')">打印加工作业指示票</el-button>
            <el-button
              v-if="scope.row.workInstCd === '6'"
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="alertDialog(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
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
      title="导出"
      width="400px"
      :visible.sync="exportFlg">
      <el-form label-width="80px">
        <el-form-item label="开始日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="exportExl.tempStartTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="结束日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="exportExl.tempEndTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <br/>
      <p style="text-align: center;">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </p>
    </el-dialog>
    <el-dialog
      width="1370px"
      title="选料"
      top="1vh"
      custom-class="min-height"
      :close-on-click-modal="false"
      :visible.sync="dialog">
      <orderDetail v-if="dialog" :orderInfos="sentData"/>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogOne"
      width="1290px"
      top="5vh"
      center>
      <printPage v-if="title == '打印切断作业指示书'" :orderInfo="info" :title="title"/>
      <hotHandle v-if="title == '生成热处理指示书'" :orderInfo="info" :title="title"/>
      <machining v-if="title == '打印加工作业指示票'" :orderInfo="info" :title="title"/>
      <wholePage v-if="title == '整条'" :orderInfo="info" :title="title"/>
    </el-dialog>
  </div>
</template>

<script>
import orderDetail from './material'
import { getExcel } from '../../http'
import printPage from '../orderPrinting/printing_'
import hotHandle from '../orderPrinting/hotHandle'
import machining from '../orderPrinting/machining_'
import wholePage from '../orderPrinting/whole'

export default {
  name: 'index',
  data () {
    return {
      dialogOne: false,
      pageSize: 10,
      title: '',
      pageNum: 1,
      info: '',
      exportFlg: false,
      exportExl: {
        tempStartTime: '',
        tempEndTime: ''
      },
      johnTab: 0,
      sentData: '',
      dialog: false,
      total: 0,
      formData: {
        soNo: '',
        soDateStr: '',
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
    this.getList(10, 1, 0)
  },
  methods: {
    chongzhi (index, row) {
      let url = '/orderSelect/orderReset/' + row.soNo
      this.http(url).then(resp => {
        if (resp.success) {
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
        } else {
          this.$message.error({
            message: resp.message,
            duration: 2000
          })
        }
      })
    },
    // 打印
    alertDialog (index, row, title) {
      this.title = title
      this.dialogOne = true
      this.info = row
    },
    // 导出
    exportExcel () {
      getExcel('/orderSelect/exportMaterialExcel', this.exportExl).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = '选料.xls'
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
    // 详情
    dataDetail (index, row) {
      let url = '/orderSelect/detail/' + row.soNo
      this.http(url).then(resp => {
        console.log('详情', resp)
        if (resp.success) {
          this.sentData = resp.data
          this.dialog = true
        } else {
          this.$message.error({
            message: resp.message,
            duration: 1000
          })
        }
      })
    },
    // 跳过
    skipSelect (index, row) {
      let url = '/orderSelect/skipMaterial/' + row.soNo
      this.http(url).then(resp => {
        console.log('跳过', resp)
        if (resp.success) {
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
          this.listData.splice(index, 1)
        } else {
          this.$message.error({
            message: resp.message,
            duration: 2000
          })
        }
      })
    },
    getList (pageSize, pageNum, type) {
      // let url = type === 3 ? '' : '/orderSelect/listByPage'
      this.http('/orderSelect/listByPage', {
        pageSize,
        pageNum,
        isHistory: type // 1:历史列表  0：选料列表
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    printingOne (index, row, title) {
      this.title = '123'
      setTimeout(() => {
        this.title = title
        this.dialogOne = true
        this.info = row
      }, 30)
    },
    selectMaterial (a, b) {
      let url = '/orderSelect/selectMaterial/' + b.soNo
      this.http(url).then(resp => {
        console.log('选料', resp)
        if (resp.success) {
          this.sentData = resp.data
          // this.dialog = true
          if (resp.message === '') {
            this.dialog = true
          } else {
            this.$alert(resp.message, '提示', {
              confirmButtonText: '确定'
            }).then(() => {
              this.dialog = true
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        } else {
          this.$message.error({
            message: resp.message,
            duration: 1000
          })
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum, this.johnTab)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum, this.johnTab)
    },
    tabClick (index) {
      this.johnTab = index
      this.pageSize = 10
      this.pageNum = 1
      this.research(this.pageSize, this.pageNum, this.johnTab)
    },
    research (pageSize, pageNum, type) {
      this.formData.isDelivery = this.johnTab
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.formData.isHistory = type
      // let url = type === 3 ? '' : '/orderSelect/listByPage'
      this.http('/orderSelect/listByPage', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    }
  },
  computed: {
  },
  components: {
    orderDetail,
    printPage,
    hotHandle,
    machining,
    wholePage
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
  .gray {
    color: gray !important;
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
    height: calc(100% - 220px);
  }
</style>
