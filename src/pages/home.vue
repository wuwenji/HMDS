<template>
  <div class="container">
    <headerCommod />
    <main>
      <asideCommod selet="首页" class="left"></asideCommod>
      <homeCommod class="right"></homeCommod>
    </main>
  </div>
</template>

<script>
import headerCommod from '../components/headerCommod'
import asideCommod from '../components/asideCommod'
import homeCommod from '../components/home'
export default {
  name: 'home',
  components: {
    headerCommod,
    asideCommod,
    homeCommod
  }
}
</script>

<style scoped>
  #banner {
    margin: 0 auto;
  }
  main {
    height: calc(100% - 71px);
  }
  .left {
    float: left;
    width: 200px;
    margin-right: 10px;
    height: 100%;
  }
  .right {
    width: calc(100% - 210px);
    float: left;
    overflow-y: auto;
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
