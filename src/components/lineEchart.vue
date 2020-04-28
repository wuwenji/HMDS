<template>
  <div class="echart">
    <div class="box" ref="lineChart"></div>
    <div v-if="type === '1'" class="button">
      <input v-model="cutNumber" type="text"><button @click="changeCutName">确认</button>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'lineEchart',
  props: ['optionSeries', 'type', 'xAxis'],
  data () {
    return {
      cutNumber: 1,
      beforeData: [],
      yAxisOne: [
        {
          type: 'value',
          name: '时间',
          min: 8,
          max: 36,
          interval: 1,
          axisLabel: {
            formatter: (value) => {
              let val = value.toString()
              if (val > 24) {
                let h = val - 24
                if (h >= 10) {
                  return '明 ' + h + ':00'
                } else {
                  return '明 ' + '0' + h + ':00'
                }
              } else {
                val = val > 9 ? val : '0' + val
                return '今 ' + val + ':00'
              }
            }
          },
          splitLine: {
            show: true
          }
        }
      ],
      yAxisTwo: [
        {
          type: 'value',
          name: '每日工作时间',
          min: 0,
          max: 96,
          interval: 12,
          axisLabel: {
            formatter: (value) => {
              let val = value.toString()
              if (val === '0') {
                return this.getDate(0)
              } else if (val === '24') {
                return this.getDate(1)
              } else if (val === '48') {
                return this.getDate(2)
              } else if (val === '72') {
                return this.getDate(3)
              }
            }
          },
          splitLine: {
            show: true
          }
        }
      ]
    }
  },
  created () {
    this.beforeData = JSON.parse(JSON.stringify(this.optionSeries))
  },
  mounted () {
    this.drawEchart()
  },
  watch: {
    optionSeries () {
      this.beforeData = JSON.parse(JSON.stringify(this.optionSeries))
      this.drawEchart()
    }
  },
  methods: {
    changeCutName () {
      let newData = JSON.parse(JSON.stringify(this.optionSeries))
      newData.map(item => {
        if (item.data.length > 0) {
          item.data[0] = (item.data[0] - 8) * this.cutNumber + 8
        }
      })
      setTimeout(() => {
        this.beforeData = newData
        this.drawEchart()
      }, 0)
    },
    getDate (day) {
      var today = new Date()
      var lastOrNextDate = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(lastOrNextDate)
      var month = today.getMonth() + 1
      var date = today.getDate()
      month = month < 10 ? '0' + month : month
      date = date < 10 ? '0' + date : date
      return month + '月' + date + '日'
    },
    drawEchart () {
      let myChart = echarts.init(this.$refs.lineChart)
      myChart.setOption({
        title: {
          show: false
        },
        tooltip: {
          formatter: (value) => {
            let html = `${value[0].axisValue}<br/>`
            value.map(item => {
              html += `${item.seriesName}用时：${(item.data - 9).toFixed(1)}小时<br/>`
            })
            return html
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: [this.xAxis]
        },
        yAxis: this.type === '1' ? this.yAxisOne : this.yAxisTwo,
        series: this.beforeData
      })
    }
  }
}
</script>

<style scoped>
  .echart {
    width: 100%;
    height: 100%;
  }

  .box {
    width: 100%;
    height: calc(100% - 30px);
  }

  .button {
    height: 30px;
    width: 100%;
    text-align: center;
  }

  .button input {
    width: 50px;
    height: 23px;
    border: 1px solid #3a8ee6;
    position: relative;
    top: -1px;
    border-radius: 4px 0 0 4px;
    text-align: center;
  }

  .button button {
    height: 25px;
    background: #3a8ee6;
    color: #fff;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 0 10px;
    cursor: pointer;
  }
</style>
