<template>
  <div class="container">
    <div class="position">
      所在的位置：进度查询 -> <span>热处理进度</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="orderCode">
          <el-input v-model="formData.orderCode" placeholder="接单号"></el-input>
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
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="john-tab">-->
      <!--<ul>-->
        <!--<li :class="{active: johnTab == 0}">热处理</li>-->
      <!--</ul>-->
    <!--</div>-->
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
          label="客户">
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
            {{scope.row.type == 1? '切断' : '加工'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="材料数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="heatCount"
          label="已处理数量"
          width="100">
          <template slot-scope="scope">
            {{scope.row.heatCount + scope.row.scrapCount}}
          </template>
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
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress(scope.row.heatCount, scope.row.totalCount, scope.row.scrapCount)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
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
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      width="1400px"
      title="详情"
      :visible.sync="dialog">
      <machDetail v-if="dialog" :orderInfo="sendDate"/>
    </el-dialog>
  </div>
</template>

<script>
import machDetail from './machDetail'
export default {
  name: 'index',
  data () {
    return {
      johnTab: 0,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      dialog: false,
      sendDate: '',
      formData: {
        orderCode: '',
        acceptTimeStr: '',
        deliveryTimeStr: ''
      },
      listData: []
    }
  },
  created () {
    this.getData(1, 10)
  },
  methods: {
    getData (pageNum, pageSize) {
      this.http('/heat/list', {
        pageNum,
        pageSize
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    onSubmit (pageSize, pageNum) {
      this.formData.pageNum = pageNum
      this.formData.pageSize = pageSize
      this.http('/heat/list', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    progress (a, b, c) {
      return parseInt(a / (b - c) * 100)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val} `)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val} `)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    cutFun (index, row) {
      // console.log(index, row)
      this.sendDate = row
      this.dialog = true
    },
    addFun (index, row) {
      console.log(index, row)
    }
  },
  computed: {
  },
  components: {
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
    height: calc(100% - 130px);
  }
</style>
