<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="材料二维码" class="left"></asideCommod>
      <materialQR class="right"></materialQR>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import materialQR from '../components/materialQR'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    materialQR
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
