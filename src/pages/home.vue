<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="首页" class="left"></asideCommod>
      <homeCommod class="right"></homeCommod>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import homeCommod from '../components/home'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    homeCommod
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
    margin-right: 10px;
    height: 100%;
  }
  .right {
    width: calc(100% - 210px);
    float: left;
    overflow-y: auto;
    height: 100%;
  }
</style>
