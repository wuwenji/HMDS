<template>
  <div>
    <table class="mid-table" border="1" borderColor="#0070c0">
      <tr>
        <td>日期：</td>
        <td>2017/08/05</td>
        <td>时间：</td>
        <td>20： 30</td>
      </tr>
      <tr>
        <td>接单总数：</td>
        <td>30</td>
        <td>切断中：</td>
        <td>10</td>
      </tr>
    </table>
    <div class="title">切断部未完成明细</div>
    <template>
      <el-table
        :data="lists"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="soNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          label="接单时间">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="contKname"
          label="客户名">
        </el-table-column>
        <el-table-column
          prop="soLnNo"
          label="行号">
        </el-table-column>
        <el-table-column
          prop="gradeCd"
          label="材质">
        </el-table-column>
        <el-table-column
          prop="specExternalNote"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="workInstQty"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="machineSpecCd"
          label="作业名称">
        </el-table-column>
        <el-table-column
          prop="showData"
          label="完成件数">
        </el-table-column>
        <el-table-column
          label="要求交期">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate)}}
          </template>
        </el-table-column>
        <el-table-column
          label="生产进度"
          width="250">
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
          label="备注">
          <template slot-scope="scope">
            <img v-if="scope.row.remarkPic == 1" class="gaotie" src="../../../static/images/gaotie.jpg" alt="">
            <img v-if="scope.row.remarkPic == 2" class="feiji" src="../../../static/images/feiji.jpg" alt="">
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="10"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <div class="total">
      <span>切断完成总件数：20</span>
    </div>
    <drawEchart title="切断部机器负荷表" type="切断" :xAxis="cutEchart.cutCode" :oneData="cutEchart.cutCapacity" :twoData="cutEchart.cutCompletedCount"/>
  </div>
</template>

<script>
import drawEchart from './lineEchart'
export default {
  name: 'doBusiness',
  data () {
    return {
      lists: [],
      pageNum: 1,
      total: 0,
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
  },
  methods: {
    // 切断数据
    getCutTable () {
      this.http('/show/getShowCutDepartmentTable', {
        pageSize: 10,
        pageNum: this.pageNum
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
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
        // console.log(resp)
        if (resp.success) {
          this.cutEchart.cutCapacity = []
          this.cutEchart.cutCode = []
          this.cutEchart.cutCompletedCount = []
          resp.data.map(item => {
            this.cutEchart.cutCapacity.push(item.capacity)
            this.cutEchart.cutCode.push(item.code)
            this.cutEchart.cutCompletedCount.push(item.completedCount)
          })
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
  font-size: 24px;
  padding-left: 285px;
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
</style>
