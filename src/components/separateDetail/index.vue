<template>
  <div class="container">
    <div class="position">
      所在的位置：分单管理 -> <span>分单详情</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="设备" prop="equipmentId">
          <!--<el-input v-model="formData.labelName" placeholder="标签内容"></el-input>-->
          <el-select v-model="formData.equipmentId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="(item, index) in equipments"
              :label="item.name"
              :key="index"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="日期" prop="separateDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formData.separateDate"></el-date-picker>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" plain @click="search(10, 1)">查询</el-button>
          <el-button type="success" plain @click="exportDialog = true">导出</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <b style="margin-left: 10px;">
        今日已分单： {{ separated }} 单，共计 {{ separateRow }} 行 {{ separateTotal }} 件。
        <!--<el-button-->
          <!--size="mini"-->
          <!--style="float: left;margin-right:10px;margin-left: 10px;"-->
          <!--type="primary"-->
          <!--@click="addUser">添加标签</el-button>-->
      </b>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="name"
          label="设备">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="totalCount"-->
          <!--label="分单总数">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="totalRows"
          label="分派行数">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="分派指示数量">
        </el-table-column>
        <el-table-column
          prop="incompleteRows"
          label="未完成行数">
        </el-table-column>
        <el-table-column
          prop="incompleteTime"
          label="未完成切削时间">
        </el-table-column>
        <el-table-column
          prop="confirmRows"
          label="已完成行数">
        </el-table-column>
        <el-table-column
          prop="incompleteCount"
          label="未完成件数">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="140"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editUser(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              type="text"
              @click="cutEchart(scope.$index, scope.row)">切断图表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      custom-class="john-dialog"
      :width="title === '设备分单详情' ? '1500px' : '800px'">
      <addUser v-if="title === '设备分单详情'" :list="listByEquipment"></addUser>
      <div class="echart-box" v-if="title === '切断图表'">
        <div class="echart-item">
          <lineEchart type="1" :xAxis="name" :optionSeries="echartDataOne.list"></lineEchart>
        </div>
        <div class="echart-item">
          <lineEchart type="2" :xAxis="name" :optionSeries="echartDataTwo.list"></lineEchart>
        </div>
      </div>
      <!--<edit v-if="title == '标签修改'" :editData="editData"></edit>-->
    </el-dialog>
    <el-dialog
      width="500px"
      class="export-form"
      title="导出"
      :visible.sync="exportDialog">
      <el-form label-width="80px">
        <div style="height: 10px;"></div>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="exoprt.startTime"
              value-format="timestamp"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col :span="2" class="line" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="exoprt.endTime"
              value-format="timestamp"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div style="margin-top: 20px; text-align: center; margin-right: 78px;">
            <el-button @click="exportExcel" type="primary">
              导出
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import addUser from './addUser'
import edit from './edit'
import lineEchart from '../lineEchart'
import { getExcel } from '../../http'

export default {
  name: 'index',
  data () {
    return {
      exportDialog: false,
      separated: 0,
      listByEquipment: [],
      separateRow: 0,
      total: 0,
      name: '',
      separateTotal: 0,
      dialog: false,
      echartDataOne: '',
      echartDataTwo: '',
      equipments: 0,
      logDialog: false,
      submitFlg: true,
      title: '设备分单详情',
      qrCodes: [],
      pageNum: 1,
      pageSize: 10,
      editData: '',
      exoprt: {
        startTime: '',
        endTime: ''
      },
      formData: {
        equipmentId: '',
        separateDate: ''
      },
      listData: []
    }
  },
  created () {
    this.search()
    this.getEquipments()
    this.sameDayStatistics()
  },
  methods: {
    // 导出
    exportExcel () {
      getExcel('/statistics/projectProgress', {
        ...this.exoprt,
        download: 1,
        department: 1
      }).then(res => {
        if (res.byteLength > 0) {
          const blob = new Blob([res])
          const fileName = '分单详情.xls'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        } else {
          alert('数据为0，请重新选择日期！')
        }
      })
    },
    // 获取分单统计
    sameDayStatistics () {
      this.http('/orderSeparate/sameDayStatistics', {}).then(resp => {
        if (resp.success) {
          this.separated = resp.data.totalSoNos
          this.separateRow = resp.data.totalRows
          this.separateTotal = resp.data.totalCount
        } else {
          alert(resp.message)
        }
      })
    },
    // 获取列表
    getEquipments () {
      this.http('/statistics/equipmentPerformanceStatistics', {
        department: '1',
        pageSize: 100
      }).then(resp => {
        if (resp.success) {
          this.equipments = resp.data.list
        } else {
          alert(resp.message)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.search(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.search(this.pageSize, this.pageNum)
    },
    addUser () {
      // this.title = '添加标签'
      this.submitFlg = true
      this.dialog = true
    },
    getDataOne (object) {
      let obj = {
        name: object.equipmentCode,
        list: []
      }
      object.map(val => {
        obj.list.push({
          name: val.soNo + '-' + val.soLnNo,
          type: 'bar',
          stack: 'aa',
          itemStyle: {
            barBorderColor: this.getColor(val.isUrgent),
            color: this.getColor(val.isUrgent)
          },
          data: [this.$store.state.nowHour + val.cutTime]
        })
      })
      this.echartDataOne = obj
    },
    getColor (number) {
      if (number === 1) return 'rgba(194, 53, 49, 1)'
      if (number === 2) return 'rgba(53, 131, 184, 1)'
      if (number === 3) return 'rgba(97, 160, 168, 1)'
      if (number === 4) return 'rgba(62, 91, 156, 1)'
    },
    getDataTwo (object) {
      let obj = {
        name: object.equipmentCode,
        list: []
      }
      object.list.map((val, index) => {
        let numb = val.totalTime.toFixed(2)
        obj.list.push({
          name: '1',
          type: 'bar',
          stack: 'aa',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0.3)'
          },
          label: {
            show: true,
            position: 'inside'
          },
          data: [numb]
        })
        obj.list.push({
          name: '闲',
          type: 'bar',
          stack: 'aa',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          data: [24 - numb]
        })
        if (index === object.list.length - 1) {
          obj.list.push({
            name: '1',
            type: 'bar',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0.3)',
              color: 'blue'
            },
            label: {
              show: true,
              position: 'inside'
            },
            stack: 'bb',
            data: [object.confirmTime.toFixed(2)]
          })
        }
      })
      this.echartDataTwo = obj
    },
    // 切断图表
    cutEchart (index, item) {
      this.title = '切断图表'
      this.name = item.name
      this.http('/orderSeparate/singleColumnChart/' + item.id).then(resp => {
        if (resp.success) {
          this.getDataOne(resp.data.soNoData.list)
          this.getDataTwo(resp.data.soNoTimeData)
          this.dialog = true
        }
      })
    },
    editUser (index, item) {
      // this.editData = item
      this.title = '设备分单详情'
      // this.dialog = true
      this.http('/orderSeparate/getSeparateOrderListByEquipmentId', {
        equipmentId: item.id,
        separateDate: this.formData.separateDate
      }).then(resp => {
        if (resp.success) {
          this.listByEquipment = resp.data
          this.dialog = true
        } else {
          alert(resp.message)
        }
      })
    },
    search () {
      this.http('/orderSeparate/listByEquipment', this.formData).then(resp => {
        if (resp.success) {
          this.total = resp.data.length
          this.listData = resp.data
        } else {
          alert(resp.message)
        }
      })
    }
  },
  components: {
    addUser,
    edit,
    lineEchart
  }
}
</script>

<style scoped>
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
  }
  .echart-item {
    width: 50%;
    height: 100%;
    float: left;
  }
  .echart-box {
    height: 400px;
  }
  .position span {
    color: #409EFF;
  }
  .form {
    border:1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  .data-list {
    margin: 10px;
  }
  .form-item {
    width:220px;
  }
  .btns {
    float: right;
  }
  .block {
    text-align: right;
    padding: 20px 10px;
    background: #efefef;
    border: 1px solid #ddd;
    border-top: none;
  }
  .data-list {
    height: calc(100% - 160px);
  }
  #printAl ul {
  }
  #printAl ul li {
    float: left;
    width: 300px;
    list-style: none;
    padding: 5px;
    margin: 2px 0;
  }
  #printAl ul li img {
    width: 250px;
  }
  .printContent p {
    font-size: 25px;
    line-height: 40px;
    margin-top: 0;
    text-align: left;
    margin-bottom: 20px;
  }
  .printContent p span {
    font-weight: bold;
    margin-right: 30px;
  }
</style>
