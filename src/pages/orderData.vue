<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="接单数据" class="left"></asideCommod>
      <orderData class="right"></orderData>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import orderData from '../components/orderData'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    orderData
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
