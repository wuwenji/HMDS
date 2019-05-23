<template>
    <div class="box" ref="lineChart"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
              require('echarts/lib/chart/bar')
              require('echarts/lib/component/tooltip')
              require('echarts/lib/component/title')
export default {
  name: 'lineEchart',
  props: ['title', 'xAxis', 'oneData', 'twoData', 'type'],
  mounted () {
    this.drawEchar()
  },
  methods: {
    drawEchar () {
      let myChart = echarts.init(this.$refs.lineChart)
      myChart.setOption({
        title: {
          text: this.title,
          x: 'center',
          y: 'top',
          textStyle: {
            fontSize: 35
          }
        },
        tooltip: {
        },
        grid: {
          left: 90,
          right: 20,
          top: 100,
          bottom: 40
        },
        legend: {
          y: '50px',
          data: [this.type, '标准'],
          textStyle: {
            fontSize: 25
          }
        },
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 25
            }
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 25
            }
          }
        },
        series: [
          {
            name: this.type,
            type: 'bar',
            barGap: 0,
            data: this.oneData
          },
          {
            name: '标准',
            type: 'bar',
            barGap: 0,
            data: this.twoData
          }
        ],
        color: ['#5b9bd5', '#ed7d31']
      })
    }
  },
  watch: {
    oneData () {
      this.drawEchar()
    },
    twoData () {
      this.drawEchar()
    },
    xAxis () {
      this.drawEchar()
    }
  }
}
</script>

<style scoped>
  .box {
    height: 300px;
    overflow: hidden;
  }
</style>
