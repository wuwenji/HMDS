<template>
  <div class="container">
    <div class="position">
      所在的位置：进度查询 -> <span>切断/切断&加工</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="orderCode">
          <el-input v-model="formData.orderCode" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="发件人" prop="entryUserName">
          <el-input v-model="formData.entryUserName" placeholder="发件人"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="acceptTimeStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.acceptTimeStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="deliveryTimeStr">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formData.deliveryTimeStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="research(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">切断</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">切断&加工</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="orderCode"
          label="接单号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="customerName"
          min-width="210"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          width="130"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.deliveryTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="110">
          <template slot-scope="scope">
            {{scope.row.type == 2? '切断' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="材料数量"
          align="right"
          width="80">
        </el-table-column>
        <el-table-column
          prop="cutCount"
          label="已切断数量"
          align="right"
          width="100">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            {{scope.row.status == 0? '未完成' : '已完成'}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成度"
          width="200">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress(scope.row.cutCount, scope.row.totalCount, scope.row.status)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="110">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="cutFun(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 1"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="orderCode"
          label="接单号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          width="130"
          label="发件人">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.deliveryTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="130">
          <template slot-scope="scope">
            切断&加工
            <!--{{scope.row.type == 1? '切断' : '加工'}}-->
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="材料数量"
          align="right"
          width="80">
        </el-table-column>
        <el-table-column
          prop="cutCount"
          label="已切断数量"
          align="right"
          width="100">
        </el-table-column>
        <el-table-column
          label="已加工数量"
          align="right"
          width="100">
          <template slot-scope="scope">
            {{scope.row.machineCount + scope.row.outwardCount}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            {{returnType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成度"
          width="200">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress(scope.row.machineCount, scope.row.totalCount, 3, scope.row.outwardCount)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="110">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="cutFun(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumb"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialog"
      width="1400px">
      <cutDetail v-if="johnTab == 0" :orderInfo="sentData" />
      <machDetail v-if="johnTab == 1" :orderInfo="sentData" />
    </el-dialog>
  </div>
</template>

<script>
import cutDetail from './cutDetail'
import machDetail from './machDetail'
export default {
  name: 'index',
  data () {
    return {
      currentPage: 1,
      dialog: false,
      pageSize: 10,
      pageNumb: 1,
      johnTab: 0,
      sentData: '',
      total: 0,
      formData: {
        orderCode: '',
        acceptTimeStr: '',
        deliveryTimeStr: '',
        entryUserName: ''
      },
      listData: []
    }
  },
  created () {
    this.getList(1, 10)
  },
  methods: {
    // 返回加工状态
    returnType (item) {
      if (item.outwardStatus) {
        return item.outwardStatus === 0 ? '外发中' : '已完成'
      } else {
        if (item.totalCount === item.machineCount + item.outwardCount) {
          return '已完成'
        }
        return '未完成'
      }
    },
    getList (num, size) {
      if (this.johnTab === 0) {
        this.http('/cut/list', {
          pageNum: num,
          pageSize: size
        }).then(resp => {
          // console.log('切断')
          if (resp.success) {
            this.total = resp.data.total
            this.listData = resp.data.list
          }
        })
      }
      if (this.johnTab === 1) {
        this.http('/machining/list', {
          pageNum: num,
          pageSize: size
        }).then(resp => {
          // console.log('加工')
          if (resp.success) {
            this.total = resp.data.total
            this.listData = resp.data.list
          }
        })
      }
    },
    onSubmit () {
      console.log(this.formData)
    },
    progress (a, b, c, d) {
      let pre = 0
      let dd = d || 0
      if (b === 0) {
        return 0
      } else {
        pre = parseInt((a + dd) / b * 100)
      }
      if (pre === 100) {
        if (c === 0) {
          return 99
        } else if (c === 1) {
          return 100
        } else {
          return 100
        }
      } else {
        return pre
      }
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
      this.sentData = row
      this.dialog = true
    },
    addFun (index, row) {
      console.log(index, row)
    },
    tabClick (index) {
      this.johnTab = index
      this.getList(1, 10)
    },
    research (pageSize, pageNum) {
      this.formData.pageNum = pageNum
      this.formData.pageSize = pageSize
      if (this.johnTab === 0) {
        this.http('/cut/list', this.formData).then(resp => {
          console.log(resp)
          if (resp.success) {
            this.pageNum = pageNum
            this.pageSize = pageSize
            this.total = resp.data.total
            this.listData = resp.data.list
          }
        })
      }
      if (this.johnTab === 1) {
        this.http('/machining/list', this.formData).then(resp => {
          if (resp.success) {
            this.pageNum = pageNum
            this.pageSize = pageSize
            this.total = resp.data.total
            this.listData = resp.data.list
          }
        })
      }
    },
    prinClick () {
      this.$refs.easyPrint.print()
    }
  },
  computed: {
  },
  components: {
    cutDetail,
    machDetail
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
