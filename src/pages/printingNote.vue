<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="打印送货单" class="left"></asideCommod>
      <printingNote class="right"></printingNote>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import printingNote from '../components/printingNote'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    printingNote
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
