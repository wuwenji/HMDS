<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="自动选料" class="left"></asideCommod>
      <materialSelect class="right"></materialSelect>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import materialSelect from '../components/materialSelect'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    materialSelect
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
