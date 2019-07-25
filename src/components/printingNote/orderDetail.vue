<template>
  <div>
    <div v-show="showContent == 1">
      <table class="info-table">
        <tr>
          <td>客户：{{lists[0].contName}}</td>
          <td>最终客户：{{lists[0].custName}}</td>
          <td>加工类型：{{getTypeTw(lists[0].workInstCd)}}</td>
          <td>接单时间：{{$store.getters.getDate(lists[0].soDate, 2)}}</td>
        </tr>
        <tr>
          <td>接单号：{{lists[0].soNo}}</td>
          <td>营业员：{{lists[0].sUserName}}</td>
          <td>发件人：{{lists[0].entryUserName}}</td>
          <td>交期时间：{{$store.getters.getDate(lists[0].contDueDate, 2)}}</td>
        </tr>
      </table>
      <el-table
        border
        ref="table"
        @selection-change="selectChange"
        :data="lists">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="接单行号">
          <template slot-scope="scope">
            {{scope.row.soNo + '-' + scope.row.soLnNo}}
          </template>
        </el-table-column>
        <el-table-column
          prop="soQty"
          align="right"
          label="指示数量">
        </el-table-column>
        <el-table-column
          prop="soWt"
          align="right"
          label="重量">
        </el-table-column>
        <el-table-column
          label="是否完成">
          <template slot-scope="scope">
            {{scope.row.status == 1? '已完成': '未完成'}}
          </template>
        </el-table-column>
        <el-table-column
          label="已打印">
          <template slot-scope="scope">
            {{scope.row.isDelivery == 1? '是': '否'}}
          </template>
        </el-table-column>
      </el-table>
      <p class="btn">
        <el-button @click="looking" type="primary">预览</el-button>
      </p>
    </div>
    <div class="table-line-height" v-show="showContent == 2">
      <p class="btn">
        <el-button id="bunt" v-print="'#printContent'" type="primary">打印</el-button>
        <el-button @click="printing" type="primary">打印</el-button>
        <el-button @click="showContent = 1" type="primary">返回</el-button>
      </p>
      <div v-if="orderDetail.length > 0" id="printContent">
        <div style="height:1480px;page-break-after: always;" v-for="(deliveryItem, deliveKey) in dataLists" :key="'cdb' + deliveKey">
          <table class="table">
            <tr>
              <td rowspan="3" valign="top" align="right" style="position: relative; font-size: 23px;">
                <img class="logo" src="../../../static/images/logo.jpg" alt="">
                日立金属（东莞）特殊钢有限公司 本部</td>
              <td>
                <span>邮编：</span>523380
                <span style="width: 190px;">HMDS-QR-49-{{orderInfo.source == 1? 1 : 2}}/A0</span>
                <span style="width: 60px;">page：</span>1/1
              </td>
            </tr>
            <tr>
              <td>
                <span>电话：</span>86-769-8640-6726
                <span style="width: 60px;">传真：</span>86-769-8640-6716
              </td>
            </tr>
            <tr>
              <td>
                <span>地址：</span>广东省东莞市茶山镇茶山工业园
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span style="width: 90px;">致：</span>{{orderDetail[0].contKname}}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span>货送至：</span>{{orderDetail[0].shipToName}}
              </td>
            </tr>
            <tr>
              <td>
                <span><p>&nbsp;</p></span>{{orderDetail[0].shipToNameAdd}}
              </td>
              <td>
                <span>账号：</span>{{orderDetail[0].sBarnchUserDef1}}
              </td>
            </tr>
            <tr>
              <td>
                <span><p>&nbsp;</p></span>{{orderDetail[0].shipToAddress1}}
              </td>
              <td>
                <span><p>&nbsp;</p></span>{{orderDetail[0].sBarnchUserDef2}}
              </td>
            </tr>
            <tr>
              <td> <span><p>&nbsp;</p></span>{{orderDetail[0].shipToAddress2}}</td>
              <td>
                <span>营业员：</span>{{orderDetail[0].sUserName}}
              </td>
            </tr>
            <tr>
              <td> <span><p>&nbsp;</p></span>{{orderDetail[0].shipToAddress3}}</td>
              <td>
                <span>送货单号：</span>{{orderDetail[0].soNo}}
                <span>日期：</span>{{$store.state.date.replace('年', '/').replace('月', '/').replace('日', '')}}
              </td>
            </tr>
          </table>
          <div class="title">
            <span>电话：{{orderDetail[0].shipToTelno}}</span>
            <h2>热处理送货单</h2>
          </div>
          <table border="0" class="table-list">
            <thead>
            <tr>
              <td></td>
              <td colspan="7">产品规格说明</td>
            </tr>
            <tr>
              <td>项目</td>
              <td>订单号</td>
              <td>接单号</td>
              <td>单位</td>
              <td style="text-align: right;">数量(件)</td>
              <td style="text-align: right;">重量(KG)</td>
              <td style="text-align: right;">接单单价(RMB)</td>
              <td style="text-align: right;">金额(RMB)</td>
            </tr>
            <tr>
              <td></td>
              <td colspan="6">备注</td>
              <td>最终客户订单</td>
            </tr>
            </thead>
            <tbody v-for="(item, key) in deliveryItem" :key="key">
            <tr>
              <td></td>
              <td colspan="7">{{item.specExternalNote}}</td>
            </tr>
            <tr>
              <td>{{item.NO}}</td>
              <td>{{item.contPoNo}}</td>
              <td>{{item.soNo + '-' + item.soLnNo}}</td>
              <td>{{getPeice(item.unitPriceCd)}}</td>
              <td  style="text-align: right;">{{item.soQty}}</td>
              <td  style="text-align: right;">{{$store.getters.toThousand(item.soWt, 2)}}</td>
              <td  style="text-align: right;">{{orderInfo.isShowAmount? $store.getters.toThousand(item.soUnitPrice, 2) : ''}}</td>
              <td  style="text-align: right;">
                {{orderInfo.isShowAmount? $store.getters.toThousand(getTotal(item), 2): ''}}
              </td>
            </tr>
            <tr>
              <td></td>
              <td colspan="6">
                {{item.lineRemarks}}
                {{orderInfo.relationMoth ? item.chargeNo + '' + item.stockSizeNote: ''}}
              </td>
              <td>{{item.custPoNo}}&nbsp;</td>
            </tr>
            </tbody>
            <template v-if="(deliveKey + 1) == dataLists.length">
              <tr class="total-tr" v-if="orderInfo.isShowAmount">
                <td></td>
                <td></td>
                <td>合计</td>
                <td></td>
                <td style="text-align: right;">{{numTotal}}</td>
                <td style="text-align: right;">
                  {{$store.getters.toThousand(wetTotal, 2)}}
                </td>
                <td></td>
                <td style="text-align: right;">{{orderInfo.isShowAmount? $store.getters.toThousand(mnyTotal, 2): ''}}</td>
              </tr>
              <tr class="total-tr" v-else>
                <td></td>
                <td></td>
                <td>合计</td>
                <td></td>
                <td style="text-align: right;">{{numTotal}}</td>
                <td style="text-align: right;">
                  {{$store.getters.toThousand(wetTotal, 2)}}
                </td>
                <td></td>
                <td style="text-align: right;"></td>
              </tr>
            </template>
          </table>
          <div v-if="(deliveKey + 1) == dataLists.length" class="bottom">
            <p>注意：<br/>无商业价值</p>
            <div class="bottom-center">
              （热处理种类)<br/>
              <ol>
                <li>淬火----------------A</li>
                <li>时效后处理---------AG</li>
                <li>除去炉力还火-------RA</li>
                <li>深冷处理-----------SZ</li>
                <li>淬火，回火---------QT</li>
                <li>特殊气体处理-------NVC</li>
                <li>回火----------------T</li>
                <li>其它----------------E</li>
                <li>圆熔化热处理-------ST</li>
              </ol>
            </div>
            <p>
              <span>客户公章</span>
              <span>日立金属（东莞）特殊钢有限公司</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  props: ['orderInfo'],
  data () {
    return {
      orderDetail: [],
      showContent: 1,
      selectValue: [],
      dataLists: [],
      lists: [],
      numTotal: 0,
      wetTotal: 0,
      mnyTotal: 0
    }
  },
  created () {
    console.log(this.orderInfo)
    this.getData()
  },
  watch: {
    orderInfo () {
      this.getData()
    }
  },
  methods: {
    // 获取订单类型
    getTypeTw (numb) {
      if (numb === '1') return '整条'
      if (numb === '2') return '切断'
      if (numb === '3') return '切断&加工'
      if (numb === '5') return '热处理'
      if (numb === '6') return '切断&加工&热处理'
    },
    // 默认选中
    toggleRow (row) {
      this.$refs.table.toggleRowSelection(row, true)
    },
    // 表格选择
    selectChange (val) {
      this.selectValue = val
    },
    getData () {
      this.http('/heat/printHeatOrder', this.orderInfo.id).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.selectValue = []
          this.lists = resp.data
          resp.data.map(item => {
            if (item.status === 1) {
              this.selectValue.push(item)
              this.$nextTick(() => {
                this.toggleRow(item)
              })
            }
          })
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    // 获取单位
    getPeice (a) {
      if (a === '2') return 'KG'
      if (a === '7') return '個'
      if (a === '8') return '件'
    },
    // 计算总金额
    getTotal (item) {
      if (this.orderInfo.isShowAmount) {
        if (item.unitPriceCd === '2') {
          if (item.itemName2) {
            if (item.itemName2.indexOf('实际') > -1) {
              let momen = item.actualWeight === null ? 0 : item.actualWeight
              let out = item.outWeight === null ? 0 : item.outWeight
              return item.soUnitPrice * ( momen + out )
            } else {
              return item.soUnitPrice * item.soWt
            }
          } else {
            return item.soUnitPrice * item.soWt
          }
        } else {
          return item.soUnitPrice * item.soQty
        }
      } else {
        return '*'
      }
    },
    // 打印次数
    printing () {
      let parameters = []
      this.orderDetail.map(item => {
        parameters.push({
          soNo: item.soNo,
          soLnNo: item.soLnNo,
          workInstCd: item.workInstCd
        })
      })
      // console.log(parameters)
      this.http('/tSalesOrder/isDelivery', parameters).then(resp => {
        // console.log(resp)
        // if (resp.success) {
        //   document.getElementById('bunt').click()
        // }
        console.log(resp)
        if (resp.success) {
          document.getElementById('bunt').click()
        } else {
          this.$message.error(resp.message)
        }
      })
      // this.http('/tSalesOrder/isDelivery', {
      //   corpCd: this.orderInfo.corpCd,
      //   divisionCd: this.orderInfo.divisionCd,
      //   soNo: this.orderInfo.soNo,
      //   soLnNo: this.orderInfo.soLnNo,
      //   isDelivery: 1
      // }).then(resp => {
      //   document.getElementById('bunt').click()
      //   // console.log(resp)
      //   // if (resp.success) {
      //   //   document.getElementById('bunt').click()
      //   // } else {
      //   //   this.$message.error(resp.message)
      //   // }
      // })
    },
    // 预览
    looking () {
      this.numTotal = 0
      this.wetTotal = 0
      this.mnyTotal = 0
      this.orderDetail = this.selectValue.map((item, index) => {
        this.numTotal = this.numTotal + item.soQty
        this.wetTotal = this.wetTotal + item.soWt
        this.mnyTotal = this.mnyTotal + this.getTotal(item)
        item.NO = index + 1
        return item
      })
      this.showContent = 2
      this.dataLists = []
      for (let i = 0; i < this.orderDetail.length; i += 16) {
        this.dataLists.push(this.orderDetail.slice(i, i + 16))
      }
      console.log(this.dataLists)
    }
  }
}
</script>

<style scoped>
  * {
    /*font-family: 宋体;*/
    font-size: 19px;
    line-height: 21px;
  }
  .logo {
    width: 100px;
    position: absolute;
    left: 30px;
    bottom: 0px;
  }
  .table-line-height {
    /*line-height: 30px;*/
  }
  .info-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .info-table td {
    padding: 7px 0;
    color: #666;
  }
  #bunt {
    display: none;
  }
  #printContent {
    /*height: 1500px;*/
    position: relative;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 1070px;
  }
  .bottom p:nth-child(1){
    text-align: center;
    margin-bottom: 70px;
  }
  .bottom p span:nth-child(1) {
    float: left;
    border-top: 1px solid #000;
    width: 200px;
    padding-top: 10px;
    text-align: center;
  }
  .bottom p span:nth-child(2) {
    float: right;
    border-top: 1px solid #000;
    width: 300px;
    padding-top: 10px;
    text-align: center;
  }
  table {
    width: 1075px;
  }
  .table td {
    width: 50%;
  }
  .bottom-center li {
    list-style: none;
    float: left;
    font-size: 13px;
  }
  .bottom-center li:nth-child(odd) {
    margin-right: 60px;
  }
  .bottom-center {
    border: 1px solid #555;
    width: 350px;
    margin-left: 300px;
    position: absolute;
    font-size: 13px;
    top: 50px;
    padding: 10px;
  }
  .table td span {
    width: 110px;
    display: inline-block;;
    text-align: right;
    margin-right: 10px;
  }
  .table-list {
    border-collapse: collapse;
  }
  .table-list td{
    text-align: left;
  }
  .table-list thead {
    border: 1px solid #000;
  }
  .table-list tbody{
    padding: 5px;
    border: 1px solid #000;
    border-top: none;
  }
  .table-list th {
    /*padding: 3px;*/
    background: #efefef;
    text-align: left;
  }
  .table-list th:nth-child(1) {
    text-align: center;
  }
  .table-list td:nth-child(1) {
    text-align: center;
  }
  .p-spans span{
    width: 30px;
    display: inline-block;
  }
  .p-spans span:last-child {
    width: 50px;
  }
  .title {
    text-align: center;
    margin: 20px 0 5px 0;
    width: 1075px;
  }
  .title h2 {
    font-size: 30px;
  }
  .title span {
    float: left;
    position: absolute;
    left: 40px;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
  .total-tr td {
    padding-top: 10px;
  }
</style>
