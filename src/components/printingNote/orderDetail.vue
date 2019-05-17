<template>
  <div>
    <div id="printContent">
      <table class="table">
        <tr>
          <td rowspan="3" align="right" style="font-size: 20px; position: relative;text-align: left;" >
            <img class="logo" src="../../../static/images/logo.jpg" alt="">
            <strong style="margin-left: 130px;">日立金属（东莞）特殊钢有限公司 本部</strong>
          </td>
          <td>
            <span>邮编：</span>523380
            <span style="width: 150px;">HMDS-QR-49-1/A0</span>
            <span>page：</span>1/1
          </td>
        </tr>
        <tr>
          <td>
            <span>电话：</span>86-769-8640-6726
            <span>传真：</span>86-769-8640-6716
          </td>
        </tr>
        <tr>
          <td>
            <span>地址：</span>广东省东莞市茶山镇茶山工业园
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span>致：</span>{{orderDetail[0].contKname}}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span>货送至：</span>{{orderDetail[0].custKname}}
          </td>
        </tr>
        <tr>
          <td>
            <span><p>&nbsp;</p></span>{{orderDetail[0].shipToAddress2}}
          </td>
          <td>
            <span>账号：</span>三菱东京日联银行（中国）有限公司深圳分行
          </td>
        </tr>
        <tr>
          <td>
            <span><p>&nbsp;</p></span>{{orderDetail[0].shipToAddress1}}
          </td>
          <td>
            <span><p>&nbsp;</p></span>302651
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <span>营业员：</span>{{orderDetail[0].sUserName}}
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <span>送货单号：</span>{{orderDetail[0].soNo}}
            <span>日期：</span>{{$store.state.date.replace('年', '/').replace('月', '/').replace('日', '')}}
          </td>
        </tr>
      </table>
      <div class="title">
        <span>电话：{{orderDetail[0].shipToTelno}}</span>
        <h2>送货单</h2>
      </div>
      <table border="0" class="table-list">
        <thead>
          <tr>
            <th></th>
            <th colspan="7">产品规格说明</th>
          </tr>
          <tr>
            <th>项目</th>
            <th>订单号</th>
            <th>接单号</th>
            <th>单位</th>
            <th>数量(件)</th>
            <th>重量(KG)</th>
            <th>接单单价(RMB)</th>
            <th>金额(RMB)</th>
          </tr>
          <tr>
            <th></th>
            <th colspan="6">备注</th>
            <th>最终客户订单</th>
          </tr>
        </thead>
        <tbody v-for="(item, key) in orderDetail" :key="key">
          <tr>
            <td></td>
            <td colspan="7">{{item.specExternalNote}}</td>
          </tr>
          <tr>
            <td>{{key + 1}}</td>
            <td>{{item.contPoNo}}</td>
            <td>{{item.soNo + '-' + item.soLnNo}}</td>
            <td>{{getPeice(item.unitPriceCd)}}</td>
            <td>{{item.soQty}}</td>
            <td>{{item.soWt}}</td>
            <td>{{orderInfo.showMoney? item.soUnitPrice.toFixed(2) : '*'}}</td>
            <td>
              {{getTotal(item).toFixed(2)}}
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="6">
              {{item.lineRemarks}}
            </td>
            <td>{{item.custPoNo}}&nbsp;</td>
          </tr>
        </tbody>
        <tr class="total-tr" v-if="orderInfo.showMoney">
          <td></td>
          <td></td>
          <td>合计</td>
          <td></td>
          <td>{{numTotal}}</td>
          <td>{{wetTotal}}</td>
          <td></td>
          <td>{{mnyTotal.toFixed(2)}}</td>
        </tr>
        <tr class="total-tr" v-else>
          <td></td>
          <td></td>
          <td>合计</td>
          <td></td>
          <td>{{numTotal}}</td>
          <td>{{wetTotal}}</td>
          <td></td>
          <td>*</td>
        </tr>
      </table>
      <div class="bottom">
        <p>注意：<br/>货到月底后30天内支付</p>
        <p>
          <span>客户公章</span>
          <span>日立金属（东莞）特殊钢有限公司</span>
        </p>
      </div>
    </div>
    <p class="btn">
      <el-button id="bunt" v-print="'#printContent'" type="primary">打印</el-button>
      <el-button @click="printing" type="primary">打印</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  props: ['orderInfo'],
  data () {
    return {
      orderDetail: [],
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
  },
  methods: {
    getData () {
      this.http('/heat/printHeatOrder', this.orderInfo.id).then(resp => {
        if (resp.success) {
          this.orderDetail = resp.data.map(item => {
            this.numTotal = this.numTotal + item.soQty
            this.wetTotal = this.wetTotal + item.soWt
            this.mnyTotal = this.mnyTotal + this.getTotal(item)
            return item
          })
        }
      })
    },
    // 获取单位
    getPeice (a) {
      if (a === '2') return 'KG'
      if (a === '7') return '个'
      if (a === '8') return '件'
    },
    // 计算总金额
    getTotal (item) {
      if (this.orderInfo.showMoney) {
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
      this.http('/tSalesOrder/isDelivery', {
        corpCd: this.orderInfo.corpCd,
        divisionCd: this.orderInfo.divisionCd,
        soNo: this.orderInfo.soNo,
        soLnNo: this.orderInfo.soLnNo,
        isDelivery: 1
      }).then(resp => {
        document.getElementById('bunt').click()
        // console.log(resp)
        // if (resp.success) {
        //   document.getElementById('bunt').click()
        // } else {
        //   this.$message.error(resp.message)
        // }
      })
    }
  }
}
</script>

<style scoped>
  * {
    font-family: 宋体;
  }
  #printContent {
    height: 1500px;
    position: relative;
  }
  #bunt {
    display: none;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 1070px;
  }
  .bottom p:nth-child(1){
    text-align: center;
    margin-bottom: 80px;
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
  .table td span {
    width: 120px;
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
    padding: 3px;
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
    margin: 10px 0;
    width: 1075px;
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
  .logo {
    width: 70px;
    float: left;
    position: absolute;
    left: 40px;
    top: 0;
  }
  .total-tr td {
    padding-top: 10px;
  }
</style>
