<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="材料管理" class="left"></asideCommod>
      <inventory class="right"></inventory>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import inventory from '../components/inventory'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    inventory
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
