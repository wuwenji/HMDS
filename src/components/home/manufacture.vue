<template>
  <div>
    <div class="carousel">
      <div :style="{opacity: opacOne}" class="carousel-item">
        <table class="mid-table" border="1" borderColor="#0070c0">
          <tr>
            <td>日期：</td>
            <!--<td colspan="3">{{$store.state.time.substring(0, 10) + ' ' + $store.state.time.substring(11)}}</td>-->
            <td>{{$store.state.date}}</td>
            <td >加工延迟：</td>
            <td class="john-right">
              {{$store.getters.toThousand(JSON.stringify(summaryData.machiningDelayCount), 3)}}
            </td>
          </tr>
          <tr>
            <td>接单总数：</td>
            <td class="john-right">
              <!--{{summaryData.machiningOrderCount}}-->
              {{$store.getters.toThousand(JSON.stringify(summaryData.machiningOrderCount), 3)}}
            </td>
            <td>加工中：</td>
            <td class="john-right">
              <!--{{summaryData.machiningCount}}-->
              {{$store.getters.toThousand(JSON.stringify(summaryData.machiningCount), 3)}}
            </td>
          </tr>
        </table>
        <div class="title">加工部未完成明细</div>
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
                align="right"
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
                prop="heatMillingRemarks"
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
          <span>加工完成总件数：{{$store.getters.toThousand(JSON.stringify(cutEndTotal), 3)}}</span>
        </div>
        <drawEchart title="加工部机器负荷" type="加工" :xAxis="macEchart.macCode" :oneData="macEchart.macCompletedCount" :twoData="macEchart.macCapacity"/>
        <!--<div class="page">-->
          <!--<el-pagination-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="pageNum"-->
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
  data () {
    return {
      summaryData: {},
      cutEndTotal: 0,
      pageSize: 6,
      opacOne: 1,
      setInterval: '',
      opacTwo: 0,
      nextPage: '',
      pageNum: 1,
      pages: 0,
      total: 0,
      lists: [],
      title: '切断部机器负荷表',
      macEchart: {
        macCode: [],
        macCapacity: [],
        macCompletedCount: []
      }
    }
  },
  mounted () {
    this.getMacData()
    this.getList()
    this.getNext()
    this.setInterval = setInterval(() => {
      this.getMacData()
      this.getList()
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
          this.getList()
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
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.getList()
    },
    getClass (a) {
      if (a === 1) return 'red'
      if (a === 0) return 'blue'
      if (a === 2) return 'white'
    },
    // 表格数据
    getList () {
      this.http('/show/getShowMachiningDepartmentTable', {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(resp => {
        console.log(resp)
        this.lists = resp.data.list
        this.total = resp.data.total
        this.getPages(resp.data.total)
      })
    },
    // 加工图表数据
    getMacData () {
      this.http('/show/getMachiningList', {}).then(resp => {
        if (resp.success) {
          this.cutEndTotal = resp.data.totalCount
          this.macEchart.macCode = []
          this.macEchart.macCapacity = []
          this.macEchart.macCompletedCount = []
          resp.data.list.map(item => {
            this.macEchart.macCapacity.push(item.capacity)
            this.macEchart.macCode.push(item.code)
            this.macEchart.macCompletedCount.push(item.completedCount)
          })
        }
      })
      this.http('/show/getSummaryShowData', {}).then(resp => {
        console.log(resp)
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
  padding-left: 375px;
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
