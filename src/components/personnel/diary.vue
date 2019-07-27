<template>
  <div>
    <div class="search">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="查询范围">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.date1" style="width: 150px;margin-right: 17px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.date2" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="作业员">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="submitForm">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <el-table
      height="530"
      border
      id="out-table"
      :data="list">
      <el-table-column
        label="序号"
        width="60"
        type="index">
      </el-table-column>
      <el-table-column
        label="部门">
        <template slot-scope="scope">
          {{getDepartment(scope.row.relieveType, 2)}}
        </template>
      </el-table-column>
      <el-table-column
        label="作业人员"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="解除时间">
        <template slot-scope="scope">
          {{$store.getters.getDate(scope.row.relieveTime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="relieveProcess"
        label="解除工序">
      </el-table-column>
      <el-table-column
        label="解除前"
        prop="date">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.middleList" :key="index">
            {{item.processName + '' + item.beforeValue}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="解除后">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.middleList" :key="index">
            {{item.processName + '' + item.afterValue}}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="changeSize"
        @current-change="changeNum"
        :page-size="pageSize"
        :current-page="pageNum"
        :page-sizes="[10, 50, 100, 500]"></el-pagination>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'diary',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      form: {
        date1: '',
        date2: '',
        userName: ''
      },
      list: []
    }
  },
  methods: {
    submitForm () {
      this.pageSize = 10
      this.pageNum = 1
      this.search()
    },
    getDepartment (mun) {
      if (mun === 1) return '切断'
      if (mun === 2) return '加工'
    },
    // 导出
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      var wbout = XLSX.write(wb, { bookType: 'xls', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout],
          { type: 'application/octet-stream' }), '解除日记.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 更改显示条数
    changeSize (val) {
      this.pageSize = parseInt(`${val}`)
      this.search()
    },
    changeNum (val) {
      this.pageNum = parseInt(`${val}`)
      this.search()
    },
    search () {
      this.http('/general/findRelieveList', {
        ...this.form,
        // pageSize: this.pageSize,
        // pageNum: this.pageNum
      }).then(resp => {
        if (resp.success) {
          console.log('解除', resp)
          this.list = resp.data.list
          this.total = resp.data.total
        }
      })
    }
  }
}
</script>

<style scoped>
  .page {
    margin: 20px 0 0 0;
    text-align: center;
  }
</style>
