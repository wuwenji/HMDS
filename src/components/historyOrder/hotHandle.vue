<template>
  <div>
    <p class="btn">
      <!--<el-button @click="preservation()" type="primary">保存</el-button>-->
      <el-button @click="keeyHistory" type="primary">打印</el-button>
      <el-button id="printClick" v-print="'#printContent'" type="primary"></el-button>
    </p>
    <div id="printContent" style="height: 800px;">
      <div class="title">热处理订单及作业指示书</div>
      <div class="top cl">
        <div class="top-left">
          <div class="top-left-left" style="position: relative;">
            <!--<b>{{$store.state.date}}</b>-->
            <table class="table table2 table3" borderColor="#000" border="1px">
              <tr>
                <td style="width: 100px">发注日</td>
                <td class="noneBorder" align="center">
                  <!--年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日-->
                  <el-date-picker
                    v-model="hotData.heatTreatment.acceptTime"
                    type="date"
                    disabled=""
                    format="yyyy年MM月dd日"
                    prefix-icon="sdg">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td>交货期</td>
                <td class="noneBorder" align="center">
                  <!--年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日-->
                  <el-date-picker
                    v-model="hotData.heatTreatment.contDueDate"
                    type="date"
                    format="yyyy年MM月dd日"
                    placeholder="请选择日期"
                    prefix-icon="sdg">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td class="noneBorder">
                  送货方式
                </td>
                <td class="noneBorder" align="center">
                  送货  ·  自取  ·  快递
                  <!--<input v-model="hotData.heatTreatment.shiptoType" type="text">-->
                </td>
              </tr>
            </table>
            <div style="position: absolute;top: 106px; width: 140%;font-size: 12px;">
              <p>① ※部分是必填项目。（如必填未填写时可能无法及时做热处理。请务必填写）</p>
              <p>② 重量以HMDS称重为准。</p>
              <p>③ 加工余量与硬度测试位置要求对热处理工艺设定很重要，有相关信息请在对应位置填写</p>
            </div>
          </div>

          <!--<img class="qr-img" :src="$store.state.qrUrl + orderInfo.qrCode + '&w=150&h=150'" alt="">-->
        </div>
        <div class="top-content">
          <table class="table table2 table3" borderColor="#000" border="1px">
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
        <div class="top-right" style="width: 350px; position: relative;">
          <div class="top-left-left">
            <!--<span class="page">page: 1/1</span>-->
            <p style="margin-bottom: 2px;text-align: right; position: absolute;top: -50px;">

              <span style="font-size: 20px;font-weight: bold;">HITACHI</span><br/>
              日立金属(东莞)特殊钢有限公司<br/>
              广东省东莞市茶山镇茶山工业园<br/>
              TEL:0769-8640-6726,6736&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              FAX:0769-8640-6716</p>
            <table class="table table2" style="margin-top: 34px;" borderColor="#000" border="1px">
              <tr>
                <td style="width: 100px">热处理成绩书编号</td>
                <!--<td colspan="3"><input v-model="hotData.heatTreatment.managementNumber" type="text"></td>-->
                <td colspan="3"><input v-model="hotData.heatTreatment.managementNumber" type="text"></td>
              </tr>
              <tr>
                <td>接单号码</td>
                <!--<td colspan="3"><input v-model="hotData.heatTreatment.managementNumber" type="text"></td>-->
                <td colspan="3"><input v-model="hotData.heatTreatment.orderCode" type="text"></td>
              </tr>
            </table>
            <table class="table table2" style="margin-bottom: 10px;margin-top: 5px;" borderColor="#000" border="1px">
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
      <table border="1" style="margin-top: 20px;">
        <thead>
        <tr>
          <th width="90px" class="xing-box" rowspan="2">
            <span>※</span>
            钢钟
          </th>
          <th width="120px" class="xing-box" rowspan="2">
            <span>※</span>
            热处理<br/>
            种类</th>
          <th width="170px" class="xing-box" rowspan="2">
            <span>※</span>
            模号/品名</th>
          <th width="200px" class="xing-box" rowspan="2">
            <span>※</span>
            大概 尺寸(mm)<br/>
            厚T*宽W*长L</th>
          <th width="50px" class="xing-box" rowspan="2">
            <span>※</span>数量</th>
          <th width="100px" class="xing-box" colspan="2">
            <span>※</span>
            要求硬度</th>
          <th width="50px" class="xing-box">
            <span>※</span>
            重量
          </th>
          <th colspan="2">加工余量</th>
          <th width="70px" class="xing-box" rowspan="2">变形要求<br/>mm</th>
          <th rowspan="2">备注（1.其它特殊要求<br/>2.氮化处理时请备注模具用途）</th>
        </tr>
        <tr><th width="40px">HRC</th><th width="40px">HV</th><th>(kg)</th><th width="40px">单边</th><th width="40px">双边</th></tr>
        </thead>
        <tbody>
        <tr class="inputs" v-for="(item, key) in hotData.treatmentEntrys" :key="'1' + key">
          <td><input v-model="item.gradeCd" type="text"></td>
          <td><input v-model="item.heatTreatType" type="text"></td>
          <td><input v-model="item.itemName" type="text"></td>
          <td><input v-model="item.sizeNote" type="text"></td>
          <td class="numb-td"><input v-model="item.qty" type="text">
            <!--<span>件</span>-->
          </td>
          <td colspan="2"><input v-model="item.hardnessRequirement" type="text"></td>
          <td ><input v-model="item.wt" type="text"></td>
          <td colspan="2"><input v-model="item.hardnessResult" type="text"></td>
          <td ><input v-model="item.deformation" type="text"></td>
          <td class="remake-td">
            <textarea class="remark" v-model="item.remark" v-html="item.remark" rows="2">
            </textarea>
          </td>
        </tr>
        <tr class="inputs" v-for="(item, key) in newDatas" :key="'2' + key">
          <td><input v-model="item.gradeCd" type="text"></td>
          <td><input v-model="item.heatTreatType" type="text"></td>
          <td><input v-model="item.itemName" type="text"></td>
          <td><input v-model="item.sizeNote" type="text"></td>
          <td class="numb-td"><input v-model="item.qty" type="text">
            <!--<span>件</span>-->
          </td>
          <td colspan="2"><input v-model="item.hardnessRequirement" type="text"></td>
          <td><input v-model="item.wt" type="text"></td>
          <td colspan="2"><input v-model="item.hardnessResult" type="text"></td>
          <td ><input v-model="item.deformation" type="text"></td>
          <td class="remake-td">
            <textarea class="remark" v-model="item.remark" v-html="item.remark" rows="2">
            </textarea>
            <!--<input v-model="item.remark" type="text">-->
          </td>
        </tr>
        <tr class="inputs">
          <td colspan="4">合计</td>
          <td><input type="text"></td>
          <td colspan="2"></td>
          <td><input type="text"></td>
          <td colspan="4"></td>
        </tr>
        </tbody>
      </table>
      <div class="bottom cl">
        <div class="bottom-left" style="font-size: 12px;">
          <p>（热处理种类及日立)</p>
          <ol>
            <li>退火----------------A</li>
            <li>时效后处理---------AG</li>
            <li>去应力退火---------RA</li>
            <li>深冷处理-----------SZ</li>
            <li>去应力回火---------RT</li>
            <li>表面氮化处理------NVG</li>
            <li>淬火，回火---------QT</li>
            <li>回火---------------- ...</li>
            <li>校正---------------- K</li>
            <li>固溶化处理-------ST</li>
          </ol>
        </div>
        <div class="bottom-right" style="position:relative;">
          &nbsp;<p style="position: absolute; left: 5px; top: -60px;font-size: 12px;">【热处理品不能打硬度部位请在下面空白处图示】</p>
        </div>
      </div>
      <p style="float:left;font-size: 12px;">备注：不能使用修改液，万一须涂改时须签名
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        该文件保存期限5年
      </p>
      <P style="text-align: right; float:right;font-size: 12px;">
        20201022改訂
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        HMDS-QR-48-1/A4</P>
    </div>

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
      for (let i = 0; i < (8 - this.hotData.treatmentEntrys.length); i++) {
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
        } else {
          this.$message.error({
            message: resp.message,
            customClass: 'error-mesg',
            duration: 2000
          })
        }
        this.getNewDatas()
      })
    },
    preservation (typeF = 2) {
      let obj = JSON.parse(JSON.stringify(this.hotData))
      obj.heatTreatment.orderId = this.orderInfo.id
      obj.heatTreatment.orderCode = this.orderInfo.soNo
      obj.heatTreatment.managementNumber = this.orderInfo.soNo
      obj.heatTreatment.contDueDate = this.hotData.heatTreatment.contDueDate
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
      console.log(this.date)
      console.log(obj)
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
            // document.getElementById('printClick').click()
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
      document.getElementById('printClick').click()
      this.preservation(1)
      // this.http('/printHistory/saveOrUpdate', {
      //   soNo: this.orderInfo.soNo,
      //   // dataJson: {...this.hotData},
      //   dataJson: {
      //     data: '不需要打印数据'
      //   },
      //   printType: '3'// 1为切断指示书，2为加工指示书，3为热加工指示书
      // }).then(resp => {
      //   document.getElementById('printClick').click()
      // })
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
  .xing-box {
    position: relative;
  }
  .xing-box span {
    position: absolute;
    width: 100%;
    text-align: center;
    top: -20px;
    left: 0;
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
    width: calc(100% - 10px);
  }
  .inputs td {
    padding: 5px 0px;
    text-align: center;
  }
  .top-left-left {
    width: 98%;
    float: left;
  }
  .top-left,.top-right {
    float: left;
    width: 350px;
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
    width: 500px;
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
    line-height: 135px;
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

  .remake-td {
    position: relative;
    padding: 0 !important;
    height: 30px;
    width: 300px;
    text-align: center;
  }
  .remake-td textarea {
    height: 100%;
    width: 100%;
    border: none;
    position: absolute;
    left: 0;
    top: 0px;
    text-align: center;
    overflow: hidden;
    outline: none;
    resize: none;
    line-height: 15px;
    background: none;
  }
</style>
