<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="关键词管理" class="left"></asideCommod>
      <keyManage class="right"></keyManage>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import keyManage from '../components/keyManage'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    keyManage
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
