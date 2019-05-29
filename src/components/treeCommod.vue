<template>
    <div>
      <dl>
        <dt
          @click="asideFun(data.title)"
          :class="{active: selet == data.title, dt: true}">
          <img class="icon" :src="'../../static/images/' + data.icon + '.png'" alt="">
          <!--<span v-html="data.icon" style="font-size: 22px;" class="iconfont"></span>-->
          {{data.title}}
          <i v-if="data.children != undefined" :class="show? 'el-icon-caret-top': 'el-icon-caret-bottom'"></i>
        </dt>
        <el-collapse-transition>
          <dd v-show="show">
            <ol class="ol">
              <li
                @click="asideFun(item.title, 1, item.id)"
                :class="getClass(item, selet)"
                v-for="(item, key) in data.children"
                :key="key">
                {{item.title}}
              </li>
            </ol>
          </dd>
        </el-collapse-transition>
      </dl>
    </div>
</template>

<script>
export default {
  name: 'treeCommod',
  props: ['data', 'selet'],
  data: () => ({
    show: false
  }),
  created () {
    this.show = this.data.show
    // if (['订单打印', '历史订单', '送货单打印'].indexOf(this.selet) > -1) {
    //   this.show = true
    // }
  },
  methods: {
    getClass (item, selet) {
      if (this.selet === '打印送货单1') {
        console.log(item)
        if (item.id === 12) {
          return 'active'
        }
      } else if (this.selet === '打印送货单2') {
        if (item.id === 24) {
          return 'active'
        }
      } else if (selet === item.title) {
        return 'active'
      }
      // {active: selet == item.title}
    },
    asideFun (val, type = 2, num = 0) {
      if (this.data.children !== undefined && type === 2) {
        this.show = !this.show
      }
      if (type === 1 || this.data.children === undefined) {
        // this.$emit('update:selet', val)
        if (val === '首页') {
          this.$router.push('/')
        } else if (val === '打印订单') {
          this.$router.push('/orderPrint')
        } else if (val === '历史订单') {
          this.$router.push('/historyOrder')
        } else if (val === '打印送货单' && num === 12) {
          this.$router.push('/deliveryNote')
        } else if (val === '打印成绩书') {
          this.$router.push('/printingResults')
        } else if (val === '打印送货单' && num === 24) {
          this.$router.push('/printingNote')
        } else if (val === '切断/切断&加工') {
          this.$router.push('/machiningSchedule')
        } else if (val === '热处理进度') {
          this.$router.push('/heatTreatment')
        } else if (val === '外发订单管理') {
          this.$router.push('/waiFa')
        } else if (val === '材料管理') {
          this.$router.push('/inventory')
        } else if (val === '场所管理') {
          this.$router.push('/placeManage')
        } else if (val === '材料二维码') {
          this.$router.push('/materialQR')
        } else if (val === '设备二维码') {
          this.$router.push('/equipmentQR')
        } else if (val === '生产部门') {
          this.$router.push('/achievements')
        } else if (val === '设备') {
          this.$router.push('/equipment')
        } else if (val === '人员') {
          this.$router.push('/personnel')
        } else if (val === '可视化管理') {
          this.$router.push('/visualization')
        } else if (val === '账号设置') {
          this.$router.push('/accountSettings')
        } else if (val === '作业人员管理') {
          this.$router.push('/operationPersonnel')
        }
      }
    }
  }
}
</script>

<style scoped>
  .dt,.ol li {
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    position: relative;
    /*text-align: center;*/
    font-weight: bold;
    line-height: 40px;
    padding-left: 50px;
    background: url("../../static/images/menuLi.gif") no-repeat center center;
  }
  .dt i {
    /*float: right;*/
    /*margin-right: 7px;*/
    position: absolute;
    right: 10px;
    top: -1px;
    margin-top: 6%;
  }
  .dt span {
    position: absolute;
    left: 0px;
    top: 0px;
    margin-right: 7px;
    margin-left: 10px;
  }
  .ol li{
    /*padding-left: 34px;*/
    list-style: none;
  }
  .dt.active,.ol li.active {
    /*background: #003ca2;*/
    background: url("../../static/images/menuActive.gif") no-repeat center center;
    /*color: #1640c5;*/
    color: #fffc00;
  }
  .icon {
    width: 30px;
    position: absolute;
    left: 10px;
    top: 5px;
  }
</style>
