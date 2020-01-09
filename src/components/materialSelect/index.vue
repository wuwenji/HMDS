<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>自动选料</span>
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
          <el-button type="success" plain @click="research(10, 1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">未选料</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">历史记录</li>
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
          prop="suserName"
          label="营业员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
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
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="selectMaterial(scope.$index, scope.row)">选料</el-button>
            <el-button
              size="mini"
              type="text"
              @click="skipSelect(scope.$index, scope.row)">跳过</el-button>
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
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="suserName"
          label="营业员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="100">
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
      width="1370px"
      title="选料"
      :close-on-click-modal="false"
      :visible.sync="dialog">
      <orderDetail v-if="dialog" :orderInfos="sentData"/>
    </el-dialog>
  </div>
</template>

<script>
import orderDetail from './material'
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
    selectMaterial (a, b) {
      let url = '/orderSelect/selectMaterial/' + b.soNo
      this.http(url).then(resp => {
        console.log('选料', resp)
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
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.research(this.pageSize, this.pageNum)
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
    height: calc(100% - 220px);
  }
</style>
