<template>
  <div class="container">
    <div class="login">
      <div class="login-title">
        <img src="../../static/images/logo.png" alt="">
        <h2>HMDS智能管理系统</h2>
      </div>
      <form class="login-form" action="">
        <p class="mesg">{{message}}</p>
        <p>
          <el-input size="small" v-model="user" placeholder="请输入账号"></el-input>
        </p>
        <p>
          <el-input type="password" size="small" v-model="password" placeholder="请输入密码"></el-input>
        </p>
        <div class="login-button">
          <div class="login-button-left">
            <el-checkbox-group v-model="remember">
              <el-checkbox label="记住密码" name="type"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="login-button-right">
            <el-button @click="submit(user, password)" type="warning">登录</el-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .login {
    width: 320px;
    height: 250px;
    position: relative;
    top: 200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px #666;
  }
  .login form {
    margin: 30px 15px;
  }
  .login form p {
    margin-bottom: 10px;
  }
  .login-title {
    height: 50px;
    border: 1px solid #72b3cc;
    line-height: 50px;
    background: #72b3cc;
    color: #fff;
    margin-bottom: 10px;
  }
  .login-title img {
    height: 40px;
    float: left;
    margin: 5px 10px 0 10px;
  }
  .login-button {
    margin-top: 20px;
  }
  .login-button-left {
    float: left;
    margin-top: 10px;
  }
  .login-button-right {
    float: right;
  }
  .login-title h1 {
    color: #fff;
    float: left;
  }
  .login-form {
    position: relative;
  }
  .mesg {
    position: absolute;
    color: red;
    font-weight: bold;
    z-index: 9999;
    top: -25px;
    text-align: center;
    width: 290px;
  }
</style>

<script>
let bgSrc = 'background:url(./static/images/bg.jpg) no-repeat center top'
export default {
  data () {
    return {
      user: '',
      password: '',
      remember: [],
      message: ''
    }
  },
  methods: {
    submit (user, passw) {
      this.http('/sysUser/login',
        {
          userAccount: user,
          userPassword: passw
        }).then(res => {
        if (res.success) {
          if (this.remember.length > 0) {
            localStorage.setItem('hmdsUser', this.user)
            localStorage.setItem('hmdsPass', this.password)
          } else {
            localStorage.removeItem('hmdsUser')
            localStorage.removeItem('hmdsPass')
          }
          localStorage.setItem('hmdsUsers', JSON.stringify(res.data))
          this.$router.push('/')
        } else {
          this.message = res.message
        }
      })
    },
    goUser () {
      let user = localStorage.getItem('hmdsUser')
      let password = localStorage.getItem('hmdsPass')
      if (user) {
        this.user = user
        this.password = password
        this.remember = ['记住密码']
      }
    }
  },
  created () {
    this.goUser()
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', bgSrc)
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
