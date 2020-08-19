<template>
  <div>
    <div class="scor-book" id="printAll" style="height: 840px; ">
      <div class="top">
        <div class="top-left">
          <table border="1" style="width: 100%;">
            <tr>
              <td>管理编号NO</td>
            </tr>
            <tr>
              <td><input type="text" disabled v-model="formData.managementNumber" class="input" style="text-align: left;"></td>
            </tr>
          </table>
          <!--<p>管理编号NO</p>-->
          <!--<p><input type="text" disabled v-model="formData.managementNumber" class="input" style="text-align: left;"></p>-->
          <div class="name">
            <p>客户名</p>
            <p class="yellow">
              <input v-model="formData.customerName" type="text" class="input">
            </p>
          </div>
        </div>
        <div class="top-center">
          <h1>
            <img class="qrimg" :src="$store.state.qrUrl + formData.heatQrCode + '&w=500&h=500'" alt="">
            WPC处理成绩书</h1>
        </div>
        <div class="top-right">
          <p style="border-bottom: 1px solid #000;display: inline-block;padding: 0 15px;">
            {{$store.state.date}}作成</p>
          <p>日立金属(东莞)特殊钢有限公司热处理工场</p>
          <p>广东省东莞市茶山工业园邮编:523380</p>
          <p>TEL(0769)8640-6726 Fax(0769)8640-6716</p>
        </div>
      </div>
      <table width="100%" border="1" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th width="60">钢种</th>
            <th width="50">作业名</th>
            <th width="80">模号</th>
            <th width="30">重量</th>
            <th width="60">数量</th>
            <th width="75">尺寸</th>
            <th width="55">WPC目的</th>
            <th width="50">品证判定</th>
            <th width="60">热处理审核</th>
            <th width="40">制单者</th>
            <th width="40">确认者</th>
            <th width="40">检查者</th>
            <th width="40">入货日</th>
            <th width="40">出货日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="formData.material" type="text" class="input"></td>
            <td><input v-model="formData.taskName" type="text" class="input"></td>
            <td>
              <div style="position: relative; width: 100%; height: 100%;">
                <textarea class="big-text" v-model="formData.modelNumber"></textarea>
              </div>
            </td>
            <td><input v-model="formData.totalWeight" type="text" class="input"></td>
            <td> <input v-model="formData.counts" type="text" class="input"></td>
            <td><input v-model="formData.size" type="text" class="input"></td>
            <td><input v-model="formData.purpose" type="text" class="input"></td>
            <td rowspan="2"></td>
            <td rowspan="2"></td>
            <td rowspan="2">
              <input v-model="formData.orderMaker" type="text" class="input">
            </td>
            <td rowspan="2">
              <input v-model="formData.orderConfirmMaker" type="text" class="input">
            </td>
            <td rowspan="2">
              <input v-model="formData.outCheckName" type="text" class="input">
            </td>
            <td style="position: relative;">
              <div class="div-min">
                {{$store.getters.getDate(formData.acceptTime, 2)}}
              </div>
              <!--{{$store.getters.getDate(formData.acceptTime, 2)}}-->
             </td>
            <td rowspan="2"><input v-model="formData.outDate" type="text" value="10月14日" class="input"></td>
          </tr>
        <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td style="position: relative;">
            <div class="div-min" style="top: 7px;">
              {{$store.getters.getDate(formData.acceptTime).substring(11)}}
            </div>
            <!--{{$store.getters.getDate(formData.acceptTime).substring(11)}}-->
          </td>
        </tr>
          <tr>
            <td class="bg-gray center" colspan="5">入货检查</td>
            <td class="bg-gray center" colspan="2">检查判定</td>
            <td colspan="7" valign="top" rowspan="3">
              <table style="width: 100%;">
                <tr>
                  <td valign="top" style="width: 71px;">特别事项</td>
                  <td>
                    <textarea class="textarea" v-model="formData.specialMatters" type="text"></textarea>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="5" rowspan="2">
              <yesNo label="伤痕" :value.sync="formData.shanghen"></yesNo>
              <yesNo label="焊接" :value.sync="formData.hanjie"></yesNo>
              <yesNo label="黑皮" :value.sync="formData.heipi"></yesNo>
              <yesNo label="粘铝" :value.sync="formData.zhanlv"></yesNo>
            </td>
            <td class="center" colspan="2" rowspan="2">
              OK <el-checkbox v-model="formData.isCheck" label="OK"></el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
              联络 <el-checkbox v-model="formData.isCheck" label="联络"></el-checkbox>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td colspan="5" rowspan="2">
              <yesNo label="深槽" :value.sync="formData.shencao"></yesNo>
              <yesNo label="深孔" :value.sync="formData.shenkong"></yesNo>
              <yesNo label="异物" :value.sync="formData.yiwu"></yesNo>
            </td>
            <td class="center bold" colspan="2"> 入货检查者</td>
            <td class="center bold" colspan="7" rowspan="2">出货检查结果</td>
          </tr>
          <tr>
            <td colspan="2">
              <input v-model="formData.inCheckName" type="text" class="input">
            </td>
          </tr>
          <tr>
            <td class="bg-gray bold" colspan="7">
              <div :class="{hid: showType == 2}">工程选择</div>
            </td>
            <td>外观检查<br/>(肉眼)</td>
            <td>碰伤</td>
            <td>有
              <el-checkbox v-model="formData.pengshang" label="1"></el-checkbox>
            </td>
            <td>无 <el-checkbox v-model="formData.pengshang" label="2"></el-checkbox>
            </td>
            <td>涂防锈油</td>
            <td>有 <el-checkbox v-model="formData.tufang" label="1"></el-checkbox></td>
            <td>无 <el-checkbox v-model="formData.tufang" label="2"></el-checkbox></td>
          </tr>
          <tr>
            <td class="center bold" :class="{hid: showType == 2}" rowspan="2">工程选择<br/>(填序号)</td>
            <td rowspan="2">
              <input v-model="formData.engineering" type="text" class="input">
            </td>
            <td rowspan="2" colspan="3">
              <table>
                <tr>
                  <td valign="top" :class="{hid: showType == 2}" style="padding:0;">
                    工程序号：
                  </td>
                  <td :class="{hid: showType == 2}" style="padding:0;">
                    ①工程1+工程2+工程3<br/>
                    ②工程1+工程3<br/>
                    ③工程2<br/>
                    ④工程1<br/>
                  </td>
                </tr>
              </table>
            </td>
            <td class="bold" :class="{hid: showType == 2}">工程选择确认者</td>
            <td class="bold" :class="{hid: showType == 2}">技术确认者</td>
            <td></td>
            <td>WPC位置保存</td>
            <td>有 <el-checkbox v-model="formData.weizhi" label="1"></el-checkbox></td>
            <td>无 <el-checkbox v-model="formData.weizhi" label="2"></el-checkbox></td>
            <td>裂纹</td>
            <td>有 <el-checkbox v-model="formData.liewen" label="1"></el-checkbox></td>
            <td>无 <el-checkbox v-model="formData.liewen" label="2"></el-checkbox></td>
          </tr>
          <tr>
            <td>
              <input v-model="formData.engineeringName" type="text" class="input">
            </td>
            <td>
              <input v-model="formData.skillName" type="text" class="input">
            </td>
            <td></td>
            <td>特殊要求确认</td>
            <td>有 <el-checkbox v-model="formData.yaoqiu" label="1"></el-checkbox></td>
            <td>无 <el-checkbox v-model="formData.yaoqiu" label="2"></el-checkbox></td>
            <td>孔内沙粒</td>
            <td>有 <el-checkbox v-model="formData.kongnei" label="1"></el-checkbox></td>
            <td>无 <el-checkbox v-model="formData.kongnei" label="2"></el-checkbox></td>
          </tr>
          <tr>
            <td class="bg-gray bold" colspan="5">
              <div :class="{hid: showType == 2}">前处理</div>
            </td>
            <td class="center bold" :class="{hid: showType == 2}" colspan="2">作业者</td>
            <td rowspan="8" colspan="7" style="position: relative;">
              <div class="img-box">
                <div class="img">
                  <p>1.处理前照片</p>
                  <img @click="openPics('beforeSrc')" class="table-div-img" :src="formData.beforeSrc" alt="">
                </div>
                <div class="img">
                  <p>2.处理后照片</p>
                  <img @click="openPics('afterSrc')" class="table-div-img" :src="formData.afterSrc" alt="">
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td :class="{hid: showType == 2}" colspan="5">
              <yesNo label="清洗" :value.sync="formData.qingxi"></yesNo>
              <yesNo label="遮盖保护" :value.sync="formData.jiegai"></yesNo>
              <yesNo label="异物去除" :value.sync="formData.yiwuquchu"></yesNo>
            </td>
            <td colspan="2">
              <input v-model="formData.name1" type="text" class="input">
            </td>
          </tr>
          <tr>
            <td class="bg-gray bold" colspan="5">
              <div :class="{hid: showType == 2}"><yesNo label="工程1作业" :value.sync="formData.engineering1"></yesNo> 研磨材【SIC220】</div>
            </td>
            <td class="bold center" :class="{hid: showType == 2}" colspan="2">作业者</td>
          </tr>
          <tr>
            <td :class="{hid: showType == 2}" colspan="4">
              .装置确认------------压力、处理范围<br/>
              .工件安装------------遮盖保护(贴两层)<br/>
              .喷射----------------注意角度、距离、时间<br/>
              .风枪吹扫→工件取出→风枪吹扫→研磨材混入防止<br/>
            </td>
            <td :class="{hid: showType == 2}">
              <table>
                <tr>
                  <td style="padding:0;">
                    喷射压力：<br/>
                    0.3Mpa
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering1Select" label="1"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    喷射距离：<br/>
                    100-150mm
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering1Select" label="2"></el-checkbox>
                  </td>
                </tr>
              </table>
            </td>
            <td :class="{hid: showType == 2}" colspan="2" valign="bottom">
              <input v-model="formData.name2" type="text" class="input" style="height: 34px;">
              <p style="color: #bbb; font-size: 12px;">*尽可能同一作业者</p>
              <p style="color: #bbb; font-size: 12px;">*不要的工程在签字栏画斜杠</p>
            </td>
          </tr>
          <tr>
            <td class="bg-gray bold" colspan="5">
              <div :class="{hid: showType == 2}"><yesNo label="工程2作业" :value.sync="formData.engineering2"></yesNo> 研磨材【PHS300】</div>
            </td>
            <td class="bold center" :class="{hid: showType == 2}" colspan="2">作业者</td>
          </tr>
          <tr>
            <td :class="{hid: showType == 2}" colspan="4">
              .装置确认------------压力、处理范围<br/>
              .工件安装------------遮盖保护(贴两层)<br/>
              .喷射----------------注意角度、距离、时间<br/>
              .风枪吹扫→工件取出→风枪吹扫→研磨材混入防止<br/>
            </td>
            <td :class="{hid: showType == 2}">
              <table>
                <tr>
                  <td style="padding:0;">
                    喷射压力：<br/>
                    0.4Mpa
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering2Select" label="1"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    喷射距离：<br/>
                    150-200mm
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering2Select" label="2"></el-checkbox>
                  </td>
                </tr>
              </table>
            </td>
            <td :class="{hid: showType == 2}" colspan="2" valign="bottom">
              <input v-model="formData.name3" type="text" class="input" style="height: 34px;">
              <p style="color: #bbb; font-size: 12px;">*尽可能同一作业者</p>
              <p style="color: #bbb; font-size: 12px;">*不要的工程在签字栏画斜杠</p>
            </td>
          </tr>
          <tr>
            <td class="bg-gray bold" colspan="5">
              <div :class="{hid: showType == 2}"><yesNo label="工程3作业" :value.sync="formData.engineering3"></yesNo> 研磨材【PHB300】</div>
            </td>
            <td class="bold center" :class="{hid: showType == 2}" colspan="2">作业者</td>
          </tr>
          <tr>
            <td :class="{hid: showType == 2}" colspan="4">
              .装置确认------------压力、处理范围<br/>
              .工件安装------------遮盖保护(贴两层)<br/>
              .喷射----------------注意角度、距离、时间<br/>
              .风枪吹扫→工件取出→风枪吹扫→研磨材混入防止<br/>
            </td>
            <td :class="{hid: showType == 2}">
              <table>
                <tr>
                  <td style="padding:0;">
                    喷射压力：<br/>
                    0.4Mpa
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering3Select" label="1"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    喷射距离：<br/>
                    100-150mm
                  </td>
                  <td style="padding:0;">
                    <el-checkbox v-model="formData.engineering3Select" label="2"></el-checkbox>
                  </td>
                </tr>
              </table>
            </td>
            <td colspan="2" :class="{hid: showType == 2}" valign="bottom">
              <input v-model="formData.name4" type="text" class="input" style="height: 34px;">
              <p style="color: #bbb; font-size: 12px;">*尽可能同一作业者</p>
              <p style="color: #bbb; font-size: 12px;">*不要的工程在签字栏画斜杠</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 12px;margin-top: 4px;">
        ※注：以上记录只登记客户要求的工艺和工艺所必需的数据！数字不能涂改，不能使用修正液！
        <span style="float: right;">HMDS-QR-113/A2</span>
      </p>
    </div>
    <p style="text-align: center;margin: 20px 0 10px 0;">
      <el-button v-print="'#printAll'" type="primary">打印</el-button>
      <el-button @click="submit" type="primary">保存</el-button>
    </p>
    <el-dialog
      :visible.sync="picsDialog"
      title="图片库"
      append-to-body
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
</template>

<script>
let obj = {
}
let model = {
  beforeSrc: '../../../static/images/add-img.png',
  afterSrc: '../../../static/images/add-img.png',
  shanghen: 2,
  hanjie: 2,
  zhanlv: 2,
  heipi: 2,
  shencao: 2,
  shenkong: 2,
  yiwu: 2,
  qingxi: 2,
  jiegai: 2,
  yiwuquchu: 2,
  pengshang: [],
  tufang: [],
  weizhi: [],
  liewen: [],
  yaoqiu: [],
  kongnei: [],
  engineering1: 2,
  engineering2: 2,
  engineering3: 2,
  isCheck: [],
  engineering1Select: [],
  engineering2Select: [],
  engineering3Select: []
}
import yesNo from './YesOrNo'
export default {
  name: 'scorBook',
  props: ['orderInfo'],
  components: {
    yesNo
  },
  data () {
    return {
      showType: 1,
      newImg: '',
      imageUrlOne: '',
      picsDialog: false,
      bigImgSrc: '../../../static/images/add-img.png',
      imgSrcs: [],
      id: 'upload',
      formData: {}
    }
  },
  created () {
    this.formData = JSON.parse(JSON.stringify(model))
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.http('/heatTreatment/get', this.orderInfo.id).then(resp => {
        if (resp.success) {
          this.formData = {
            ...model,
            ...JSON.parse(resp.data.heatData)
          }
          // if (resp.data.heatData === null) {
          //   // for (let key in resp.data) {
          //   //   // 当返回值为null时取model中的值
          //   //   if (resp.data[key] !== null) {
          //   //     this.formData[key] = resp.data[key]
          //   //   }
          //   // }
          // } else {
          //   this.formData = {
          //     ...model,
          //     ...JSON.parse(resp.data.heatData)
          //   }
          // }
        }
      })
    },
    // 保存
    submit () {
      let obj = JSON.stringify(this.formData)
      this.http('/heatTreatment/update', {
        id: this.orderInfo.id,
        taskName: this.formData.taskName,
        counts: this.formData.counts,
        totalWeight: this.formData.totalWeight,
        hardnessRequirement: this.formData.hardnessRequirement,
        heatData: obj
      }).then(resp => {
        if (resp.success) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '保存成功！'
          })
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    // 打开图片库
    openPics (imgSrc) {
      this.newImg = imgSrc
      this.http('/tImages/list', {
        orderCode: this.orderInfo.orderCode
      }).then(resp => {
        this.imgSrcs = []
        resp.data.list.map(item => {
          this.http('/tImages/getImageSrcById?id=' + item.id).then(res => {
            console.log('图片', res)
            this.imgSrcs.push({
              src: 'http://' + res,
              id: item.id
            })
          })
        })
      })
      this.picsDialog = true
    },
    // 选中图片
    selectImg (item) {
      // this.formData.checkImage = item.id
      this.formData[this.imgSrc] = item.src
      this.picsDialog = false
    }
  },
  watch: {
    orderInfo () {
      this.formData = JSON.parse(JSON.stringify(model))
      this.getData()
    }
  }
}
</script>

<style scoped>
* {
  font-size: 13px;
  font-family: 宋体;
}

.new-font p {
  border-bottom: 1px solid #000;
  padding-left: 5px;
  position: relative;
  left: -5px;
  font-size: 12px;
  line-height: 30px;
}
textarea {
  text-align: center;
}
.yellow {
  background: rgba(255, 255, 0, 1);
}
.td-font span, .td-font p{
  font-size: 14px;
}

.input {
  width: 100%;
  border: none;
  text-align: center;
  background: none;
}

.name {
  border: 1px solid #000;
  border-top: none;
  border-bottom: none;
  text-align: center;
}
.name p:first-child {
  border-bottom: 1px solid #000;
}

.qrimg {
  position: absolute;
  width: 45px;
  left: 60px;
  top: -18px;
}
.top {
  line-height: 20px;
}
.top-left {
  width: 204px;
}
.top-center {
  width: calc(100% - 604px);
  text-align: center;
}
.top-center h1 {
  font-size: 30px;
  position: relative;
  top: 40px;
  left: 60px;
}
.top-right {
  width: 400px;
  text-align: right;
}
.top {
}
.top-left, .top-right, .top-center {
  float: left;
}
span.box {
  width: 10px;
  height: 10px;
  display: inline-block;
  border: 1px solid #666;
  position: relative;
  top: 2px;
  margin-left: 3px;
}

.correcting ul li:last-child {
  border-right: 1px solid #000;
}
.correcting li{
  float: left;
  font-size: 12px;
  list-style: none;
  height: 14px;
  line-height: 13px;
  border: 1px solid #000;
  padding: 1px 3px;
  border-right: none;
}
.correcting li span.box {
  width: 7px;
  height: 7px;
  top: 1px;
}
table td {
  border-right: none;
  border-top: none;
  padding: 5px;
  line-height: 18px;
}
table th {
  padding: 2px;
}

.table2 td {
  padding: 4px;
}

.table3 td {
  border-left: 1px solid #666;
  border-bottom: 1px solid #666;
  text-align: center;
  padding: 1px 0;
}
.big-text {
  display: table-cell;
  width: 100%;
  float: left;
  resize: none;
  height: 30px;
  border: none;
  line-height: 14px;
  overflow: visible;
  font-size: 12px;
  background: none;
}
.imgs li {
  float: left;
  width: 70px;
  height: 70px;
  margin: 5px;
  overflow: hidden;
  cursor: pointer;
}
.picsContent {
  height: 600px;
  overflow-y: auto;
}
.imgs li img {
  width: 70px;
}
.bg-gray {
  background: #ccc;
}
.center {
  text-align: center;
}
.bold {
  font-weight: bold;
}
.img-box {
  height: 374px;
  width: 499px;
  position: absolute;
  left: 0;
  top: 20px;
}
.img {
  height: calc(100% - 10px);
  width: calc(50% - 10px);
  margin: 5px;
  float: left;
}
.img img {
  max-width: 100%;
  max-height: calc(100% - 10px);
  margin-top: 10px;
  cursor: pointer;
}
.hid {
  opacity: 0;
}
.div-min {
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  top: 12px;
  left: 1px;
}
.textarea {
  background: none;
  border: none;
  width: 100%;
  outline: none;
  resize: none;
  overflow: hidden;
  height: 34px;
  text-align: left;
}
</style>
