<template>
  <div
    :style="{height: height, position: 'relative'}">
    <ul class="ul" :style="{
      width: 3 * windowWidth + 'px',
      left: ulLeft + 'px'
      }">
      <li v-for="(item, index) in value" :key="index" :style="{width: windowWidth + 'px'}">
        <div v-if="item.type == 1" v-html="item.content"></div>
        <div v-if="item.type == 2">
          <img class="img" :src="item.content" alt="">
        </div>
        <div v-if="item.type == 3">
          <video class="video" width="1920" @ended="playEnding" height="1080" :autoplay="autoPlay" muted >
            <source :src="item.content" type="video/mp4">
          </video>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'playCommod',
  props: ['height'],
  data () {
    return {
      windowWidth: 0,
      ulLeft: 0,
      value: [
        {
          type: 1,
          content: '<h1>这是标题</h1><p>212356464</p>'
        },
        {
          type: 2,
          content: '../../../static/images/bg_.jpg'
        },
        {
          type: 3,
          content: '../../../static/images/movie.mp4'
        }
      ],
      autoPlay: false
    }
  },
  mounted () {
    this.windowWidth = document.body.clientWidth
    this.palyBanner()
  },
  methods: {

    // 播放
    palyBanner () {
      let setInt = setInterval(() => {
        if (this.value[0].type !== 3) {
          this.nextPage()
        }
        clearInterval(setInt)
      }, 5000)
    },
    // 播放完毕
    playEnding () {
      this.autoPlay = false
      this.nextPage()
      console.log('播放完毕！')
    },
    // 播放下一画面
    nextPage () {
      let count = this.windowWidth
      let setInt = setInterval(() => {
        if (this.ulLeft >= -count) {
          this.ulLeft -= 20
        } else {
          clearInterval(setInt)
          let one = this.value[0]
          this.value.shift()
          this.value.push(one)
          this.ulLeft = 0
          if (this.value[0].type === 3) {
            this.autoPlay = true
          }
          this.palyBanner()
        }
      }, 10)
    }
  }
}
</script>

<style scoped>
  .ul li {
    float: left;
  }
  .ul {
    position: relative;
    left: -0px
  }
  .img {
    width: 1920px;
  }
</style>
