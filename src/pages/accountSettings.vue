<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="账号设置" class="left"></asideCommod>
      <accountSettings class="right"></accountSettings>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import accountSettings from '../components/accountSettings'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    accountSettings
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
