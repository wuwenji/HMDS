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
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.acceptTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderCode"
          label="接单号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="customerName"
          width="250"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          align="right"
          width="60"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          align="right"
          width="60"
          label="重量">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="硬度要求">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="200"
          label="特别事项">
        </el-table-column>
        <el-table-column
          prop="taskName"
          width="150"
          label="作业名">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="110"
          label="预定入炉时间">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="预定货期">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="当前使用炉">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="冷却方法">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="入炉时间">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="入炉日期">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="计划货期">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="完成状态">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="出货计划日">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="120"
          label="纳期延迟原因">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          width="100"
          label="延迟天数">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="cutFun(scope.$index, scope.row, '设置')">设置</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="cutFun(scope.$index, scope.row, '详情')">查看详情</el-button>
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
      :width="title === '详情' ? '700px' : '300px'"
      :title="title"
      :visible.sync="dialog">
      <machDetail v-if="dialog && title === '详情'" :orderInfo="sendDate"/>
      <div v-if="dialog && title === '设置'">
        <el-form>
          <el-form-item label="预定入炉时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="预定货期">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="冷却方法">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="计划货期">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <p style="margin-top: 20px; text-align: center;">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </p>
          </el-form-item>
        </el-form>
      </div>
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
      title: '设置',
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
    progress (a, b, c, d) {
      let num = parseInt(a / (b - c) * 100)
      if (b > c) {
        if (num === 100) {
          if (d === 0) {
            return 99
          } else {
            return 100
          }
        } else {
          return num
        }
      } else {
        if (d === 0) {
          return 99
        } else {
          return 100
        }
      }
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
    cutFun (index, row, item) {
      // console.log(index, row)
      this.title = item
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
