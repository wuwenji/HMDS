<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="热处理" class="left"></asideCommod>
      <heatTeats class="right"></heatTeats>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import heatTeats from '../components/heat'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    heatTeats
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
