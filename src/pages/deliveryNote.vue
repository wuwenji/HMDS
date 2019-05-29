<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="打印送货单1" class="left"></asideCommod>
      <deliveryNote class="right"></deliveryNote>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import deliveryNote from '../components/deliveryNote'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    deliveryNote
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
