<template>
  <div>
    <p style="text-align: center;">
      <el-button v-print="'#printContent'" type="primary">打印</el-button>
    </p>
    <br/>
    <div id="printContent" v-for="(item, index) in labelData" :key="index">
      <template v-if="type === 1">
        <div class="label-box printPage" v-if="item.custCd === '83014701'">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td style="width: 100px;">供应商：</td>
              <td colspan="2">日立金属（东莞）特殊钢有限公司</td>
            </tr>
            <tr>
              <td>订单号：</td>
              <td colspan="2">
                {{item.custSoNo}}
              </td>
            </tr>
            <tr>
              <td>物料名称：</td>
              <td colspan="2">
                {{item.materialName}}
              </td>
            </tr>
            <tr>
              <td>物料代码：</td>
              <td colspan="2">
                {{item.materialCode}}
              </td>
            </tr>
            <tr>
              <td>物料规格：</td>
              <td colspan="2">
                {{item.materialSpec}}
              </td>
            </tr>
            <tr>
              <td>物料类型：</td>
              <td colspan="2">
                {{item.materialType}}
              </td>
            </tr>
            <tr>
              <td>数量：</td>
              <td style="width: 30px;">
                {{item.counts}}
              </td>
              <td style="position: relative;">
                <div class="txma">
                  <svg :id="'barcode' + index" style="width: 300px; height: 85px;"></svg>
                  {{createdBarCode('barcode' + index, item.barCode)}}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="label-box printPage" v-if="item.custCd === '84002801'">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td colspan="4">日立金属（东莞）特殊钢有限公司</td>
            </tr>
            <tr>
              <td>客户</td>
              <td>{{item.custName }}</td>
              <td>订单号</td>
              <td>{{item.custSoNo}}</td>
            </tr>
            <tr>
              <td>钢种</td>
              <td>{{item.grade }}</td>
              <td>规格</td>
              <td>{{item.materialSpec }}</td>
            </tr>
            <tr>
              <td>件数</td>
              <td>{{item.counts }}件</td>
              <td>日期</td>
              <td>{{item.custDate }}</td>
            </tr>
            <tr>
              <td>材料模号</td>
              <td colspan="3">
                {{item.materialModel }}
              </td>
            </tr>
          </table>
        </div>
        <div class="label-box printPage" v-if="item.custCd === '83141201'">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td colspan="4">日立金属（东莞）特殊钢有限公司</td>
            </tr>
            <tr>
              <td>客户</td>
              <td>{{item.custName}}</td>
              <td>订单号</td>
              <td>{{item.custSoNo}}</td>
            </tr>
            <tr>
              <td>钢种</td>
              <td>{{item.grade}}</td>
              <td>规格</td>
              <td>{{item.materialSpec}}</td>
            </tr>
            <tr>
              <td>物料编号</td>
              <td>{{item.itemNumber}}</td>
              <td>日期</td>
              <td>{{item.custDate}}</td>
            </tr>
            <tr>
              <td>模具编号</td>
              <td colspan="3">
                {{item.dieNumber }}
              </td>
            </tr>
          </table>
        </div>
        <div class="label-box printPage" v-if="item.custCd === '82188101'">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td colspan="4">日立金属（东莞）特殊钢有限公司</td>
            </tr>
            <tr>
              <td>客户</td>
              <td>{{item.custName}}</td>
              <td>订单号</td>
              <td>{{item.custSoNo}}</td>
            </tr>
            <tr>
              <td>钢种</td>
              <td>{{item.grade}}</td>
              <td>规格</td>
              <td>{{item.materialSpec}}</td>
            </tr>
            <tr>
              <td>重量</td>
              <td>{{item.soWt}}</td>
              <td>日期</td>
              <td>{{item.custDate}}</td>
            </tr>
            <tr>
              <td>材料编号</td>
              <td colspan="3">
                {{item.materialNumber }}
              </td>
            </tr>
          </table>

        </div>
        <div class="label-box printPage" v-if="!item.custCd">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td colspan="4">日立金属（东莞）特殊钢有限公司</td>
            </tr>
            <tr>
              <td>客户</td>
              <td>{{item.custKName}}</td>
              <td>订单号</td>
              <td>{{item.soNo}}</td>
            </tr>
            <tr>
              <td>钢种</td>
              <td>{{item.gradeCd}}</td>
              <td>规格</td>
              <td>{{item.instSizeNote}}</td>
            </tr>
            <tr>
              <td>重量</td>
              <td>{{item.soWt}}</td>
              <td>件数</td>
              <td>{{item.soQty}}</td>
            </tr>
            <tr>
              <td>日期</td>
              <td colspan="3">
                {{item.soDate }}
              </td>
            </tr>
          </table>
        </div>
      </template>

      <template v-else>
        <div class="label-box printPage">
          <table class="table label-table table-padding2" border="1">
            <tr>
              <td>客户</td>
              <td>{{item.custKName}}</td>
            </tr>
            <tr>
              <td>钢种</td>
              <td>{{item.gradeCd}}</td>
            </tr>
            <tr>
              <td>加工类别</td>
              <td>{{item.taskName}}</td>
            </tr>
            <tr>
              <td>数量</td>
              <td>{{item.soQty}}</td>
            </tr>
          </table>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
let JsBarcode = require('jsbarcode')

export default {
  name: 'labelPrint',
  props: {
    labelData: {},
    type: {
      type: Number,
      default: 1
    }
  },
  created () {
    // console.log('label', this.cumerNum, this.labelData)
  },
  methods: {
    createdBarCode (id, string) {
      setTimeout(() => {
        console.log(id, string)
        JsBarcode('#' + id, string)
      }, 500)
    }
  }
}
</script>

<style scoped>
  .table {
    width: 100%;
  }
  .table td,.table th {
    text-align: center;
    padding: 4px;
  }
  .label-box {
    width: 505px;
    height: 280px;
  }
  .txma {
    position: absolute;
    width: 357px;
    height: 60px;
    background: #fff;
    left: 0;
    top: 0;
  }

  .label-table td {
    padding: 6px 4px
  }

  .table-padding2 td {
    padding: 15px 4px
  }

</style>
