<template>
  <div>
    <div id="printContent">
      <div class="btns" style="margin-bottom: 10px;">
        <el-button type="success" size="mini">保存</el-button>
        <el-button type="warning" size="mini">提交</el-button>
      </div>
      <div class="printPage" v-for="(item, index) in pinkData" :key="index">
        <table class="table-tr-height" border="1" cellspacing="0" >
          <tr class="tr2s">
            <td></td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b style="font-size: 20px;">钢种</b>
              <el-button size="mini" type="text">替换钢种</el-button>
            </p></td>
            <td colspan="4" valign="center" nowrap="nowrap" bordercolor="#000000" ><p ><b>{{item.order.gradeCd}}</b></p></td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>接单号码</b> </p></td>
            <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.order.soNo}}</p></td>
            <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>营业员</b></p></td>
            <td colspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" >
              <p style="float: left;">{{item.order.sUserName}}</p>
              <p style="float: right;padding-left: 20px;">
                <span class="line-span"></span>
                <b>发件人</b> </p>
            </td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item.order.entryUserName}}</p></td>
            <td rowspan="3">
              <el-button style="margin: 5px;" type="primary" size="mini">母材优先</el-button>
              <br/>
              <el-button style="margin: 0 5px;" type="primary" size="mini">残材优先</el-button>
              <br/>
              <el-button style="margin: 5px;" type="primary" size="mini">合并选料</el-button>
            </td>
          </tr>
          <tr >
            <td width="30" rowspan="2" valign="center" nowrap="nowrap"><p align="center" >功能 </p></td>
            <td width="30" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
            <td width="25" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >NO </p></td>
            <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>客户要求尺寸</b> </p></td>
            <td colspan="2" valign="center" nowrap="nowrap" class="b"><p ><b>库存类别</b> </p></td>
            <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>库存备注 <span style="float: right;width: 168px;">包装箱号</span></b> </p></td>
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
              <td rowspan="3" style="text-align: center;">
                <p style="margin-bottom: 5px;">
                  <el-checkbox></el-checkbox>
                </p>
                <span style="margin-bottom: 5px;" class="span-btn">+</span>
                <span class="span-btn">-</span>
              </td>
              <td width="30" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td width="25" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.soLnNo}}</p></td>
              <td colspan="4" style="position: relative;" rowspan="3" valign="top" nowrap="nowrap" bordercolor="#000000" >
                <p>
                  <span style="width: 25px;display: inline-block;">{{list.machineShapeCd}}</span>
                  <span style="width: 55px;display: inline-block;text-align: right;margin-right:5px;">{{list.size1}}</span>X<span style="margin-right:5px;margin-left:10px;width: 55px;display: inline-block;text-align: right;">
                    {{list.size2 > 0? list.size2 : ''}}</span>X<span style="width: 55px;display: inline-block;text-align: right;margin-left:10px;">
                  {{list.size3}}</span>
                </p>
                <p class="spans">
                  <span style="font-size: 14px;">{{list.itemName1}} {{list.itemName2}}</span><br/>
                  <span style="font-size: 14px;position:relative;top:-4px;">{{list.instRemarks1}}</span><br/>
                  <span style="font-size: 14px;position:relative;top:-8px;">{{list.instRemarks2}}</span>
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
              <td style="border-left: none;" colspan="3" rowspan="2" valign="top" nowrap="nowrap" ><p>&nbsp;
                <span style="float: right;width: 168px;">
                  包装箱号
                </span>
              </p>
                <p >{{list.stockSizeNote}}
                  <span style="float: right;width: 165px;">
                    {{list.machineShapeCd}}
                    {{list.instSize1}}X<template v-if="list.instSize2 > 0">{{list.instSize2}}X</template>{{list.instSize3}}
                    <!--{{list.instSizeNote}}-->
                  </span>
                </p>
              </td>
              <td width="30" align="center" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.workInstQty}}</p></td>
              <td class="bt bl" width="87" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt br" width="137" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td rowspan="3" align="center">
                <el-button style="margin: 5px;" type="warning" size="mini">手动选料</el-button>
                <p>未选料</p>
              </td>
            </tr>
            <tr class="tr2">
              <td class="bt bb bl br" colspan="3" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
            </tr>
            <tr class="tr3">
              <td class="bt bl bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >
                作&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;
              </p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p class="midle-box">
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                检&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;
              </p></td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'printing',
  props: ['title'],
  data () {
    return {
      src: '',
      id: 0,
      nullNumb: 5,
      orderInfo: {
        soNo: 100361002
      },
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
              return obj
            })
            let obj = {
              order: workList[0],
              workList
            }
            this.pinkData.push(obj)
            this.pinkData.length = 1
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
  #printContent {
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
  .line-span {
    display: block;
    background: #000;
    width: 1px;
    height: 44px;
    position: absolute;
    margin-top: -10px;
    margin-left:-10px;
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
  td {
    padding: 10px 3px;
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
  .table-td-width td:nth-child(1) {
    width: 60px;
    padding: 0px;
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
    left: 25px;
  }
  .midle-box-content:nth-child(2) {
    left: 75px;
  }
  .midle-box-content:nth-child(3) {
    left: 135px;
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
  .span-btn {
    width: 14px;
    height: 14px;
    background: #eee;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-weight: bold;
    margin: 0 auto;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }
  .table2 td {
    width: 14%;
  }
</style>
