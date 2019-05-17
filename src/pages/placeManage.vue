<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="场所管理" class="left"></asideCommod>
      <placeManage class="right"></placeManage>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import placeManage from '../components/placeManage'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    placeManage
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
