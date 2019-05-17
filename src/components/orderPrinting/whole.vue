<template>
    <div>
      <div id="printContent">
        <div class="printPage cl" v-for="(val, index) in pinkData" :key="index" style="height: 830px;">
          <div class="table1">
            <table class="table-td-width" width="100%" border="0" cellspacing="0" >
              <tr >
                <td valign="center" nowrap="nowrap" rowspan="3" >
                  <img class="logo" src="../../../static/images/logo.jpg" alt="">
                </td>
                <td width="371" valign="center" nowrap="nowrap" ><p >&nbsp;</p></td>
                <td valign="center" nowrap="nowrap" colspan="3" rowspan="2" ><p>
                  <span class="STYLE3">整条出货指示书</span>
                  <img class="qrimg" :src="$store.state.qrUrl + val.orderList[0].cutQrCode + '&w=500&h=500'" alt="">
                </p></td>
                <td valign="center" nowrap="nowrap" colspan="2" ><p align="right" ><b class="relative1">HMD-QR-50-1/AO</b> </p></td>
                <td width="134" valign="center" nowrap="nowrap"><p class="relative1" style="text-align: right;">
                  page: {{index + 1}} / {{pinkData.length}}
                </p></td>
              </tr>
              <tr >
                <td valign="center" nowrap="nowrap" >
                  <p >
                    <span>日立金属（东莞）特殊钢有限公司 本部</span>
                  </p>
                </td>
                <td valign="center" nowrap="nowrap" colspan="2" ><p class="type" align="right" >

                </p></td>
                <td width="134" valign="center" nowrap="nowrap" ><p class="time" style="background: #444;" align="right" >
                  {{$store.state.time}}
                </p></td>
              </tr>
              <tr >
                <td valign="center" nowrap="nowrap" ><p >&nbsp;</p></td>
                <td valign="center" nowrap="nowrap" colspan="3" ><p >&nbsp;</p></td>
                <td valign="center" nowrap="nowrap" colspan="3" ><p >&nbsp;</p></td>
              </tr>
            </table>
          </div>
          <table class="table-tr-height" border="1" cellspacing="0" >
            <tr >
              <td colspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>客户</b> </p></td>
              <td colspan="7" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{val.orderList[0].soWkInstList.contCd}}</p><p >{{val.orderList[0].soWkInstList.contName}}</p></td>
              <td width="80" valign="top" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>最终客户</b></p></td>
              <td colspan="6" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{val.orderList[0].soWkInstList.custCd}}&nbsp;</p><p >{{val.orderList[0].soWkInstList.custName}}</p></td>
            </tr>
            <tr class="tr2s">
              <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b style="font-size: 20px;">钢种</b> </p></td>
              <td colspan="4" valign="center" nowrap="nowrap" bordercolor="#000000" ><p ><b>{{val.orderList[0].soWkInstList.gradeCd}}</b></p></td>
              <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>接单号码</b> </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{val.orderList[0].soWkInstList.soNo}}</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>营业员</b></p></td>
              <td colspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" >
                <p style="float: left;">{{val.orderList[0].soWkInstList.sUserName}}</p>
                <p style="float: right;border-left: 1px solid #000;padding-left: 20px;height: 25px;"><b>发件人</b> </p>
              </td>
              <!--<td width="30" valign="center" nowrap="nowrap" bordercolor="#000000" >-->
                <!--<p align="right" ><b>发件人</b> </p>-->
              <!--</td>-->
              <td colspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{val.orderList[0].soWkInstList.entryUserName}}</p></td>
            </tr>
            <tr >
              <td width="40" colspan="2" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >行号码</p></td>
              <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>客户要求尺寸</b> </p></td>
              <td colspan="2" valign="center" nowrap="nowrap" class="b"><p ><b>库存类别</b> </p></td>
              <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>库存备注</b> </p></td>
              <td rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>指示<br/>数量</b> </p></td>
              <td rowspan="2" class="bt bl" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>产品单长</b> </p></td>
              <td rowspan="2" class="bt" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>净重</b> </p></td>
              <td rowspan="2" class="bt br" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>毛重</b> </p></td>
            </tr>
            <tr >
              <td width="75" valign="center" nowrap="nowrap" class="r t"><p ><b>交期</b> </p></td>
              <td width="47" valign="center" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p ><b>单位</b> </p></td>
              <td width="52" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p ><b>数量</b> </p></td>
              <td width="62" valign="center" nowrap="nowrap" class="l t" bordercolor="#000000" ><p ><b>kg重量</b> </p></td>
              <td colspan="2" valign="center" nowrap="nowrap" class="t"><p ><b>现品管理NO</b> </p></td>
              <td width="117" valign="center" nowrap="nowrap" class="r t"><p ><b>溶解号码</b> </p></td>
              <td nowrap="nowrap" class="l r t"><p ><b>指示尺寸</b> </p></td>
              <td width="100" nowrap="nowrap" align="right" class="l r t"><p ><b>数量</b> </p></td>
              <td align="right" nowrap="nowrap" class="l t"><p ><b>kg重量</b> </p></td>
            </tr>
            <template v-for="item in val.orderList">
            <tr class="tr1">
              <td width="30" style="border-right:1px dashed #000;" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td width="25" style="border-left:1px dashed #000;" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.workInstNo}}</p></td>
              <td colspan="4" style="position: relative;" rowspan="3" valign="top" nowrap="nowrap" bordercolor="#000000" >
                <p class="spans">
                  <span>{{item.soWkInstList.machineShapeCd}}</span>
                  <span v-if="item.soWkInstList.size1 > 0">{{item.soWkInstList.size1}}</span>
                  <span v-if="item.soWkInstList.size2 > 0">X{{item.soWkInstList.size2}}</span>
                  <span v-if="item.soWkInstList.size3 > 0">X{{item.soWkInstList.size3}}</span>
                  <!--<span>{{item.soWkInstList.machineShapeCd}}</span>-->
                  <!--<span>{{item.soWkInstList.size1}}X</span>-->
                  <!--<span>{{item.soWkInstList.size2}}X</span>-->
                  <!--<span>{{item.soWkInstList.size3}}</span>-->
                </p>
                <p class="spans">
                  <span style="font-size: 14px;">{{item.soWkInstList.itemName1}}</span>
                  <span style="font-size: 14px;">{{item.soWkInstList.instRemarks1}}</span>
                </p>
                <p style="position: absolute;bottom:0px;" class="spans">
                  <span style="font-size:14px;">{{$store.getters.getDate(item.soWkInstList.contDueDate).replace('-', '/').replace('-', '/')}}</span>
                  <span>
                    <!--{{item.soWkInstList.unitWtCd == 1? 'KG': '個'}}-->
                    {{item.soWkInstList.unitPriceCd == 2? 'KG': ''}}
                    {{item.soWkInstList.unitPriceCd == 7? '個': ''}}
                    {{item.soWkInstList.unitPriceCd == 8? '套': ''}}
                  </span>
                  <span>{{item.soWkInstList.soQty}}</span>
                  <span>{{item.soWkInstList.soKgWt}}</span>
                </p>
              </td>
              <td colspan="2" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >
                {{item.soWkInstList.stockType}}<br/>{{item.soWkInstList.matCntlNo}}
              </p></td>
              <td style="border-right: none;" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" >
                {{item.soWkInstList.stockRemarks}}<br/>{{item.soWkInstList.chargeNo}}
              </td>
              <td style="border-left: none;" class="r l" rowspan="2" valign="top" nowrap="nowrap" ><p>&nbsp;</p>
                <p >
                  <!--{{item.soWkInstList.instSizeNote}}-->
                  {{item.soWkInstList.machineShapeCd}} {{item.soWkInstList.instSize1}}X<template v-if="item.soWkInstList.instSize2 > 0">{{item.soWkInstList.instSize2}}X</template><template v-if="item.soWkInstList.instSize3 > 0">{{item.soWkInstList.instSize3}}</template>
                  <!--<span style="float: right;width: 150px;"></span>-->
                </p>
              </td>
              <td rowspan="2" align="right" class="r l">
                {{item.soWkInstList.stockQty}}
              </td>
              <td rowspan="2" align="right" class="r l">
                {{item.soWkInstList.workInstKgWt}}
              </td>
              <td width="30" class="bb" rowspan="2" align="center" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.soWkInstList.workInstQty}}</p></td>
              <td class="bl bb" rowspan="2" width="87" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bb" width="137" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bb br" rowspan="2" width="137" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
            <tr class="tr2">
              <!--<td class="bt bb bl" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>-->
            </tr>
            <tr class="tr3">
              <td class="bt bl bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >
              </p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >
              </p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p class="midle-box">
                </p></td>
              <td class="bb br" colspan="4"></td>
            </tr>
          </template>
            <tr class="removeClass" v-for="list in (5 - val.orderList.length)" :key="list">
              <td colspan="16" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
          </table>
          <table class="table-tr-height table2" border="1" cellspacing="0" >
            <tr class="tr1">
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >仓管员 </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >切断作业员 </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
              <td colspan="2" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >&nbsp;</p></td>
            </tr>
            <tr class="tr1">
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
            <tr class="tr1">
              <td colspan="7" rowspan="2" nowrap="nowrap" bordercolor="#000000" ><p >备注 </p></td>
            </tr>
            <tr ></tr>
          </table>
        </div>
      </div>
      <p class="btn">
        <el-button @click="keeyHistory" type="primary">打印</el-button>
        <el-button id="printClick" v-print="'#printContent'" type="primary"></el-button>
      </p>
    </div>
</template>

<script>
export default {
  name: 'printing',
  props: ['orderInfo', 'title'],
  data () {
    return {
      src: '',
      id: 0,
      nullNumb: 5,
      pinkData: {}
    }
  },
  created () {
    this.getHtml()
    // console.log(this.orderInfo.id)
  },
  watch: {
    orderInfo () {
      this.getHtml()
    }
  },
  methods: {
    getHtml () {
      this.http('/tSalesOrder/getPrintData', {
        // id: 362
        soNo: this.orderInfo.soNo
      }).then(resp => {
        // console.log(resp)
        if (resp.success) {
          this.pinkData = resp.data
          console.log(this.pinkData)
        }
      })
    },
    keeyHistory () {
      this.http('/printHistory/saveOrUpdate', {
        soNo: this.orderInfo.soNo,
        dataJson: {...this.pinkData},
        printType: '1'// 1为切断指示书，2为加工指示书，3为热加工指示书
      }).then(resp => {
        if (resp.success) {
          document.getElementById('printClick').click()
        } else {
          this.$message.error({
            message: '失败：' + resp.message,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  * {
    font-family: 宋体;
  }
  b {
    font-size: 15px;
  }
  #printContent {
    /*margin: 10px;*/
    width: 1210px;
    padding: 10px;
    overflow: hidden;
  }
  .tr2s {
    font-size: 20px;
  }
  .tr2s b {
    font-size: 20px;
  }
  table {
    border-collapse: collapse;
  }
  .r {
    border-right: none;
  }
  .t {
    border-top: none;
  }
  .b {
    border-bottom: none;
  }
  .l {
    border-left: none;
  }
  .br {
    border-right: 2px solid #000;
  }
  .bt {
    border-top: 2px solid #000;
  }
  .bb {
    border-bottom: 2px solid #000;
  }
  .bl {
    border-left: 2px solid #000;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
  td {
    padding: 10px 3px;
  }
  .STYLE3 {
    font-size: 34px;
    border-bottom: 1px solid #666;
    margin-left: 5px;
    display: inline-block;
    position: relative;
    top: 15px;
    font-weight: bold;
  }
  .spans span {
    display: inline-block;
    padding-left: 3px;
  }
  .spans span:nth-child(1) {
    width: 65px;
  }
  .spans span:nth-child(2) {
    width: 41px;
  }
  .spans span:nth-child(3) {
    width: 47px;
  }
  .spans span:nth-child(4) {
    width: 47px;
  }
  .removeClass td{
    height: 100px;
    border: none;
  }
  .name {
    border: 1px solid #999;
    display: block;
    line-height: 30px;
  }
  .qrimg {
    position: absolute;
    width: 45px;
    margin-top: 8px;
    margin-left: 5px;
  }
  .printPage {
    page-break-before: auto;
    page-break-after: always;
  }
  .logo {
    width: 59px;
  }
  .table-td-width td:nth-child(1) {
    width: 60px;
    padding: 0px;
  }
  .table1 {
    height: 83px;
    overflow: hidden;
  }
  .relative1 {
    position: relative;
    top: 15px;
  }
  .midle-box {
    width: 168px;
    display: block;
    position: relative;
  }
  .midle-box-content {
    display: inline-block;
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-top: none;
    top: -12px;
  }
  .midle-box-content:nth-child(1) {
    left: 10px;
  }
  .midle-box-content:nth-child(2) {
    left: 60px;
  }
  .midle-box-content:nth-child(3) {
    left: 120px;
  }
  .type {
    font-size: 24px;
    font-weight: bold;
  }
  .time {
    background: #444;
    line-height: 22px;
    color: #fff;
    padding-right: 5px;
  }
  .table-tr-height {
    width: 100%;
  }
  .table-tr-height td {
    padding: 0px 2px;
  }
  .table-tr-height tr:nth-child(1) td{
    height: 33px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(2) td{
    height: 25px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(3) td{
    height: 20px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(4) td{
    height: 20px;
    padding: 0 2px;
  }
  .tr1 {
    height: 40px;
    font-size: 18px;
  }
  .tr2 {
    height: 20px;
  }
  .tr3 {
    height: 40px;
  }
  .table2 {
    width: 100%;
    margin-top: 10px;
  }
  .table2 td {
    width: 14%;
  }
</style>
