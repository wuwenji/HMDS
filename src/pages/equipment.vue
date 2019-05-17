<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="设备" class="left"></asideCommod>
      <equipment class="right"></equipment>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import equipment from '../components/equipment'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    equipment
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
