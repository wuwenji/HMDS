<template>
  <div>
    <div class="scor-book" id="printAll" style="height: 840px; overflow: hidden;">
      <div class="top">
        <div class="top-left">
          <p>管理编号NO</p>
          <p><input type="text" disabled v-model="formData.managementNumber" class="input" style="text-align: left;"></p>
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
            Heat Treatmet Quality Report<br>
            热处理兼表面处理成绩书</h1>
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
      <tr>
        <th width="60">
          <span style="font-size: 12px;">Material</span><br/>
          钢种
        </th>
        <th width="50">作业名</th>
        <th width="50">
          <span style="font-size: 12px;">Parisname</span><br/>
          模号
        </th>
        <th width="60">
          <span style="font-size: 12px;">Quantity</span><br/>
          数量
        </th>
        <th width="80">
          <span style="font-size: 12px;">Weight(KG)</span><br/>
          重量(KG)
        </th>
        <th width="110">
          <span style="font-size: 12px;">Reqired Hardness</span><br/>
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
          <input v-model="formData.material" type="text" class="input">
        </td>
        <td class="yellow">
          <input v-model="formData.taskName" type="text" class="input">
        </td>
        <td class="yellow">
          <input v-model="formData.modelNumber" type="text" class="input">
        </td>
        <td class="yellow">
          <input v-model="formData.counts" type="text" class="input">
        </td>
        <td class="yellow">
          <input v-model="formData.totalWeight" type="text" class="input">
        </td>
        <td class="yellow">
          <input v-model="formData.hardnessRequirement" type="text" class="input">
        </td>
        <td rowspan="2">&nbsp;</td>
        <td rowspan="2">&nbsp;</td>
        <td rowspan="2" style="padding: 0;">
          <p style="border-bottom: 1px solid #000">{{$store.getters.getDate(formData.acceptTime, 2)}}</p>
          <p>{{$store.getters.getDate(formData.acceptTime).substring(11)}}</p>
        </td>
        <td rowspan="2">
          <input v-model="formData.orderMaker" type="text" class="input">
        </td>
        <td rowspan="2">
          <input v-model="formData.orderConfirmMaker" type="text" class="input">
        </td>
        <td rowspan="2">
          <input v-model="formData.outCheckName" type="text" class="input">
        </td>
        <td style="border-right: 1px solid #000;" rowspan="2">
          <input v-model="formData.outDate" type="text" value="10月14日" class="input">
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
            &nbsp;[&nbsp;<span @click="formData.isCheck = !formData.isCheck" style="position: absolute;left: 35px;top: -2px;cursor: pointer;">
              <template v-if="formData.isCheck">✓</template>&nbsp;
          </span>&nbsp;]&nbsp; ※入货检查OK时，前处理项省略
          </td>
          <td>收货者</td>
          <td><input type="text" v-model="formData.userName" class="input"></td>
          <td valign="top" class="yellow" colspan="7" rowspan="3">
            特别事项：
            <textarea class="textarea" v-model="formData.specialMatters" type="text">
            </textarea>
          </td>
        </tr>
      <tr>
        <td>
          检查异常
        </td>
        <td colspan="5">
          <template v-if="formData.checkAbnormal">
            {
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('伤痕') > -1}">伤痕</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('薄壁') > -1}">薄壁</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('R角') > -1}">R角</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('形状') > -1}">形状</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('黑皮') > -1}">黑皮</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('颜色') > -1}">颜色</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('毛刺') > -1}">毛刺</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('焊接') > -1}">焊接</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('刀痕') > -1}">刀痕</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('异物') > -1}">异物</span>
            <span @click="checkClick($event)" :class="{'check-span': true, 'border': formData.checkAbnormal.indexOf('要求') > -1}">要求</span>
            } <span class="red">在异常项目上画圈</span>
          </template>
        </td>
      </tr>
      <tr>
        <td>前处理</td>
        <td>
          省模<el-checkbox label="省模" v-model="formData.pretreatment"></el-checkbox>&nbsp;
          保护<el-checkbox label="保护" v-model="formData.pretreatment"></el-checkbox>
        </td>
        <td colspan="2">
          作业者:<input v-model="formData.operator" type="text" class="input2">
        </td>
        <td colspan="2">
          确认者:<input v-model="formData.confirmer" type="text" class="input2 ">
        </td>
      </tr>
      <tr>
        <td rowspan="17" align="center">
          <p>作</p>
          <p>业</p>
          <p>记</p>
          <p>录</p></td>
        <td class="b" colspan="3"><i>Q</i>
          炉NO（<input type="text" v-model="formData.qHandle.no" class="input input-40">）
          <span class="red">数量（<input type="text" v-model="formData.qHandle.counts" class="input input-40">） 确认（<input type="text" v-model="formData.qHandle.confirmer" class="input input-40">）</span></td>
        <td class="l td-font" rowspan="2" colspan="2" valign="top" align="left">
          <span style="float: left;">淬火方法:</span>
          <div style="float: right;">
            <p>
              <el-checkbox label="1" v-model="formData.qHandle.quenchingMethod"></el-checkbox>
              1.HQA(空冷)</p>
            <p>
              <el-checkbox label="2" v-model="formData.qHandle.quenchingMethod"></el-checkbox>
              2.NIS(风冷-汕冷)</p>
            <p>
              <el-checkbox label="3" v-model="formData.qHandle.quenchingMethod"></el-checkbox>
              3.NES(气冷)</p>
            <p>
              <el-checkbox label="4" v-model="formData.qHandle.quenchingMethod"></el-checkbox>
              4.HQO(油冷)</p>
            <p>
              <el-checkbox label="5" v-model="formData.qHandle.quenchingMethod"></el-checkbox>
              5.MQ(分级淬火)</p>
          </div>
        </td>
        <td valign="top" style="border-right: 1px solid #000;padding: 0;" colspan="7" rowspan="6">
            <div class="table-div">
              出货检查结果(ProjectAppearance)<br/>
              <table border="1" class="table table2" style="width: 230px;">
                <tr>
                  <td width="120">出货检查项目</td>
                  <td colspan="2">检查结果</td>
                </tr>
                <tr>
                  <td>颜色</td>
                  <td width="50">
                    OK<el-checkbox label="OK" v-model="formData.inspectionItems.color"></el-checkbox>
                  </td>
                  <td width="50">
                    NG<el-checkbox label="NG" v-model="formData.inspectionItems.color"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>异物</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.foreignBody"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.foreignBody"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>碰伤</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.bruise"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.bruise"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>孔内沙粒/耐火棉</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.sandGrainsInBoreholes"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.sandGrainsInBoreholes"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>探伤</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.flawDetection"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.flawDetection"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>附属品</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.accessories"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.accessories"></el-checkbox>
                  </td>
                </tr>
                <tbody v-if="formData.modelNumber !== '' && formData.modelNumber.indexOf('NVG') > -1">
                <tr>
                  <td>校正</td>
                  <td>
                    有<el-checkbox label="有" v-model="formData.inspectionItems.correcting"></el-checkbox>
                  </td>
                  <td>
                    无<el-checkbox label="无" v-model="formData.inspectionItems.correcting"></el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>校正垫</td>
                  <td colspan="2"><input v-model="formData.inspectionItems.correctingPad" type="text" class="input"></td>
                </tr>
                </tbody>
              </table>
              <img @click="openPics" class="table-div-img" :src="formData.imgSrc" alt="">
            </div>
        </td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="3">
          <input v-model="formData.qHandle.day" type="text" style="top: 20px; left: 0px;" class="input input-15 qposition">
          <input v-model="formData.qHandle.month" type="text" style="top: 30px; left: 12px;" class="input input-15 qposition">
          <input v-model="formData.qHandle.oneTemperature" type="text" style="top: 26px; left: 116px;" class="input input-30 qposition">
          <input v-model="formData.qHandle.oneH" type="text" style="top: 56px; left: 116px;" class="input input-30 qposition">
          <input v-model="formData.qHandle.twoTemperature" type="text" style="top: 9px; left: 197px;" class="input input-30 qposition">
          <input v-model="formData.qHandle.twoH" type="text" style="top: 56px; left: 203px;" class="input input-30 qposition">
          <input v-model="formData.qHandle.threeTemperature" type="text" style="top: -6px; left: 283px;" class="input input-30 qposition">
          <input v-model="formData.qHandle.threeH" type="text" style="top: 56px; left: 283px;" class="input input-30 qposition">
          <img src="../../../static/images/pic1.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="4">时间 <input v-model="formData.qHandle.time" type="text" class="input2"></td>
        <td rowspan="2" align="center">
          OK<el-checkbox label="OK" v-model="formData.qHandle.isOk"></el-checkbox>&nbsp;
          NG<el-checkbox label="NG" v-model="formData.qHandle.isOk"></el-checkbox>
          &nbsp;</td>
      </tr>
      <tr>
        <td colspan="4">作业者 <input v-model="formData.qHandle.operator" type="text" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="2"><em>T1</em>
          炉NO（<input type="text" v-model="formData.t1Handle.no" class="input input-30">）
          <span class="red">数量（<input type="text" v-model="formData.t1Handle.counts" class="input input-30">）</span></td>
        <td class="b l" colspan="3"><i>T2</i> 炉NO（<input type="text" v-model="formData.t2Handle.no" class="input input-30">）
          <span class="red">数量（<input type="text" v-model="formData.t2Handle.counts" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="2">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox label="有" v-model="formData.t1Handle.correcting"></el-checkbox></li>
              <li>无<el-checkbox label="无" v-model="formData.t1Handle.correcting"></el-checkbox></li>
            </ul>
          </div>
          <input type="text" v-model="formData.t1Handle.day" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t1Handle.month" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t1Handle.temperature" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" v-model="formData.t1Handle.h" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic2.png" alt="">
        </td>
        <td style="position: relative;" class="l" colspan="3">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox label="有" v-model="formData.t2Handle.correcting"></el-checkbox></li>
              <li>无<el-checkbox label="无" v-model="formData.t2Handle.correcting"></el-checkbox></li>
            </ul>
          </div>
          <input type="text" v-model="formData.t2Handle.day" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t2Handle.month" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t2Handle.temperature" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" v-model="formData.t2Handle.h" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic3.png" alt="">        </td>
      </tr>
      <tr>
        <td colspan="2">时间 <input v-model="formData.t1Handle.time" type="text" class="input2"></td>
        <td class="l" colspan="3">时间 <input v-model="formData.t2Handle.time" type="text" class="input2"></td>
        <td style="padding: 0; position: relative;" rowspan="11" colspan="7">
          <div class="right-bottom-div">
            <table v-if="formData.modelNumber !== '' && formData.modelNumber.indexOf('NVG') > -1" class="table table3">
              <tr>
                <td width="50" rowspan="2">
                  <span style="font-size: 12px; line-height: 19px;">Name</span><br/>
                  品名</td>
                <td width="80" rowspan="2">
                  尺寸mm</td>
                <td width="60" rowspan="2">
                  <span style="font-size: 12px;">Qty(pcs)</span><br/>
                  数量pcs</td>
                <td rowspan="2">
                  <span style="font-size: 12px;">nitrdedcase depth</span><br/>
                  氮化深度mm</td>
                <td rowspan="2">
                  <span style="font-size: 12px;">nitride Hardness</span><br/>
                  氮化硬度hv</td>
                <td width="60" rowspan="2">
                  <span style="font-size: 12px;">weight(KG)</span><br/>
                  重量</td>
              </tr>
              <tr></tr>
              <tr v-for="(item, key) in formData.treatmentEntryList" :key="key">
                <td><input type="text" v-model="item.itemName" class="input"></td>
                <td><input type="text" v-model="item.sizeNote" class="input"></td>
                <td><input type="text" v-model="item.qty" class="input"></td>
                <td><input type="text" v-model="item.nitrdedCaseDepth" class="input"></td>
                <td><input type="text" v-model="item.nitrideHardness" class="input"></td>
                <td><input type="text" v-model="item.weight" class="input"></td>
              </tr>
            </table>
            <table v-else class="table table3">
              <tr>
                <td width="60" rowspan="2">
                  <span style="font-size: 12px; line-height: 19px;">Parisname</span><br/>
                  模号
                </td>
                <td rowspan="2">
                  <span style="font-size: 12px;">Name</span><br/>
                  品名
                </td>
                <td rowspan="2">
                  尺寸mm
                </td>
                <td rowspan="2">
                  <span style="font-size: 12px;">Qty(pcs)</span><br/>
                  数量
                </td>
                <td rowspan="2">
                  <span style="font-size: 12px;">Distortion(mm)</span><br/>
                  变形量
                </td>
                <td rowspan="2">
                  <span style="font-size: 12px;">Hardness</span><br/>
                  硬度HRC
                </td>
                <td width="60" rowspan="2">
                  测量件数
                </td>
              </tr>
              <tr></tr>
              <tr v-for="(item, key) in formData.treatmentEntryList" :key="key">
                <td><input type="text" v-model="item.modelNumber" class="input"></td>
                <td><input type="text" v-model="item.itemName" class="input"></td>
                <td><input type="text" v-model="item.sizeNote" class="input"></td>
                <td><input type="text" v-model="item.qty" class="input"></td>
                <td><input type="text" v-model="item.deformation" class="input"></td>
                <td><input type="text" v-model="item.hardnessResult" class="input"></td>
                <td><input type="text" v-model="item.measuringCount" class="input"></td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">作业者 <input v-model="formData.t1Handle.operator" type="text" class="input2"></td>
        <td class="l" colspan="3">作业者 <input v-model="formData.t2Handle.operator" type="text" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="2"><em>T3</em>
          炉NO（<input v-model="formData.t3Handle.no" type="text" class="input input-30">）
          <span class="red">数量（<input type="text" v-model="formData.t3Handle.counts" class="input input-30">）</span></td>
        <td class="b l" colspan="3"><em>T4</em> 炉NO（<input type="text" v-model="formData.t4Handle.no" class="input input-30">）
          <span class="red">数量（<input type="text" v-model="formData.t4Handle.counts" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td colspan="2" style="position: relative;">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox label="有" v-model="formData.t3Handle.correcting"></el-checkbox></li>
              <li>无<el-checkbox label="无" v-model="formData.t3Handle.correcting"></el-checkbox></li>
            </ul>
          </div>
          <input type="text" v-model="formData.t3Handle.day" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t3Handle.month" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t3Handle.temperature" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" v-model="formData.t3Handle.h" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic4.png" alt="">
        </td>
        <td class="l" colspan="3" style="position: relative;">
          <div class="correcting">
            <ul>
              <li>校正</li>
              <li>有<el-checkbox label="有" v-model="formData.t4Handle.correcting"></el-checkbox></li>
              <li>无<el-checkbox label="无" v-model="formData.t4Handle.correcting"></el-checkbox></li>
            </ul>
          </div>
          <input type="text" v-model="formData.t4Handle.day" style="top: 0px; left: 0px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t4Handle.month" style="top: 10px; left: 12px;" class="input input-15 qposition">
          <input type="text" v-model="formData.t4Handle.temperature" style="top: 16px; left: 123px;" class="input input-30 qposition">
          <input type="text" v-model="formData.t4Handle.h" style="top: 52px; left: 123px;" class="input input-30 qposition">
          <img src="../../../static/images/pic5.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="5">时间 <input type="text" v-model="formData.t3Handle.time" class="input2"></td>
      </tr>
      <tr>
        <td colspan="5">作业者 <input type="text" v-model="formData.t3Handle.operator" class="input2"></td>
      </tr>
      <tr>
        <td class="b" colspan="3"><span class="other">其它处理</span>(
          NVG<el-checkbox label="NVG" v-model="formData.otherHandle.method"></el-checkbox>
          RT<el-checkbox label="RT" v-model="formData.otherHandle.method"></el-checkbox>
          RA<el-checkbox label="RA" v-model="formData.otherHandle.method"></el-checkbox>
          T<el-checkbox label="T" v-model="formData.otherHandle.method"></el-checkbox>
          A<el-checkbox label="A" v-model="formData.otherHandle.method"></el-checkbox>
          AG<el-checkbox label="AG" v-model="formData.otherHandle.method"></el-checkbox>
          ST<el-checkbox label="ST" v-model="formData.otherHandle.method"></el-checkbox> )</td>
        <td style="position: relative;" class="l " rowspan="3" colspan="2">
          <em style="position: absolute; top: 0px;left:0px; z-index: 2">SZ</em>
          <p style="position: absolute; top: 45px;left:0px; z-index: 2">
            炉NO（<input type="text" v-model="formData.szHandle.no" class="input input-30">）<br/>
            <span class="red">数量（<input v-model="formData.szHandle.counts" type="text" class="input input-30">）</span>
          </p>
          <input type="text" v-model="formData.szHandle.day" style="bottom: 10px; left: 5px; z-index: 999" class="input input-15 qposition">
          <input type="text" v-model="formData.szHandle.month" style="bottom: 0px; left: 17px; z-index: 999" class="input input-15 qposition">
          <input type="text" v-model="formData.szHandle.h" style="top: 26px; left: 100px; z-index: 999" class="input input-30 qposition">
          <input type="text" v-model="formData.szHandle.temperature" style="top: 47px; left: 98px; z-index: 999" class="input input-30 qposition">
          <img style="position: absolute; top: 10px; left: 10px; z-index: 1" src="../../../static/images/pic7.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="b" colspan="3">
          炉NO（<input type="text" v-model="formData.otherHandle.no" class="input input-30">）
          <span class="red">数量（<input v-model="formData.otherHandle.counts" type="text" class="input input-30">）</span></td>
      </tr>
      <tr>
        <td style="position: relative;" colspan="3">
          <input type="text" v-model="formData.otherHandle.day" style="bottom: 20px; left: 0px; z-index: 999" class="input input-15 qposition">
          <input type="text" v-model="formData.otherHandle.month" style="bottom: 10px; left: 17px; z-index: 999" class="input input-15 qposition">
          <input type="text" v-model="formData.otherHandle.temperature" style="top: 0px; left: 197px; z-index: 999" class="input input-30 qposition">
          <input type="text" v-model="formData.otherHandle.h" style="top: 37px; left: 197px; z-index: 999" class="input input-30 qposition">
          <img src="../../../static/images/pic6.png" alt="">
        </td>
      </tr>
      <tr>
        <td colspan="3">时间 <input v-model="formData.otherHandle.time" type="text" class="input2"></td>
        <td class="l" colspan="2">时间 <input v-model="formData.szHandle.time" type="text" class="input2"></td>
      </tr>
      <tr>
        <td colspan="3">作业者 <input v-model="formData.otherHandle.operator" type="text" class="input2"> </td>
        <td class="l" colspan="2">作业者 <input v-model="formData.szHandle.operator" type="text" class="input2"></td>
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
  acceptTimeStr: '',
  actualNitrdedCaseDepth: '',
  actualNitrideHardness: '',
  confirmCount: '',
  contPoNo: '',
  corpCd: '',
  createDate: '',
  createUser: '',
  custPoNo: '',
  cutCount: '',
  deformation: '',
  deliveryTimeStr: '',
  endRow: '',
  endTime: '',
  entryList: '',
  fromRow: '',
  gradeCd: '',
  hardnessRequirement: '',
  hardnessResult: '',
  hardnessType: '',
  heatCode: '',
  heatCount: '',
  heatTreatType: '',
  heater: '',
  id: '',
  idList: '',
  ids: '',
  imageNo: '',
  isDownload: '',
  itemName: '',
  lineRemarks: '',
  loginUserId: '',
  machineCount: '',
  materialId: '',
  measuringCount: '',
  mobile: '',
  modelNumber: '',
  nitrdedCaseDepth: '',
  nitrideHardness: '',
  order: '',
  outStatus: '',
  outwardCount: '',
  pageNum: '',
  pageSize: '',
  qty: '',
  recordStatus: '',
  remark: '',
  scrapCount: '',
  serviceCd: '',
  shape: '',
  sizeNote: '',
  soUnitPrice: '',
  sortType: '',
  specExternalNote: '',
  startTime: '',
  startingCount: '',
  status: '',
  tempEndTime: '',
  tempLongId: '',
  tempStartTime: '',
  tempStr: '',
  tmpCutId: '',
  totalCount: '',
  totalWeight: '',
  treatmentId: '',
  unitPriceCd: '',
  updateDate: '',
  updateUser: '',
  wt: ''
}
let model = {
  managementNumber: '',
  customerName: '',
  heatQrCode: '',
  material: '',
  taskName: '',
  modelNumber: '',
  counts: '',
  totalWeight: '',
  imgSrc: '../../../static/images/add-img.png',
  hardnessRequirement: '',
  acceptTime: '',
  orderMaker: '',
  orderConfirmMaker: '',
  outCheckName: '',
  outDate: '',
  isCheck: [],
  userName: '',
  specialMatters: '',
  checkAbnormal: [],
  pretreatment: [],
  operator: '',
  confirmer: '',
  qHandle: {
    no: '',
    counts: '',
    confirmer: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    oneTemperature: '',
    oneH: '',
    twoTemperature: '',
    twoH: '',
    threeTemperature: '',
    threeH: '',
    isOk: [],
    quenchingMethod: []
  },
  t1Handle: {
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    temperature: '',
    h: '',
    correcting: []
  },
  t2Handle: {
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    temperature: '',
    h: '',
    correcting: []
  },
  t3Handle: {
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    temperature: '',
    h: '',
    correcting: []
  },
  t4Handle: {
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '，',
    operator: '',
    temperature: '',
    h: '',
    correcting: []
  },
  otherHandle: {
    method: [],
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    temperature: '',
    h: ''
  },
  szHandle: {
    no: '',
    counts: '',
    month: '',
    day: '',
    time: '',
    operator: '',
    temperature: '',
    h: '',
    correcting: []
  },
  inspectionItems: {
    color: [],
    foreignBody: [],
    bruise: [],
    sandGrainsInBoreholes: [],
    flawDetection: [],
    accessories: [],
    correcting: [],
    correctingPad: ''
  },
  treatmentEntryList: []
}
export default {
  name: 'scorBook',
  props: ['orderInfo'],
  data () {
    return {
      imageUrlOne: '',
      picsDialog: false,
      bigImgSrc: '../../../static/images/add-img.png',
      imgSrcs: [],
      id: 'upload',
      isCheck: false,
      checkAbnormal: ['伤痕', '形状', '刀痕'],
      imageUrlTwo: '',
      imgDataUrl: '',
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
        console.log('成绩书', resp)
        if (resp.success) {
          if (resp.data.heatData === null) {
            for (let key in resp.data) {
              // 当返回值为null时取model中的值
              if (resp.data[key] !== null) {
                this.formData[key] = resp.data[key]
              }
            }
          } else {
            this.formData = JSON.parse(resp.data.heatData)
          }
          if (this.formData.treatmentEntryList.length < 10) {
            while (this.formData.treatmentEntryList.length < 10) {
              this.formData.treatmentEntryList.push(JSON.parse(JSON.stringify(obj)))
            }
          }
        }
      })
    },
    // 保存
    submit () {
      let obj = JSON.stringify(this.formData)
      this.http('/heatTreatment/update', {
        id: this.orderInfo.id,
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
    openPics () {
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
      this.formData.imgSrc = item.src
      this.picsDialog = false
    },
    // 点击添加边框
    checkClick (event) {
      let val = event.target.innerText
      let index = this.formData.checkAbnormal.indexOf(val)
      if (index > -1) {
        this.formData.checkAbnormal.splice(index, 1)
      } else {
        this.formData.checkAbnormal.push(val)
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
  line-height: 20px;
  text-align: center;
}
.qrimg {
  position: absolute;
  width: 45px;
  left: 20px;
  top: 13px;
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
  top: 15px;
  left: 60px;
  line-height: 30px;
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
  max-height: 255px;
  max-width: 285px;
  position: absolute;
  right: 15px;
  float: right;
  top: 5px;
  cursor: pointer;
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
</style>
