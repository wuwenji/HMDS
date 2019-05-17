<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="历史订单" class="left"></asideCommod>
      <historyOrder class="right"></historyOrder>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import historyOrder from '../components/historyOrder'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    historyOrder
  }
}
</script>

<style scoped>
  main {
    height: calc(100% - 71px);
  }
  .left {
    float: left;
    width: 200px;
    height: 100%;
  }
  .right {
    width: calc(100% - 200px);
    float: left;
    height: 100%;
  }
</style>
