<template>
  <div>
    <div v-if="sheetNo == null">
      尚未下载成绩书
    </div>
    <div v-else>
      <div class="title">
        <h3>基本信息</h3>
      </div>
      <table>
        <tr>
          <td>检查结果</td>
          <td style="width: 330px;">
            <!--<input v-model="formData.checkResult" type="text">-->
            <el-radio-group v-model="formData.checkResult">
              <el-radio label="OK"></el-radio>
              <el-radio label="AfterOk">处置后OK</el-radio>
              <el-radio label="NG"></el-radio>
              <el-radio label="">无</el-radio>
            </el-radio-group>
          </td>
          <td>确认人</td>
          <td>
            <input v-model="formData.checkResultUserName" type="text">
          </td>
          <td>特殊事项</td>
          <td>
            <input v-model="formData.specialMatters" type="text">
          </td>
          <td>检查图片</td>
          <td>
            <input hidden class="imgInput" @focus="openPics" v-model="formData.checkImage" type="text">
            <div class="img-box">
              <img @click="openPics" class="check-img" :src="srcImg" alt="点击选择图片">
            </div>
          </td>
        </tr>
        <!--<tr>-->
          <!--<td>入货时间</td>-->
          <!--<td>-->
            <!--<el-date-picker-->
              <!--v-model="formData.purchaseTime"-->
              <!--type="datetime"-->
              <!--placeholder="选择日期时间">-->
            <!--</el-date-picker>-->
          <!--</td>-->
          <!--<td>收货者</td>-->
          <!--<td>-->
            <!--<input v-model="formData.purchaseUser" type="text">-->
          <!--</td>-->
        <!--</tr>-->
      </table>
      <div class="title">
        <h3>Q炉</h3>
      </div>
      <table>
        <tr>
          <td>Q炉NO</td>
          <td>
            <input v-model="formData.qFurnaceNo" type="text">
          </td>
          <td>Q数量</td>
          <td>
            <input v-model="formData.qCount" type="text">
          </td>
          <td>Q确认</td>
          <td>
            <input v-model="formData.qConfirm" type="text">
          </td>
          <td>Q淬火方法</td>
          <td colspan="3">
            <!--<input v-model="formData.qQuenchingType" type="text">-->
            <el-radio-group v-model="formData.qQuenchingType">
              <el-radio label="HQA">HQA(空冷)</el-radio>
              <el-radio label="NIS">NIS(风冷-油冷)</el-radio>
              <el-radio label="NES">NES(气冷)</el-radio>
              <el-radio label="HQO">HQO(油冷)</el-radio>
              <el-radio label="MQ">MQ(分级淬火)</el-radio>
              <el-radio label="">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>Q时间</td>
          <td>
            <!--<input v-model="formData.qTime" type="text">-->
            <el-date-picker
              v-model="formData.qTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
          <td>Q作业者</td>
          <td>
            <input v-model="formData.qOperator" type="text">
          </td>
          <!--<td>Q确认结果</td>-->
          <!--<td>-->
            <!--<input v-model="formData.qResult" type="text">-->
          <!--</td>-->
          <td>Q温度1</td>
          <td>
            <input v-model="formData.qTemperature1" type="text">
          </td>
          <td>Q温度2</td>
          <td>
            <input v-model="formData.qTemperature2" type="text">
          </td>
          <td>Q温度3</td>
          <td>
            <input v-model="formData.qTemperature3" type="text">
          </td>
        </tr>
        <tr>
          <td>Q温度4</td>
          <td>
            <input v-model="formData.qTemperature4" type="text">
          </td>
          <td>淬火结果</td>
          <td>
            <el-radio-group v-model="formData.qResult">
              <el-radio label="1">OK</el-radio>
              <el-radio label="0">NG</el-radio>
            </el-radio-group>
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>T1炉</h3>
      </div>
      <table>
        <tr>
          <td>T1炉NO</td>
          <td>
            <input v-model="formData.t1FurnaceNo" type="text">
          </td>
          <td>T1数量</td>
          <td>
            <input v-model="formData.t1Count" type="text">
          </td>
          <td>T1温度1</td>
          <td>
            <input v-model="formData.t1Temperature1" type="text">
          </td>
          <td>T1温度2</td>
          <td>
            <input v-model="formData.t1Temperature2" type="text">
          </td>
          <td>T1时间</td>
          <td>
            <!--<input v-model="formData.t1Time" type="text">-->
            <el-date-picker
              v-model="formData.t1Time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>T1作业者</td>
          <td>
            <input v-model="formData.t1Operator" type="text">
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>T2炉</h3>
      </div>
      <table>
        <tr>
          <td>T2炉NO</td>
          <td>
            <input v-model="formData.t2FurnaceNo" type="text">
          </td>
          <td>T2数量</td>
          <td>
            <input v-model="formData.t2Count" type="text">
          </td>
          <td>T2温度1</td>
          <td>
            <input v-model="formData.t2Temperature1" type="text">
          </td>
          <td>T2温度2</td>
          <td>
            <input v-model="formData.t2Temperature2" type="text">
          </td>
          <td>T2时间</td>
          <td>
            <!--<input v-model="formData.t2Time" type="text">-->
            <el-date-picker
              v-model="formData.t2Time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>T2作业者</td>
          <td>
            <input v-model="formData.t2Operator" type="text">
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>T3炉</h3>
      </div>
      <table>
        <tr>
          <td>T3炉NO</td>
          <td>
            <input v-model="formData.t3FurnaceNo" type="text">
          </td>
          <td>T3数量</td>
          <td>
            <input v-model="formData.t3Count" type="text">
          </td>
          <td>T3温度1</td>
          <td>
            <input v-model="formData.t3Temperature1" type="text">
          </td>
          <td>T3温度2</td>
          <td>
            <input v-model="formData.t3Temperature2" type="text">
          </td>
          <td>T3时间</td>
          <td>
            <!--<input v-model="formData.t3Time" type="text">-->
            <el-date-picker
              v-model="formData.t3Time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>T3作业者</td>
          <td>
            <input v-model="formData.t3Operator" type="text">
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>T4炉</h3>
      </div>
      <table>
        <tr>
          <td>T4炉NO</td>
          <td>
            <input v-model="formData.t4FurnaceNo" type="text">
          </td>
          <td>T4数量</td>
          <td>
            <input v-model="formData.t4Count" type="text">
          </td>
          <td>T4温度1</td>
          <td>
            <input v-model="formData.t4Temperature1" type="text">
          </td>
          <td>T4温度2</td>
          <td>
            <input v-model="formData.t4Temperature2" type="text">
          </td>
          <td>T4时间</td>
          <td>
            <!--<input v-model="formData.t4Time" type="text">-->
            <el-date-picker
              v-model="formData.t4Time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>T4作业者</td>
          <td>
            <input v-model="formData.t4Operator" type="text">
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>其它炉</h3>
      </div>
      <table>
        <tr>
          <td>其它处理</td>
          <td colspan="5">
            <!--<input v-model="formData.otherRequirement" type="text">-->
            <el-radio-group v-model="formData.otherRequirement">
              <el-radio label="NVG"></el-radio>
              <el-radio label="RT"></el-radio>
              <el-radio label="RA"></el-radio>
              <el-radio label="T"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="AG"></el-radio>
              <el-radio label="ST"></el-radio>
              <el-radio label="">无</el-radio>
            </el-radio-group>
          </td>
          <td>其它炉NO</td>
          <td>
            <input v-model="formData.otherFurnaceNo" type="text">
          </td>
          <td>其它数量</td>
          <td>
            <input v-model="formData.otherCount" type="text">
          </td>
        </tr>
        <tr>
          <td>其它类型</td>
          <td>
            <input v-model="formData.otherType" type="text">
          </td>
          <td>其它温度1</td>
          <td>
            <input v-model="formData.otherTemperature1" type="text">
          </td>
          <td>其它时间</td>
          <td>
            <!--<input v-model="formData.otherTime" type="text">-->
            <el-date-picker
              v-model="formData.otherTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
          <td>其它作业者</td>
          <td>
            <input v-model="formData.otherOperator" type="text">
          </td>
        </tr>
      </table>
      <div class="title">
        <h3>SZ炉</h3>
      </div>
      <table>
        <tr>
          <td>SZ炉NO</td>
          <td>
            <input v-model="formData.szFurnaceNo" type="text">
          </td>
          <td>SZ数量</td>
          <td>
            <input v-model="formData.szCount" type="text">
          </td>
          <td>SZ温度1</td>
          <td>
            <input v-model="formData.szTemperature1" type="text">
          </td>
          <td>SZ时间</td>
          <td>
            <!--<input v-model="formData.szTime" type="text">-->
            <el-date-picker
              v-model="formData.szTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </td>
          <td>SZ作业者</td>
          <td>
            <input v-model="formData.szOperator" type="text">
          </td>
        </tr>
      </table>
      <div v-if="sheetNo == 3" class="title">
        <h3>出货检查结果</h3>
      </div>
      <table v-if="sheetNo == 3">
        <tr>
          <td style="text-align: left;" colspan="10">外观检查(肉眼):</td>
        </tr>
        <tr>
          <td>碰伤(模面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.positiveBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>碰伤(侧面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.sideBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>碰伤(背面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.backBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>裂纹</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.crack">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>石棉残留</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.asbestosResidue">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;" colspan="10">探伤检查:</td>
        </tr>
        <tr>
          <td>碰伤(模面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.flawDetection.crack">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
      </table>
      <div v-if="sheetNo == 4" class="title">
        <h3>出货检查结果</h3>
      </div>
      <table v-if="sheetNo == 4">
        <tr>
          <td style="text-align: left;" colspan="10">外观检查(肉眼):</td>
        </tr>
        <tr>
          <td>表面颜色</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.surfaceColor">
              <el-radio label="1">OK</el-radio>
              <el-radio label="0">NG</el-radio>
            </el-radio-group>
          </td>
          <td>表面异物</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.foreignMatter">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>碰伤(模面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.positiveBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>碰伤(侧面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.sideBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>碰伤(背面)</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.backBruise">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
          <td>孔内砂粒</td>
          <td>
            <el-radio-group v-model="formData.projectAppearance.eyeCheck.sand">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </td>
        </tr>

      </table>
      <div class="title">
        <h3>钢种</h3>
      </div>
      <table class="table">
        <tbody v-if="sheetNo == 1 || sheetNo == 8" v-for="(item, key) in treatmentEntrys" :key="key">
          <tr>
            <td>尺寸mm</td>
            <td>
              <input disabled="true" v-model="item.sizeNote" type="text">
            </td>
            <td>数量pcs</td>
            <td>
              <input disabled="true" v-model="item.qty" type="text">
            </td>
            <td>变形量mm</td>
            <td>
              <input v-model="item.deformation" type="text">
            </td>
            <td>硬度HRC</td>
            <td>
              <input v-model="item.hardnessResult" type="text">
            </td>
            <td>指定硬度</td>
            <td>
              <input disabled="true" v-model="item.hardnessRequirement" type="text">
            </td>
            <td>测量件数</td>
            <td>
              <input v-model="item.measuringCount" type="text">
            </td>
          </tr>
        </tbody>
        <tbody v-if="sheetNo == 2 || sheetNo == 3 || sheetNo == 5 || sheetNo == 9" v-for="(item, key) in treatmentEntrys" :key="key">
        <tr>
          <td>模号</td>
          <td>
            <input disabled="true" v-model="item.ModelNumber" type="text">
          </td>
          <td>品名</td>
          <td>
            <input disabled="true" v-model="item.itemName" type="text">
          </td>
          <td>尺寸mm</td>
          <td>
            <input disabled="true" v-model="item.sizeNote" type="text">
          </td>
          <td>数量pcs</td>
          <td>
            <input disabled="true" v-model="item.qty" type="text">
          </td>
          <td>变形量0.1</td>
          <td>
            <input v-model="item.deformation" type="text">
          </td>
          <td>硬度HRC</td>
          <td>
            <input v-model="item.hardnessResult" type="text">
          </td>
          <td>测量件数</td>
          <td>
            <input v-model="item.measuringCount" type="text">
          </td>
        </tr>
        </tbody>
        <tbody v-if="sheetNo == 4 || sheetNo == 6" v-for="(item, key) in treatmentEntrys" :key="key">
        <tr>
          <td>品名</td>
          <td>
            <input disabled="true" v-model="item.itemName" type="text">
          </td>
          <td>尺寸</td>
          <td>
            <input disabled="true" v-model="item.sizeNote" type="text">
          </td>
          <td>数量</td>
          <td>
            <input disabled="true" v-model="item.qty" type="text">
          </td>
          <td>氮化深度</td>
          <td>
            <input v-model="item.actualNitrdedCaseDepth" type="text">
          </td>
          <td>氮化硬度</td>
          <td>
            <input disabled="true" v-model="item.actualNitrideHardness" type="text">
          </td>
          <td>重量(KG)</td>
          <td>
            <input disabled="true" v-model="item.wt" type="text">
          </td>
        </tr>
        </tbody>
        <tbody v-if="sheetNo == 7" v-for="(item, key) in treatmentEntrys" :key="key">
        <tr>
          <td>要求氮化深度</td>
          <td>
            <input v-model="item.nitrdedCaseDepth" type="text">
          </td>
          <td>实际氮化深度</td>
          <td>
            <input v-model="item.actualNitrdedCaseDepth" type="text">
          </td>
          <td>要求氮化硬度</td>
          <td>
            <input v-model="item.nitrdedHardness" type="text">
          </td>
          <td>实际氮化硬度</td>
          <td>
            <input disabled="true" v-model="item.actualNitrideHardness" type="text">
          </td>
        </tr>
        </tbody>
      </table>
      <p style="text-align: center; margin-top: 20px;" >
        <el-button @click="submitClick" type="primary">提交</el-button>
      </p>
      <el-dialog
        :visible.sync="picsDialog"
        title="图片库"
        :modal="false"
        width="600px">
        <div class="picsContent">
          <ul class="imgs">
            <li @click="selectImg(item)" v-for="(item, index) in imgSrcs" :key="index">
              <img :src="item.src" alt="">
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getExcel } from "../../http";

export default {
  name: 'inputCommod',
  props: ['inputDate'],
  data () {
    return {
      sheetNo: 1,
      picsDialog: false,
      imgSrcs: [],
      srcImg: '',
      // heatTreatment: '',
      formData: {
        checkResult: '',
        checkResultUserName: '',
        qFurnaceNo: '',
        qCount: '',
        qConfirm: '',
        qQuenchingType: '',
        qTime: '',
        qOperator: '',
        qTemperature1: '',
        qTemperature2: '',
        qTemperature3: '',
        qTemperature4: '',
        qResult: '1',
        t1FurnaceNo: '',
        t1Count: '',
        t1Temperature1: '',
        t1Temperature2: '',
        t1Time: '',
        t1Operator: '',
        t2FurnaceNo: '',
        t2Count: '',
        t2Temperature1: '',
        t2Temperature2: '',
        t2Time: '',
        t2Operator: '',
        t3FurnaceNo: '',
        t3Count: '',
        t3Temperature1: '',
        t3Temperature2: '',
        t3Time: '',
        t3Operator: '',
        t4FurnaceNo: '',
        t4Count: '',
        t4Temperature1: '',
        t4Temperature2: '',
        t4Time: '',
        t4Operator: '',
        otherFurnaceNo: '',
        otherCount: '',
        otherRequirement: '',
        otherType: '',
        otherTemperature1: '',
        otherTime: '',
        otherOperator: '',
        szFurnaceNo: '',
        szCount: '',
        szTemperature1: '',
        szTime: '',
        szOperator: '',
        specialMatters: '',
        checkImage: '',
        projectAppearance: {
          eyeCheck: {
            positiveBruise: 1,
            sideBruise: 0,
            surfaceColor: 1,
            foreignMatter: 0,
            sand: 1,
            backBruise: 1,
            crack: 1,
            asbestosResidue: 0
          },
          flawDetection: {
            crack: 1
          }
        }
      },
      treatmentEntrys: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.http('/heatTreatment/getPrintHeatTreatmentData', {
        orderCode: this.inputDate.orderCode
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.formData = {
            ...this.formData,
            ...resp.data.heatTreatment
          }
          if (this.formData.checkImage !== '') {
            this.getImg(this.formData.checkImage)
          }
          if (resp.data.heatTreatment.projectAppearance !== null) {
            let c = JSON.parse(resp.data.heatTreatment.projectAppearance)
            this.formData.projectAppearance = c
          } else {
            this.formData.projectAppearance = {
              eyeCheck: {
                positiveBruise: 1,
                surfaceColor: 1,
                foreignMatter: 0,
                sand: 1,
                sideBruise: 0,
                backBruise: 1,
                crack: 1,
                asbestosResidue: 0
              },
              flawDetection: {
                crack: 1
              }
            }
          }
          this.treatmentEntrys = resp.data.treatmentEntrys.map(item => {
            return {
              sizeNote: '',
              qty: '',
              deformation: '',
              hardnessPequirement: '',
              hardnessResult: '',
              measuringCount: '',
              itemName: '',
              ModelNumber: '',
              actualNitrdedCaseDepth: '',
              actualNitrideHardness: '',
              wt: '',
              nitrdedCaseDepth: '',
              nitrdedHardness: '',
              ...item
            }
          })

          this.sheetNo = resp.data.heatTreatment.sheetNo
        }
      })
    },
    submitClick () {
      let c = JSON.stringify(this.formData.projectAppearance)
      let heatTreatment = {
        ...this.formData
      }
      console.log(heatTreatment)
      heatTreatment.projectAppearance = c
      let treatmentEntrys = this.treatmentEntrys
      this.http('/heatTreatment/saveHeatTreatment', {
        heatTreatment,
        treatmentEntrys
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.$message({
            message: '保存成功！',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    //获取图片Src
    getImg (id) {
      getExcel('/tImages/getImageById', {
        id: id
      }).then(res => {
        let src = 'data:image/jpg;base64,'+ btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        this.srcImg = src
      })
    },
    // 打开图片库
    openPics () {
      this.http('/tImages/list', {
        orderCode: this.inputDate.orderCode
      }).then(resp => {
        this.imgSrcs = []
        resp.data.list.map(item => {
          getExcel('/tImages/getImageById', {
            id: item.id
          }).then(res => {
            let src = 'data:image/jpg;base64,'+ btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            this.imgSrcs.push({
              src,
              id: item.id
            })
          })
        })
      })
      this.picsDialog = true
    },
    // 选中图片
    selectImg (item) {
      this.formData.checkImage = item.id
      this.srcImg = item.src
      this.picsDialog = false
    }
  }
}
</script>

<style scoped>
  table {
    background: #efefef;
  }
  .check-img {
    width: 50px;
  }
  .img-box {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border: 1px dashed #666;
    cursor: pointer;
    text-align: center;
  }
  .imgInput {
    width: 60px;
  }
  .imgs li {
    float: left;
    width: 70px;
    height: 70px;
    margin: 5px;
    overflow: hidden;
    cursor: pointer;
  }
  .imgs li img {
    width: 70px;
  }
  .picsContent {
    height: 600px;
    overflow-y: auto;
  }
  .title {
    color: #298ce0;
    border-bottom: 2px solid #298ce0;
    margin: 10px 0;
    padding-bottom: 5px;
  }
  table td {
    padding: 7px 3px;
  }
  table td input {
    width: calc(100% - 20px);
    padding: 0 5px;
    margin-left: 5px;
    height: 28px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
  }
  table td:nth-child(odd) {
    width: 80px;
    text-align: right;
  }
  table td:nth-child(even) {
    width: 180px;
    text-align: left;
  }
  .table td:nth-child(odd) {
    width: 80px;
    text-align: right;
  }
  .table td:nth-child(even) {
    width: 140px;
    text-align: left;
  }
  input[disabled="disabled"] {
    border: none;
  }
</style>
