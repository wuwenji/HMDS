<template>
  <div>
    <p style="text-align: center;margin-bottom: 20px;">
      <!--<el-button v-print="'#printContent'" type="primary"> 打印</el-button>-->
      <el-button @click="exportExcel" type="primary"> 导出</el-button>
      <!--<el-button @click="setUp" type="primary"> 设置</el-button>-->
    </p>
    <div id="printContent" style="position: relative;">
      <div v-for="(value, key) in data.dataList" :key="'print' + key" class="printing-item printPage" style="height: 820px;">
      <div class="top">
        <div class="top-left">
          <p>日期：{{$store.state.date}}</p>
          <p>使用部门：{{type === 0 ? '加工部门' : '热处理部门'}}</p>
        </div>
        <div class="top-content">
          <h2>
            {{type == 0 ? '外发加工采购单' : '热处理加工采购单'}}
          </h2>
        </div>
        <div class="top-right">
          <p>页码：{{key + 1}}/{{data.dataList.length}}</p>
          <p>传票号码：{{data.outCode}}</p>
        </div>
      </div>
      <div class="lists">
        <table border="1" class="table">
          <tr>
            <td style="text-align: left;" colspan="12">
              外发厂家：{{data.companyName}}
            </td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: left;" colspan="13">
              外发厂家地址：{{data.companyAddress}}
            </td>
          </tr>
          <tr class="center-tr">
            <td width="30">序号</td>
            <td width="80">
              {{type == 0 ? '加工票号' : '成绩书票号'}}
            </td>
            <td width="30">钢种</td>
            <td>形状</td>
            <td>尺寸</td>
            <td width="60">加工规格</td>
            <td>件数</td>
            <td>重量</td>
            <td>平方英寸</td>
            <td>预定交期</td>
            <td>计算方式</td>
            <td width="50">单价</td>
            <td width="60">金额</td>
          </tr>
          <tr v-for="(item, index) in value" :key="index">
            <td>
              <template v-if="key === 0">
                {{index + 1}}
              </template>
              <template v-else>
                {{key * 10 + index + 1}}
              </template>
            </td>
            <td>
              {{type == 0 ? item.soNo + '-' + item.soLnNo : item.managementNumber}}
            </td>
            <td>{{item.gradeCd}}</td>
            <td>{{item.machineShapeCd}}</td>
            <td>{{item.machineTolerance}}</td>
            <td>{{type == 0 ? item.machineSpecCd : item.taskName}}</td>
            <td class="john-right">{{item.soQty}}</td>
            <td class="john-right">{{item.soWt ? item.soWt.toFixed(2) : ''}}</td>
            <td class="john-right">{{item.area ? (item.area * item.soQty).toFixed(2) : ''}}</td>
            <td class="john-right">
              {{$store.getters.getDate(item.contDueDate, 2)}}
            </td>
            <td width="100">
              <el-select @change="selectChange(item)" v-model="item.priceType" size="mini">
                <el-option
                  v-if="type === 0"
                  label="件数"
                  value="0"></el-option>
                <el-option
                  label="重量"
                  value="1"></el-option>
                <el-option
                  label="平方英寸"
                  v-if="type === 0"
                  value="2"></el-option>
                <el-option
                  label="包炉"
                  v-if="type === 1"
                  value="4"></el-option>
                <el-option
                  label="最低消费"
                  value="3"></el-option>
              </el-select>
            </td>
            <td>
              <!--{{item.unitPrice}}-->
              <input class="price-input" type="text" v-model="item.unitPrice">
            </td>
            <td class="john-right">
              {{getTotal(item)}}
            </td>
          </tr>
          <tr v-for="itemKey in (10 - value.length)" :key="'itemKey' + itemKey">
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <p>受委托加工方</p>
          <p>客户签名/盖章</p>
        </div>
        <div class="bottom-right">
          <p>委托加工方</p>
          <p>日立金属（东莞）特殊钢有限公司</p>
        </div>
      </div>
        <el-dialog
          width="500px"
          append-to-body
          title="设置"
          height="400px"
          :visible.sync="setUpDialog">
          <table class="table">
            <tr>
              <td colspan="4" style="color: red;text-align: left; font-size: 12px;">
                单位：元/KG
              </td>
            </tr>
            <tr>
              <td>A</td>
              <td>
                <el-input type="text"></el-input>
              </td>
              <td>BC</td>
              <td>
                <el-input type="text"></el-input>
              </td>
            </tr>
            <tr>
              <td>A</td>
              <td>
                <el-input type="text"></el-input>
              </td>
              <td>BC</td>
              <td>
                <el-input type="text"></el-input>
              </td>
            </tr>
            <tr>
              <td>A</td>
              <td>
                <el-input type="text"></el-input>
              </td>
              <td>BC</td>
              <td>
                <el-input type="text"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <el-button type="success">保存</el-button>
              </td>
            </tr>
          </table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getExcel } from '../../http'

export default {
  name: 'taskBook',
  props: ['order'],
  data () {
    return {
      select: '',
      setUpDialog: false,
      data: ''
    }
  },
  created () {
    // this.data = JSON.parse(JSON.stringify(this.order))
    this.getData(this.order)
  },
  methods: {
    // 设置
    setUp () {
      this.setUpDialog = true
    },
    // 获取总金额
    getTotal (row) {
      if (row.priceType === '0') {
        row.totalPrice = row.soQty * row.unitPrice
        return (row.soQty * row.unitPrice).toFixed(2)
      }
      if (row.priceType === '1') {
        row.totalPrice = row.soWt * row.unitPrice
        return (row.soWt * row.unitPrice).toFixed(2)
      }
      if (row.priceType === '2') {
        row.totalPrice = row.area * row.unitPrice
        return (row.area * row.unitPrice * row.soQty).toFixed(2)
      }
      if (row.priceType === '3' || row.priceType === '4') {
        row.totalPrice = row.unitPrice
        return (row.unitPrice).toFixed(2)
      }
      return '0.00'
    },
    // 改变计算方式
    selectChange (row) {
      // row.unitPrice = 100
      this.http('/general/getHeatPrice', {
        companyId: this.order.companyId,
        gradeCd: row.gradeCd,
        heatType: row.taskName,
        priceType: row.priceType
      }).then(resp => {
        // console.log('计算', resp)
        if (resp.success) {
          if (resp.data === null) {
            row.unitPrice = 0
          } else {
            row.unitPrice = resp.data
          }
        }
      })
    },
    // 获取数据
    getData (obj) {
      let newData = JSON.parse(JSON.stringify(obj))
      newData.dataList.map(item => {
        item.map(itemVal => {
          itemVal.priceType = ''
          itemVal.unitPrice = 0
          itemVal.totalPrice = 0
          return itemVal
        })
        return item
      })
      this.data = newData
    },
    // 导出
    exportExcel () {
      console.log('打印数据', this.data)
      getExcel('/outward/downExcel', this.data).then(res => {
        const blob = new Blob([res])
        const fileName = '采购单.xls'
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
    }
  },
  computed: {
    type () {
      if (this.order.type === 1) {
        return 0
      } else {
        return 1
      }
    }
  }
}
</script>

<style scoped>
  * {
    font-family: 宋体;
  }

  .price-input {
    width: 70px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 25px;
    padding: 0 5px;
  }
  .top {
    height: 50px;
  }

  .top-left {
    float: left;
    width: 200px;
    line-height: 27px;
  }

  .top-right {
    float: right;
    width: 200px;
    line-height: 27px;
    text-align: right;
  }

  .top-content {
    text-align: center;
    float: left;
    width: calc(100% - 400px);
  }

  .table {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .table td {
    padding: 10px 10px;
  }

  .table td:first-child {
    text-align: center;
  }

  .center-tr td {
    text-align: center;
    padding: 15px 5px;
  }

  .bottom {
    line-height: 30px;
    position: absolute;
    bottom: 20px;
    width: 100%;
  }

  .bottom .bottom-left {
    float: left;
  }

  .bottom-left p:first-child, .bottom-right p:first-child {
    border-bottom: 1px solid #000;
    width: 220px;
  }

  .bottom .bottom-right {
    float: right;
  }
</style>
