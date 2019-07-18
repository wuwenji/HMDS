<template>
    <div>
      <p class="btn">
        <el-button @click="keeyHistory" type="primary">打印</el-button>
        <el-button id="printClick" v-print="'#printContent'" type="primary"></el-button>
      </p>
      <div id="printContent">
        <div class="printPage" v-for="(item, index) in pinkData" :key="index" style="height: 820px;">
          <div class="table1">
            <table class="table-td-width" width="100%" border="0" cellspacing="0" >
              <tr >
                <td valign="center" nowrap="nowrap" rowspan="3" >
                  <img class="logo" src="../../../static/images/logo.jpg" alt="">
                </td>
                <td width="371" valign="center" nowrap="nowrap" ><p >&nbsp;</p></td>
                <td valign="center" style="position: relative;" nowrap="nowrap" colspan="3" rowspan="2" ><p>
                  <span class="STYLE3">切断作业指示书</span>

                  <img class="qrimg" :src="$store.state.qrUrl + item.workList[0].cutQrCode + '&w=500&h=500'" alt="">
                </p></td>
                <td valign="center" nowrap="nowrap" colspan="2" ><p align="right" ><b class="relative1">HMD-QR-50-{{item.order.workInstCd > 3? '4': item.order.workInstCd}}/AO</b> </p></td>
                <td width="134" valign="center" nowrap="nowrap"><p class="relative1" style="text-align: right;">
                  page: {{index + 1}} / {{pinkData.length}}
                </p></td>
              </tr>
              <tr >
                <td valign="center" nowrap="nowrap" >
                  <p >
                    <span class="name">日立金属（东莞）特殊钢有限公司 本部</span>
                  </p>
                </td>
                <td valign="center" nowrap="nowrap" colspan="2" ><p class="type" align="right" >
                  <!--{{item.order.workInstCd}}-->
                  {{item.order.workInstCd > 3? '切断&加工&热处理': ''}}
                  {{item.order.workInstCd == 3? '切断&加工': ''}}
                  {{item.order.workInstCd == 1? '切断': ''}}
                  {{item.order.workInstCd == 2? '切断': ''}}
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
              <td colspan="7" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{item.workList[0].contCd}}</p><p >{{item.workList[0].contName}}</p></td>
              <td width="80" valign="top" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>最终客户</b></p></td>
              <td colspan="5" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{item.workList[0].custCd}}&nbsp;</p><p >{{item.workList[0].custName}}</p></td>
            </tr>
            <tr class="tr2s">
              <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b style="font-size: 20px;">钢种</b> </p></td>
              <td colspan="4" valign="center" nowrap="nowrap" bordercolor="#000000" ><p ><b>{{item.order.gradeCd}}</b></p></td>
              <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>接单号码</b> </p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.order.soNo}}</p></td>
              <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>营业员</b></p></td>
              <td colspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" >
                <p style="float: left;">{{item.order.sUserName}}</p>
                <p style="float: right;border-left: 1px solid #000;padding-left: 20px;height: 25px;"><b>发件人</b> </p>
              </td>
              <!--<td width="30" valign="center" nowrap="nowrap" bordercolor="#000000" >-->
                <!--<p align="right" ><b>发件人</b> </p>-->
              <!--</td>-->
              <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.order.entryUserName}}</p></td>
            </tr>
            <tr >
              <td width="30" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
              <td width="25" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >NO </p></td>
              <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>客户要求尺寸</b> </p></td>
              <td colspan="2" valign="center" nowrap="nowrap" class="b"><p ><b>库存类别</b> </p></td>
              <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>库存备注</b> </p></td>
              <td rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>指示<br/>数量</b> </p></td>
              <td rowspan="2" class="bt bl" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>kg重量</b> </p></td>
              <td rowspan="2" class="bt br" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>作業完成时间</b> </p></td>
            </tr>
            <tr >
              <td width="75" valign="center" nowrap="nowrap" class="r t"><p ><b>交期</b> </p></td>
              <td width="47" valign="center" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p ><b>单位</b> </p></td>
              <td width="52" valign="center" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p class="align-right"><b>数量</b> </p></td>
              <td width="62" valign="center" nowrap="nowrap" class="l t" bordercolor="#000000" ><p class="align-right"><b>kg重量</b> </p></td>
              <td colspan="2" valign="center" nowrap="nowrap" class="t"><p ><b>现品管理NO</b> </p></td>
              <td width="117" valign="center" nowrap="nowrap" class="r t"><p ><b>溶解号码</b> </p></td>
              <td colspan="2" nowrap="nowrap" class="l r t"><p ><b>库存尺寸</b> </p></td>
              <td width="150" valign="center" nowrap="nowrap" class="l t"><p ><b>切断指示尺寸</b> </p></td>
            </tr>
            <template v-for="list in item.workList">
            <tr class="tr1">
              <td width="30" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td width="25" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.soLnNo}}</p></td>
              <td colspan="4" style="position: relative;" rowspan="3" valign="top" nowrap="nowrap" bordercolor="#000000" >
                <p>
                  <span style="width: 25px;display: inline-block;">{{list.machineShapeCd}}</span>
                  <span style="width: 55px;display: inline-block;text-align: right;margin-right:5px;">{{list.size1}}</span>X<span style="margin-right:5px;margin-left:10px;width: 55px;display: inline-block;text-align: right;">
                    {{list.size2 > 0? list.size2 : ''}}</span>X<span style="width: 55px;display: inline-block;text-align: right;margin-left:10px;">
                  {{list.size3}}</span>
                  <!--<span>100.99X </span>-->
                  <!--<span>-->
                    <!--100.99X-->
                  <!--</span><span>-->
                  <!--100.99</span>-->
                  <!--<span>{{list.instSize1}}X</span>-->
                  <!--<span>{{list.instSize2}}X</span>-->
                  <!--<span>{{list.instSize3}}</span>-->
                </p>
                <p class="spans">
                  <span style="font-size: 14px;">{{list.itemName1}}</span><br/>
                  <span style="font-size: 14px;">{{list.instRemarks1}}</span>
                </p>
                <p style="position: absolute;bottom:0px;" class="spans">
                  <span style="font-size:14px;">{{$store.getters.getDate(list.contDueDate, 2).replace('-', '/').replace('-', '/')}}</span>
                  <span>
                    {{list.unitPriceCd == 2? 'KG': ''}}
                    {{list.unitPriceCd == 7? '個': ''}}
                    {{list.unitPriceCd == 8? '套': ''}}
                  </span>
                  <span class="align-right">{{list.workInstQty}}</span><span style="margin-right:5px;width: 65px;" class="align-right">{{list.soKgWt}}</span>
                </p>
              </td>
              <td colspan="2" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >
                {{list.stockType == 1? '母材' : ''}}
                {{list.stockType == 2? '余材' : ''}}
                <br/>{{list.matCntlNo}}
              </p></td>
              <td style="border-right: none;" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" >
                {{list.stockRemarks}}<br/>{{list.chargeNo}}
              </td>
              <td style="border-left: none;" colspan="3" rowspan="2" valign="top" nowrap="nowrap" ><p>&nbsp;</p>
                <p >{{list.stockSizeNote}}
                  <span style="float: right;width: 170px;">
                    {{list.machineShapeCd}}
                    {{list.instSize1}}X<template v-if="list.instSize2 > 0">{{list.instSize2}}X</template>{{list.instSize3}}
                    <!--{{list.instSizeNote}}-->
                  </span>
                </p>
              </td>
              <td width="30" align="center" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.workInstQty}}</p></td>
              <td class="bt bl" width="87" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt br" width="137" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
            <tr class="tr2">
              <td class="bt bb bl br" colspan="3" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
            <tr class="tr3">
              <td class="bt bl bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >
                &nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;
              </p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p class="midle-box">
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                &nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;
              </p></td>
            </tr>
            </template>
            <tr class="removeClass" v-for="item in (5 - item.workList.length)" :key="item">
              <td colspan="15" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
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
              <td colspan="7" rowspan="2" nowrap="nowrap" bordercolor="#000000" >
                <div class="remarks-left">备注</div>
                <div class="remarks-right">
                  <p>{{item.order.wioHeadRemarks1}}</p>
                  <p>{{item.order.wioHeadRemarks2}}</p>
                </div>
              </td>
            </tr>
            <tr ></tr>
          </table>
        </div>
      </div>

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
      pinkData: []
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
        if (resp.success) {
          this.pinkData = []
          resp.data.map(item => {
            let workList = item.orderList.map(val => {
              // let obj = {}
              let obj = {
                ...val.soWkInstList,
                ...val
              }
              for (let key in obj) {
                if (obj[key] === null) {
                  obj[key] = val.soWkInstList[key]
                }
              }
              // val.forEach((val, key) => {
              //   if (val === null) {
              //     obj[key] = val.soWkInstList[key]
              //   } else {
              //     obj[key] = val
              //   }
              // })
              return obj
            })
            let obj = {
              order: workList[0],
              workList
            }
            this.pinkData.push(obj)
          })
          // console.log(this.pinkData)
          // console.log(this.pinkData)
          // this.pinkData = []
          // // this.pinkData = resp.data
          // resp.data.map(item => {
          //   item.workList = item.workList.map(val => {
          //     let obj = {
          //       ...val,
          //       ...val.soWkInstList
          //     }
          //     return obj
          //   })
          //   this.pinkData.push(item)
          // })
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
  .align-right {
    text-align: right;
  }
  b {
    font-size: 15px;
  }
  .remarks-left {
    float: left;
    width: 60px;
    line-height: 40px;
  }
  .remarks-right {
    float: left;
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
    width: 45px;
  }
  .spans span:nth-child(4) {
    width: 70px;
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
    /*margin-top: 8px;*/
    /*margin-left: 5px;*/
    width: 45px;
    left: 255px;
    top: 32px;
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
    height: 35px;
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
