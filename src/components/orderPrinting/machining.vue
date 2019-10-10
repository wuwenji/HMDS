<template>
    <div>
      <p class="btn">
        <el-button @click="keeyHistory" type="primary" style="color: #fff;">打印</el-button>
        <el-button id="printClick" v-print="'#printContent'" type="primary"></el-button>
      </p>
      <div id="printContent">
        <div class="main cl printPage" v-for="(item, key) in machiningData.workList" :key="'1' + key">
          <div class="pri-left" style="border-right: 1px dashed #000;border-bottom: 1px dashed #000;">
            <table>
              <tr>
                <td width="487"><p>
                  {{item.workInstCd > 3? '切断&加工&热处理': ''}}
                  {{item.workInstCd == 3? '切断&加工': ''}}
                </p>
                  <p>&nbsp;<span class="span span-left">切断</span> </p></td>
                <td width="590">
                  <p style="font-size: 18px;font-weight: bold; position: relative;">
                    <img class="logo" src="../../../static/images/logo.jpg" alt="">
                    日立金属（东莞）特殊钢有限公司 本部</p>
                  <p style="font-size: 12px;">广东省东莞市茶山镇茶山工业园</p></td>
              </tr>
            </table>
            <table class="table table-width" width="100%" height="285" border="1" cellpadding="0" cellspacing="0">
              <col width="100" />
              <col width="60" />
              <col width="100" />
              <col width="75" />
              <col width="75" />
              <col width="30" />
              <col width="75" />
              <col width="100" />
              <col width="65"/>
              <tr>
                <td rowspan="2" style="border-top: 1px solid #fff; border-left: 1px solid #fff;" class="t l b r" colspan="6"><div align="center" style="font-size: 24px; font-weight: bold;">
                  <img class="qrImg" :src="$store.state.qrUrl + item.machiningQrCode + '&w=500&h=500'" alt="">
                  加工作业指示票</div></td>
                <td style="border-top: 1px solid #fff;" class="t l b r">&nbsp;</td>
                <td style="border-top: 1px solid #fff; border-right: 1px solid #fff;" class="t l b r" colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td><strong>发行日期</strong></td>
                <td style="background: #000; color: #fff;" colspan="2">{{$store.state.time}}</td>
              </tr>
              <tr>
                <td style="border-left: 1px solid #fff;" class="r t l b" colspan="3"><strong>接单号码：</strong>{{item.soNo}}-{{item.soLnNo}}</td>
                <td class="r t l b" colspan="3"><strong>指示号码：</strong>{{item.soLnNo}}</td>
                <td><strong>发件人</strong></td>
                <td colspan="2">{{machiningData.order.entryUserName}}</td>
              </tr>
              <tr>
                <td class="r"><strong>订购商名称</strong></td>
                <td class="l" colspan="5">{{machiningData.order.contKname}}</td>
                <td class="r t b"><strong>交期</strong></td>
                <td class="l b">
                  {{$store.getters.getDate(machiningData.order.contDueDate, 2)}}
                </td>
                <td class="b" style="width: 54px;"><strong>指示数量</strong></td>
              </tr>
              <tr>
                <td class="r"><strong>送货地址名称</strong></td>
                <td class="l" colspan="5"> {{machiningData.order.shiptoName}} </td>
                <td class="r t"></td>
                <td class="t l"></td>
                <td class="t" align="right" style="font-size: 20px;"><strong>{{item.workInstQty}}</strong></td>
              </tr>
              <tr>
                <td colspan="2" rowspan="3"><p><strong>钢种</strong></p>
                  <p style="font-size: 25px;">{{item.gradeCd}}</p></td>
                <td class="b" colspan="7"><strong>加工公差</strong></td>
              </tr>
              <tr>
                <td class="t" colspan="7" style="font-size: 16px;"><strong>{{item.machineTolerance}}</strong></td>
              </tr>
              <tr>
                <td  class="r"><strong>客户要求尺寸</strong></td>
                <td align="center" style="font-size: 20px;" colspan="6" class="l">
                  {{machiningData.order.machineShapeCd}} {{item.size1}} X {{item.size2}} X {{item.size3}}
                  <!--{{item.instSizeNote}}-->
                </td>
                <!--<td class="r l">30</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td align="center" class="r l">36</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="l">161</td>-->
              </tr>
              <tr>
                <td class="b"><strong>直角度</strong></td>
                <td class="b"><strong>平行度</strong></td>
                <td class="b"><strong>加工规格</strong></td>
                <td class="b"><strong>倒角规格</strong></td>
                <td class="b" colspan="5"><strong>切断指示尺寸</strong></td>
              </tr>
              <tr>
                <td class="t">&nbsp;{{item.mRightAngle}}</td>
                <td class="t">{{item.mParallel}}</td>
                <td class="t" style="font-size: 20px;"><strong>{{item.machineSpecCd}}</strong></td>
                <td class="t">{{item.chamferSpec}}</td>
                <td align="center" style="font-size: 20px;" colspan="5" class="t">
                  {{machiningData.order.machineShapeCd}} {{item.instSize1}} X {{item.instSize2}} X {{item.instSize3}}
                  <!--{{item.instSizeNote}}-->
                </td>
                <!--<td class="t r l">X</td>-->
                <!--<td align="center" class="t r l">41</td>-->
                <!--<td class="t r l">X</td>-->
                <!--<td class="t l">166</td>-->
              </tr>
              <tr>
                <td class="r b"><strong>库存尺寸</strong></td>
                <td class="l b" colspan="3"></td>
                <td class="r b l bl tb"><strong>实际尺寸</strong></td>
                <td class="r b l tb">&nbsp;</td>
                <td class="r b l tb">&nbsp;</td>
                <td class="r b l tb">&nbsp;</td>
                <td class="b l tb br">&nbsp;</td>
              </tr>
              <tr>
                <td class="t" colspan="4">{{item.stockSizeNote}} </td>
                <td  class="r t bl bb">&nbsp;</td>
                <td  class="r t l bb">X</td>
                <td  class="r t l bb">&nbsp;</td>
                <td  class="r t l bb">X</td>
                <td  class="t l bb br">&nbsp;</td>
              </tr>
              <tr>
                <td  class="b" colspan="9">
                  <strong style="float: left;margin-right:10px;">加工指示备注</strong>
                  <div style="width:320px;float: left;">
                    <p>&nbsp;{{item.instRemarks1}}</p>
                    <p>&nbsp;{{item.instRemarks2}}</p>
                  </div>
                  <div style="width:330px;float: right;">
                    <p>&nbsp;{{item.millingRemarks1}}</p>
                    <p>&nbsp;{{item.millingRemarks2}}</p>
                  </div>
                </td>
              </tr>
            </table>
            <table class="table" style="width: 85%;margin: 0 auto;border-top: none;" border="1" cellspacing="0" bordercolor="#000000">
              <tr>
                <td class="t" align="center" width="200"><strong>营业确认</strong></td>
                <td class="t" align="center" width="200"><strong>厚度加工</strong></td>
                <td class="t" align="center" width="200"><strong>四辺加工</strong></td>
                <td class="t" align="center" width="200"><strong>研磨加工</strong></td>
                <td class="t" align="center" width="200"><strong>检测</strong></td>
              </tr>
              <tr>
                <td rowspan="2"></td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
              </tr>
              <tr>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
              </tr>
            </table>
          </div>
          <div class="pri-right" style="border-bottom: 1px dashed #000;padding-bottom: 5px;">
            <table width="100%"  border="0" cellspacing="0" bordercolor="#000000">
              <tr>
                <td width="100" rowspan="2"></td>
                <td colspan="2" style="position: relative;">
                  <img class="right-logo" src="../../../static/images/logo.jpg" alt="">
                  <b>日立金属（东莞）特殊钢有限公司 本部 </b>
                  <p style="font-size: 10px;">广东省东莞市茶山镇茶山工业园</p></td>
              </tr>
              <tr>
                <td width="326">&nbsp;</td>
                <td width="145" align="right"><span class="span">切断</span></td>
              </tr>
              <tr>
                <td><strong>现品票</strong></td>
                <td><div align="center"><strong>接单号码：</strong>{{item.soNo}}-{{item.soLnNo}}</div></td>
                <td><strong>指示号码：</strong>{{item.soLnNo}}</td>
              </tr>
            </table>
            <table class="table" width="100%" height="305" border="1" cellpadding="0" cellspacing="0">
              <col width="120">
              <col width="120">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="90">
              <col width="90">
              <tr>
                <td colspan="9"><strong>订购商名称：</strong>{{machiningData.order.contKname}}</td>
              </tr>
              <tr>
                <td colspan="9"><strong>送货地址名称：</strong>{{machiningData.order.shiptoName}}</td>
              </tr>
              <tr>
                <td colspan="9"><strong>订单号：</strong>{{machiningData.order.contPoNo}}</td>
              </tr>
              <tr>
                <td class="r"><strong>钢种</strong></td>
                <td class="l" colspan="2">{{item.gradeCd}}</td>
                <td class="bl bb tb" colspan="3"><strong>数量</strong></td>
                <td class="br bb tb" colspan="3"><strong>kg重量</strong></td>
              </tr>
              <tr>
                <td class="r"><strong>加工规格</strong></td>
                <td class="l" colspan="5">{{item.machineSpecCd}}</td>
                <td colspan="3"><strong>倒角规格</strong>&nbsp;{{item.chamferSpec}}</td>
              </tr>
              <tr>
                <td class="r bl bb tb" colspan="2"><strong>产品规格说明</strong></td>
                <td colspan="7" class="r l tb bb br">
                  <strong>
                    {{machiningData.order.machineShapeCd}} {{item.size1}} X {{item.size2}} X {{item.size3}}
                    <!--{{item.specExternalNote}}-->
                  </strong>
                </td>
                <!--<td class="r l">30</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="r l">36</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="r l" colspan="2">161</td>-->
              </tr>
              <tr>
                <td><strong>No</strong></td>
                <td colspan="6">&nbsp;</td>
                <td><strong>直角度</strong></td>
                <td><strong>平行度</strong></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
            <p style="text-align: right;">HMDS-QR-43-1/AO</p>
          </div>
          <div class="pri-left" style="padding-top: 10px;">
            <table>
              <tr>
                <td width="487"><p>
                  {{item.workInstCd > 3? '切断&加工&热处理': ''}}
                  {{item.workInstCd == 3? '切断&加工': ''}}</p>
                  <p>&nbsp;<span class="span span-left">加工</span> </p></td>
                <td width="590">
                  <p style="font-size: 18px;font-weight: bold; position: relative;">
                    <img class="logo" src="../../../static/images/logo.jpg" alt="">
                    日立金属（东莞）特殊钢有限公司 本部</p>
                  <p style="font-size: 12px;">广东省东莞市茶山镇茶山工业园</p></td>
              </tr>
            </table>
            <table class="table table-width" width="100%" height="285" border="1" cellpadding="0" cellspacing="0">
              <col width="100" />
              <col width="60" />
              <col width="100" />
              <col width="75" />
              <col width="75" />
              <col width="30" />
              <col width="75" />
              <col width="100" />
              <col width="65"/>
              <tr>
                <td rowspan="2" style="border-top: 1px solid #fff; border-left: 1px solid #fff;" class="t l b r" colspan="6"><div align="center" style="font-size: 24px; font-weight: bold;">
                  <img class="qrImg" :src="$store.state.qrUrl + item.machiningQrCode + '&w=500&h=500'" alt="">
                  加工作业指示票</div></td>
                <td style="border-top: 1px solid #fff;" class="t l b r">&nbsp;</td>
                <td style="border-top: 1px solid #fff; border-right: 1px solid #fff;" class="t l b r" colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td><strong>发行日期</strong></td>
                <td style="background: #000; color: #fff;" colspan="2">{{$store.state.time}}</td>
              </tr>
              <tr>
                <td style="border-left: 1px solid #fff;" class="r t l b" colspan="3"><strong>接单号码：</strong>{{item.soNo}}-{{item.soLnNo}}</td>
                <td class="r t l b" colspan="3"><strong>指示号码：</strong>{{item.soLnNo}}</td>
                <td><strong>发件人</strong></td>
                <td colspan="2">{{machiningData.order.entryUserName}}</td>
              </tr>
              <tr>
                <td class="r"><strong>订购商名称</strong></td>
                <td class="l" colspan="5">{{machiningData.order.contKname}}</td>
                <td class="r t b"><strong>交期</strong></td>
                <td class="l b">
                  {{$store.getters.getDate(machiningData.order.contDueDate, 2)}}
                </td>
                <td class="b" style="width: 54px;"><strong>指示数量</strong></td>
              </tr>
              <tr>
                <td class="r"><strong>送货地址名称</strong></td>
                <td class="l" colspan="5"> {{machiningData.order.shiptoName}} </td>
                <td class="r t"></td>
                <td class="t l"></td>
                <td class="t" align="right" style="font-size: 20px;"><strong>{{item.workInstQty}}</strong></td>
              </tr>
              <tr>
                <td colspan="2" rowspan="3"><p><strong>钢种</strong></p>
                  <p style="font-size: 25px;">{{item.gradeCd}}</p></td>
                <td class="b" colspan="7"><strong>加工公差</strong></td>
              </tr>
              <tr>
                <td class="t" colspan="7" style="font-size: 16px;"><strong>{{item.machineTolerance}}</strong></td>
              </tr>
              <tr>
                <td  class="r"><strong>客户要求尺寸</strong></td>
                <td align="center" style="font-size: 20px;" colspan="6" class="l">
                  <!--{{item.instSizeNote}}-->
                  {{machiningData.order.machineShapeCd}} {{item.size1}} X {{item.size2}} X {{item.size3}}
                </td>
                <!--<td class="r l">30</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td align="center" class="r l">36</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="l">161</td>-->
              </tr>
              <tr>
                <td class="b"><strong>直角度</strong></td>
                <td class="b"><strong>平行度</strong></td>
                <td class="b"><strong>加工规格</strong></td>
                <td class="b"><strong>倒角规格</strong></td>
                <td class="b" colspan="5"><strong>切断指示尺寸</strong></td>
              </tr>
              <tr>
                <td class="t">&nbsp;{{item.mRightAngle}}</td>
                <td class="t">{{item.mParallel}}</td>
                <td class="t" style="font-size: 20px;"><strong>{{item.machineSpecCd}}</strong></td>
                <td class="t">{{item.chamferSpec}}</td>
                <td align="center" style="font-size: 20px;" colspan="5" class="t">
                  {{machiningData.order.machineShapeCd}} {{item.instSize1}} X {{item.instSize2}} X {{item.instSize3}}
                  <!--{{item.instSizeNote}}-->
                </td>
                <!--<td class="t r l">X</td>-->
                <!--<td align="center" class="t r l">41</td>-->
                <!--<td class="t r l">X</td>-->
                <!--<td class="t l">166</td>-->
              </tr>
              <tr>
                <td class="r b"><strong>库存尺寸</strong></td>
                <td class="l b" colspan="3"></td>
                <td class="r b l bl tb"><strong>实际尺寸</strong></td>
                <td class="r b l tb">&nbsp;</td>
                <td class="r b l tb">&nbsp;</td>
                <td class="r b l tb">&nbsp;</td>
                <td class="b l tb br">&nbsp;</td>
              </tr>
              <tr>
                <td class="t" colspan="4">{{item.stockSizeNote}} </td>
                <td  class="r t bl bb">&nbsp;</td>
                <td  class="r t l bb">X</td>
                <td  class="r t l bb">&nbsp;</td>
                <td  class="r t l bb">X</td>
                <td  class="t l bb br">&nbsp;</td>
              </tr>
              <tr>
                <td  class="b" colspan="9">
                  <strong style="float: left;margin-right:10px;">加工指示备注</strong>
                  <div style="width:320px;float: left;">
                    <p>&nbsp;{{item.instRemarks1}}</p>
                    <p>&nbsp;{{item.instRemarks2}}</p>
                  </div>
                  <div style="width:330px;float: right;">
                    <p>&nbsp;{{item.millingRemarks1}}</p>
                    <p>&nbsp;{{item.millingRemarks2}}</p>
                  </div>
                </td>
              </tr>
            </table>
            <table class="table" style="width: 85%;margin: 0 auto;border-top: none;" border="1" cellspacing="0" bordercolor="#000000">
              <tr>
                <td class="t" align="center" width="200"><strong>营业确认</strong></td>
                <td class="t" align="center" width="200"><strong>厚度加工</strong></td>
                <td class="t" align="center" width="200"><strong>四辺加工</strong></td>
                <td class="t" align="center" width="200"><strong>研磨加工</strong></td>
                <td class="t" align="center" width="200"><strong>检测</strong></td>
              </tr>
              <tr>
                <td rowspan="2"></td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
                <td class="bd">完成日期</td>
              </tr>
              <tr>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
                <td class="btb"><p>&nbsp;</p></td>
              </tr>
            </table>
          </div>
          <div class="pri-right" style="border-left: 1px dashed #000;padding-top: 10px;">
            <table width="100%"  border="0" cellspacing="0" bordercolor="#000000">
              <tr>
                <td width="100" rowspan="2"></td>
                <td colspan="2" style="position: relative;">
                  <img class="right-logo" src="../../../static/images/logo.jpg" alt="">
                  <b>日立金属（东莞）特殊钢有限公司 本部 </b>
                  <p style="font-size: 10px;">广东省东莞市茶山镇茶山工业园</p></td>
              </tr>
              <tr>
                <td width="326">&nbsp;</td>
                <td width="145" align="right"><span class="span">加工</span></td>
              </tr>
              <tr>
                <td><strong>现品票</strong></td>
                <td><div align="center"><strong>接单号码：</strong>{{item.soNo}}-{{item.soLnNo}}</div></td>
                <td><strong>指示号码：</strong>{{item.soLnNo}}</td>
              </tr>
            </table>
            <table class="table" width="100%" height="305" border="1" cellpadding="0" cellspacing="0">
              <col width="120">
              <col width="120">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="30">
              <col width="90">
              <col width="90">
              <tr>
                <td colspan="9"><strong>订购商名称：</strong>{{machiningData.order.contKname}}</td>
              </tr>
              <tr>
                <td colspan="9"><strong>送货地址名称：</strong>{{machiningData.order.shiptoName}}</td>
              </tr>
              <tr>
                <td colspan="9"><strong>订单号：</strong>{{machiningData.order.contPoNo}}</td>
              </tr>
              <tr>
                <td class="r"><strong>钢种</strong></td>
                <td class="l" colspan="2">{{item.gradeCd}}</td>
                <td class="bl bb tb" colspan="3"><strong>数量</strong></td>
                <td class="br bb tb" colspan="3"><strong>kg重量</strong></td>
              </tr>
              <tr>
                <td class="r"><strong>加工规格</strong></td>
                <td class="l" colspan="5">{{item.machineSpecCd}}</td>
                <td colspan="3"><strong>倒角规格</strong>&nbsp;{{item.chamferSpec}}</td>
              </tr>
              <tr>
                <td class="r bl bb tb" colspan="2"><strong>产品规格说明</strong></td>
                <td colspan="7" class="r l tb bb br">
                  <strong>
                    {{machiningData.order.machineShapeCd}} {{item.size1}} X {{item.size2}} X {{item.size3}}
                  </strong>
                </td>
                <!--<td class="r l">30</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="r l">36</td>-->
                <!--<td class="r l">X</td>-->
                <!--<td class="r l" colspan="2">161</td>-->
              </tr>
              <tr>
                <td><strong>No</strong></td>
                <td colspan="6">&nbsp;</td>
                <td><strong>直角度</strong></td>
                <td><strong>平行度</strong></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td class="r l">加工尺寸</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td class="r l">X</td>
                <td class="r l">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
            <p style="text-align: right;">HMDS-QR-43-2/AO</p>
          </div>
        </div>
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
      value1: '',
      machiningData: {
        workList: [],
        order: {}
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
    this.getMachining()
  },
  watch: {
    orderInfo () {
      this.getMachining()
    }
  },
  methods: {
    getMachining () {
      this.http('/tSalesOrder/getMachiningPrintData', {
        soNo: this.orderInfo.soNo
      }).then(resp => {
        if (resp.success) {
          let lists = []
          // this.machiningData = resp.data
          // console.log(this.machiningData)
          resp.data.soList.map(item => {
            let obj = {
              ...item.workData,
              ...item
            }
            lists.push(obj)
          })
          this.machiningData.workList = lists
          this.machiningData.order = resp.data.order
          console.log(this.machiningData)
        }
      })
    },
    keeyHistory () {
      this.http('/printHistory/saveOrUpdate', {
        soNo: this.orderInfo.soNo,
        dataJson: {...this.machiningData},
        printType: '2'// 1为切断指示书，2为加工指示书，3为热加工指示书
      }).then(resp => {
        if (resp.success) {
          document.getElementById('printClick').click()
        } else {
          this.$message.error({
            message: '失败：' + resp.message,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  /*.miniInput {*/
    /*outline: none;*/
    /*width: 30px;*/
    /*position: absolute;*/
    /*margin-left: -15px;*/
    /*border: none;*/
    /*margin-top: -10px;*/
  /*}*/
  * {
    font-family: 宋体;
    /*color: #666;*/
  }
  strong {
    /*color: #333;*/
  }
  .main {
    /*height: 843PX;*/
  }
  .right-logo {
    position: absolute;
    left: -70px;
    width: 60px;
  }
  .main:last-child {
    height: 800px;
  }
  .qrImg {
    position: absolute;
    width: 40px;
    margin-left: -42px;
    margin-top: -16px;
    /*left: -55px;*/
    /*top: -5px;*/
  }
  #printContent {
    /*margin: 10px;*/
    width: 1210px;
    padding: 10px;
    overflow: hidden;
  }
  .table-width {
    /*border: none;*/
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
  .br {
    border-right: 2px solid #000;
  }
  .tb {
    border-top: 2px solid #000;
  }
  .bb {
    border-bottom: 2px solid #000;
  }
  .bl {
    border-left: 2px solid #000;
  }
  .bd {
    border-bottom:1px dashed #000;
  }
  .btb {
    border-top:1px dashed #000;
  }
  .span {
    border: 1px solid #000;
    padding: 2px 10px;
    font-size: 12px;
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
    padding: 0px 7px;
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
  .bottom-left p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 35px;
  }

  .numb-td input {
    margin-right: 10px;
  }
  .numb-td span {
    position: absolute;
    right: 10px;
    top: 2px;
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
  .table2 td:nth-child(1) {
    width: 30px;
  }
  .pri-left {
    width: calc(64% - 6px);
    float: left;
    height: 400px;
    padding-right: 5px;
    padding-bottom: 5px;
  }
  .pri-right {
    width: calc(36% - 5px);
    height: 400px;
    float: right;
    padding-left: 5px;
    padding-padding: 5px;
  }
  .span-left {
    position: absolute;
    margin-left: 10px;
    padding: 0px 20px;
    font-size: 20px;
    color: #000;
    margin-top: 5px;
  }
  .logo {
    width: 60px;
    top: 0px;
    position: absolute;
    left: -70px;
  }
</style>
