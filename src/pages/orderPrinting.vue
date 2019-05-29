<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="打印订单" class="left"></asideCommod>
      <orderPrinting class="right"></orderPrinting>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import orderPrinting from '../components/orderPrinting'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    orderPrinting
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
