<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="作业人员管理" class="left"></asideCommod>
      <operationPersonnel class="right"></operationPersonnel>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import operationPersonnel from '../components/operationPersonnel'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    operationPersonnel
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
