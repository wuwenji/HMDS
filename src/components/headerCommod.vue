<template>
  <header>
    <div class="logo">
      <img class="logo-img" src="../../static/images/logo.png" alt="">
      <h2><span>日立金属</span> HMDS智能管理系统 <span v-if="$store.state.httpUrl.indexOf(187) > 0" style="color: red;">（请注意！此网页为测试版本）</span></h2>
      <!--{{$baseJs.getAge(100)}}-->
      <!--<progress max="100" value="20"/>-->
    </div>
    <div class="login">
      <span>{{$store.state.nowTime}}</span>
      <span>{{$store.state.sweek}}</span>
      <!--<span><img src="../../static/images/setup.png" alt=""></span>-->
      <span><img src="../../static/images/user.png" alt=""></span>
      <span>{{$store.state.users.userName}}</span>
      <span style="cursor: pointer;" @click="getOut">退出</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerCommod',
  data () {
    return {
    }
  },
  methods: {
    getOut () {
      localStorage.removeItem('hmdsUsers')
      this.$router.push('/login')
    }
  },
  created () {
    this.$store.commit('getNew')
    setInterval(() => {
      this.$store.commit('getNew')
    }, 60000)
  }
}
</script>

<style scoped>
  header {
    height: 70px;
    border-bottom: 1px solid #999;
  }
  .logo-img {
    height: 50px;
    margin-top: 10px;
    float: left;
    margin-left: 30px;
  }
  .logo h2 {
    float: left;
    line-height: 70px;
    margin-left: 10px;
  }
  .logo h2 span {
    color: #000;
    margin-right: 20px;
  }
  .login {
    float: right;
    line-height: 70px;
    margin-right: 20px;
  }
  .login span {
    margin: 0 5px
  }
  .login img {
    width: 20px;
    position: relative;
    top: 4px;
  }
</style>
