<template>
  <div>
    <p style="text-align: center;margin-bottom: 20px;">
      <el-button v-print="'#printContent'" type="primary"> 打印</el-button>
      <el-button @click="exportExcel" type="primary"> 导出</el-button>
    </p>
    <div id="printContent">
      <div class="printing-item printPage" style="height: 820px;">
      <div class="top">
        <div class="top-left">
          <p>日期：2019/07/17</p>
          <p>使用部门：采购</p>
        </div>
        <div class="top-content">
          <h2>
            {{type == 0 ? '外发加工采购单' : '热处理加工采购单'}}
          </h2>
        </div>
        <div class="top-right">
          <p>页码：1/2</p>
          <p>传票号码：12585965</p>
        </div>
      </div>
      <div class="lists">
        <table v-if="type == 0" border="1" class="table">
          <tr>
            <td style="text-align: left;" colspan="10">
              外发厂家：
            </td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: left;" colspan="11">
              外发厂家地址：
            </td>
          </tr>
          <tr class="center-tr">
            <td>序号</td>
            <td>钢种</td>
            <td>形状</td>
            <td>尺寸</td>
            <td>加工规格</td>
            <td>件数</td>
            <td>重量</td>
            <td>平方英寸</td>
            <td>计算方式</td>
            <td>单价</td>
            <td>金额</td>
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
            <td width="100">
              <el-select v-model="select" size="mini">
                <el-option
                  label="件数"
                  value="件数"></el-option>
                <el-option
                  label="重量"
                  value="重量"></el-option>
                <el-option
                  label="平方英寸"
                  value="平方英寸"></el-option>
                <el-option
                  label="最低消费"
                  value="最低消费"></el-option>
              </el-select>
            </td>
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
      </div>
    </div>
  </div>
</template>

<script>
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  name: 'taskBook',
  props: ['order'],
  data () {
    return {
      select: ''
    }
  },
  methods: {
    // 导出
    exportExcel () {
      // var wb = XLSX.utils.table_to_book(document.querySelector('#printContent'))
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // try {
      //   FileSaver.saveAs(new Blob([wbout],
      //     { type: 'application/octet-stream' }), '名字.xlsx')
      // } catch (e) {
      //   if (typeof console !== 'undefined') console.log(e, wbout)
      // }
      // return wbout
    }
  },
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
    margin-top: 40px;
    line-height: 30px;
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
