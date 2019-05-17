<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="可视化管理" class="left"></asideCommod>
      <visualization class="right"></visualization>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import visualization from '../components/visualization'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    visualization
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
    overflow-y: auto;
  }
</style>
