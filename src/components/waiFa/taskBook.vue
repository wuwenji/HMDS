<template>
  <div>
    <p style="text-align: center;margin-bottom: 20px;">
      <el-button v-print="'#printContent'" type="primary"> 打印</el-button>
    </p>
    <div id="printContent">
      <div v-for="(value, key) in list" :key="'print' + key" class="printing-item printPage" style="height: 820px;">
      <div class="top">
        <div class="top-left">
          <p>日期：{{$store.state.date}}</p>
          <p>使用部门：{{type == 0 ? '加工部门' : '热处理部门'}}</p>
        </div>
        <div class="top-content">
          <h2>
            {{type == 0 ? '外发加工作业指示' : '热处理作业指示'}}
          </h2>
        </div>
        <div class="top-right">
          <p>页码：{{key + 1}}/{{list.length}}</p>
          <p>传票号码：{{order.outCode}}</p>
        </div>
      </div>
      <div class="lists">
        <table v-if="type == 0" border="1" class="table">
          <tr class="center-tr">
            <td colspan="14">
              加工依赖
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
            <td>预定纳期</td>
          </tr>
          <tr v-for="(item, index) in value" :key="index">
            <td>
              <template v-if="key === 0">
                {{index + 1}}
              </template>
              <template v-else>
                {{(key + 1) * 10 + index + 1}}
              </template>
            </td>
            <td>{{order.companyName}}</td>
            <td>{{item.gradeCd}}</td>
            <td>{{item.machineTolerance}}</td>
            <td>{{item.machineShapeCd}}</td>
            <td>{{item.machineSpecCd}}</td>
            <td>{{item.soNo + '-' + item.soLnNo}}</td>
            <td>{{item.chamferSpec}}</td>
            <td></td>
            <td class="john-right">{{item.soQty}}</td>
            <td class="john-right">{{item.soWt}}</td>
            <td>件</td>
            <td class="john-right">{{$store.getters.getDate(order.deliveryDate, 2)}}</td>
          </tr>
          <tr v-for="(itemVal, itemKey) in (10 - value.length)" :key="'item' + itemKey">
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
        <table v-if="type == 1" border="1" class="table">
          <tr class="center-tr">
            <td colspan="14">
              加工依赖
            </td>
          </tr>
          <tr class="center-tr">
            <td>序号</td>
            <td>外发厂商</td>
            <td>钢种</td>
            <td>重量</td>
            <td>件数</td>
            <td>作业名</td>
            <td>指示硬度</td>
            <td>传票单号</td>
            <td>预订纳期</td>
          </tr>
          <tr v-for="(item, index) in value" :key="index">
            <td>
              <template v-if="key === 0">
                {{index + 1}}
              </template>
              <template v-else>
                {{(key + 1) * 10 + index + 1}}
              </template>
            </td>
            <td>{{order.companyName}}</td>
            <td>{{item.gradeCd}}</td>
            <td class="john-right">{{item.soWt}}</td>
            <td class="john-right">{{item.soQty}}</td>
            <td>{{item.taskName}}</td>
            <td>{{item.hardnessRequirement}}</td>
            <td>{{item.managementNumber}}</td>
            <td class="john-right">{{$store.getters.getDate(order.deliveryDate, 2)}}</td>
          </tr>
          <tr v-for="(itemVal, itemKey) in (10 - value.length)" :key="'item' + itemKey">
            <td>&nbsp;</td>
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
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskBook',
  props: ['order'],
  data () {
    return {
      list: []
    }
  },
  created () {
    this.list = JSON.parse(JSON.stringify(this.order.dataList))
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
    padding: 15px 10px;
  }

  .table td:first-child {
    text-align: center;
  }

  .center-tr td {
    text-align: center;
    padding: 20px 5px;
  }

  .bottom table {
    table-layout: fixed;
  }
</style>
