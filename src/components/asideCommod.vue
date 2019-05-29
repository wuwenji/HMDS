<template>
   <aside>
     <template v-for="(item, key) in data">
       <treeCommod
         :data="item"
         :key="key"
         :selet="selet"
       />
     </template>
   </aside>
</template>

<script>
import treeCommod from '../components/treeCommod'
export default {
  name: 'asideCommod',
  props: ['selet'],
  data () {
    return {
      menuLists: [
        {
          id: 2,
          title: '首页',
          icon: 'icon1'
        }, {
          id: 3,
          title: '接单管理',
          icon: 'icon2',
          show: false,
          children: [{
            id: 10,
            title: '打印订单'
          }, {
            id: 11,
            title: '历史订单'
          }, {
            id: 12,
            title: '打印送货单'
          }, {
            id: 22,
            title: '外发订单管理'
          }]
        }, {
          id: 4,
          title: '热处理管理',
          icon: 'icon3',
          show: false,
          children: [{
            id: 23,
            title: '打印成绩书'
          }, {
            id: 24,
            title: '打印送货单'
          }]
        }, {
          id: 5,
          title: '进度查询',
          icon: 'icon4',
          show: false,
          children: [{
            id: 25,
            title: '切断/切断&加工'
          }, {
            id: 26,
            title: '热处理进度'
          }]
        }, {
          id: 6,
          title: '盘点管理',
          icon: 'icon5',
          show: false,
          children: [{
            id: 61,
            title: '材料管理'
          }, {
            id: 62,
            title: '场所管理'
          }, {
            id: 63,
            title: '材料二维码'
          }, {
            id: 64,
            title: '设备二维码'
          }]
        }, {
          id: 7,
          title: '绩效管理',
          icon: 'icon6',
          show: false,
          children: [{
            id: 71,
            title: '生产部门'
          }, {
            id: 72,
            title: '人员'
          }, {
            id: 73,
            title: '设备'
          }]
        }, {
          id: 30,
          title: '可视化管理',
          icon: 'icon7'
        }, {
          id: 8,
          title: '设置管理',
          icon: 'icon8',
          show: false,
          children: [{
            id: 31,
            title: '账号设置'
          }, {
            id: 32,
            title: '作业人员管理'
          }]
        }],
      // data: []
      data: [
        {
          title: '首页',
          icon: 'icon1'
        },
        {
          title: '接单管理',
          icon: 'icon2',
          show: false,
          children: [
            {
              title: '打印订单'
            },
            {
              title: '历史订单'
            },
            {
              title: '打印送货单'
            },
            {
              title: '外发订单管理'
            }
          ]
        },
        {
          title: '热处理管理',
          icon: 'icon3',
          show: false,
          children: [
            {
              title: '打印成绩书'
            },
            {
              title: '打印送货单'
            }
          ]
        },
        {
          title: '进度查询',
          icon: 'icon4',
          show: false,
          children: [
            {
              title: '切断/切断&加工'
            },
            {
              title: '热处理进度'
            }
          ]
        },
        {
          title: '盘点管理',
          icon: 'icon5',
          show: false,
          children: [
            {
              title: '材料管理'
            },
            {
              title: '场所管理'
            },
            {
              title: '材料二维码'
            },
            {
              title: '设备二维码'
            }
          ]
        },
        {
          title: '绩效管理',
          icon: 'icon6',
          show: false,
          children: [
            {
              title: '生产部门'
            },
            {
              title: '人员'
            },
            {
              title: '设备'
            }
          ]
        },
        {
          title: '可视化管理',
          icon: 'icon7'
        },
        {
          title: '设置管理',
          icon: 'icon8',
          show: false,
          children: [
            {
              title: '账号设置'
            },
            {
              title: '作业人员管理'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getRole()
    this.changeData()
  },
  methods: {
    getRole () {
      console.log(this.$store.state.users.id)
      this.http('/tUserMenu/find', {
        sysUserId: this.$store.state.users.id
      }).then(resp => {
        let menus = []
        if (resp.success) {
          resp.data.map(item => {
            menus.push(item.sysMenuId)
          })
        }
        this.getL(menus.sort())
      })
    },
    getL (list) {
      let a1 = []
      let a2 = []
      this.menuLists.map(item => {
        for (let i = 0; i < list.length; i++) {
          if (item.id === list[i]) {
            a1.push(item)
          }
        }
      })

      a2 = a1.map(item => {
        if (item.children === undefined) {
          return item
        } else {
          let array = []
          for (let i = 0; i < list.length; i++) {
            item.children.map(val => {
              if (val.id === list[i]) {
                array.push(val)
              }
            })
          }
          if (array.length < 1) {
            delete item.children
          } else {
            item.children = array
          }
          return item
        }
      })
      this.data = a2
    },
    changeData () {
      this.data = this.data.map(resp => {
        if (resp.children !== undefined) {
          resp.children.map(resps => {
            if (this.selet === '打印送货单1') {
              console.log(resp.icon === 'icon2')
              if (resp.icon === 'icon2') {
                resp.show = true
              }
            } else if (this.selet === '打印送货单2') {
              if (resp.icon === 'icon3') {
                resp.show = true
              }
            } else if (resps.title === this.selet) {
              resp.show = true
            }
          })
        }
        return resp
      })
    }
  },
  components: {
    treeCommod
  }
}
</script>

<style scoped>
  aside {
    height: 100%;
    width: 200px;
    background: #419ee1;
  }
</style>
