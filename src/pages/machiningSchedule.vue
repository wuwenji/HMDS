<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="切断/切断&加工" class="left"></asideCommod>
      <machiningSchedule class="right"></machiningSchedule>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import machiningSchedule from '../components/machiningSchedule'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    machiningSchedule
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
