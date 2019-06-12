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
            fontSize: 25
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
            fontSize: 17
          }
        },
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 17
            }
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 17
            }
          }
        },
        series: [
          {
            name: this.type,
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'red',
                    fontSize: 20
                  }
                }
              }
            },
            data: this.oneData
            // markLine: {
            //   itemStyle: {
            //     normal: {
            //       lineStyle: {
            //         color: '#ff0000 '
            //       }
            //     }
            //   },
            //   data: [
            //     [
            //       {
            //         name: '预警线',
            //         yAxis: 50,
            //         xAxis: 0
            //       },
            //       {
            //         yAxis: 50,
            //         xAxis: this.xAxis[this.xAxis.length - 1]
            //       }
            //     ]
            //   ]
            // }
          },
          {
            name: '标准',
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'red',
                    fontSize: 20
                  }
                }
              }
            },
            data: this.twoData
          }
        ],
        color: ['#5b9bd5', '#10dc40']
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
    height: 400px;
    overflow: hidden;
  }
</style>
