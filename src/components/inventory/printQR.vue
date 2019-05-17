<template>
  <div>
    <div id="printAll">
      <ul>
        <li v-for="(item, key) in qrUrls" :key="key">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
    <div class="cl"></div>
    <p style="text-align: center;margin: 20px 0;">
      <el-button v-print="'#printAll'" type="primary">打印</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'printQR',
  props: ['qrCodes'],
  data () {
    return {
      qrUrls: []
    }
  },
  created () {
    this.getQrs()
  },
  watch: {
    qrCodes () {
      this.getQrs()
    }
  },
  methods: {
    getQrs () {
      this.qrUrls = []
      this.qrCodes.map(item => {
        this.qrUrls.push(
          this.$store.state.qrUrl + item + '&w=550&h=550'
        )
      })
    }
  }
}
</script>

<style scoped>
  #printAll ul {
  }
  #printAll ul li {
    float: left;
    width: 400px;
    list-style: none;
    padding: 5px;
    margin: 2px 0;
  }
  #printAll ul li img {
    width: 100%;
  }
</style>
