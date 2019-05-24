<template>
  <div>
    <div id="printAll" :style="{width:(type==1? '540px': '320px')}">
      <ul :class="type == 1 ? 'ul1': 'ul2'" style="margin-left: 25px;">
        <li v-for="(item, key) in qrUrls" :key="key">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
    <div class="cl"></div>
    <p style="text-align: center;margin: 20px 0;">
      <el-select v-model="type">
        <el-option label="150mm" :value="0"></el-option>
        <el-option label="300mm" :value="1"></el-option>
      </el-select>
      <el-button @click="printId" v-print="'#printAll'" type="primary">打印</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'printQR',
  props: ['qrCodes'],
  data () {
    return {
      qrUrls: [],
      type: 1,
      printIds: []
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
      this.printIds = []
      this.qrCodes.map(item => {
        this.qrUrls.push(
          this.$store.state.qrUrl + item.code + '&w=550&h=550'
        )
        this.printIds.push(
          item.id
        )
      })
    },
    // 记录打印次数
    printId () {
      let ids = this.printIds.join(',')
      this.http('/tMaterial/updatePrintCountByIds', {
        printCountIds: ids
      }).then(resp => {
        console.log(resp)
      })
    }
  }
}
</script>

<style scoped>
  #printAll {
  }
  #printAll .ul1 li {
    float: left;
    width: 154px;
    list-style: none;
    margin-left: 15px;
    margin-top: 10px;
  }
  #printAll .ul1 li img {
    width: 100%;
  }
  .ul2 {
    padding: 0px 10px 0px 10px;
    margin-left: 20px;
    margin-top: 2px;
  }
  .ul2 li {
    float: left;
    width: 70px;
    margin: 10px 9px 0 9px;
    /*margin-bottom: 10px;*/
    list-style: none;
    padding: 0;
  }
  .ul2 li img {
    width: 100%;
  }
</style>
