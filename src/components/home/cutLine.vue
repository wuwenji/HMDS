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
  props: ['title', 'xAxis', 'oneData', 'stack', 'legend', 'color', 'position'],
  data () {
    return {
      dataOne: [],
      dataTwo: []
    }
  },
  mounted () {
    // console.log(this.oneData)
    // let arr = [20, 40, 15, 60, 7, 50]
    // this.getArray(arr)
    // this.getArray(this.oneData)
    // this.drawEchar()
  },
  methods: {
    // 数据分组
    getArray (art) {
      this.dataTwo = []
      this.dataOne = []
      for (let i = 0; i < art.length; i++) {
        if (i % 2 === 0) {
          this.dataTwo.push(art[i])
        } else {
          this.dataOne.push(art[i])
        }
      }
    },
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
          // show: false,
          y: '50px',
          data: this.legend,
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
            name: this.legend[0],
            type: 'bar',
            barGap: 0,
            stack: '0',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: this.position,
                  textStyle: {
                    color: '#000',
                    fontSize: 25
                  }
                }
              }
            },
            data: this.dataTwo
          },
          {
            name: this.legend[1],
            type: 'bar',
            stack: this.stack,
            barGap: 0,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: this.position,
                  textStyle: {
                    color: '#000',
                    fontSize: 25
                  }
                }
              }
            },
            data: this.dataOne
          }
        ],
        color: this.color
      })
    }
  },
  watch: {
    oneData () {
      this.getArray(this.oneData)
      this.drawEchar()
    }
  }
}
</script>

<style scoped>
  .box {
    height: 600px;
    overflow: hidden;
  }
</style>
