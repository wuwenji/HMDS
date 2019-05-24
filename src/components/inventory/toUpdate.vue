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
            prop="latestIoDate"
            label="入出库日期">
          </el-table-column>
          <el-table-column
            prop="soNO"
            label="接单号码">
          </el-table-column>
          <el-table-column
            prop=""
            label="入库时间">
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
            label="包装箱号">
          </el-table-column>
          <el-table-column
            prop="materialType"
            label="钢种材质">
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
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            label="长">
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
        let params = {
          ...this.localData[this.localSelect],
          corpCd,
          divisionCd,
          stockNo,
          whseCd
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
