<template>
  <div>
    <div class="row cl">
      <div class="left">
        <div class="title">
          smart库
          <span @click="smartExport('smart-table', 'smart库')">导出</span>
          <span @click="smartSeach(100, 1)">搜索</span>
          <input class="form-input" type="text" placeholder="溶解编号" v-model="smartForm.chargeNo">
          <input class="form-input" type="text" placeholder="钢种" v-model="smartForm.gradeCd">
          <select class="form-input" v-model="smartForm.shape" placeholder="形状">
            <option label="全部" value="">全部</option>
            <option label="" value="2MF">2MF</option>
            <option label="" value="4M6F">4M6F</option>
            <option label="" value="6F">6F</option>
            <option label="" value="CC">CC</option>
            <option label="" value="F">F</option>
            <option label="" value="FD">FD</option>
            <option label="" value="M6F">M6F</option>
            <option label="" value="MF">MF</option>
            <option label="" value="MR">MR</option>
            <option label="" value="NO">NO</option>
            <option label="" value="PL">PL</option>
            <option label="" value="R">R</option>
            <option label="" value="RB">RB</option>
            <option label="" value="RD">RD</option>
            <option label="" value="RG">RG</option>
            <option label="" value="S">S</option>
          </select>
        </div>
        <el-table
          id="smart-table"
          :data="smartData"
          border
          height="500px">
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
          <!--<el-table-column-->
          <!--prop="stockSizeNote"-->
          <!--label="尺寸">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="size1"
            align="right"
            sortable
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            align="right"
            sortable
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            align="right"
            sortable
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
                <!--<el-radio :label="scope.$index">&nbsp;</el-radio>-->
                <el-radio :label="scope.row.stockNo">&nbsp;</el-radio>
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
          <!--<el-table-column-->
            <!--prop="stockSizeNote"-->
            <!--label="尺寸">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="size1"
            align="right"
            sortable
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            align="right"
            sortable
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            align="right"
            sortable
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
            :page-sizes="[100, 500, 1000]"
            :page-size="smartSize"
            layout="total, sizes, prev, next, jumper"
            :total="smartTotal">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <div class="title">
          本地库
          <span @click="smartExport('local-table', '本地库')">导出</span>
          <span @click="localSeach(100, 1)">搜索</span>
          <input class="form-input" type="text" placeholder="溶解编号" v-model="localForm.changeNo">
          <input class="form-input" type="text" placeholder="钢种" v-model="localForm.materialType">
          <select class="form-input" v-model="localForm.shape" placeholder="形状">
            <option label="全部" value="">全部</option>
            <option label="" value="2MF">2MF</option>
            <option label="" value="4M6F">4M6F</option>
            <option label="" value="6F">6F</option>
            <option label="" value="CC">CC</option>
            <option label="" value="F">F</option>
            <option label="" value="FD">FD</option>
            <option label="" value="M6F">M6F</option>
            <option label="" value="MF">MF</option>
            <option label="" value="MR">MR</option>
            <option label="" value="NO">NO</option>
            <option label="" value="PL">PL</option>
            <option label="" value="R">R</option>
            <option label="" value="RB">RB</option>
            <option label="" value="RD">RD</option>
            <option label="" value="RG">RG</option>
            <option label="" value="S">S</option>
          </select>
        </div>
        <el-table
          id="local-table"
          :data="localData"
          border
          height="500px">
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
            sortable
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            align="right"
            sortable
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            align="right"
            sortable
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
        </el-table>
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
                <el-radio :label="scope.row.id">&nbsp;</el-radio>
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
            sortable
            label="厚">
          </el-table-column>
          <el-table-column
            prop="size2"
            align="right"
            sortable
            label="宽">
          </el-table-column>
          <el-table-column
            prop="size3"
            align="right"
            sortable
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
            :page-sizes="[100, 500, 1000]"
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'toUpdate',
  data () {
    return {
      smartPageNum: 1,
      smartSize: 100,
      smartTotal: 0,
      smartSelect: '',
      localPageNum: 1,
      localSize: 100,
      localTotal: 0,
      localSelect: '',
      smartData: [],
      localData: [],
      smartForm: {
        chargeNo: '',
        gradeCd: '',
        shape: ''
      },
      localForm: {
        changeNo: '',
        materialType: '',
        shape: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 本地库搜索
    localSeach (size, num) {
      this.http('/tMaterial/list', {
        pageSize: size,
        pageNum: num,
        notBindData: '1',
        ...this.localForm
      }).then(resp => {
        if (resp.success) {
          this.localData = resp.data.list
          this.localTotal = resp.data.total
        }
      })
    },
    // smart库搜索
    smartSeach (size, num) {
      this.http('/stock/findNotBindListBySelective', {
        pageSize: size,
        pageNum: num,
        ...this.smartForm
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.smartData = resp.data.list
          this.smartTotal = resp.data.total
        }
      })
    },
    // 获取数据
    getData () {
      // this.getSmart(100, 1)
      // this.getLocal(100, 1)
      this.localSeach(this.localSize, this.localPageNum)
      this.smartSeach(this.smartSize, this.smartPageNum)
    },
    // 导出excel表
    smartExport (id, string) {
      /* generate workbook object from table */
      // let fix = document.querySelector('.el-table__fixed') // 是否存在浮动列
      let wb = XLSX.utils.table_to_book(document.querySelector('#' + id))
      // if (fix) {
      //   // 存在浮动列就拿掉浮动
      //   wb = XLSX.utils.table_to_book(document.querySelector('#' + id).removeChild(fix))
      //   document.querySelector('#' + id).appendChild(fix)
      // } else {
      //   wb = XLSX.utils.table_to_book(document.querySelector('#' + id))
      // }
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), string + '.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 导出local库
    localExport () {},
    // 匹配
    sumbit () {
      let smart = ''
      this.smartData.map(item => {
        if (item.stockNo === this.smartSelect) {
          smart = item
        }
      })
      let local = ''
      this.localData.map(item => {
        if (item.id === this.localSelect) {
          local = item
        }
      })
      if (this.smartSelect === '' || this.localSelect === '') {
        this.$message.error('请选择需要绑定的数据')
      } else {
        // let corpCd = this.smartData[this.smartSelect].corpCd
        // let divisionCd = this.smartData[this.smartSelect].divisionCd
        // let stockNo = this.smartData[this.smartSelect].stockNo
        // let whseCd = this.smartData[this.smartSelect].whseCd
        // let shape = this.smartData[this.smartSelect].machineShapeCd
        // let size1 = this.smartData[this.smartSelect].size1
        // let size1DecDigit = this.smartData[this.smartSelect].size1DecDigit
        // let size2 = this.smartData[this.smartSelect].size2
        // let size2DecDigit = this.smartData[this.smartSelect].size2DecDigit
        // let size3 = this.smartData[this.smartSelect].size3
        // let size3DecDigit = this.smartData[this.smartSelect].size3DecDigit
        let corpCd = smart.corpCd
        let divisionCd = smart.divisionCd
        let stockNo = smart.stockNo
        let whseCd = smart.whseCd
        let shape = smart.machineShapeCd
        let size1 = smart.size1
        let size1DecDigit = smart.size1DecDigit
        let size2 = smart.size2
        let size2DecDigit = smart.size2DecDigit
        let size3 = smart.size3
        let size3DecDigit = smart.size3DecDigit
        /**/
        let materialType = smart.gradeCd
        let changeNo = smart.chargeNo
        let caseNo = smart.caseNo
        let stockQty = smart.stockQty
        // let materialNumber = this.smartData[this.smartSelect].stockNo
        let params = {
          // ...this.localData[this.localSelect],
          ...local,
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
          size3DecDigit,
          materialType,
          changeNo,
          caseNo,
          stockQty
        }
        this.http('/tMaterial/bindData', params).then(resp => {
          console.log('已匹配')
          console.log(params)
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
      this.smartSeach(this.smartSize, this.smartPageNum)
    },
    smartNumChange (val) {
      this.smartPageNum = parseInt(`${val}`)
      this.smartSeach(this.smartSize, this.smartPageNum)
    },
    localSizeChange (val) {
      this.localSize = parseInt(`${val}`)
      this.localSeach(this.localSize, this.localPageNum)
    },
    localNumChange (val) {
      this.localPageNum = parseInt(`${val}`)
      this.localSeach(this.localSize, this.localPageNum)
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
.title span {
  float: right;
  margin-right: 5px;
  font-size: 12px;
  background: #409EFF;
  border-radius: 4px;
  padding: 4px 10px;
  color: #fff;
  cursor: pointer;
}
.form-input {
  float: right;
  height: 22px;
  width: 100px;
  margin: 0 5px;
  padding: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.pages {
  text-align: center;
  margin-top: 10px;
}
#smart-table,#local-table {
  display: none;
}
</style>
