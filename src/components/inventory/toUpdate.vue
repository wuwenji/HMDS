<template>
  <div>
    <div class="row cl">
      <div class="left">
        <div class="title">smart库</div>
        <el-table
          :data="smartData"
          border
          height="500px">
          <el-table-column
            label="选择"
            fixed
            width="55">
            <template slot-scope="scope">
              <el-radio-group v-model="smartSelect">
                <el-radio :label="scope.$index">&nbsp;</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="whseCd"
            label="smart编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="stockNo"
            label="库存号码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="matCntlNo"
            label="现品管理号"
            width="120">
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
            prop="chargeNo"
            label="溶解编号">
          </el-table-column>
          <el-table-column
            prop="machineShapeCd"
            label="形状">
          </el-table-column>
          <el-table-column
            prop="stockSizeNote"
            label="尺寸">
          </el-table-column>
          <el-table-column
            prop="stockQty"
            align="right"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="stockWt"
            align="right"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="orgSizeNote"
            label="母材尺寸"
            width="180px">
          </el-table-column>
          <el-table-column
            prop="stockRemarks"
            label="放置位置">
          </el-table-column>
          <el-table-column
            prop="stockRemarks"
            label="备注"
            width="200">
          </el-table-column>
          <el-table-column
            prop="latestStockOutDate"
            label="出库日期"
            width="120">
            <template slot-scope="scope">
              {{$store.getters.getDate(scope.row.latestStockOutDate, 2)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="soNo"
            label="接单号码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="latestStockInDate"
            label="入库时间"
            width="120">
            <template slot-scope="scope">
              {{$store.getters.getDate(scope.row.latestStockInDate, 2)}}
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            @size-change="smartSizeChange"
            @current-change="smartNumChange"
            :current-page="smartPageNum"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="smartSize"
            layout="total, sizes, prev, next, jumper"
            :total="smartTotal">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <div class="title">本地库</div>
        <el-table
          :data="localData"
          border
          height="500px">
          <el-table-column
            label="选择"
            fixed
            width="55">
            <template slot-scope="scope">
              <el-radio-group v-model="localSelect">
                <el-radio :label="scope.$index">&nbsp;</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="caseNo"
            label="包装箱号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="materialType"
            label="钢种材质"
            width="120">
          </el-table-column>
          <el-table-column
            prop="changeNo"
            label="溶解编号">
          </el-table-column>
          <el-table-column
            prop="shape"
            label="形状">
          </el-table-column>
          <el-table-column
            prop="size1"
            align="right"
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            align="right"
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            align="right"
            label="长">
          </el-table-column>
          <el-table-column
            prop="stockQty"
            align="right"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="stockWt"
            align="right"
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
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, localData, scope.row.id)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            @size-change="localSizeChange"
            @current-change="localNumChange"
            :current-page="localPageNum"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="localSize"
            layout="total, sizes, prev, next, jumper"
            :total="localTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <p class="btnP">
      <el-button @click="sumbit" type="primary">匹配</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'toUpdate',
  data () {
    return {
      smartPageNum: 1,
      smartSize: 10,
      smartTotal: 0,
      smartSelect: '',
      localPageNum: 1,
      localSize: 10,
      localTotal: 0,
      localSelect: '',
      smartData: [],
      localData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.getSmart(10, 1)
      this.getLocal(10, 1)
    },
    // 匹配
    sumbit () {
      // console.log(this.smartData[this.smartSelect])
      // console.log(this.localData[this.localSelect])
      if (this.smartSelect === '' || this.localSelect === '') {
        this.$message.error('请选择需要绑定的数据')
      } else {
        let corpCd = this.smartData[this.smartSelect].corpCd
        let divisionCd = this.smartData[this.smartSelect].divisionCd
        let stockNo = this.smartData[this.smartSelect].stockNo
        let whseCd = this.smartData[this.smartSelect].whseCd
        let shape = this.smartData[this.smartSelect].machineShapeCd
        let size1 = this.smartData[this.smartSelect].size1
        let size1DecDigit = this.smartData[this.smartSelect].size1DecDigit
        let size2 = this.smartData[this.smartSelect].size2
        let size2DecDigit = this.smartData[this.smartSelect].size2DecDigit
        let size3 = this.smartData[this.smartSelect].size3
        let size3DecDigit = this.smartData[this.smartSelect].size3DecDigit
        // let materialNumber = this.smartData[this.smartSelect].stockNo
        let params = {
          ...this.localData[this.localSelect],
          corpCd,
          divisionCd,
          stockNo,
          whseCd,
          shape,
          size1,
          size1DecDigit,
          size2,
          size2DecDigit,
          size3,
          size3DecDigit
        }
        this.http('/tMaterial/bindData', params).then(resp => {
          console.log(resp)
          if (resp.success) {
            this.getData()
            this.$message({
              type: 'success',
              message: '匹配成功',
              duration: 1000
            })
            this.smartSelect = ''
            this.localSelect = ''
          } else {
            this.$message.error(resp.message)
          }
        })
      }
    },
    // 删除本地库
    deleteRow (index, rows, id) {
      this.http('/tMaterial/deleteByPrimaryKey', id).then(resp => {
        if (resp.success) {
          rows.splice(index, 1)
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    // 获取smart数据
    getSmart (size, num) {
      this.http('/stock/findNotBindListBySelective', {
        pageSize: size,
        pageNum: num
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.smartData = resp.data.list
          this.smartTotal = resp.data.total
        }
      })
    },
    // 获取本地库数据
    getLocal (size, num) {
      this.http('/tMaterial/list', {
        pageSize: size,
        pageNum: num,
        notBindData: '1'
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.localData = resp.data.list
          this.localTotal = resp.data.total
        }
      })
    },
    smartSizeChange (val) {
      this.smartSize = parseInt(`${val}`)
      this.getSmart(this.smartSize, this.smartPageNum)
    },
    smartNumChange (val) {
      this.smartPageNum = parseInt(`${val}`)
      this.getSmart(this.smartSize, this.smartPageNum)
    },
    localSizeChange (val) {
      this.localSize = parseInt(`${val}`)
      this.getLocal(this.smartSize, this.smartPageNum)
    },
    localNumChange (val) {
      this.localPageNum = parseInt(`${val}`)
      this.getLocal(this.smartSize, this.smartPageNum)
    }
  }
}
</script>

<style scoped>
.left {
  float: left;
  width: 50%;
}
.right {
  float: left;
  width: 50%;
}
.title {
  font-size: 20px;
}
.btnP {
  text-align: center;
  margin-top: 20px;
}
.pages {
  text-align: center;
  margin-top: 10px;
}
</style>
