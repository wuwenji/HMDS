<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="送货单金额" class="left"></asideCommod>
      <amountDisplay class="right"></amountDisplay>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import amountDisplay from '../components/amountDisplay'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    amountDisplay
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
