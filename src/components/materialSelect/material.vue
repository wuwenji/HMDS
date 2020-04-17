<template>
  <div>
    <div id="printContent">
      <div class="btns">
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="showPage"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="orderInfo.totalPage">
          </el-pagination>
        </div>
        <div class="keep-sub">
          <el-button @click="keepData" type="success" size="mini">保存</el-button>
          <el-button @click="listSubmit" type="warning" size="mini">提交</el-button>
        </div>
      </div>
      <div class="printPage" v-for="(item, index) in orderInfo.list" v-if="showPage === index + 1" :key="index">
        <table class="table-tr-height" border="1" cellspacing="0" >
          <tr >
            <td colspan="3" valign="top" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>客户</b> </p></td>
            <td colspan="7" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{item[0].contCd}}</p><p >{{item[0].contName}}</p></td>
            <td width="80" valign="top" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>最终客户</b></p></td>
            <td colspan="5" valign="top" nowrap="nowrap" bordercolor="#000000" ><p >{{item[0].custCd}}&nbsp;</p><p >{{item[0].custName}}</p></td>
            <td rowspan="4" style="text-align: center;">
              <el-button style="margin: 2px;" @click="motherPrior(item, 1)" type="primary" size="mini">母材优先</el-button>
              <br/>
              <el-button style="" @click="motherPrior(item, 2)" type="primary" size="mini">残材优先</el-button>
              <br/>
              <el-button style="margin: 2px;" @click="mergePrior(item)" type="primary" size="mini">合并选料</el-button>
              <br/>
              <el-button style="margin-bottom: 2px;" @click="clearSelect(item)" type="warning" size="mini">清空选料</el-button>
            </td>
          </tr>
          <tr class="tr2s">
            <td></td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b style="font-size: 20px;">钢种</b></p></td>
            <td colspan="4" valign="center" nowrap="nowrap" bordercolor="#000000" ><p ><b>{{item[0].gradeCd}}</b></p></td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>接单号码</b> </p></td>
            <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item[0].soNo}}</p></td>
            <td valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="right" ><b>营业员</b></p></td>
            <td colspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" >
              <p style="float: left;">{{item[0].suserName}}</p>
              <p style="float: right;padding-left: 20px;">
                <span class="line-span"></span>
                <b>发件人</b> </p>
            </td>
            <td colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{item[0].entryUserName}}</p></td>
          </tr>
          <tr >
            <td width="30" class="check-label-none" rowspan="2" valign="center" nowrap="nowrap"><p align="center" >功能
            <br/>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </p></td>
            <td width="30" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >确认 </p></td>
            <td width="25" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" >NO </p></td>
            <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>客户要求尺寸</b> </p></td>
            <td colspan="2" valign="center" nowrap="nowrap" class="b"><p ><b>库存类别</b> </p></td>
            <td colspan="4" valign="center" nowrap="nowrap" class="b"><p ><b>库存备注 <span style="float: right;width: 168px;">包装箱号</span></b> </p></td>
            <td rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>指示<br/>数量</b> </p></td>
            <td rowspan="2" class="bt bl" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>kg重量</b> </p></td>
            <td rowspan="2" class="bt br" valign="center" nowrap="nowrap" bordercolor="#000000" ><p align="center" ><b>作業完成时间</b> </p></td>
          </tr>
          <tr >
            <td width="75" valign="center" nowrap="nowrap" class="r t"><p ><b>交期</b> </p></td>
            <td width="47" valign="center" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p ><b>单位</b> </p></td>
            <td width="52" valign="center" nowrap="nowrap" class="l r t" bordercolor="#000000" ><p class="align-right"><b>数量</b> </p></td>
            <td width="62" valign="center" nowrap="nowrap" class="l t" bordercolor="#000000" ><p class="align-right"><b>kg重量</b> </p></td>
            <td colspan="2" valign="center" nowrap="nowrap" class="t"><p ><b>&nbsp;</b> </p></td>
            <td width="117" valign="center" nowrap="nowrap" class="r t"><p ><b>溶解号码</b> </p></td>
            <td colspan="2" nowrap="nowrap" class="l r t"><p ><b>库存尺寸</b> </p></td>
            <td width="150" valign="center" nowrap="nowrap" class="l t"><p ><b>切断指示尺寸</b> </p></td>
          </tr>
          <template v-for="(list, key) in item">
            <tr class="tr1" :key="'dd' + key">
              <td rowspan="3" style="text-align: center;">
                <p class="check-label-none" style="margin-bottom: 5px;">
                  <!--@change="elChange(list, key)"-->
                  <el-checkbox :label="list" v-model="selectData">&nbsp;</el-checkbox>
                </p>
                <span @click="addData = list; addShow = true" style="margin-bottom: 5px;" class="span-btn">+</span>
                <span @click="removeCol(list)" class="span-btn">-</span>
              </td>
              <td width="30" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td width="25" rowspan="3" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.soLnNo}}{{list.lnNo ? '-' + list.lnNo : ''}}</p></td>
              <td colspan="4" style="position: relative;" rowspan="3" valign="top" nowrap="nowrap" bordercolor="#000000" >
                <p>
                  <span style="width: 25px;display: inline-block;">{{list.machineShapeCd}}</span>
                  <span style="width: 55px;display: inline-block;text-align: right;margin-right:5px;">{{list.size1}}</span>X<span style="margin-right:5px;margin-left:10px;width: 55px;display: inline-block;text-align: right;">
                    {{list.size2 > 0? list.size2 : ''}}</span>X<span style="width: 55px;display: inline-block;text-align: right;margin-left:10px;">
                  {{list.size3}}</span>
                </p>
                <p class="spans">
                  <span style="font-size: 14px;">{{list.itemName1}} {{list.itemName2}}</span><br/>
                  <span style="font-size: 14px;position:relative;top:-4px;">{{list.instRemarks1}}</span><br/>
                  <span style="font-size: 14px;position:relative;top:-8px;">{{list.instRemarks2}}</span>
                </p>
                <p style="position: absolute;bottom:0px;" class="spans">
                  <span style="font-size:14px;">{{$store.getters.getDate(list.contDueDate, 2).replace('-', '/').replace('-', '/')}}</span>
                  <span>
                    {{list.unitPriceCd == 2? 'KG': ''}}
                    {{list.unitPriceCd == 7? '個': ''}}
                    {{list.unitPriceCd == 8? '套': ''}}
                  </span>
                  <span class="align-right">{{list.soQty}}</span><span style="margin-right:5px;width: 65px;" class="align-right">{{list.soKgWt}}</span>
                </p>
              </td>
              <td colspan="2" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" ><div class="red">
                <p>
                  {{list.stockType == 1? '母材' : ''}}{{list.stockType == 2? '余材' : ''}}<template v-if="list.replaceGrade"><span style="font-size: 12px;">({{list.replaceGrade}})</span></template>
                &nbsp;
                </p>
                <!--<br/><template v-if="list.selectSoNo">{{list.selectSoNo}}</template>-->
                <p v-if="list.selectSoNo">
                  <span @mouseover="tipShow = key" @mouseout="tipShow = ''">{{list.selectSoNo | subs}}<span style="font-family: Arial">…</span></span>
                  <span v-if="tipShow === key" class="tips">{{list.selectSoNo}}</span>
                </p>
                <!--{{list.matCntlNo}}-->
              </div></td>
              <td class="red" style="border-right: none;" rowspan="2" valign="top" nowrap="nowrap" bordercolor="#000000" >
                <p style="position: absolute;">
                  {{list.stockRemarks}}
                  <template v-if="list.mergeNo !== null && list.mergeLnNo !== null && list.mergeCount !== null">
                    {{`${list.mergeNo}-${list.mergeLnNo}(${list.mergeCount})`}}
                  </template><br/>
                  {{list.chargeNo}}
                </p>
              </td>
              <td style="border-left: none;" colspan="3" rowspan="2" valign="top" nowrap="nowrap" ><p>&nbsp;
                <span class="red" style="float: right;width: 168px;">
                  {{list.caseNo}}
                  <span style="float: right;">
                    库{{list.stockQty || 0}}用{{list.usageQuantity}}
                  </span>
                </span>
              </p>
                <p ><span class="red">{{list.stockSizeNote}}</span>
                  <span style="float: right;width: 165px;">
                    {{list.machineShapeCd}}
                    {{list.instSize1}}X<template v-if="list.instSize2 > 0">{{list.instSize2}}X</template>{{list.instSize3}}
                    <!--{{list.instSizeNote}}-->
                  </span>
                </p>
              </td>
              <td width="30" align="center" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >{{list.soQty}}</p></td>
              <td class="bt bl" width="87" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt br" width="137" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td rowspan="3" align="center">
                <template>
                  <el-button @click="handSelect(key, list)" style="margin: 2px;" type="warning" size="mini">手动选料</el-button>
                  <el-button @click="replaceGrade(key)" style="margin: 2px;" size="mini">替换钢种</el-button>
                </template>
                <p class="red" v-if="list.selectType === null">
                  未选料
                </p>
                <p class="red" v-else>
                  {{list.selectType === '1' ? '母材' : ''}}
                  {{list.selectType === '2' ? '残材' : ''}}
                  {{list.selectType === '3' ? '合并' : ''}}
                  {{list.selectType === '4' ? '手动' : ''}}
                  {{list.selectType === '5' ? '跳过' : ''}}选料
                </p>
              </td>
            </tr>
            <tr class="tr2" :key="'cc' + key">
              <td class="bt bb bl br" colspan="3" rowspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" >
                <p></p>
              </td>
            </tr>
            <tr class="tr3" :key="key">
              <td class="bt bl bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >&nbsp;</p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p>理论切削时间<br>
                <span class="red">{{list.theoreticalCutTime}}&nbsp;</span></p></td>
              <td class="bt bb" colspan="2" valign="center" nowrap="nowrap" bordercolor="#000000" ><p >
                作&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;
              </p></td>
              <td class="bt bb" valign="center" nowrap="nowrap" bordercolor="#000000" ><p class="midle-box">
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                <span class="midle-box-content"></span>
                检&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;
              </p></td>
            </tr>
          </template>
        </table>
      </div>
      <div v-if="loading" class="loading">
        <div class="loading-content">
          <i class="el-icon-loading"></i>
          <br/>
          <br/>
          <br/>
          <el-button @click="calcelLoading" size="mini">取消</el-button>
        </div>
      </div>
      <div v-if="addShow" class="loading">
        <div class="addcol-content" style="padding-top: 20px;">
         <ul class="add-row">
           <li>数量:</li>
           <li><el-input v-model="soQty"></el-input></li>
           <li><el-button @click="addCol(addData)" type="primary">确定</el-button></li>
         </ul>
          <br/>
          <br/>
          <br/>
          <br/>
          <el-button @click="addShow = false">取消</el-button>
        </div>
      </div>
      <div v-if="addColspan" class="loading">
        <div class="addcol-content">
          <p>
            没有找到能满足此材料的1件材料。<br/>
            以下是最匹配材料。
          </p>
          <table border="1" class="table">
            <tr>
              <th>溶解编号</th>
              <th>尺寸</th>
              <th>备注</th>
            </tr>
            <tr>
              <td>CX809</td>
              <td>F 30x60x1000</td>
              <td>1</td>
            </tr>
            <tr>
              <td>CX809</td>
              <td>F 30x60x1000</td>
              <td>1</td>
            </tr>
          </table>
          <el-button @click="addColspan = false" type="primary" size="mini">同意</el-button>
          <el-button @click="addColspan = false" size="mini">取消</el-button>
        </div>
      </div>
      <div v-if="replaceGradShow" class="loading">
        <div class="addcol-content">
          <p>
            增加可替换的钢种:
            <br/>
            <br/>
            指示书中的原钢种不会被更改，但选择的钢种中默认会使用代替钢种，请选择代替钢种类型。
          </p>
          <div style="margin-bottom: 10px;">
            <el-select v-model="replaceForm.replaceGrade" filterable placeholder="请选择钢种">
              <el-option v-for="(item, key) in gradeCdList" :label="item" :value="item" :key="key"></el-option>
            </el-select>
          </div>
          <div style="margin-bottom: 30px;">
            <el-select v-model="replaceForm.selectType" placeholder="请选择匹配方式">
              <el-option label="母材" value="1"></el-option>
              <el-option label="残材" value="2"></el-option>
            </el-select>
          </div>
          <el-button @click="promiseReplace(replaceForm.replaceGrade, replaceForm.selectType)" type="primary" size="mini">同意</el-button>
          <el-button @click="replaceGradShow = false" size="mini">取消</el-button>
        </div>
      </div>
      <div v-if="mergeShow" class="loading">
        <div class="merge-content">
          <div style="margin-bottom: 10px;">
            <h2>根据厚度匹配 <el-checkbox @change="changeTick(selectTick)" class="merge-check" v-model="selectTick"></el-checkbox></h2>
            <div>
              所选材料最大厚度： <span class="merge-span">{{ maxTickness }}</span> mm
            </div>
          </div>
          <div style="margin-bottom: 30px;">
            <h2>根据宽度匹配 <el-checkbox @change="changeWidth(selectWidth)" class="merge-check" v-model="selectWidth"></el-checkbox></h2>
            <div>
              所选材料最大宽度： <span class="merge-span">{{ maxWidth }}</span> mm
            </div>
          </div>
          <el-button @click="primisteMerge" type="primary" size="mini">确定</el-button>
          <el-button @click="mergeShow = false" size="mini">取消</el-button>
        </div>
      </div>
      <div v-if="handShow" class="loading">
        <div class="hand-content" style="width: 1250px;">
          <handCommd :info="infoData"></handCommd>
          <el-button @click="handShow = false" size="mini">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handCommd from './manual'
export default {
  name: 'printing',
  components: {
    handCommd
  },
  props: ['orderInfos'],
  data () {
    return {
      src: '',
      id: 0,
      tipShow: '',
      infoData: '',
      selectTick: true,
      selectWidth: false,
      orderInfo: '',
      nowKey: '',
      soQty: 1,
      maxWidth: 0,
      maxTickness: 0,
      addShow: false,
      addData: '',
      checkAll: false,
      isIndeterminate: true,
      showPage: 1,
      handShow: false,
      selectData: [],
      loading: false,
      addColspan: false,
      replaceGradShow: false,
      mergeShow: false,
      currentPage: 1,
      pageSize: 1,
      nullNumb: 5,
      handData: [],
      pinkData: [],
      gradeCdList: [],
      replaceForm: {
        replaceGrade: '',
        selectType: ''
      }
    }
  },
  filters: {
    subs (string) {
      return string.substring(0, 7)
    }
  },
  created () {
    this.orderInfo = this.orderInfos
    this.getGradeList()
    console.log('选料弹窗', this.orderInfo)
    // this.getHtml()
    // console.log(this.orderInfo.id)
  },
  watch: {
    // orderInfo () {
    //   this.getHtml()
    // }
  },
  methods: {
    changeTick (flag) {
      this.selectWidth = !flag
    },
    changeWidth (flag) {
      this.selectTick = !flag
    },
    // 替换钢种
    promiseReplace (grade, type) {
      let oldData = this.orderInfo.list[this.showPage - 1][this.nowKey]
      oldData.replaceGrade = this.replaceForm.replaceGrade
      oldData.isSelected = 1
      // this.addData.replaceGrade = this.replaceForm.replaceGrade
      // this.selectData = [this.addData]
      this.motherPrior(null, type, null, 1)
      this.replaceGradShow = false
    },
    // 全选
    handleCheckAllChange (val) {
      this.selectData = val ? this.orderInfo.list[this.showPage - 1] : []
      this.isIndeterminate = false
    },
    // 手动选料
    handSelect (key, data) {
      this.nowKey = key
      this.infoData = data
      this.handShow = true
    },
    // 手动选中材料
    handSelectData (data) {
      this.handShow = false
      let oldData = this.orderInfo.list[this.showPage - 1][this.nowKey]
      oldData.stockRemarks = data.stockRemarks
      oldData.chargeNo = data.chargeNo
      oldData.caseNo = data.caseNo
      oldData.stockSizeNote = data.stockSizeNote
      oldData.stockType = data.stockType
      oldData.matCntlNo = data.matCntlNo
      oldData.stockNo = data.stockNo
      oldData.selectType = '4'
      oldData.replaceGrade = data.gradeCdKey
      // if (data.gradeCdKey !== oldData.gradeCd) {
      //   oldData.replaceGrade = data.gradeCdKey
      // } else {
      //   oldData.replaceGrade = null
      // }
    },
    // 优先
    motherPrior (item_, type, src = null, isSelect = null) {
      let selData = this.selectData
      let oldData = this.orderInfo.list[this.showPage - 1]
      let url = src || '/orderSelect/autoOrderMaterial/' + type
      oldData.map(item => {
        if (selData.indexOf(item) > -1) {
          item.isSelected = 1 // isSelected: 0:取消  1:选中
        } else {
          if (isSelect !== 1) {
            item.isSelected = 0
          }
        }
      })
      setTimeout(() => {
        this.http(url, oldData).then(resp => {
          if (resp.success) {
            this.selectData = []
            this.orderInfo.list[this.showPage - 1] = resp.data
            if (resp.message) {
              this.$message({
                type: 'success',
                message: resp.message,
                duration: 2000
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: resp.message,
              duration: 2000
            })
          }
        })
      }, 50)
    },
    // 保存结果
    keepData () {
      this.http('/orderSelect/saveOrderMaterial', this.selectData).then(resp => {
        if (resp.message) {
          this.updateData()
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
        } else {
          this.$message({
            type: 'warning',
            message: resp.message,
            duration: 2000
          })
        }
      })
    },
    // 提交数据
    listSubmit () {
      let url = '/orderSelect/finalSave/' + this.orderInfo.list[0][0].soNo
      this.http(url).then(resp => {
        if (resp.success) {
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
        } else {
          this.$message({
            type: 'warning',
            message: resp.message,
            duration: 2000
          })
        }
      })
    },
    // 残材优先
    // disabledPrior (item) {
    //   this.loading = true
    // },
    // 合并
    mergePrior (item) {
      let widths = []
      let tickness = []
      console.log(this.selectData)
      this.selectData.map(item => {
        widths.push(item.instSize2)
        tickness.push(item.instSize1)
      })
      if (widths.length > 0) {
        this.maxWidth = widths.sort((a, b) => b - a)[0]
      }
      if (tickness.length > 0) {
        this.maxTickness = tickness.sort((a, b) => b - a)[0]
      }
      this.mergeShow = true
    },

    // 清空选料
    clearSelect (key) {
      let stockNos = '/orderSelect/clearOrderMaterial?stockNos='
      this.selectData.map((item, key) => {
        if (key === this.selectData.length - 1) {
          stockNos += item.stockNo
        } else {
          stockNos += item.stockNo + ','
        }
      })
      console.log(stockNos)
      this.http(stockNos).then(resp => {
        if (resp.success) {
          this.updateData()
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
        } else {
          this.$message({
            type: 'warning',
            message: resp.message,
            duration: 2000
          })
        }
      })
    },

    // 确定合并
    primisteMerge () {
      let url = ''
      if (this.selectTick) {
        url = '/orderSelect/autoOrderMaterial/3?targetSize1=' + this.maxTickness
      } else {
        url = '/orderSelect/autoOrderMaterial/3?targetSize2=' + this.maxWidth
      }
      this.motherPrior(null, 3, url)
      this.mergeShow = false
    },
    // 取消加载
    calcelLoading () {
      this.loading = false
    },
    // 拆分行
    addCol (item) {
      let params = {
        soNo: item.soNo,
        soLnNo: item.soLnNo,
        soQty: this.soQty,
        lnNo: item.lnNo
      }
      this.changeCol(params, 1)
    },
    // 减少行
    removeCol (item) {
      let params = {
        soNo: item.soNo,
        soLnNo: item.soLnNo,
        lnNo: item.lnNo,
        soQty: item.soQty,
        id: item.id
      }
      this.changeCol(params, 0)
    },
    // 拆减行
    changeCol (params, type) {
      this.http('/orderSelect/splitSoLnNo', {
        ...params,
        isSplit: type // 0:减少一行   1:加多一行
      }).then(resp => {
        this.addShow = false
        console.log('拆减行', resp)
        if (resp.success) {
          this.updateData()
          this.$message({
            type: 'success',
            message: resp.message,
            duration: 2000
          })
        } else {
          this.$message({
            type: 'warning',
            message: resp.message,
            duration: 2000
          })
        }
      })
    },
    // 数据更新
    updateData () {
      let url = '/orderSelect/detail/' + this.orderInfo.list[0][0].soNo
      this.http(url).then(resp => {
        if (resp.success) {
          this.orderInfo = resp.data
        }
      })
    },
    // 替换钢种
    replaceGrade (key) {
      // this.addData = item
      this.nowKey = key
      this.replaceGradShow = true
    },
    // 获取钢种列表
    getGradeList () {
      this.http('/tMaterial/smartGetGradeCd?gradeCd=&type=1').then(resp => {
        console.log('钢种列表', resp)
        this.gradeCdList = resp
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.showPage = parseInt(`${val}`)
    },
    elChange (item, key) {
      console.log(key, item)
      this.selectData.push(item)
    }
  }
}
</script>

<style scoped>
  * {
    font-family: 宋体;
  }
  .align-right {
    text-align: right;
  }
  b {
    font-size: 15px;
  }
  #printContent {
    overflow: hidden;
  }
  .tr2s {
    font-size: 20px;
  }
  .tr2s b {
    font-size: 20px;
  }
  table {
    border-collapse: collapse;
  }
  .line-span {
    display: block;
    background: #000;
    width: 1px;
    height: 25px;
    position: absolute;
    margin-top: -1px;
    margin-left:-10px;
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
  .bt {
    border-top: 2px solid #000;
  }
  .bb {
    border-bottom: 2px solid #000;
  }
  .bl {
    border-left: 2px solid #000;
  }
  td {
    padding: 10px 3px;
  }
  .spans span {
    display: inline-block;
    padding-left: 3px;
  }
  .spans span:nth-child(1) {
    width: 65px;
  }
  .spans span:nth-child(2) {
    width: 41px;
  }
  .spans span:nth-child(3) {
    width: 45px;
  }
  .spans span:nth-child(4) {
    width: 70px;
  }
  .removeClass td{
    height: 100px;
    border: none;
  }
  .table-td-width td:nth-child(1) {
    width: 60px;
    padding: 0px;
  }
  .midle-box {
    width: 168px;
    display: block;
    position: relative;
  }
  .midle-box-content {
    display: inline-block;
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-top: none;
    top: -12px;
  }
  .midle-box-content:nth-child(1) {
    left: 25px;
  }
  .midle-box-content:nth-child(2) {
    left: 75px;
  }
  .midle-box-content:nth-child(3) {
    left: 135px;
  }
  .table-tr-height {
    width: 100%;
  }
  .table-tr-height td {
    padding: 0px 2px;
  }
  .table-tr-height tr:nth-child(1) td{
    height: 33px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(2) td{
    height: 25px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(3) td{
    height: 20px;
    padding: 0 2px;
  }
  .table-tr-height tr:nth-child(4) td{
    height: 20px;
    padding: 0 2px;
  }
  .tr1 {
    height: 35px;
    font-size: 18px;
  }
  .tr2 {
    height: 20px;
  }
  .tr3 {
    height: 40px;
  }
  .span-btn {
    width: 14px;
    height: 14px;
    background: #eee;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-weight: bold;
    margin: 0 auto;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }
  .table2 td {
    width: 14%;
  }
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    /*color: #fff;*/
    z-index: 999999;
    text-align: center;
  }
  .loading-content {
    background: rgba(255, 255, 255, 1);
    margin: 20vh auto;
    width: 150px;
    height: 150px;
    border-radius: 6px;
  }
  .loading i {
    font-size: 40px;
    margin-top: 30px;
  }
  .addcol-content {
    background: rgba(255, 255, 255, 1);
    margin: 20vh auto;
    width: 400px;
  }
  .merge-content {
    background: rgba(255, 255, 255, 1);
    margin: 20vh auto;
    width: 400px;
    padding: 10px;
  }
  .hand-content {
    background: rgba(255, 255, 255, 1);
    margin: 0vh auto;
    width: 1200px;
    padding: 10px;
  }
  .merge-content h2 {
    margin: 30px 0 10px 0;
  }
  .table {
    width: 100%;
    margin-bottom: 30px;
  }
  .addcol-content {
    padding: 10px;
  }
  .addcol-content p {
    text-align: left;
    line-height: 26px;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .table td, .table th {
    padding: 5px;
  }
  .merge-check {
    position: relative;
    top: -3px;
  }
  .merge-inpue {
    width: 70px;
    height: 24px;
    text-align: center;
    line-height: 24px;
  }
  .merge-span {
    width: 50px;
    border: 1px solid #ccc;
    text-align: center;
    display: inline-block;
    height: 24px;
    line-height: 24px;
  }
  .keep-sub {
    float: right;
  }
  .pages {
    float: left;
  }
  .btns {
    margin-bottom: 10px;
    height: 30px;
  }
  .red {
    color: red;
  }
  .add-row li:nth-child(1) {
    line-height: 40px;
    margin: 0 5px;
  }
  .add-row {
    margin-left: 30px;
  }
  .add-row li {
    float: left;
    list-style: none;
  }
  .el-button--mini, .el-button--mini.is-round {
    padding: 4px 15px;
  }
  .tips:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right: 5px solid #000;
    position: absolute;
    left: -10px;
    top: 7px;
  }
  .tips {
    position: absolute;
    background: #000;
    padding: 2px 4px;
    border-radius: 4px;
    z-index: 999999;
  }
</style>
