<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>外发订单管理</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="外发单号" prop="outCode">
          <el-input v-model="formData.outCode" placeholder="外发单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="外发日期">
          <el-col>
            <el-form-item prop="outDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.outDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="预定纳期">
          <el-col>
            <el-form-item prop="deliveryDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.deliveryDate"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">正在进行外发</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">已处理外发</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="outCode"
          label="外发单号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="customerAddress"
          label="外发厂商地址">
        </el-table-column>
        <el-table-column
          label="外发部门"
          width="100">
          <template slot-scope="scope">
            {{scope.row.type == 1? '加工': '热处理'}}
          </template>
          <!--1加工，2热处理-->
        </el-table-column>
        <el-table-column
          prop="userName"
          label="外发人员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="outFirm"
          label="外发厂商">
        </el-table-column>
        <el-table-column
          prop="counts"
          label="数量"
          width="50">
        </el-table-column>
        <el-table-column
          label="外发日期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.outDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="已入库"
          width="70">
          <template slot-scope="scope">
            {{scope.row.status == 1? '是': '否'}}
          </template>
          <!--1,是   0：不是-->
        </el-table-column>
        <el-table-column
          label="预定纳期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.deliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="140"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="downBook(scope.$index, scope.row)">下载外发依赖书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 1"
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="outCode"
          label="外发单号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="customerAddress"
          label="外发厂商地址">
        </el-table-column>
        <el-table-column
          label="外发部门"
          width="80">
          <template slot-scope="scope">
            {{scope.row.type == 1? '加工': '热处理'}}
          </template>
          <!--1加工，2热处理-->
        </el-table-column>
        <el-table-column
          prop="userName"
          label="外发人员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="outFirm"
          label="外发厂商">
        </el-table-column>
        <el-table-column
          prop="counts"
          label="数量"
          width="50">
        </el-table-column>
        <el-table-column
          label="外发日期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.outDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="已入库"
          width="70">
          <template slot-scope="scope">
            {{scope.row.status == 1? '是': '否'}}
          </template>
          <!--1,是   0：不是-->
        </el-table-column>
        <el-table-column
          label="预定纳期"
          width="100">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.deliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="240"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="downBook(scope.$index, scope.row)">下载外发依赖书</el-button>
            <el-button
              size="mini"
              type="text"
              @click="getPics(scope.$index, scope.row)">入货照片</el-button>
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
      :visible.sync="elDialog"
      width="800px"
      title="图片库">
      <ul class="imgs cl">
        <li v-for="(item, index) in imgSrcs" :key="'img' + index">
          <img :src="item.src" alt="">
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { getExcel } from "../../http"
export default {
  name: 'index',
  data () {
    return {
      johnTab: 0,
      total: 0,
      elDialog: false,
      imgSrcs: [],
      pageSize: 10,
      pageNum: 1,
      formData: {
        outCode: '',
        deliveryDate: '',
        outDate: '',
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
    getList (pageSize, pageNum, status) {
      this.http('/outward/list', {
        pageSize,
        pageNum,
        status
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    onSubmit (pageSize, pageNum) {
      this.http('/outward/list', {
        ...this.formData,
        pageSize,
        pageNum,
        status: this.johnTab
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.total = resp.data.total
          this.listData = resp.data.list
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
      this.getList(this.pageSize, this.pageNum, this.johnTab)
    },
    // 下载依赖书
    downBook (index, row) {
      getExcel('/outward/get', {
        id: row.id,
        type: row.type
      }).then(res => {
        const blob = new Blob([res])
        const fileName = row.outCode + '.xls'
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
      })
    },
    // 获取照片
    getPics (index, row) {
      this.http('/tImages/list', {
        orderCode: row.outCode
      }).then(resp => {
        this.imgSrcs = []
        resp.data.list.map(item => {
          getExcel('/tImages/getImageById', {
            id: item.id
          }).then(res => {
            let src = 'data:image/jpg;base64,'+ btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            this.imgSrcs.push({
              src,
              id: item.id
            })
          })
        })
      })
      this.elDialog = true
    }
  },
  computed: {
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
  .imgs li {
    float: left;
    width: 150px;
    margin: 10px;
    list-style: none;
  }
  .imgs img {
    width: 100%;
  }
</style>
