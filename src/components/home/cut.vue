<template>
  <div>
    <div class="carousel">
      <div :style="{opacity: opacOne}" class="carousel-item">
        <table class="mid-table" border="1" borderColor="#0070c0">
          <tr>
            <td>日期：</td>
            <!--<td colspan="3">{{$store.state.time.substring(0, 10) + ' ' + $store.state.time.substring(11)}}</td>-->
            <td class="john-right">{{$store.state.date}}</td>
            <td >切断延迟：</td>
            <td class="john-right">
              <!--{{summaryData.cutingDelayCount}}-->
              {{$store.getters.toThousand(JSON.stringify(summaryData.cutingDelayCount), 3)}}
            </td>
          </tr>
          <tr>
            <td>接单总数：</td>
            <td class="john-right">
              <!--{{summaryData.cutOrderCount}}-->
              {{$store.getters.toThousand(JSON.stringify(summaryData.cutOrderCount), 3)}}
            </td>
            <td>切断中：</td>
            <td class="john-right">
              <!--{{summaryData.cutingCount}}-->
              {{$store.getters.toThousand(JSON.stringify(summaryData.cutingCount), 3)}}
            </td>
          </tr>
        </table>
        <div class="title">切断部未完成明细</div>
        <template>
          <div class="table_changeTd back-table">
            <el-table
              :data="lists"
              border
              style="width: 100%">
              <el-table-column
                prop="soNo"
                label="订单号"
                align="right"
                fixed
                width="120">
              </el-table-column>
              <el-table-column
                label="接单时间"
                width="120">
                <template slot-scope="scope">
                  {{$store.getters.getDate(scope.row.soDate, 2)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="contKname"
                label="客户名">
              </el-table-column>
              <el-table-column
                prop="soLnNo"
                align="right"
                width="60"
                label="行号">
              </el-table-column>
              <el-table-column
                prop="gradeCd"
                width="100"
                label="材质">
              </el-table-column>
              <el-table-column
                prop="specExternalNote"
                label="规格">
              </el-table-column>
              <el-table-column
                prop="workInstQty"
                width="60"
                align="right"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="tempMachineSpecCd"
                width="100"
                label="作业名称">
              </el-table-column>
              <el-table-column
                prop="showData"
                width="100"
                align="right"
                label="完成件数">
              </el-table-column>
              <el-table-column
                label="要求交期"
                align="right"
                width="120">
                <template slot-scope="scope">
                  {{$store.getters.getDate(scope.row.contDueDate, 2)}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产进度"
                width="260">
                <template slot-scope="scope">
                  <ul class="prog">
                    <li v-if="scope.row.cutStatus != null">
                      切断<br/>
                      <span :class="getClass(scope.row.cutStatus)"></span>
                    </li>
                    <li v-if="scope.row.machineStatus != null">
                      加工
                      <span :class="getClass(scope.row.machineStatus)"></span>
                    </li>
                    <li v-if="scope.row.grindingStatus != null">
                      研磨
                      <span :class="getClass(scope.row.grindingStatus)"></span>
                    </li>
                    <li v-if="scope.row.heatStatus != null">
                      热处理
                      <span :class="getClass(scope.row.heatStatus)"></span>
                    </li>
                    <li v-if="scope.row.deliveryStatus != null">
                      出货
                      <span :class="getClass(scope.row.deliveryStatus)"></span>
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="150">
                <template slot-scope="scope">
                  <img v-if="scope.row.remarkPic == 1" class="gaotie" src="../../../static/images/gaotie.jpg" alt="">
                  <img v-if="scope.row.remarkPic == 2" class="feiji" src="../../../static/images/feiji.jpg" alt="">
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <div class="total">
          <span>切断完成总件数：
            <!--{{cutEndTotal}}-->
            {{$store.getters.toThousand(JSON.stringify(cutEndTotal), 3)}}
          </span>
        </div>
        <drawEchart title="切断部机器负荷表" type="切断" :xAxis="cutEchart.cutCode" :oneData="cutEchart.cutCompletedCount" :twoData="cutEchart.cutCapacity"/>
        <!--<div class="page">-->
        <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="pageNum"-->
        <!--:page-size="10"-->
        <!--layout="prev, pager, next"-->
        <!--:total="total">-->
        <!--</el-pagination>-->
        <!--</div>-->
      </div>
      <div :style="{opacity: opacTwo}" class="carousel-item">

      </div>
    </div>
  </div>
</template>

<script>
import drawEchart from './lineEchart'
export default {
  name: 'doBusiness',
  props: ['changeNo'],
  data () {
    return {
      lists: [],
      opacOne: 1,
      opacTwo: 0,
      summaryData: {},
      setInterval: '',
      pageNum: 1,
      showItem: 1,
      nextPage: '',
      cutEndTotal: 0,
      total: 0,
      pages: 0,
      title: '切断部机器负荷表',
      cutEchart: {
        cutCode: [],
        cutCapacity: [],
        cutCompletedCount: []
      }
    }
  },
  mounted () {
    this.getCutData()
    this.getCutTable()
    this.getNext()
    this.setInterval = setInterval(() => {
      this.getCutData()
      this.getCutTable()
    }, 600000)
    // this.carousel()
  },
  beforeDestroy () {
    clearInterval(this.nextPage)
    clearInterval(this.setInterval)
  },
  methods: {
    // 获取分页数
    getPages (numb) {
      if (numb % 6 === 0) {
        this.pages = numb / 6
      } else {
        this.pages = parseInt(numb / 6) + 1
      }
    },
    // 每隔8秒跳下一页
    getNext () {
      let times = 1
      this.nextPage = setInterval(() => {
        if (times <= this.pages) {
          times++
          this.pageNum = times
          this.getCutTable()
        } else {
          clearInterval(this.nextPage)
          this.getNext()
        }
      }, 8000)
    },
    // 轮播
    carousel () {
      let b = setInterval(() => {
        this.toggleTable()
        this.toggleEchart()
        clearInterval(b)
        this.carousel()
      }, 10000)
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
    // 切断数据
    getCutTable () {
      this.http('/show/getShowCutDepartmentTable', {
        pageSize: 6,
        pageNum: this.pageNum
      }).then(resp => {
        // console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
          this.getPages(resp.data.total)
          this.lists = resp.data.list
        }
      })
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.getCutTable()
    },
    getClass (a) {
      if (a === 1) return 'red'
      if (a === 0) return 'blue'
      if (a === 2) return 'white'
    },
    // 切断图表数据
    getCutData () {
      this.http('/show/getCutShowList', {}).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.cutEndTotal = resp.data.totalCount
          this.cutEchart.cutCapacity = []
          this.cutEchart.cutCode = []
          this.cutEchart.cutCompletedCount = []
          resp.data.list.map(item => {
            this.cutEchart.cutCapacity.push(item.capacity)
            this.cutEchart.cutCode.push(item.code)
            this.cutEchart.cutCompletedCount.push(item.completedCount)
          })
        }
      })
      this.http('/show/getSummaryShowData', {}).then(resp => {
        // console.log(resp)
        if (resp.success) {
          this.summaryData = resp.data
        }
      })
    }
  },
  components: {
    drawEchart
  }
}
</script>

<style scoped>
.table {
  text-align: center;
  width: 100%;
}
.title {
  text-align: center;
  line-height: 20px;
  font-size: 30px;
  padding-left: 255px;
  padding-top: 30px;
}
.table td,.table th {
  padding: 6px 10px;
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
  .total {
    text-align: right;
    margin-top: 50px;
  }
  .total span {
    padding: 4px 20px;
    background: #0070c0;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
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
</style>
