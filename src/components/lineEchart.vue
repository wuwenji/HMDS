<template>
  <div class="echart">
    <div class="box" ref="lineChart"></div>
    <div v-if="type === '1'" class="button">
      <input v-model="cutNumber" type="text"><button @click="changeCutName">确认</button>
    </div>
    <div v-else>
      <ul class="color-span">
        <li>
          <span style="background: #c23531"></span>
          理论完成用时
        </li>
        <li>
          <span style="background: blue"></span>
          实际完成用时
        </li>
      </ul>
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
  // props: ['optionSeries', 'type', 'xAxis'],
  props: {
    coefficient: {
      type: Number,
      default: 1
    },
    optionSeries: '',
    type: '',
    xAxis: ''
  },
  data () {
    return {
      cutNumber: 1,
      beforeData: [],
      yAxisOne: [
        {
          type: 'value',
          name: '时间',
          min: this.$store.state.nowHour < 8 ? this.$store.state.nowHour + 24 : this.$store.state.nowHour,
          max: 36,
          interval: 1,
          axisLabel: {
            formatter: (value) => {
              let val = value.toString()
              if (val > 24) {
                let h = val - 24
                if (h >= 10) {
                  return h + ':00'
                } else {
                  return '0' + h + ':00'
                }
              } else {
                val = val > 9 ? val : '0' + val
                return val + ':00'
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
    this.cutNumber = this.coefficient
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
          item.data[0] = (item.data[0] - this.$store.state.nowHour) * this.cutNumber + this.$store.state.nowHour
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
            if (this.type === '1') {
              let html = `${value.seriesName}<br/>需要: ${(value.value - this.$store.state.nowHour).toFixed(2)} 小时`
              return html
            }
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
    width: 100px;
    margin: 0 auto;
    padding-left: 10%;
  }

  .button input {
    width: 50px;
    height: 23px;
    border: 1px solid #3a8ee6;
    border-radius: 4px 0 0 4px;
    text-align: center;
    float: left;
  }

  .button button {
    height: 25px;
    background: #3a8ee6;
    color: #fff;
    border: none;
    float: left;
    border-radius: 0 4px 4px 0;
    padding: 0 10px;
    cursor: pointer;
  }

  .color-span span {
    display: block;
    width: 30px;
    height: 10px;
    margin: 0 auto;
  }

  .color-span {
    text-align: center;
    padding-left: 15%;
  }

  .color-span li {
    display: inline-block;
    list-style: none;
    margin: 0 5px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
</style>
