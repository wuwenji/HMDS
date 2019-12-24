<template>
    <div>
      <div id="printContent" style="height: 800px;">
        <div class="title">热处理订单及作业指示书</div>
        <div class="top cl">
          <div class="top-left">
            <div class="top-left-left">
              <b>{{$store.state.date}}</b>
              <table class="table table2 table3" borderColor="#000" border="1px">
                <tr>
                  <td>交货期</td>
                  <td>送货方式</td>
                </tr>
                <tr>
                  <td class="noneBorder">
                    <el-date-picker
                      v-model="date"
                      type="date"
                      format="yyyy年MM月dd日"
                      prefix-icon="sdg">
                    </el-date-picker>
                  </td>
                  <td><input v-model="hotData.heatTreatment.shiptoType" type="text"></td>
                </tr>
              </table>
            </div>
            <img class="qr-img" :src="$store.state.qrUrl + orderInfo.qrCode + '&w=150&h=150'" alt="">
          </div>
          <div class="top-content">
            <table class="table table2 table3" style="margin-top: 40px;" borderColor="#000" border="1px">
              <tr>
                <td>客户名称</td>
                <td><input v-model="hotData.heatTreatment.customerName" type="text"></td>
              </tr>
              <tr>
                <td>送货地址</td>
                <td><input v-model="hotData.heatTreatment.deliveryAddress" type="text"></td>
              </tr>
            </table>
          </div>
          <div class="top-right" style="width: 350px;">
            <div class="top-left-left">
              <!--<span class="page">page: 1/1</span>-->
              <p style="margin-bottom: 2px;">
                广东省东莞市茶山镇茶山工业园（523380）<br/>
                TEL:0769-8640-6726,6736&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                FAX:0769-8640-6716</p>
              <table class="table table2" borderColor="#000" border="1px">
                <tr>
                  <td>管理编号</td>
                  <!--<td colspan="3"><input v-model="hotData.heatTreatment.managementNumber" type="text"></td>-->
                  <td colspan="3"><input type="text"></td>
                </tr>
                <tr>
                  <td>确认人</td>
                  <td><input v-model="hotData.heatTreatment.confirmStr" type="text"></td>
                  <td>发件人</td>
                  <td><input v-model="hotData.heatTreatment.senderUserName" type="text"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <table border="1" class="table">
          <thead>
            <tr>
              <th rowspan="2">钢钟</th>
              <th rowspan="2">热处理方式</th>
              <th rowspan="2">品名</th>
              <th rowspan="2">尺寸</th>
              <th rowspan="2">数量</th>
              <th>
                重量
              </th>
              <th colspan="2">要求硬度</th>
              <th rowspan="2">备注</th>
            </tr>
          <tr><th>(kg)</th><th>HRC</th><th>&nbsp;HS&nbsp;</th></tr>
          </thead>
          <tbody>
          <tr class="inputs" v-for="(item, key) in hotData.treatmentEntrys" :key="'1' + key">
            <td><input v-model="item.gradeCd" type="text"></td>
            <td><input v-model="item.heatTreatType" type="text"></td>
            <td><input style="width: 100%;margin: 0;" v-model="item.itemName" type="text"></td>
            <td><input style="width: 240px;" v-model="item.sizeNote" type="text"></td>
            <td class="numb-td"><input v-model="item.qty" type="text">
              <!--<span>件</span>-->
            </td>
            <td><input v-model="item.wt" type="text"></td>
            <td colspan="2"><input v-model="item.hardnessRequirement" type="text"></td>
            <td><input v-model="item.remark" type="text"></td>
          </tr>
          <tr class="inputs" v-for="(item, key) in newDatas" :key="'2' + key">
            <td><input v-model="item.gradeCd" type="text"></td>
            <td><input v-model="item.heatTreatType" type="text"></td>
            <td><input v-model="item.itemName" type="text"></td>
            <td><input style="width: 240px;" v-model="item.sizeNote" type="text"></td>
            <td class="numb-td"><input v-model="item.qty" type="text">
              <!--<span>件</span>-->
            </td>
            <td><input v-model="item.wt" type="text"></td>
            <td colspan="2"><input v-model="item.hardnessRequirement" type="text"></td>
            <td><input v-model="item.remark" type="text"></td>
          </tr>
          <tr class="inputs">
            <td>合计</td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td colspan="2"><input type="text"></td>
            <td><input type="text"></td>
          </tr>
          </tbody>
        </table>
        <div class="bottom cl">
          <div class="bottom-left">
            <p>（热处理种类)</p>
            <ol>
              <li>淬火----------------A</li>
              <li>时效后处理---------AG</li>
              <li>除去炉力还火-------RA</li>
              <li>深冷处理-----------SZ</li>
              <li>淬火，回火---------QT</li>
              <li>特殊气体处理-------NVG</li>
              <li>回火----------------T</li>
              <li>其它----------------E</li>
              <li>圆熔化热处理-------ST</li>
            </ol>
          </div>
          <div class="bottom-right">
            &nbsp;
          </div>
        </div>
        <!--<P style="text-align: right;">HMDS-QR-71/A2</P>-->
      </div>
      <p class="btn">
        <!--<el-button @click="preservation()" type="primary">保存</el-button>-->
        <el-button @click="keeyHistory" type="primary">打印</el-button>
        <el-button id="printClick" v-print="'#printContent'" type="primary"></el-button>
      </p>
    </div>
</template>

<script>
export default {
  name: 'hotHandle',
  props: ['orderInfo'],
  data () {
    return {
      src: '',
      newDatas: [],
      date: '',
      hotData: {
        heatTreatment: {
          contDueDate: '',
          shiptoType: '',
          managementNumber: '',
          confirmStr: '',
          customerName: '',
          deliveryAddress: '',
          senderUserName: ''
        },
        treatmentEntrys: [
          {
            gradeCd: '',
            heatTreatType: '',
            itemName: '',
            sizeNote: '',
            qty: 0,
            wt: 0,
            hardnessRequirement: '',
            remark: ''
          }
        ]
      },
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
    this.getDate()
    this.getData()
  },
  watch: {
    orderInfo () {
      this.getData()
    }
  },
  methods: {
    getDate (string = 1) {
      let date = ''
      if (string === 1) {
        date = this.$store.state.date
      } else {
        date = this.$store.getters.getDate(string)
      }
      let y = date.substring(0, 4)
      let m = date.substring(5, 7) - 1
      let d = date.substring(8, 10)
      this.date = new Date(y, m, d)
    },
    getNewDatas () {
      this.newDatas = []
      for (let i = 0; i < (9 - this.hotData.treatmentEntrys.length); i++) {
        this.newDatas.push({
          gradeCd: '',
          heatTreatType: '',
          itemName: '',
          sizeNote: '',
          qty: '',
          wt: '',
          hardnessRequirement: '',
          remark: ''
        })
      }
    },
    getData () {
      this.http('/heatTreatment/getPrintHeatTreatmentData', {
        orderCode: this.orderInfo.soNo
      }).then(resp => {
        if (resp.success) {
          console.log(resp)
          let obj = resp.data
          if (obj.heatTreatment === null) {
            this.hotData.heatTreatment = {
              contDueDate: '',
              shiptoType: '',
              managementNumber: '',
              confirmStr: '',
              customerName: '',
              deliveryAddress: '',
              senderUserName: ''
            }
            this.getDate()
          } else {
            this.getDate(obj.heatTreatment.contDueDate)
            this.hotData.heatTreatment = obj.heatTreatment
          }
          if (obj.treatmentEntrys.length > 0) {
            // console.log(obj.treatmentEntrys)
            console.log(obj.treatmentEntrys)
            this.hotData.treatmentEntrys = obj.treatmentEntrys.filter(item => {
              return item.gradeCd !== ''
            })
          } else {
            this.hotData.treatmentEntrys = []
          }
        }
        this.getNewDatas()
      })
    },
    preservation (typeF = 2) {
      let obj = JSON.parse(JSON.stringify(this.hotData))
      obj.heatTreatment.orderId = this.orderInfo.id
      obj.heatTreatment.orderCode = this.orderInfo.soNo
      obj.heatTreatment.contDueDate = this.date
      obj.heatTreatment.workInstCd = this.orderInfo.workInstCd
      obj.heatTreatment.type = this.orderInfo.workInstCd
      // console.log(this.newDatas)
      this.newDatas.map(item => {
        if (item.gradeCd !== '') {
          obj.treatmentEntrys.push(item)
        }
      })
      obj.treatmentEntrys.map((item, key) => {
        item.heatCode = '00' + (key + 1)
      })
      this.http('/heatTreatment/saveHeatTreatment', {
        heatTreatment: obj.heatTreatment,
        treatmentEntrys: obj.treatmentEntrys
      }).then(resp => {
        if (resp.success) {
          if (typeF === 2) {
            this.$message({
              message: '保存成功！',
              duration: 1000,
              type: 'success'
            })
          } else {
            document.getElementById('printClick').click()
          }
        } else {
          this.$message({
            message: resp.message,
            duration: 1000,
            type: 'warning'
          })
        }
      })
    },
    keeyHistory () {
      // this.preservation(1)
      this.http('/printHistory/saveOrUpdate', {
        soNo: this.orderInfo.soNo,
        // dataJson: {...this.hotData},
        dataJson: {
          data: '不需要打印数据'
        },
        printType: '3'// 1为切断指示书，2为加工指示书，3为热加工指示书
      }).then(resp => {
        document.getElementById('printClick').click()
      })
    }
  }
}
</script>

<style scoped>
  .page {
    position: absolute;
    right: 0px;
    top: 0px;
  }
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
    width: 137.77px;
    padding: 7px;
  }
  input {
    outline:none
  }
  .inputs input {
    margin: 3px 5px;
    line-height: 20px;
    border: none;
    text-align: center;
    width: 100px;
  }
  .inputs td {
    padding: 5px 0px;
    text-align: center;
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
    opacity: 0;
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
    border: 1px solid #000;
    padding: 10px;
  }
  .bottom-left p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 35px;
  }
  .numb-td {
    position: relative;
  }
  .numb-td input {
    margin-right: 10px;
  }
  .numb-td span {
    position: absolute;
    right: 10px;
    top: 2px;
  }
  .bottom-right {
    border: 1px solid #000;
    margin-left: 20px;
    width: 760px;
    float: right;
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
  .table2 td input{
    border: none;
    width: 100%;
  }
  .table3 td:nth-child(1) {
    width: 30px;
  }
</style>
