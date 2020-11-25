<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="特别事项关联表" class="left"></asideCommod>
      <signManage class="right"></signManage>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import signManage from '../components/specialMatters'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    signManage
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
