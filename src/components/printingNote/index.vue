<template>
  <div class="container">
    <div class="position">
      所在的位置：热处理管理 -> <span>打印送货单</span>
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
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">未打印送货单</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">已打印送货单</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="orderCode"
          label="接单号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deliveryAddress"
          label="客户地址">
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
          label="交期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="taskName"
          label="作业名"
          width="100">
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
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <!--<el-checkbox v-model="scope.row.relationMoth">是</el-checkbox>-->
            <el-switch
              v-model="scope.row.relationMoth"
              @change="switchChange(scope.row.id, scope.row.relationMoth)"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="显示金额"
          width="100">
          <template slot-scope="scope">
            <!--<el-checkbox v-model="scope.row.isShowAmount">是</el-checkbox>-->
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
              @click="printScore(scope.$index, scope.row)">打印送货单</el-button>
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
      title="送货单"
      width="1115px"
      :visible.sync="dialog">
      <orderDetail v-if="dialog" :orderInfo="orderInfo"/>
    </el-dialog>
  </div>
</template>

<script>
import orderDetail from './orderDetail'
export default {
  name: 'index',
  data () {
    return {
      johnTab: 0,
      pageSize: 10,
      pageNum: 1,
      orderInfo: '',
      dialog: false,
      total: 0,
      formData: {
        orderCode: '',
        acceptTime: '',
        contDueDate: '',
        source: ''
      },
      listData: []
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
        print: this.johnTab
      }).then(resp => {
        if (resp.success) {
          console.log(resp)
          this.listData = resp.data.list.filter(item => {
            item.isShowAmount = true
            item.relationMoth = false
            return item
          })
          this.total = resp.data.total
        }
      })
    },
    // 查询
    onSubmit (pageSize, pageNum) {
      this.formData.print = this.johnTab
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/heat/deliveryList', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data.list.filter(item => {
            item.isShowAmount = true
            item.relationMoth = false
            return item
          })
          this.total = resp.data.total
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
    printScore (index, row) {
      this.orderInfo = row
      // this.orderInfo = {
      //   id: row.id,
      //   showWeight: row.showWeight,
      //   showMoney: row.showMoney
      // }
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
