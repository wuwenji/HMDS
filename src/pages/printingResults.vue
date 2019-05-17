<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="打印成绩书" class="left"></asideCommod>
      <printingResults class="right"></printingResults>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import printingResults from '../components/printingResults'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    printingResults
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
