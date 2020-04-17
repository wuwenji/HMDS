<template>
  <div>
    <el-table
      border
      :data="list">
      <el-table-column
        prop="soNo"
        width="100"
        label="接单号">
      </el-table-column>
      <el-table-column
        prop="soLnNo"
        label="行数">
      </el-table-column>
      <el-table-column
        prop="gradeCd"
        label="钢种">
      </el-table-column>
      <el-table-column
        prop="shape"
        label="形状">
      </el-table-column>
      <el-table-column
        prop="machineTolerance"
        width="120"
        label="客户要求尺寸">
      </el-table-column>
      <el-table-column
        prop="instSizeNote"
        width="150"
        label="指示尺寸">
      </el-table-column>
      <el-table-column
        prop="soQty"
        label="指示数量">
      </el-table-column>
      <el-table-column
        prop="cutTime"
        width="140"
        label="选料预计切削时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="完成状态">
      </el-table-column>
      <el-table-column
        prop="beforeTime"
        width="120"
        label="初始分单时间">
      </el-table-column>
      <el-table-column
        prop="beforeEquipmentCode"
        width="120"
        label="初始分单机器">
      </el-table-column>
      <el-table-column
        prop="separateUserName"
        width="120"
        label="最终分单人">
      </el-table-column>
      <el-table-column
        prop="separateEndTime"
        width="120"
        label="最终分单时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  props: ['list'],
  data () {
    return {
    }
  },
  created () {
    // console.log(JSON.parse(localStorage.getItem('hmdsUsers')).token)
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
