<template>
  <div class="container">
    <!--<div class="box" ref="lineChart"></div>-->
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
let bgSrc = 'background:url(./static/images/bg.jpg) no-repeat center top'

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

let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (value) => {
      let html = `${value[0].axisValue}<br/>`
      value.map(item => {
        html += `${item.seriesName}用时：${(item.data - 9).toFixed(1)}小时<br/>`
      })
      return html
    }
  },
  legend: {
    show: false,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['1号机', '2号机']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '时间',
      min: 9,
      max: 33,
      interval: 1,
      axisLabel: {
        formatter: (value) => {
          let val = value.toString()
          if (val > 24) {
            let h = val - 24
            return '明 ' + '0' + h + ':00'
          } else {
            val = val > 9 ? val : '0' + val
            return '今 ' + val + ':00'
          }
          // if (val.indexOf('.') > -1) {
          //   let array = val.split('.')
          //   let h = array[0] > 9 ? array[0] : '0' + array[0]
          //   return h + ':30'
          // } else {
          //   val = val > 9 ? val : '0' + val
          //   return '今 ' + val + ':00'
          // }
        }
      },
      splitLine: {
        show: true
      }
    }
  ],
  series: [
    {
      name: '1号单',
      type: 'bar',
      stack: 'aa',
      data: [9 + datas[0].userTime, 9 + datas[0].userTime]
    },
    {
      name: '2号单',
      type: 'bar',
      stack: 'aa',
      data: [9 + datas[1].userTime, 9 + datas[1].userTime]
    },
    {
      name: '3号单',
      type: 'bar',
      stack: 'aa',
      data: [9 + datas[2].userTime, 9 + datas[2].userTime]
    }
  ]
}

let echarts = require('echarts/lib/echarts')
              require('echarts/lib/chart/bar')
              require('echarts/lib/component/tooltip')
              require('echarts/lib/component/title')
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
    drawEchar () {
      let myChart = echarts.init(this.$refs.lineChart)
      myChart.setOption(option)
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
  },
  mounted () {
    // this.drawEchar()
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', bgSrc)
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
