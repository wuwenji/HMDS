<template>
  <div>
    <el-tree
      ref="tree"
      :data="data2"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3, 4, 5, 6, 7, 8, 9]"
      :default-checked-keys="[]"
      :props="defaultProps">
    </el-tree>
    <div class="cl"></div>
    <p class="btns">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="resetForm">取消</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'jurisdiction',
  props: ['editData'],
  data () {
    return {
      expandedKeys: [],
      data2: [{
        id: 2,
        label: '首页'
      }, {
        id: 3,
        label: '接单管理',
        children: [{
          id: 0,
          label: '自动选料'
        }, {
          id: 10,
          label: '订单打印'
        }, {
          id: 11,
          label: '历史订单'
        }, {
          id: 12,
          label: '送货单打印'
        }, {
          id: 22,
          label: '外发订单管理'
        }]
      }, {
        id: 4,
        label: '热处理管理',
        children: [{
          id: 23,
          label: '打印成绩单'
        }, {
          id: 24,
          label: '打印送货单'
        }]
      }, {
        id: 5,
        label: '进度查询',
        children: [{
          id: 25,
          label: '切断/切断&加工'
        }, {
          id: 26,
          label: '热处理进度'
        }]
      }, {
        id: 6,
        label: '盘点管理',
        children: [{
          id: 61,
          label: '材料管理'
        }, {
          id: 62,
          label: '场所管理'
        }, {
          id: 63,
          label: '材料二维码'
        }, {
          id: 64,
          label: '设备二维码'
        }]
      }, {
        id: 7,
        label: '绩效管理',
        children: [{
          id: 71,
          label: '生产部门'
        }, {
          id: 72,
          label: '人员'
        }, {
          id: 73,
          label: '设备'
        }, {
          id: 74,
          label: '热处理'
        }, {
          id: 75,
          label: '接单数据'
        }]
      }, {
        id: 30,
        label: '可视化管理'
      }, {
        id: 8,
        label: '设置管理',
        children: [{
          id: 31,
          label: '账号设置'
        }, {
          id: 32,
          label: '作业人员管理'
        }, {
          id: 33,
          label: '电视播放'
        }]
      }, {
        id: 999,
        label: '初始化盘点(按钮)'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dynamicValidateForm: {
        id: '',
        role: ''
      }
    }
  },
  mounted () {
    this.updata()
  },
  watch: {
    editData () {
      this.updata()
    }
  },
  methods: {
    updata () {
      this.dynamicValidateForm.id = this.editData.id
      this.http('/tUserMenu/find', {
        sysUserId: this.dynamicValidateForm.id
      }).then(resp => {
        if (resp.success) {
          this.expandedKeys = []
          resp.data.map(item => {
            this.expandedKeys.push(item.sysMenuId)
          })
          this.$refs.tree.setCheckedKeys(this.expandedKeys)
        }
      })
    },
    submitForm () {
      let keys = this.$refs.tree.getCheckedKeys()
      this.http('/tUserMenu/saveUserMenu', {
        sysUserId: this.dynamicValidateForm.id,
        sysMenuList: keys
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.$message({
            message: '修改成功',
            duration: 1000,
            type: 'success'
          })
          setTimeout(() => {
            this.resetForm()
          }, 1000)
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    resetForm () {
      this.$parent.$parent.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.btns {
  text-align: center;
  margin: 20px 0;
}
</style>
