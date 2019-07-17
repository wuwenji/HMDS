<template>
  <div>
    <p style="text-align: center;margin-bottom: 20px;">
      <el-button v-print="'#printContent'" type="primary"> 打印</el-button>
    </p>
    <div id="printContent">
      <div class="printing-item printPage" style="height: 820px;">
      <div class="top">
        <div class="top-left">
          <p>日期：2019/07/17</p>
          <p>使用部门：{{type === 0 ? '加工部门' : '热处理部门'}}</p>
        </div>
        <div class="top-content">
          <h2>
            {{type === 0 ? '外发加工依赖书兼入库传票' : '热处理依赖书兼入库传票'}}
            <img class="qrimg" :src="$store.state.qrUrl + '123' + '&w=500&h=500'" alt="">
          </h2>
        </div>
        <div class="top-right">
          <p>页码：1/2</p>
          <p>传票号码：12585965</p>
        </div>
      </div>
      <div class="lists">
        <table border="1" class="table">
          <tr class="center-tr">
            <td colspan="14">
              加工依赖
            </td>
            <td colspan="3">
              实际入库情况
            </td>
          </tr>
          <tr class="center-tr">
            <td>序号</td>
            <td>外发厂商</td>
            <td>钢种</td>
            <td>尺寸</td>
            <td>形状</td>
            <td>加工规格</td>
            <td>传票单号</td>
            <td>倒角</td>
            <td>钢印</td>
            <td>数量</td>
            <td>重量</td>
            <td>单位</td>
            <td>是否入库</td>
            <td>预定纳期</td>
            <td>数量</td>
            <td>单位</td>
            <td>入库日期</td>
          </tr>
          <tr v-for="item in 10" :key="item">
            <td>{{item}}</td>
            <td>在</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>一</td>
            <td></td>
            <td></td>
            <td>要</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        外发单价参考外写单位的协议单价
        <div class="remake">
          外发理由及特记事项：
        </div>
        <div class="bottom">
          <div class="bottom-left">
            <table class="table center-tr" border="1">
              <tr>
                <td></td>
                <td>申请人</td>
                <td>许可人<br/>（采购委托人）</td>
                <td>采购<br/>（价格确认）</td>
                <td>品证<br/>（品质证明）</td>
                <td>仓库<br/>（数量确认）</td>
                <td>合计</td>
              </tr>
              <tr>
                <td>签名</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="bottom-right">
            <table class="table center-tr" border="1">
              <tr style="height: 63px;">
                <td colspan="2">取货公司及取货人<br/></td>
                <td>发货人签名</td>
                <td>日期</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <p style="text-align: right;">
              HMDS-QR-70/A2
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summons',
  props: ['order'],
  computed: {
    type () {
      return 0
    }
  }
}
</script>

<style scoped>
  * {
    font-family: 宋体;
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

  .qrimg {
    /*margin-top: 8px;*/
    /*margin-left: 5px;*/
    width: 45px;
    position: relative;
    top: 3px;
  }

  .table {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .remake {
    border: 1px solid #000;
    padding: 5px;
    height: 80px;
    margin-top: 5px;
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
    margin-top: 20px;
  }

  .bottom table {
    table-layout: fixed;
  }

  .bottom-left {
    width: 800px;
    float: left;
  }

  .bottom-right {
    width: 400px;
    float: right;
  }
</style>
