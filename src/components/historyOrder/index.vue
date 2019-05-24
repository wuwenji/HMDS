<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>历史订单</span>
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
          <!--<el-button type="primary" plain>更新</el-button>-->
          <el-button type="success" plain @click="searchList(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">整条</li>
        <li @click="tabClick(2)" :class="{active: johnTab == 2}">切断</li>
        <li @click="tabClick(3)" :class="{active: johnTab == 3}">切断&加工</li>
        <!--<li @click="tabClick(5)" :class="{active: johnTab == 5}">热处理</li>-->
        <li @click="tabClick(6)" :class="{active: johnTab == 6}">切断&加工&热处理</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 1"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
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
          label="营业员">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="指示书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '整条作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
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
        v-show="johnTab == 2"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
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
          label="营业员">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="指示书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
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
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 3"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
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
          label="营业员">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="加工类型">
        </el-table-column>
        <el-table-column
          label="切断书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="加工书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '加工作业指示书打印历史', 2)"
              type="text"
              size="small">
              {{scope.row.machineHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.machineHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示书')">打印加工作业指示书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 5"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
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
          label="营业员">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="热处理书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '热处理作业指示书打印历史', 3)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 6"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
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
          label="营业员">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="切断书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="加工书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '加工作业指示书打印历史', 2)"
              type="text"
              size="small">
              {{scope.row.machineHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="热处理书打印次数">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '热处理作业指示书打印历史', 3)"
              type="text"
              size="small">
              {{scope.row.heatHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="370">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.machineHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示书')">打印加工作业指示书</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
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
      :visible.sync="dialogOne"
      width="1290px"
      top="5vh"
      center>
      <printPage v-if="title == '打印切断作业指示书'" :orderInfo="info" :title="title"></printPage>
      <hotHandle v-if="title == '生成热处理指示书'" :orderInfo="info" :title="title"></hotHandle>
      <machining v-if="title == '打印加工作业指示书'" :orderInfo="info" :title="title"></machining>
      <wholePage v-if="title == '整条'" :orderInfo="info" :title="title"/>
    </el-dialog>
    <el-dialog
      :visible.sync="historyDialog"
      :title="historyTitle"
      width="500px"
      center>
      <table border="1" class="table">
        <tr>
          <th>序号</th>
          <th>打印时间</th>
          <th>操作人</th>
        </tr>
        <tr v-for="(item, num) in historyList" :key="num">
          <td>{{num + 1}}</td>
          <td>{{$store.getters.getTime(item.createDate)}}</td>
          <td>{{item.createUserName}}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
// import printPage from './printing'
// import hotHandle from './hotHandle'
// import machining from './machining'
// import wholePage from './whole'
import printPage from '../orderPrinting/printing'
import hotHandle from './hotHandle'
import machining from '../orderPrinting/machining'
import wholePage from '../orderPrinting/whole'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      selectValue: '',
      title: '',
      historyDialog: false,
      historyTitle: '',
      info: {},
      dialogOne: false,
      johnTab: 1,
      formData: {
        soNo: '',
        soDateStr: '',
        contName: '',
        contDueDateStr: '',
        entryUserName: ''
      },
      listData: [],
      historyList: [
        {
          time: '2018/12/16 20:11',
          name: 'John'
        }
      ]
    }
  },
  created () {
    this.getLists(1, 10, 1)
  },
  computed: {
  },
  methods: {
    getLists (num, size, type) {
      this.http('/tSalesOrder/list', {
        pageNum: num,
        pageSize: size,
        isHistory: 1,
        workInstCd: type
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list.filter(item => {
            item.johnValue = ''
            return item
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.searchList(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.searchList(this.pageSize, this.pageNum)
    },
    printingOne (index, row, title) {
      this.http('/printHistory/list', {
        soNo: row.soNo
      }).then(resp => {
        if (resp.success) {
          // console.log(resp.data)
          this.info = resp.data.list[0]
          this.title = title
          this.dialogOne = true
        }
      })
      // this.title = title
      // this.dialogOne = true
      // this.info = row
    },
    cutFun (index, row, title) {
      this.http('/printHistory/list', {
        soNo: row.soNo
      }).then(resp => {
        if (resp.success) {
          this.info = resp.data.list[0]
          this.title = title
          this.dialogOne = true
        }
      })
    },
    searchList (pageSize, pageNum) {
      this.formData.workInstCd = this.johnTab
      this.formData.isHistory = 1
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tSalesOrder/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    tabClick (index) {
      this.johnTab = index
      this.pageSize = 10
      this.pageNum = 1
      this.getLists(1, 10, index)
    },
    getHistory (soNo, title, type) {
      this.historyTitle = title
      this.http('/printHistory/list', {
        soNo,
        pageSize: 100,
        printType: type
      }).then(resp => {
        if (resp.success) {
          console.log(resp)
          this.historyList = resp.data.list
          this.historyDialog = true
        }
      })
    }
  },
  components: {
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
  .table {
    width: 100%;
  }
  .table td,.table th {
    text-align: center;
    padding: 4px;
  }
</style>
