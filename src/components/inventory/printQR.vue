<template>
  <div>
    <div id="printAll" :style="{width:(type==1? '540px': '320px')}">
      <ul :class="type == 1 ? 'ul1': 'ul2'" style="margin-left: 25px;">
        <li v-for="(item, key) in qrUrls" :key="key">
          <div v-if="type == 1" class="img-box">
            <p style="font-size: 8px;height: 13px; text-align: center;white-space:nowrap;margin-left:2px;">
              {{item.caseNo}}-{{item.stockQty}}
            </p>
            <img :src="item.url" alt="">
            <span class="img-span">
              {{getRow(item.name)}}
              <!--{{item.name}}-->
            </span>
            <p style="font-size: 7px; text-align: center;white-space:nowrap;margin-left:2px;">{{item.size}}</p>
          </div>
          <img v-else :src="item.url" alt="">
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
          {
            url: this.$store.state.qrUrl + item.qrCode + '&w=550&h=550',
            size: item.stockSizeNote,
            name: item.gradeCdKey,
            caseNo: item.caseNo,
            stockQty: item.stockQty
          }
        )
        this.printIds.push(
          item.id
        )
      })
      console.log(this.qrUrls)
    },
    // 记录打印次数
    printId () {
      let ids = this.printIds.join(',')
      this.http('/tMaterial/updatePrintCountByIds', {
        printCountIds: ids
      }).then(resp => {
        console.log(resp)
      })
    },
    getRow (string) {
      if (string) {
        return string.split('').join(' ')
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
  #printAll {
  }
  .img-span {
    float: right;
    width: 7px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    height: 130px;
    font-size: 7px;
    line-height: 10px;
    margin-right: 10px;
    text-align: center;
  }
  #printAll .ul1 li {
    float: left;
    width: 154px;
    list-style: none;
    margin-left: 15px;
    margin-top: 10px;
  }
  #printAll .ul1 li img {
    width: 120px;
    margin-left: 10px;
  }
  .img-box {
    width: 154px;
    height: 154px;
    margin-bottom: 4px;
  }
  .ul2 {
    padding: 0px 10px 0px 10px;
    margin-left: 20px;
    /*margin-top: 2px;*/
  }
  .ul2 li {
    float: left;
    width: 70px;
    margin: 14px 9px 0 7px;
    /*margin-bottom: 10px;*/
    list-style: none;
    padding: 0;
  }
  .ul2 li img {
    width: 100%;
  }
</style>
