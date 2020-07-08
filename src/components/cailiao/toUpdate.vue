<template>
  <div>
    <el-table
      :data="data2"
      border
      height="600px">
      <el-table-column
        type="index"
        label="序号"
        fixed
        width="55">
      </el-table-column>
      <el-table-column
        prop="仓库名代码"
        label="仓库名代码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="包装箱号"
        label="包装箱号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="钢种"
        label="钢种"
        width="100">
      </el-table-column>
      <el-table-column
        prop="形状"
        label="形状">
      </el-table-column>
      <el-table-column
        prop="厚(mm)"
        label="厚(mm)"
        width="130">
      </el-table-column>
      <el-table-column
        prop="宽(mm)"
        label="宽(mm)">
      </el-table-column>
      <el-table-column
        prop="长(mm)"
        label="长(mm)"
        width="60">
      </el-table-column>
      <el-table-column
        prop="长(mm)"
        align="长(mm)"
        label="厚">
      </el-table-column>
      <el-table-column
        prop="重量(kg)"
        label="重量(kg)">
      </el-table-column>
      <el-table-column
        prop="替换钢种"
        label="替换钢种">
      </el-table-column>
      <el-table-column
        prop="母材尺寸"
        label="母材尺寸">
      </el-table-column>
      <el-table-column
        prop="放置位置"
        label="放置位置">
      </el-table-column>
      <el-table-column
        prop="备注"
        label="备注"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="入出库日期"
        label="入出库日期">
      </el-table-column>
      <el-table-column
        prop="是否标记"
        label="是否标记">
      </el-table-column>
      <el-table-column
        prop="盘点人"
        label="盘点人">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'toUpdate',
  props: ['data2'],
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
        machineShapeCd: ''
      },
      localForm: {
        changeNo: '',
        materialType: '',
        shape: ''
      }
    }
  },
  created () {
    console.log(this.data2)
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
      let obj = JSON.parse(JSON.stringify(this.smartForm))
      if (obj.machineShapeCd === '') {
        delete obj.machineShapeCd
      }
      this.http('/stock/findNotBindListBySelective', {
        pageSize: size,
        pageNum: num,
        ...obj
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
