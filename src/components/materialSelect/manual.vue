<template>
  <div class="container">
    <div class="form" id="form-input" style="text-align: left;">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="库存号码" prop="stockNo">
          <el-input size="mini" v-model="formData.stockNo" placeholder="库存号码"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="溶解编号" prop="changeNo">
          <el-input size="mini" v-model="formData.changeNo" placeholder="溶解编号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="钢种" prop="materialType">
          <el-input size="mini" v-model="formData.materialType" placeholder="钢种"></el-input>
        </el-form-item>
        <el-form-item class="join-input-row" label="厚">
          <el-col :span="11">
            <el-form-item prop="size1Start">
              <el-input size="mini" v-model="formData.size1Start"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="" :span="2" class="line">- </el-col>
          <el-col :span="11">
            <el-form-item prop="size1End">
              <el-input size="mini" v-model="formData.size1End"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="join-input-row" label="宽">
          <el-col :span="11">
            <el-form-item prop="size2Start">
              <el-input size="mini" v-model="formData.size2Start"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="" :span="2" class="line">- </el-col>
          <el-col :span="11">
            <el-form-item prop="size2End">
              <el-input size="mini" v-model="formData.size2End"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="join-input-row" label="长">
          <el-col :span="11">
            <el-form-item prop="size3Start">
              <el-input size="mini" v-model="formData.size3Start"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="" :span="2" class="line">- </el-col>
          <el-col :span="11">
            <el-form-item prop="size3End">
              <el-input size="mini" v-model="formData.size3End"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="onSubmit(100, 1)">查询</el-button>
        </el-form-item>
        <div class="cl"></div>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="500px">
        <el-table-column
          prop="stockNo"
          label="库存号码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gradeCdKey"
          label="钢种"
          width="130">
        </el-table-column>
        <el-table-column
          prop="changeNo"
          label="溶解编号">
        </el-table-column>
        <el-table-column
          prop="shape"
          label="形状"
          width="60">
        </el-table-column>
        <el-table-column
          prop="size1"
          sortable
          align="right"
          label="厚">
        </el-table-column>
        <el-table-column
          prop="size2"
          sortable
          align="right"
          label="宽">
        </el-table-column>
        <el-table-column
          prop="size3"
          sortable
          align="right"
          label="长">
        </el-table-column>
        <el-table-column
          prop="stockQty"
          sortable
          align="right"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="stockWt"
          sortable
          align="right"
          label="重量">
        </el-table-column>
        <el-table-column
          label="是否已选"
          width="80px">
          <template slot-scope="scope">
            {{scope.row.selectEndTime ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="replaceGrade"
          label="替换钢种">
          <template slot-scope="scope">
            {{scope.row.replaceGrade ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="选料时间"
          width="140">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.selectEndTime, 1)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="selectSoNo"
          label="已选接单"
          width="130">
          <template slot-scope="scope">
            <ul class="sono-list">
              <li v-for="(item, key) in getSoNos(scope.row.selectSoNo)" :key="item + key" @click="getSoNoDetail(item)">{{item}}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="80">
          <template slot-scope="scope">
            <el-button @click="dataSelect(scope.row)" type="primary" size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 500, 1000, 2000, 3000, 5000]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="详情"
      append-to-body
      width="900px"
      :visible.sync="soNodetailShow">
      <table class="table" border="1">
        <tr>
          <td><b>接单号码</b></td>
          <td>{{soNoDetail.soNo}}</td>
          <td><b>接单行号</b></td>
          <td>{{soNoDetail.soLnNo}}{{soNoDetail.lnNo ? '-' + soNoDetail.lnNo : ''}}</td>
          <td><b>溶解号码</b></td>
          <td>{{soNoDetail.chargeNo}}</td>
          <td><b>指示数量</b></td>
          <td>{{soNoDetail.soQty}}</td>
        </tr>
        <tr>
          <td><b>要求尺寸</b></td>
          <td>
            {{soNoDetail.machineShapeCd}}{{soNoDetail.size1}}X {{soNoDetail.size2 > 0? soNoDetail.size2 + 'X' : ''}} {{soNoDetail.size3}}
          </td>
          <td><b>已选料尺寸</b></td>
          <td colspan="2">{{soNoDetail.stockSizeNote}}</td>
          <td><b>指示尺寸</b></td>
          <td colspan="2">
            {{soNoDetail.machineShapeCd}}
            {{soNoDetail.instSize1}}X<template v-if="soNoDetail.instSize2 > 0">{{soNoDetail.instSize2}}X</template>{{soNoDetail.instSize3}}
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 100,
      soNodetailShow: false,
      soNoDetail: '',
      total: 0,
      formData: {
        size1Start: '',
        size2Start: '',
        size3Start: '',
        size1End: '',
        size2End: '',
        size3End: '',
        materialType: '',
        changeNo: '',
        stockNo: ''
      },
      listData: []
    }
  },
  created () {
    this.getList(1, 100)
  },
  methods: {
    // 字符串转
    getSoNos (string) {
      if (string) {
        return string.split(',')
      }
    },
    // 获取详情
    getSoNoDetail (soNo) {
      let url = '/orderSelect/soLnNoDetail/' + soNo
      this.http(url).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.soNoDetail = resp.data
          this.soNodetailShow = true
        } else {
          this.$message.error({
            message: resp.message,
            duration: 1000
          })
        }
      })
    },
    // 数据选择
    dataSelect (value) {
      this.$parent.handSelectData(value)
    },
    // 获取列表
    getList (pageNum, pageSize) {
      this.http('/tMaterial/list', {
        pageNum,
        pageSize,
        inStock: 1
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 查询
    onSubmit (pageSize, pageNum) {
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tMaterial/list', this.formData).then(resp => {
        console.log(resp)
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
    }
  },
  computed: {
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
  .input-row {
    display: inline-block;
    line-height: 38px;
  }
  .input-row label {
    margin-right: 7px;
  }
  .input-left,.input-right,.input-center {
    display: inline-block;
  }
  .btns {
    float: right;
    margin-top: 10px;
  }
  .block {
    text-align: right;
    padding: 20px 10px;
    background: #efefef;
    border: 1px solid #ddd;
    border-top: none;
  }
  .data-list {
    height: calc(100% - 230px);
  }
  .form-item {
    width: 170px;
  }
  .sono-list li {
    list-style: none;
    cursor: pointer;
    color: blue;
  }
  .table {
    width: 100%;
  }
  .table td {
    padding: 10px;
  }
</style>
