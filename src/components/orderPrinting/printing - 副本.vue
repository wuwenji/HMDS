<template>
    <div>
      <div id="printContent">
        <div class="title">热处理订单及作业指导书</div>
        <div class="top cl">
          <div class="top-left">
            <div class="top-left-left">
              <b>2019年3月1日</b>
              <table class="table" borderColor="#ccc" border="1px">
                <tr>
                  <td>交货期</td>
                  <td>送货方式</td>
                </tr>
                <tr>
                  <td>2019年3月4日</td>
                  <td></td>
                </tr>
              </table>
            </div>
            <img class="qr-img" src="../../../static/images/qr.png" alt="">
          </div>
          <div class="top-content">
            <table class="table" style="margin-top: 40px;" borderColor="#ccc" border="1px">
              <tr>
                <td>客户名称</td>
                <td></td>
              </tr>
              <tr>
                <td>送货地址</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="top-right" style="width: 350px;">
            <div class="top-left-left">
              <p style="margin-bottom: 2px;">
                广东省东莞市茶山镇茶山工业园（523380）<br/>
                TEL:0769-8640-6726,6736&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                FAX:0769-8640-6716</p>
              <table class="table" borderColor="#ccc" border="1px">
                <tr>
                  <td>管理编号</td>
                  <td></td>
                </tr>
                <tr>
                  <td>确认人</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="style"
            label="热处理方式">
          </el-table-column>
          <el-table-column
            prop="style"
            label="品名">
          </el-table-column>
          <el-table-column
            prop="style"
            label="尺寸">
          </el-table-column>
          <el-table-column
            prop="style"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="style"
            label="重量(kg)">
          </el-table-column>
          <el-table-column
            prop="style"
            label="要求硬度">
          </el-table-column>
          <el-table-column
            prop="style"
            label="备注">
          </el-table-column>
        </el-table>
        <div class="bottom cl">
          <div class="bottom-left">
            <p>（热处理种类)</p>
            <ol>
              <li>淬火--------------------</li>
              <li>时效后处理---------AG</li>
              <li>除去炉力还火------RA</li>
              <li>深冷处理-------------SZ</li>
              <li>淬火，回火----------QT</li>
              <li>特殊气体处理---NVC</li>
              <li>回火----------------------T</li>
              <li>其它-------------------E</li>
              <li>圆熔化热处理-------ST</li>
            </ol>
          </div>
          <div class="bottom-right">
            请勿碰伤。勿碰伤，谢谢！
          </div>
        </div>
      </div>

      <p class="btn">
        <el-button v-print="'#printContent'" type="primary">打印</el-button>
      </p>
    </div>
</template>

<script>
export default {
  name: 'printing',
  data () {
    return {
      src: '',
      tableData: [
        {
          style: 0
        },
        {
          style: 0
        },
        {
          style: 0
        },
        {
          style: 0
        },
        {
          style: 0
        },
        {
          style: 0
        }
      ]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
  #printContent {
    /*margin: 10px;*/
    width: 1210px;
    padding: 10px;
    overflow: hidden;
  }
  .top-left-left b {
    display: inline-block;
    padding: 10px 0;
    text-decoration: underline;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .table td {
    padding: 7px;
  }
  .table td:nth-child(1) {
    width: 100px;
  }
  .top-left-left {
    width: 350px;
    float: left;
  }
  .top-left,.top-right {
    float: left;
    width: 450px;
  }
  .qr-img {
    width: 65px;
    margin: 10px;
    margin-top: 40px;
  }
  .title {
    font-size: 25px;
    color: #000;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
  .top-content {
    float: left;
    width: 400px;
    text-align: center;
    margin-right: 10px;
  }
  .bottom {
    margin-top: 30px;
  }
  .bottom-left {
    width: 400px;
    float: left;
    border: 1px solid #ccc;
    padding: 10px;
  }
  .bottom-left p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 35px;
  }
  .bottom-right {
    border: 1px solid #ccc;
    margin-left: 20px;
    width: 760px;
    float: left;
    text-align: center;
    line-height: 150px;
    font-size: 24px;
    font-weight: bold;
  }
  .bottom-left ol li {
    float: left;
    list-style: none;
    width: 200px;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
</style>
