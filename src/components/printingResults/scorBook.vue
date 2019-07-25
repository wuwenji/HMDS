<template>
  <div>
    <div class="scor-book" id="printAll" style="height: 840px; overflow: hidden;">
      <div class="top">
        <div class="top-left">
          <p>管理编号NO</p>
          <p><input type="text" class="input" style="text-align: left;"></p>
          <div class="name">
            <p>客户名</p>
            <p class="yellow">
              <input type="text" class="input">
            </p>
          </div>
        </div>
        <div class="top-center">
          <h1>
            <img class="qrimg" :src="$store.state.qrUrl + 'item.workList[0].cutQrCode' + '&w=500&h=500'" alt="">
            热处理兼表面处理成绩书</h1>
        </div>
        <div class="top-right">
          <p style="border-bottom: 1px solid #000;display: inline-block;padding: 0 15px;">2019年&nbsp;&nbsp;7月23日&nbsp;&nbsp;作成</p>
          <p>日立金属(东莞)特殊钢有限公司热处理工场</p>
          <p>广东省东莞市茶山工业园邮编:523380</p>
          <p>TEL(0769)8640-6726 Fax(0769)8640-6716</p>
        </div>
      </div>
      <table width="100%" border="1" cellpadding="0" cellspacing="0">
      <tr>
        <th width="60">钢种</th>
        <th width="50">作业名</th>
        <th width="50">模号</th>
        <th width="60">数量</th>
        <th width="80">重量(KG)</th>
        <th width="110">
          指定硬度(HRC)</th>
        <th width="60">品证判定</th>
        <th width="70">热处理审核</th>
        <th width="85">入货日/时间</th>
        <th width="50">制单者</th>
        <th width="70">制单确认者</th>
        <th width="70">出货检查者</th>
        <th width="60">出货日</th>
      </tr>
      <tr class="line-tr">
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td class="yellow">
          <input type="text" class="input">
        </td>
        <td rowspan="2">&nbsp;</td>
        <td rowspan="2">&nbsp;</td>
        <td rowspan="2" style="padding: 0;">
          <p style="border-bottom: 1px solid #000">2019-01-14</p>
          <p>15：30</p>
        </td>
        <td rowspan="2">
          <input type="text" class="input">
        </td>
        <td rowspan="2">
          <input type="text" class="input">
        </td>
        <td rowspan="2">
          <input type="text" class="input">
        </td>
        <td style="border-right: 1px solid #000;" rowspan="2">
          <input type="text" value="10月14日" class="input">
        </td>
      </tr>
      <tr class="line-tr">
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
        <tr>
          <td>检查OK</td>
          <td style="position: relative;" colspan="3">
            &nbsp;[&nbsp;<span @click="isCheck = !isCheck" style="position: absolute;left: 35px;top: -2px;cursor: pointer;">
              <template v-if="isCheck">✓</template>&nbsp;
          </span>&nbsp;]&nbsp; ※入货检查OK时，前处理项省略
          </td>
          <td>收货者</td>
          <td><input type="text" class="input"></td>
          <td valign="top" class="yellow" colspan="7" rowspan="3">
            特别事项：
            <textarea class="textarea" type="text"></textarea>
          </td>
        </tr>
      <tr>
        <td>
          检查异常
        </td>
        <td colspan="5">
          {
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('伤痕') > -1}">伤痕</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('薄壁') > -1}">薄壁</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('R角') > -1}">R角</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('形状') > -1}">形状</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('黑皮') > -1}">黑皮</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('颜色') > -1}">颜色</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('毛刺') > -1}">毛刺</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('焊接') > -1}">焊接</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('刀痕') > -1}">刀痕</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('异物') > -1}">异物</span>
          <span @click="checkClick($event)" :class="{'check-span': true, 'border': checkAbnormal.indexOf('要求') > -1}">要求</span>
          } <span class="red">在异常项目上画圈</span>
        </td>
      </tr>
      <tr>
        <td>前处理</td>
        <td>
          省模<el-checkbox></el-checkbox>&nbsp;
          保护<el-checkbox></el-checkbox>
        </td>
        <td colspan="2">
          作业者:<input type="text" class="input2">
        </td>
        <td colspan="2">
          确认者:<input type="text" class="input2 ">
        </td>
      </tr>
      <tr>
        <td rowspan="17" align="center">
          <p>作</p>
          <p>业</p>
          <p>记</p>
          <p>录</p></td>
        <td class="b" colspan="3"><i>Q</i>
          炉NO（<input type="text" class="input input-40">）
          <span class="red">数量（<input type="text" class="input input-40">） 确认（<input type="text" class="input input-40">）</span></td>
        <td class="l td-font" rowspan="2" colspan="2" valign="top" align="left">
          <span style="float: left;">淬火方法:</span>
          <div style="float: right;">
            <p>
              <el-checkbox></el-checkbox>
              1.HQA(空冷)</p>
            <p>
              <el-checkbox></el-checkbox>
              2.NIS(风冷-汕冷)</p>
            <p>
              <el-checkbox></el-checkbox>
              3.NES(气冷)</p>
            <p>
              <el-checkbox></el-checkbox>
              4.HQO(油冷)</p>
            <p>
              <el-checkbox></el-checkbox>
              5.MQ(分级淬火)</p>
          </div>
        </td>
        <td valign="top" style="border-right: 1px solid #000;padding: 0;" colspan="7" rowspan="6">
            <div class="table-div">
              <table border="1" class="table table2" style="width: 230px;">
                <tr>
                  <td width="120">出货检查项目</td>
                  <td colspan="2">检查结果</td>
                </tr>
                <tr>
                  <td>颜色</td>
                  <td width="50">
                    OK<el-checkbox></el-checkbox>
                  </td>
                  <td width="50">
                    NG<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>异物</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>碰伤</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>孔内沙粒/耐火棉</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>探伤</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>附属品</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tbody>
                <tr>
                  <td>校正</td>
                  <td>
                    有<el-checkbox></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>校正垫</td>
                  <td colspan="2"><input type="text" class="input"></td>
                </tr>
                </tbody>
              </table>
              <img class="table-div-img" src="../../../static/images/bg_.jpg" alt="">
            </div>
        </td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="3">
          <input type="text" style="top: 20px; left: 0px;" class="input input-15 qposition">
          <input type="text" style="top: 30px; left: 12px;" class="input input-15 qposition">
          <input type="text" style="top: 26px; left: 116px;" class="input input-30 qposition">
          <input type="text" style="top: 56px; left: 116px;" class="input input-30 qposition">
          <input type="text" style="top: 9px; left: 197px;" class="input input-30 qposition">
          <input type="text" style="top: 56px; left: 203px;" class="input input-30 qposition">
          <input type="text" style="top: -6px; left: 283px;" class="input input-30 qposition">
          <input type="text" style="top: 56px; left: 283px;" class="input input-30 qposition">
          <img src="../../../static/images/pic1.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="4">时间 <input type="text" class="input2"></td>
        <td rowspan="2" align="center">
          OK<el-checkbox></el-checkbox>&nbsp;
          NG<el-checkbox></el-checkbox>
          &nbsp;</td>
      </tr>
      <tr>
        <td colspan="4">作业者 <input type="text" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="2"><em>T1</em>
          炉NO（<input type="text" class="input input-30">）
          <span class="red">数量（<input type="text" class="input input-30">）</span></td>
        <td class="b l" colspan="3"><i>T2</i> 炉NO（<input type="text" class="input input-30">）
          <span class="red">数量（<input type="text" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="2">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox></el-checkbox></li>
              <li>无<el-checkbox></el-checkbox></li>
            </ul>
          </div>
          <input type="text" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic2.png" alt="">
        </td>
        <td style="position: relative;" class="l" colspan="3">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox></el-checkbox></li>
              <li>无<el-checkbox></el-checkbox></li>
            </ul>
          </div>
          <input type="text" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic3.png" alt="">        </td>
      </tr>
      <tr>
        <td colspan="2">时间 <input type="text" class="input2"></td>
        <td class="l" colspan="3">时间 <input type="text" class="input2"></td>
        <td style="padding: 0; position: relative;" rowspan="11" colspan="7">
          <div class="right-bottom-div">
            <table class="table table3">
              <tr>
                <td>模号</td>
                <td>品名</td>
                <td>尺寸mm</td>
                <td>数量pcs</td>
                <td>变形量0.1%</td>
                <td>硬度HRC</td>
                <td>测量件数</td>
              </tr>
              <tr>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
                <td><input type="text" class="input"></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">作业者 <input type="text" class="input2"></td>
        <td class="l" colspan="3">作业者 <input type="text" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="2"><em>T3</em>
          炉NO（<input type="text" class="input input-30">）
          <span class="red">数量（<input type="text" class="input input-30">）</span></td>
        <td class="b l" colspan="3"><em>T4</em> 炉NO（<input type="text" class="input input-30">）
          <span class="red">数量（<input type="text" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td colspan="2" style="position: relative;">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox></el-checkbox></li>
              <li>无<el-checkbox></el-checkbox></li>
            </ul>
          </div>
          <input type="text" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic4.png" alt="">
        </td>
        <td class="l" colspan="3" style="position: relative;">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox></el-checkbox></li>
              <li>无<el-checkbox></el-checkbox></li>
            </ul>
          </div>
          <input type="text" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic5.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="5">时间 <input type="text" class="input2"></td>
      </tr>
      <tr>
        <td colspan="5">作业者 <input type="text" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="3"><span class="other">其它处理</span>( NVG<span class="box"></span>
          RT<el-checkbox></el-checkbox>
          RA<el-checkbox></el-checkbox>
          T<el-checkbox></el-checkbox>
          A<el-checkbox></el-checkbox>
          AG<el-checkbox></el-checkbox>
          ST<el-checkbox></el-checkbox> )</td>
        <td style="position: relative;" class="l " rowspan="3" colspan="2">
          <em style="position: absolute; top: 0px;left:0px; z-index: 2">SZ</em>
          <p style="position: absolute; top: 45px;left:0px; z-index: 2">
            炉NO（<input type="text" class="input input-30">）<br/>
            <span class="red">数量（<input type="text" class="input input-30">）</span>
          </p>
          <input type="text" style="bottom: 10px; left: 5px; z-index: 999" class="input input-15 qposition">
          <input type="text" style="bottom: 0px; left: 17px; z-index: 999" class="input input-15 qposition">
          <input type="text" style="top: 26px; left: 100px; z-index: 999" class="input input-30 qposition">
          <input type="text" style="top: 47px; left: 98px; z-index: 999" class="input input-30 qposition">
          <img style="position: absolute; top: 10px; left: 10px; z-index: 1" src="../../../static/images/pic7.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="b" colspan="3">
          炉NO（<input type="text" class="input input-30">）
          <span class="red">数量（<input type="text" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="3">
          <input type="text" style="bottom: 20px; left: 0px; z-index: 999" class="input input-15 qposition">
          <input type="text" style="bottom: 10px; left: 17px; z-index: 999" class="input input-15 qposition">
          <input type="text" style="top: 0px; left: 197px; z-index: 999" class="input input-30 qposition">
          <input type="text" style="top: 37px; left: 197px; z-index: 999" class="input input-30 qposition">
          <img src="../../../static/images/pic6.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="3">时间 <input type="text" class="input2"></td>
        <td class="l" colspan="2">时间 <input type="text" class="input2"></td>
      </tr>
      <tr>
        <td colspan="3">作业者 <input type="text" class="input2"> </td>
        <td class="l" colspan="2">作业者 <input type="text" class="input2"></td>
      </tr>
    </table>
      <p style="font-size: 12px;margin-top: 4px;">
        ※注：以上记录只登记客户要求的工艺和工艺所必需的数据！数字不能涂改，不能使用修正液！
        &nbsp;&nbsp;保存期限：5年&nbsp;&nbsp;
        ※本报告部分项目和部分工件是抽检！氮化品的检测数据来源随炉试样！
        <span style="float: right;">HMDS-QR-113/A2</span>
      </p>
    </div>
    <p style="text-align: center;margin: 20px 0 10px 0;">
      <el-button v-print="'#printAll'" type="primary">打印</el-button>
      <el-button type="primary">保存</el-button>
    </p>
    <!--<input type="file" :id="id" name="image" class="getImgUrl_file" @change="preview($event)">-->
    <!--<img :src="imgDataUrl" alt="">-->
  </div>
</template>

<script>
export default {
  name: 'scorBook',
  data () {
    return {
      imageUrlOne: '',
      id: 'upload',
      isCheck: false,
      checkAbnormal: ['伤痕', '形状', '刀痕'],
      imageUrlTwo: '',
      imgDataUrl: ''
    }
  },
  methods: {
    // 点击添加边框
    checkClick (event) {
      let val = event.target.innerText
      let index = this.checkAbnormal.indexOf(val)
      if (index > -1) {
        this.checkAbnormal.splice(index, 1)
      } else {
        this.checkAbnormal.push(val)
      }
    },
    preview (event) {
      let files = document.getElementById(this.id).files[0]
      this.imgDataUrl = this.getObjectURL(files)
    },
    getObjectURL (file) {
      let url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      }
      return url
    }
  }
}
</script>

<style scoped>
* {
  /*font-size: 15px;*/
  font-family: 宋体;
}
.yellow {
  background: rgba(255, 255, 0, 1);
}
.td-font span, .td-font p{
  font-size: 14px;
}
.check-span {
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #fff;
}
.border {
  border: 1px solid #000;
}
.input {
  width: 100%;
  border: none;
  text-align: center;
  background: none;
}
.input-15 {
  width: 15px;
}
.input-40 {
  width: 40px;
}
.textarea {
  background: none;
  border: none;
  width: 100%;
  outline: none;
  resize: none;
  overflow: hidden;
  height: 34px;
}
.input-30 {
  width: 30px;
}
.input2 {
  border: none;
  background: none;
}
.qposition {
  position: absolute;
  text-align: right;
}
.name {
  border: 1px solid #000;
  border-bottom: none;
  text-align: center;
}
.name p:first-child {
  border-bottom: 1px solid #000;
}
#printAll {
}
.line-tr {
  line-height: 30px;
  text-align: center;
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
table {
  /*border-top: none;*/
  /*border-left: none;*/
  /*border-right: none;*/
}
.correcting {
  position: absolute;
  top: -8px;
  left: 40px;
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
  padding: 1px 5px;
}
table th {
  padding: 2px;
}
table td:last-child {
  /*border-right: 1px solid #000;*/
}
.red {
  color: red;
}
.table-div-img {
  max-height: 285px;
  max-width: 285px;
  position: absolute;
  right: 15px;
  float: right;
}
.table-div {
  width: 100%;
  height: 252px;
  padding: 5px;
  position: relative;
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
.table2 {
  float: left;
}
.table2 td {
  padding: 4px;
}
i,em {
  width: 25px;
  height: 25px;
  display: inline-block;
  background: #a6a6a6;
  border: 1px solid #333;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  margin: 3px;
  color: #000;
  font-style: normal;
  font-weight: bold;
}
.right-bottom-div {
  width: 100%;
  height: 329px;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}
.table3 {
  width: 100%;
}
.table3 td {
  border-left: 1px solid #666;
  border-bottom: 1px solid #666;
  text-align: center;
}
.table3 td:first-child {
  border-left: none;
}
span.other {
  background: #a6a6a6;
  border: 1px solid #333;
  line-height: 25px;
  text-align: center;
  margin: 3px;
  padding: 3px;
  color: #000;
  font-weight: bold;
}
</style>
