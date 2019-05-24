<template>
  <div class="container">
    <div class="position">
      所在的位置：盘点管理 -> <span>材料管理</span>
    </div>
    <div class="form" id="form-input">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="场所类型" prop="storageType">
          <el-select @change="typeChange" v-model="formData.storageType" placeholder="场所类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="地面" value="1"></el-option>
            <el-option label="货架" value="2"></el-option>
            <el-option label="特殊货架" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="货架编号" prop="storageId">
          <el-select v-model="formData.storageId" placeholder="货架编号">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="钢种材质" prop="materialType">
          <el-input v-model="formData.materialType" placeholder="钢种材质"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="溶解编号" prop="changeNo">
          <el-input v-model="formData.changeNo" placeholder="溶解编号"></el-input>
        </el-form-item>
        <!--<el-form-item style="width: 110px" class="form-item input-two" label="长" prop="id">-->
          <!--<el-input style="width: 50px" v-model="formData.id" placeholder="长"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item style="width: 110px" class="form-item input-two" label="宽" prop="id">-->
          <!--<el-input style="width: 50px" v-model="formData.id" placeholder="宽"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item style="width: 110px" class="form-item input-two" label="厚" prop="id">-->
          <!--<el-input style="width: 50px" v-model="formData.id" placeholder="厚"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item class="form-item" label="形状" prop="shape">
          <el-select v-model="formData.shape" placeholder="形状">
            <el-option label="全部" value=""></el-option>
            <el-option label="F" value="F"></el-option>
            <el-option label="R" value="R"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <b>
        <!--仓库共计材料：      件   本场所查询结果：   {{total}}  件-->
        <el-button
          size="mini"
          style="float: left;margin-left: 10px;"
          type="primary"
          @click="elDialog = true">打印二维码</el-button>
        <el-button
          size="mini"
          style="float: left;"
          type="primary"
          @click="exportExcel">导出</el-button>
        <el-button
          size="mini"
          style="float: left;"
          type="primary"
          @click="toUpdate">手动匹配</el-button>
        <el-button
          size="mini"
          style="float: left;"
          type="primary"
          @click="updateData">数据同步</el-button>
      </b>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData"
        border
        height="calc(100% - 75px)"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="whseCd"
          label="smart编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stockNo"
          label="库存号码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="matCntlNo"
          label="现品管理号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="caseNo"
          label="包装箱号">
        </el-table-column>
        <el-table-column
          prop="gradeCdKey"
          label="钢种">
        </el-table-column>
        <el-table-column
          prop="changeNo"
          label="溶解编号">
        </el-table-column>
        <el-table-column
          prop="stockSizeNote"
          label="尺寸"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stockQty"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="stockWt"
          label="重量">
        </el-table-column>
        <el-table-column
          prop="orgSizeNote"
          label="母材尺寸"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="storageName"
          label="放置位置"
          width="130">
        </el-table-column>
        <el-table-column
          prop="stockRemarks"
          label="备注"
          width="200">
        </el-table-column>
        <el-table-column
          label="入出库日期"
          width="120">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.latestToDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="soNo"
          label="接单号码"
          width="120">
        </el-table-column>
        <el-table-column
          label="入库时间"
          width="120">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.lastStorageTime, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="printCount"
          label="打印次数">
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
    <el-table
      id="out-table"
      style="display: none"
      :data="multipleSelection">
      <el-table-column
        prop="whseCd"
        label="smart编号">
      </el-table-column>
      <el-table-column
        prop="stockNo"
        label="库存号码">
      </el-table-column>
      <el-table-column
        prop="matCntlNo"
        label="现品管理号">
      </el-table-column>
      <el-table-column
        prop="caseNo"
        label="包装箱号">
      </el-table-column>
      <el-table-column
        prop="gradeCdKey"
        label="钢种">
      </el-table-column>
      <el-table-column
        prop="changeNo"
        label="溶解编号">
      </el-table-column>
      <el-table-column
        prop="stockSizeNote"
        label="尺寸">
      </el-table-column>
      <el-table-column
        prop="stockQty"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="stockWt"
        label="重量">
      </el-table-column>
      <el-table-column
        prop="orgSizeNote"
        label="母材尺寸"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="storageName"
        label="放置位置">
      </el-table-column>
      <el-table-column
        prop="stockRemarks"
        label="备注">
      </el-table-column>
      <el-table-column
        label="入出库日期">
        <template slot-scope="scope">
          {{$store.getters.getDate(scope.row.latestToDate, 2)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="soNo"
        label="接单号码">
      </el-table-column>
      <el-table-column
        label="入库时间">
        <template slot-scope="scope">
          {{$store.getters.getDate(scope.row.lastStorageTime, 2)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="printCount"
        label="打印次数">
      </el-table-column>
    </el-table>
    <el-dialog
      width="610px"
      :visible.sync="elDialog">
      <printQR :qrCodes="qrCodes"/>
    </el-dialog>
    <el-dialog
      title="数据匹配"
      :visible.sync="updateDialog"
      width="1270px">
      <toUpdate v-if="updateDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import printQR from './printQR'
import FileSaver from 'file-saver'
import toUpdate from './toUpdate'
import XLSX from 'xlsx'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      updateDialog: false,
      total: 0,
      johnTab: 0,
      elDialog: false,
      multipleSelection: [],
      qrCodes: [],
      formData: {
        storageType: '',
        storageId: '',
        materialType: '',
        changeNo: '',
        shape: ''
      },
      options: [],
      listData: []
    }
  },
  created () {
    this.getList(1, 10)
  },
  methods: {
    // 获取列表
    getList (pageNum, pageSize) {
      this.http('/tMaterial/list', {
        pageNum,
        pageSize,
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 导出excel
    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '材料.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 查询
    onSubmit (pageSize, pageNum) {
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tMaterial/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 获取货架编号
    typeChange () {
      this.http('/tStorageLocation/find', {
        storageType: this.formData.storageType
      }).then(resp => {
        this.options = []
        if (resp.success) {
          resp.data.map(item => {
            this.options.push({
              label: item.name,
              value: item.id
            })
          })
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
    // 选择数据
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.qrCodes = val.map(item => {
        let obj = {
          id: item.id,
          code: item.qrCode
        }
        return obj
      })
    },
    // 匹配数据
    toUpdate () {
      this.updateDialog = true
    },
    // 更新数据
    updateData () {
      this.http('/tMaterial/initData', {}).then(resp => {
        if (resp.success) {
          this.getList(1, 10)
        } else {
          this.$message.error(resp.message)
        }
      })
    }
  },
  computed: {
  },
  components: {
    printQR,
    toUpdate
  }
}
</script>

<style scoped>
  .john-tab b {
    margin-left: 10px;
  }
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
    width:180px;
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
