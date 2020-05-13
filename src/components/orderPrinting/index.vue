<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>订单确认</span>
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
          <!--<el-button type="primary" plain>更新</el-button>-->
          <el-button type="success" plain @click="searchList(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
          <el-button v-if="bntShow" type="primary" plain @click="updaData">数据同步</el-button>
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
          label="营业确认预览"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
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
          prop="tempMachineSpecCd"
          label="加工类型"
          width="130">
        </el-table-column>
        <el-table-column
          label="营业确认预览"
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
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示票')">打印加工作业指示票</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
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
          label="营业确认预览"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
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
          label="加工类型"
          width="240px">
          <template slot-scope="scope">
            <div style="position: relative;" v-if="selOptions.indexOf(scope.row.heatMillingRemarks) === -1">
              <el-select
                size="mini"
                style="margin-right: 30px;display: inline-block;"
                v-model="scope.row.johnValue"
                placeholder="请选择">
                <el-option
                  v-for="item in selOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-button
                style="position: absolute;top: -5px;right: 0px;z-index: 99"
                @click="prese(scope.row.soNo, scope.row.johnValue)"
                type="text">
                保存
              </el-button>
            </div>
            <p v-else>{{scope.row.heatMillingRemarks}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="营业确认预览"
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
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示票')">打印加工作业指示票</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
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
      <printPage v-if="title == '打印切断作业指示书'" :orderInfo="info" :title="title"/>
      <hotHandle v-if="title == '生成热处理指示书'" :orderInfo="info" :title="title"/>
      <machining v-if="title == '打印加工作业指示票'" :orderInfo="info" :title="title"/>
      <wholePage v-if="title == '整条'" :orderInfo="info" :title="title"/>
    </el-dialog>
  </div>
</template>

<script>
import printPage from '../historyOrder/printing'
import hotHandle from '../historyOrder/hotHandle'
import machining from '../historyOrder/machining'
import wholePage from '../historyOrder/whole'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      selectValue: '',
      title: '',
      info: {},
      selOptions: ['2F→热处理', '6F→热处理', '6F→热处理→2G', '素材→热处理→6F2G', '素材→热处理→6F2G→钻孔', '素材→6F→送回客户钻孔→热处理→2G', '素材→热处理'],
      dialogOne: false,
      johnTab: 1,
      formData: {
        soNo: '',
        soDateStr: '',
        contName: '',
        contDueDateStr: '',
        entryUserName: ''
      },
      listData: []
    }
  },
  created () {
    this.getLists(1, 10, 1)
  },
  computed: {
    bntShow () {
      let position = JSON.parse(localStorage.getItem('hmdsUsers'))
      if (position.role === 1 || position.role === '1') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 确认完成
    confirmComp (row, index, data) {
      this.http('/tSalesOrder/confirmOrder', {
        soNo: row.soNo,
        isShowAmount: row.isShowAmount,
        isShowMaterial: row.isShowMaterial
      }).then(resp => {
        alert(resp.message)
        // data.splice(index, 1)
        // console.log(resp)
        if (resp.success) {
          data.splice(index, 1)
        }
      })
    },
    // 同步日本数据
    updaData () {
      const loading = this.$loading({
        lock: true,
        text: '正在同步，需要两到三分钟，请耐心等待！',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.http('/sync/updateAllData', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.$message({
            message: resp.message,
            duration: 1000,
            type: 'success'
          })
          loading.close()
        } else {
          this.$message.error(resp.message)
          loading.close()
        }
      })
    },
    getLists (num, size, type) {
      let url = this.johnTab === 1 ? '/tSalesOrder/list' : '/tSalesOrder/orderList'
      this.http(url, {
        pageNum: num,
        pageSize: size,
        isHistory: 0,
        workInstCd: type
      }).then(resp => {
        if (resp.success) {
          console.log(resp)
          this.total = resp.data.total
          this.listData = resp.data.list.filter(item => {
            item.johnValue = ''
            return item
          })
        }
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
      this.searchList(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.searchList(this.pageSize, this.pageNum)
    },
    printingOne (index, row, title) {
      this.title = '123'
      setTimeout(() => {
        this.title = title
        this.dialogOne = true
        this.info = row
      }, 30)
    },
    cutFun (index, row, title) {
      this.title = '123'
      setTimeout(() => {
        this.title = title
        this.dialogOne = true
        this.info = row
      }, 30)
      // console.log(index, row)
    },
    searchList (pageSize, pageNum) {
      this.formData.workInstCd = this.johnTab
      this.formData.isHistory = 0
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      let url = this.johnTab === 1 ? '/tSalesOrder/list' : '/tSalesOrder/orderList'
      this.http(url, this.formData).then(resp => {
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
    prese (soNo, val) {
      this.http('/tSalesOrder/saveMachineSpecCd', {
        soNo,
        heatMillingRemarks: val
      }).then(resp => {
        if (resp.success) {
          this.listData.map(item => {
            if (item.soNo === soNo) {
              item.heatMillingRemarks = val
            }
          })
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
    height: calc(100% - 220px);
  }
</style>
