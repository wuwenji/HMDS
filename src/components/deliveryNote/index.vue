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
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="soDateStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.soDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="contDueDateStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.contDueDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!--<el-form-item class="form-item" label="订单类型" prop="type">-->
          <!--<el-select v-model="formData.type" placeholder="订单类型">-->
            <!--<el-option label="全部" value="0"></el-option>-->
            <!--<el-option label="切断" value="1"></el-option>-->
            <!--<el-option label="切断&加工" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item class="btns">
          <el-button type="success" plain @click="research(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">未打印货单</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">已打印货单</li>
      </ul>
    </div>
    <div class="data-list">
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
          prop=""
          label="全部完成"
          width="80">
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.relationMoth"
              @change="switchChange(scope.row.id, scope.row.relationMoth)"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small">{{scope.row.show}}</el-button>-->
            <el-switch
              v-model="scope.row.isShowAmount"
              @change="switchChange(scope.row.id, scope.row.isShowAmount)"
              active-text="是"
              inactive-text="否">
            </el-switch>
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
          prop="contName"
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
          prop=""
          label="全部完成"
          width="80">
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.relationMoth"
              @change="switchChange(scope.row.id, scope.row.relationMoth)"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small">{{scope.row.show}}</el-button>-->
            <el-switch
              v-model="scope.row.isShowAmount"
              @change="switchChange(scope.row.id, scope.row.isShowAmount)"
              active-text="是"
              inactive-text="否">
            </el-switch>
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
export default {
  name: 'index',
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
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
        pageNum: 1
      },
      listData: []
    }
  },
  created () {
    this.getList(10, 1, 0)
  },
  methods: {
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
        isDeilvery: type // 1:已打印  0：未打印
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list.filter(item => {
            item.relationMoth = false
            if (item.isShowAmount === '1') {
              item.isShowAmount = true
            } else {
              // item.isShowAmount = false
              item.isShowAmount = true
            }
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
      this.formData.isDeilvery = this.johnTab
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tSalesOrder/list', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data.list.filter(item => {
            item.relationMoth = false
            if (item.isShowAmount === '1') {
              item.isShowAmount = true
            } else {
              // item.isShowAmount = false
              item.isShowAmount = true
            }
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
</style>
