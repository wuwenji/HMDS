<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="分单详情" class="left"></asideCommod>
      <separateDetail class="right"></separateDetail>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import separateDetail from '../components/separateDetail'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    separateDetail
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
