<template>
  <div>
    <table border="1" class="table">
      <tr>
        <td>机器编码：</td>
        <td>{{newData.code}}</td>
        <td>生产厂家：</td>
        <td>{{newData.manufacturer}}</td>
        <td>设备名称：</td>
        <td>{{newData.name}}</td>
        <td>设备规格：</td>
        <td>{{newData.model}}</td>
      </tr>
      <tr>
        <td>购进时间：</td>
        <td>{{newData.buyingTime}}</td>
        <td>加工能力：</td>
        <td>{{newData.ability}}</td>
        <td>数量：</td>
        <td>1</td>
        <td>日生产能力：</td>
        <td>{{newData.capacity}}</td>
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
