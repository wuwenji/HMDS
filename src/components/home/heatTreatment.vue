<template>
  <div>
    <div class="carousel">
      <div :style="{opacity: opacOne, 'z-index': 99}" class="carousel-item">
        <div class="left-table">
          <table class="table" border="1" borderColor="#000">
            <thead>
            <tr>
              <th></th>
              <th colspan="2">当天<br>({{days[0].date}}/{{days[0].week}})</th>
              <th colspan="3">明天<br>({{days[1].date}}/{{days[1].week}})</th>
              <th colspan="3">后天<br>({{days[2].date}}/{{days[2].week}})</th>
              <th colspan="3">第三天<br>({{days[3].date}}/{{days[3].week}})</th>
            </tr>
            <tr>
              <th>炉名</th>
              <th>入炉重量</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
              <th>预定重量</th>
              <th>剩余能力</th>
              <th>设备能力</th>
            </tr>
            </thead>
            <tbody class="td-first-left">
            <tr v-for="(item, key) in heatPlan" :key="'VQ1' + key">
              <td v-for="(val, index) in item" :key="key + 'c' + index" align="right">
                <!--{{val}}-->
                {{$store.getters.toThousand(val, 3)}}
              </td>
            </tr>
            <!--<tr>-->
            <!--<td>VQ2</td>-->
            <!--<td class="john-right"></td>-->
            <!--<td v-for="(item, key) in heatPlan.VQ2" :key="'VQ2' + key">{{item}}</td>-->
            <!--</tr>-->
            </tbody>
          </table>
        </div>
        <div class="right-table">
          <table class="table" border="1" borderColor="#000">
            <tr>
              <th colspan="3">当天<br>({{days[0].date}}/{{days[0].week}})</th>
            </tr>
            <tr>
              <th>种类</th>
              <th>未处理单数</th>
              <th>未处理重量</th>
            </tr>
            <tr>
              <td>QT</td>
              <td class="john-right">
                <!--{{qtNvg.QT.notDoneOrderCount}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.QT.notDoneOrderCount), 3)}}
              </td>
              <td class="john-right">
                <!--{{qtNvg.QT.notDoneWeight}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.QT.notDoneWeight), 3)}}
              </td>
            </tr>
            <tr>
              <td>NVG</td>
              <td class="john-right">
                <!--{{qtNvg.NVG.notDoneOrderCount}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.NVG.notDoneOrderCount), 3)}}
              </td>
              <td class="john-right">
                <!--{{qtNvg.NVG.notDoneWeight}}-->
                {{$store.getters.toThousand(JSON.stringify(qtNvg.NVG.notDoneWeight), 3)}}
              </td>
            </tr>
          </table>
        </div>
        <div class="cl-nowPic"></div>
        <div class="title">
         <span>客户财产登记表</span>
          <div v-if="$parent.allScreen === 0" class="form">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="formData.startTime"
              value-format="timestamp"></el-date-picker>
            -
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="formData.endTime"
              value-format="timestamp"></el-date-picker>
            <el-button @click="searchList" type="primary" size="small">查询</el-button>
            <el-button class="export" type="primary" size="small" @click="exportExcel">导出</el-button>
          </div>
        </div>
        <div id="out-table" class="elTable back-table">
            <el-table
              :data="lists"
              border
              style="width: 100%">
              <el-table-column
                label="接单时间">
                <template slot-scope="scope">
                  {{$store.getters.getDate(scope.row.acceptTime, 2)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="managementNumber"
                width="120"
                label="成绩书号">
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称">
              </el-table-column>
              <el-table-column
                prop="material"
                label="钢种">
              </el-table-column>
              <el-table-column
                prop="totalCount"
                align="right"
                width="60"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="totalWeight"
                align="right"
                width="80"
                label="重量">
              </el-table-column>
              <el-table-column
                prop="hardnessRequirement"
                label="硬度要求">
              </el-table-column>
              <el-table-column
                prop="attention"
                show-overflow-tooltip
                label="特别事项">
              </el-table-column>
              <el-table-column
                prop="taskName"
                label="作业名">
              </el-table-column>
              <el-table-column
                label="使用炉">
                <template slot-scope="scope">
                  <span v-if="scope.row.mapList.length > 0">
                    {{scope.row.mapList[scope.row.mapList.length - 1].equipmentName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="工艺">
                <template slot-scope="scope">
                  <span v-if="scope.row.mapList.length > 0">
                    {{scope.row.mapList[scope.row.mapList.length - 1].heatName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="入炉日期">
                <template slot-scope="scope">
                  {{$store.getters.getDate(scope.row.mapList[0].startTime, 2)}}
                </template>
              </el-table-column>
              <el-table-column
                label="计划货期">
                <template slot-scope="scope">
                  {{$store.getters.getDate(scope.row.planTime, 2)}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产进度"
                width="250">
                <template slot-scope="scope">
                  <ul class="prog">
                    <li v-for="item in scope.row.mapList" :key="item.equipmentId">
                      {{item.heatName}}<br/>
                      <span :class="getClass(item)"></span>
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column
                prop="specialMatters"
                show-overflow-tooltip
                label="备注">
              </el-table-column>
            </el-table>
          </div>
        <div class="page">
        <el-pagination
          v-if="$parent.allScreen === 0"
        @current-change="handleCurrentChange"
        @size-change="sizeChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="total, prev, next, jumper"
        :total="total">
        </el-pagination>
        </div>
      </div>
      <div :style="{opacity: opacTwo}" class="carousel-item">
        <div class="nowPic">
          <table style="table-layout:fixed;" class="table nowPicTable" border="1">
            <tr>
              <td></td>
              <td class="green" ref="tdWidth">平</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="red">峰</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td class="green">平</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td>谷</td>
              <td></td>
            </tr>
            <tr>
              <td>时间</td>
              <td v-for="item in 17" :key="'a' + item">{{item + 7}}</td>
              <td v-for="item in 7" :key="'b' + item">{{item}}</td>
              <td>备注</td>
            </tr>
            <tbody class="john-tbody" v-for="(item, index) in nowPic" :key="'tb' + index">
            <tr>
              <td style="position: relative;" rowspan="2">
                {{item.code}}
                <template v-if="item.customers && item.materials">
                  <div v-if="isShow(item.startTime, item.endTime)" :style="getStyle(item.startTime, item.endTime)" class="midLine">
                    <img class="line-left" src="../../../static/images/left.png" alt="">
                    <img class="line-right" src="../../../static/images/right.png" alt="">
                  </div>
                  <div v-if="isShow(item.startTime, item.endTime)"  style="white-space:nowrap;" :style="getStyle(item.startTime, item.endTime)" class="explan">
                    {{`客户：${item.customers}。 材质：${item.materials}。`}}
                  </div>
                </template>
              </td>
              <td style="border-bottom: 1px dashed #000;" v-for="index in 24" :key="index"></td>
              <td rowspan="2">
              </td>
            </tr>
            <tr>
              <td style="border-top: 1px dashed #000;" v-for="index in 24" :key="index"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'doBusiness',
  data () {
    return {
      widthTd: '',
      opacOne: 1,
      opacTwo: 0,
      setInterval: '',
      carouseing: '',
      days: [],
      nextPage: '',
      formData: {
        startTime: '',
        endTime: ''
      },
      heatPlan: [],
      qtNvg: {
        NVG: {
          notDoneOrderCount: 0,
          notDoneWeight: 0
        },
        QT: {
          notDoneOrderCount: 0,
          notDoneWeight: 0
        }
      },
      total: 0,
      lists: [],
      pageSize: 8,
      pageNum: 1,
      nowPic: ['VQ1', 'VQ2', 'VQ3', '半VQ', 'VD']
    }
  },
  created () {
    this.days = this.getDays(3)
    this.heatTime()
    this.getQtNvg()
    this.getPropertyRegistration()
    this.getHeatPlanData()
    this.setInterval = setInterval(() => {
      this.days = this.getDays(3)
      this.heatTime()
      this.getQtNvg()
    }, 600000)
  },
  mounted () {
    this.$nextTick(() => {
      this.widthTd = this.$refs.tdWidth.clientWidth
      console.log(this.widthTd)
    })
    this.carousel()
    this.carouselPage()
  },
  beforeDestroy () {
    clearInterval(this.carouseing)
    clearInterval(this.nextPage)
    clearInterval(this.setInterval)
  },
  methods: {
    // 获取日期
    getDays (dayCount) {
      var date = new Date()
      var dates = []
      var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      for (var i = 0; i <= dayCount; i++) {
        var d = null
        var date1 = date.getDate()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        if (date1 < 10) {
          date1 = '0' + date1
        }
        d = date.getFullYear() + '-' + month + '-' + date1
        var weeks = ''
        var day = new Date(d)
        var z = day.getDay()
        weeks = week[z]
        dates.push({
          'date': d,
          'week': weeks
        })
        date.setDate(date.getDate() + 1)
      }
      return dates
    },
    // 获取分页数
    getPages (numb) {
      if (numb % 8 === 0) {
        this.pages = numb / 8
      } else {
        this.pages = parseInt(numb / 8) + 1
      }
    },
    // 查询客户财产登记表
    searchList () {
      this.getPropertyRegistration()
    },
    // 返回设备工艺
    getValue (string, num) {
      if (string !== null) {
        let array = string.split('/')
        return array[num]
      }
    },
    // 轮播
    carousel () {
      this.carouseing = setInterval(() => {
        this.toggleTable()
        this.toggleEchart()
        clearInterval(this.carouseing)
        this.carousel()
      }, 10000)
    },
    // 导出excel
    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xls', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '客户财产登录表.xls')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 显隐表格
    toggleTable () {
      if (this.opacOne > 0) {
        let setOne = setInterval(() => {
          if (this.opacOne > 0) {
            this.opacOne -= 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      } else {
        let setOne = setInterval(() => {
          if (this.opacOne < 1) {
            this.opacOne += 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      }
    },
    // 显隐图表
    toggleEchart () {
      if (this.opacTwo > 0) {
        let setOne = setInterval(() => {
          if (this.opacTwo > 0) {
            this.opacTwo -= 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      } else {
        let setOne = setInterval(() => {
          if (this.opacTwo < 1) {
            this.opacTwo += 0.03
          } else {
            clearInterval(setOne)
          }
        }, 50)
      }
    },
    // QT、NVG处理
    getQtNvg () {
      this.http('/show/getHeatTotalData', {}).then(resp => {
        if (resp.success) {
          this.qtNvg = resp.data
        }
      })
    },
    // 财产管理登记列表
    getPropertyRegistration () {
      this.http('/heat/findHeatRecordList', {
        pageSize: this.pageSize,
        tempStartTime: this.formData.startTime,
        tempEndTime: this.formData.endTime,
        pageNum: this.pageNum
      }).then(resp => {
        if (resp.success) {
          this.lists = resp.data.list
          this.total = resp.data.total
          this.getPages(resp.data.total)
        }
      })
    },
    // 右上角数据表格
    getHeatPlanData () {
      this.http('/show/getHeatPlanData', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.heatPlan = resp.data
        }
      })
    },
    // 轮播页数
    carouselPage () {
      let num = 1
      this.nextPage = setInterval(() => {
        if (num <= this.pages) {
          num++
          this.pageNum = num
          this.getPropertyRegistration()
        } else {
          clearInterval(this.nextPage)
          this.carouselPage()
        }
      }, 8000)
    },
    // 热处理时间表
    heatTime () {
      this.http('/show/getHeatTimeData', {}).then(resp => {
        if (resp.success) {
          this.nowPic = resp.data.map(item => {
            item.customers = ''
            item.materials = ''
            item.CustomerData.map((val, index) => {
              if (index === 0) {
                item.customers += val.customerName
                item.materials += val.material
              } else {
                item.customers += '，' + val.customerName
                item.materials += '，' + val.material
              }
            })
            item.startTime = item.startTime || 8
            item.endTime = new Date().getHours()
            return item
          })
        }
      })
    },
    // 当开始时间为null时，不显示
    isShow (start, end) {
      // if (start === null) return false
      return true
    },
    // 换页
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.getPropertyRegistration()
    },
    // 换数量
    sizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.getPropertyRegistration()
    },
    getClass (item) {
      if (item.shipmentStatus > 0) {
        return 'red'
      } else {
        return 'blue'
      }
      // if (a === 1) return 'red'
      // if (a === 2) return 'blue'
    },
    getStyle (a, b) {
      let c = b - a + 1
      a = a > 7 ? (a - 7) : (a + 17)
      let d = 0
      if (c < 6) {
        d = -7
      } else if (c < 10 && c >= 6) {
        d = -4
      } else if (c < 14 && c >= 10) {
        d = 1
      } else if (c < 18 && c >= 14) {
        d = 4
      } else if (c < 22 && c >= 18) {
        d = 9
      } else if (c >= 22) {
        d = 14
      }

      let left = 'left:' + (a * this.widthTd + 6 + a) + 'px;'
      let width = 'min-width:' + (c * this.widthTd + d) + 'px;'
      return left + width
    }
  }
}
</script>

<style scoped>
  *{
    font-size: 17px;
  }
  .td-first-left td:first-child {
    text-align: center;
  }
  .table {
    text-align: center;
    width: 100%;
  }
  .title {
    text-align: left;
    line-height: 50px;
    font-size: 24px;
    padding-top: 30px;
  }
  .title span {
    font-size: 34px;
    /*padding-right: 400px;*/
  }
  .table td,.table th {
    /*padding: 12px 10px;*/
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  .page {
    text-align: right;
    margin-top: 5px;
  }
  .line {
    height: 300px;
  }
  .prog li {
    float: left;
    margin: 0 5px;
    list-style: none;
  }
  .prog li span {
    width: 30px;
    height: 10px;
    border: 1px solid #0070c0;
    border-radius: 2px;
    display: block;
    background: #efefef
  }
  .prog li span.red {
    background: #ff0000;
  }
  .prog li span.blue {
    background: #0070c0;
  }
  .gaotie,.feiji {
    width: 115px;
    cursor: pointer;
  }
  .mid-table {
    float: right;
  }
  .mid-table td{
    padding: 5px;
    color: #0070c0;
  }
  .left-table {
    width: 70%;
    float: left;
  }
  .right-table {
    width: calc(30% - 20px);
    margin-left: 20px;
    float: left;
  }
  .total {
    text-align: right;
    margin-top: 50px;
  }
  .green {
    background: #00b050;
  }
  .red {
    background: #ff0000;
  }
  .cl-nowPic {
    height: 20px;
    clear: both;
  }
  .total span {
    padding: 4px 20px;
    background: #0070c0;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
  }
  .nowPicTable td{
    height: 75px;
    padding: 5px 0;
    font-size: 26px;
    /*width: calc(100%/26);*/
    /*width: 20px;*/
  }
  .midLine {
    background: #4a7ebb;
    position: relative;
    height: 4px;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  .explan {
    background: #fdeada;
    position: absolute;
    left: 20px;
    padding: 4px 0;
    top: 80px;
    color: red;
    font-size: 26px;
    border: 1px solid #4a7ebb;
  }
  .line-left {
    position: absolute;
    left: -6px;
    width: 10px;
    top: -3px;
    height: 10px;
  }
  .line-right {
    position: absolute;
    right: -6px;
    top: -3px;
    width: 10px;
    height: 10px;
  }
  .carousel {
    height: 1050px;
    position: relative;
  }
  .carousel-item {
    height: 1050px;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .export {
    margin-left: 10px;
  }
  .form {
    float: right;
  }
</style>
