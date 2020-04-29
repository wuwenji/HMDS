<template>
  <div class="box">
    <template v-if="showType">
      <div class="echart-item" v-for="(item, index) in this.typeOneData" :key="'a' + index">
        <lineEchart type="1" :xAxis="item.name" :optionSeries="item.list"></lineEchart>
      </div>
    </template>
    <template v-else>
      <div class="echart-item" v-for="(item, index) in this.typeTwoData" :key="'b' + index">
        <lineEchart type="2" :xAxis="item.name" :optionSeries="item.list"></lineEchart>
      </div>
    </template>
  </div>
</template>

<script>
import lineEchart from '../lineEchart'
export default {
  components: {
    lineEchart
  },
  data () {
    return {
      showType: true,
      setInt: '',
      typeOneData: [],
      typeTwoData: []
    }
  },
  created () {
    this.getData1()
    this.getData2()
  },
  mounted () {
    this.setSetInterval()
  },
  beforeDestroy () {
    clearInterval(this.setInt)
  },
  methods: {
    getData2 () {
      this.http('/orderSeparate/timeColumnChart', {}).then(resp => {
        if (resp.success) {
          this.typeTwoData = []
          resp.data.map(item => {
            let obj = {
              name: item.equipmentCode,
              list: []
            }
            item.list.map((val, index) => {
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
              if (index === item.list.length - 1) {
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
                  data: [item.confirmTime.toFixed(2)]
                })
              }
            })

            this.typeTwoData.push(obj)
          })
        }
      })
    },
    setSetInterval () {
      this.setInt = setInterval(() => {
        this.getData1()
        this.getData2()
        this.showType = !this.showType
        clearInterval(this.setInt)
        this.setSetInterval()
      }, 300000)
    },
    getColor (number) {
      if (number === 1) return 'rgba(194, 53, 49, 1)'
      if (number === 2) return 'rgba(53, 131, 184, 1)'
      if (number === 3) return 'rgba(97, 160, 168, 1)'
      if (number === 4) return 'rgba(62, 91, 156, 1)'
    },
    getData1 () {
      this.http('/orderSeparate/receiptColumnChart', {}).then(resp => {
        if (resp.success) {
          this.typeOneData = []
          resp.data.map(item => {
            let obj = {
              name: item.equipmentCode,
              list: []
            }
            item.list.map(val => {
              obj.list.push({
                name: val.soNo + '-' + val.soLnNo,
                type: 'bar',
                stack: 'aa',
                itemStyle: {
                  barBorderColor: this.getColor(val.isUrgent),
                  color: this.getColor(val.isUrgent)
                },
                data: [8 + val.cutTime]
              })
            })
            this.typeOneData.push(obj)
          })
        } else {
          alert(resp.message)
        }
      })
    }
  },
  name: 'cutEchart'
}
</script>

<style scoped>
  .box {
    height: 1040px;
  }

  .echart-item {
    height: calc(50% - 40px);
    width: calc(14.2% - 40px);
    margin: 20px;
    float: left;
  }
</style>
