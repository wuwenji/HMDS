<template>
  <div class="container">
    <!--<transition name="fade">-->
      <!--<keep-alive include="aaa,bbb">-->
        <!--<component :is="returnComt"></component>-->
      <!--</keep-alive>-->
    <!--</transition>-->
    <!--<ul>-->
      <!--<li @click="alive = 1">1</li>-->
      <!--<li @click="alive = 2">2</li>-->
      <!--<li @click="alive = 3">3</li>-->
    <!--</ul>-->
    <!--<div class="box">-->
      <!--<lineEchart type="2" xAxis="一号机" :optionSeries="datas1"></lineEchart>-->
      <!--<lineEchart type="1" xAxis="二号机" :optionSeries="data2"></lineEchart>-->
    <!--</div>-->
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
  .box2 {
    width: 100px;
    height: 300px;
    overflow-y: auto;
  }

  .box {
    width: 700px;
    height: 700px;
    background: #fff;
  }
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
import lineEchart from '../components/lineEchart'
let bgSrc = 'background:url(./static/images/bg.jpg) no-repeat center top'

export default {
  data () {
    return {
      alive: 1,
      user: '',
      password: '',
      remember: [],
      message: '',
      datas1: [],
      data2: []
    }
  },
  components: {
    lineEchart
  },
  computed: {
    returnComt () {
      if (this.alive === 1) return 'aaa'
      if (this.alive === 2) return 'bbb'
      if (this.alive === 3) return 'ccc'
    }
  },
  methods: {
    getData1 () {
      let data = [
        {
          date: '0306',
          usedTime: 14
        },
        {
          date: '0307',
          usedTime: 10
        },
        {
          date: '0308',
          usedTime: 20
        },
        {
          date: '0309',
          usedTime: 17
        },
        {
          date: '0306实际',
          usedTime: 10
        }
      ]
      let array = []
      data.map((item, index) => {
        if (index === data.length - 1) {
          array.push({
            name: '1',
            type: 'bar',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0.3)',
              color: 'rgba(200, 200, 200)'
            },
            stack: 'bb',
            data: [item.usedTime]
          })
        } else {
          array.push({
            name: '1',
            type: 'bar',
            stack: 'aa',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0.3)'
            },
            data: [item.usedTime]
          })
          array.push({
            name: '闲',
            type: 'bar',
            stack: 'aa',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            data: [24 - item.usedTime]
          })
        }
      })

      this.datas1 = array
    },
    getData2 () {
      let data = []
      let datas = [
        {
          name: '1号单',
          statTime: 9,
          endTime: 9.3,
          userTime: 0.3
        },
        {
          name: '2号单',
          statTime: 9.3,
          endTime: 10,
          userTime: 0.7
        },
        {
          name: '3号单',
          statTime: 10,
          endTime: 12,
          userTime: 2
        }
      ]
      datas.map(item => {
        data.push({
          name: item.name,
          type: 'bar',
          stack: 'aa',
          data: [9 + item.userTime]
        })
      })
      this.data2 = data
    },
    submit (user, passw) {
      this.http('/sysUser/login',
        {
          userAccount: user,
          userPassword: passw
        }).then(res => {
        if (res.success) {
          console.log('123')
          console.log(res)
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
    this.getData1()
    this.getData2()
  },
  mounted () {
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', bgSrc)
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
