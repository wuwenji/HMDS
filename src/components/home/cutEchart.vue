<template>
  <div class="box">
    <p style="text-align: right;">
      <template v-if="showType">
        <span class="color-span" style="background: red;"></span>急单，
        <span class="color-span" style="background: green;"></span>当天交期，
        <span class="color-span" style="background: blue;"></span>明天交期，
        <span class="color-span" style="background: #d4bc19;"></span>后天交期
      </template>
      <el-button type="primary" size="mini" style="margin-left: 20px;" @click="showType = !showType">切换</el-button>
    </p>
    <template v-if="showType">
      <div class="echart-item" v-for="(item, index) in this.typeOneData" :key="'a' + index">
        <lineEchart type="1" :id="item.id" :xAxis="item.name" :coefficient="item.coefficient" :optionSeries="item.list"></lineEchart>
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
                  position: 'inside',
                  textStyle: {
                    color: '#000000'
                  }
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
                    position: 'inside',
                    textStyle: {
                      color: '#d27512'
                    }
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
      if (number === 1) return 'red'
      if (number === 2) return 'green'
      if (number === 3) return 'blue'
      if (number === 4) return '#d4bc19'
    },
    getData1 () {
      this.http('/orderSeparate/receiptColumnChart', {}).then(resp => {
        if (resp.success) {
          // console.log('id', resp)
          this.typeOneData = []
          resp.data.map(item => {
            let obj = {
              name: item.equipmentCode,
              coefficient: item.coefficient,
              id: item.equipmentId,
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
                data: [this.$store.state.nowHour + val.cutTime]
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

  .color-span {
    width: 30px;
    height: 15px;
    display: inline-block;
    position: relative;
    top: 1px;
    margin-right: 5px;
  }
</style>
