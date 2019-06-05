<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="电视播放" class="left"></asideCommod>
      <showTV class="right"></showTV>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import showTV from '../components/showTV'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    showTV
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
