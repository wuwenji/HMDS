<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="外发订单管理" class="left"></asideCommod>
      <waiFa class="right"></waiFa>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import waiFa from '../components/waiFa'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    waiFa
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
