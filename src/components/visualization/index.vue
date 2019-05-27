<template>
  <div class="container">
    <div class="tab">
      <ul>
        <li :class="{active: showCommd == 0}" @click="showCommd = 0">营业部</li>
        <li :class="{active: showCommd == 1}" @click="showCommd = 1">切断部</li>
        <li :class="{active: showCommd == 2}" @click="showCommd = 2">加工部</li>
        <li :class="{active: showCommd == 3}" @click="showCommd = 3">热处理</li>
        <li :class="{active: showCommd == 4}" @click="showCommd = 4">生产管理</li>
      </ul>
    </div>
    <div style="margin: 0 10px;">
      <doBusiness v-if="showCommd == 0"/>
      <cutCommod v-if="showCommd == 1"/>
      <manufacture v-if="showCommd == 2"/>
      <heatTreatment v-if="showCommd == 3"/>
      <prodPage v-if="showCommd == 4"/>
    </div>
  </div>
</template>

<script>
import doBusiness from '../home/doBusiness'
import manufacture from '../home/manufacture'
import heatTreatment from '../home/heatTreatment'
import cutCommod from '../home/cut'
import prodPage from '../home/production'
export default {
  name: 'index',
  data () {
    return {
      showCommd: 0
    }
  },
  components: {
    doBusiness,
    manufacture,
    heatTreatment,
    cutCommod,
    prodPage
  }
}
</script>

<style scoped>
  * {
    font-size: 20px;
  }
  .tab {
    height: 60px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .tab ul {
    width: 770px;
    margin: 0 auto;
  }
  .tab ul li {
    float: left;
    list-style: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 45px;
    background: #7ebce8;
    /*background: -webkit-linear-gradient(#2f94dc, #0070c0);      !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(#2f94dc, #0070c0);              !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(#2f94dc, #0070c0);         !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(#2f94dc, #0070c0);*/
  }
  .tab ul li.active {
    background: #1869a2;
    /*background: -webkit-linear-gradient(#0070c0 , #2f94dc);      !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(#0070c0 , #2f94dc);              !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(#0070c0 , #2f94dc);         !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(#0070c0 , #2f94dc);*/
  }
  .tab ul li:first-child {
    border-radius: 4px 0 0 4px;
  }
  .tab ul li:last-child {
    border-radius: 0 4px 4px 0;
  }
</style>
