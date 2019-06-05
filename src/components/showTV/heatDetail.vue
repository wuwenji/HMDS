<template>
  <div>
    <table border="1" class="table">
      <tr>
        <td>本工厂编号：</td>
        <td>{{newData.code}}</td>
        <td>设备名称：</td>
        <td>{{newData.name}}</td>
        <td>型号规格：</td>
        <td>{{newData.model}}</td>
        <td>使用温度：</td>
        <td>{{newData.serviceTemperature}}</td>
      </tr>
      <tr>
        <td>处理能力KG：</td>
        <td>{{newData.ability}}</td>
        <td>炉内尺寸：</td>
        <td>{{newData.size1}}</td>
        <td>有效加热带：</td>
        <td>{{newData.effectiveRange}}</td>
        <td>功率KW：</td>
        <td>{{newData.kw}}</td>
      </tr>
      <tr>
        <td>温度均一性：</td>
        <td>{{newData.temperatureRange}}</td>
        <td>型式：</td>
        <td>{{newData.pattern}}</td>
        <td>起用日期：</td>
        <td>{{newData.buyingTime}}</td>
        <td>使用部门：</td>
        <td>{{getType(newData.type)}}</td>
      </tr>
      <tr>
        <td>用途：</td>
        <td colspan="3">{{newData.purpose}}</td>
        <td>制造方：</td>
        <td colspan="3">{{newData.manufacturer}}</td>
      </tr>
      <tr>
        <td>放置地点：</td>
        <td colspan="3">{{getType(newData.type)}}</td>
        <td>备注：</td>
        <td colspan="3">{{newData.remark}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['orderInfo'],
  data () {
    return {
      newData: ''
    }
  },
  created () {
    this.getData()
  },
  watch: {
    orderInfo () {
      this.getData()
    }
  },
  methods: {
    getType (a) {
      if (a === 1) return '切断部门'
      if (a === 2) return '加工部门'
      if (a === 3) return '热处理部门'
    },
    getData () {
      this.http('/equipment/detail', this.orderInfo.id).then(resp => {
        if (resp.success) {
          this.newData = resp.data
          console.log(resp)
        }
      })
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
}
.table td {
  padding: 10px 5px;
}
.table td:nth-child(odd) {
  width: 100px;
  background: #efefef;
}
</style>
