<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="人员" class="left"></asideCommod>
      <personnel class="right"></personnel>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import personnel from '../components/personnel'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    personnel
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
