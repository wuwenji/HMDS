<template>
  <div class="container">
    <div class="position">
      所在的位置：盘点管理 -> <span>材料二维码</span>
    </div>
    <div class="form" id="form-input">
      <h2>打印材料二维码</h2>
      <p>
        <el-form :inline="true">
          <el-form-item class="item" label="打印数量：">
            <el-input v-model="counts"></el-input>
          </el-form-item>
          <el-form-item class="item" label="打印规格：">
            <el-select v-model="type">
              <el-option label="150mm" :value="0"></el-option>
              <el-option label="300mm" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </p>
      <el-button @click="submitBtn" class="submitBtn" type="primary">打印</el-button>
    </div>
    <el-dialog
      :visible.sync="dialog"
      :width="type == 1 ? '610px': '360px'">
      <div class="printQr" :style="{width:(type==1? '540px': '320px')}">
        <ul :class="type == 1 ? 'ul1': 'ul2'">
          <li v-for="(item, key) in Qrs" :key="key">
            <img :src="$store.state.qrUrl + item + '&w=500&h=500'" alt="">
          </li>
        </ul>
      </div>
      <div class="cl"></div>
      <p style="text-align: center;margin-top: 20px;">
        <el-button v-print="'.printQr'" type="primary">确认打印</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      counts: 1,
      type: 1,
      dialog: false,
      Qrs: []
    }
  },
  methods: {
    submitBtn () {
      this.http('/tQrCode/createQrCodeByCount', this.counts).then(resp => {
        if (resp.success) {
          this.Qrs = resp.data
          this.dialog = true
        }
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .john-tab b {
    margin-left: 10px;
  }
  .position {
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
  }
  .position span {
    color: #409EFF;
  }
  .form {
    border:1px solid #ccc;
    padding: 10px;
    text-align: center;
    width: 450px;
    margin: 10px auto;
  }
  .item {
    width: 100%;
    margin-top: 20px;
  }
  .submitBtn {
    margin: 30px 0;
  }
  .printQr {
    /*width: 510px;*/
  }
  .printQr ul {
  }
  .ul1 {
    margin-left: 25px;
  }
  .ul1 li {
    float: left;
    width: 154px;
    list-style: none;
    margin-left: 15px;
    margin-top: 10px;
  }
  .ul1 li img {
    width: 100%;
  }
  .ul2 {
    padding: 0px 10px 0px 10px;
    margin-left: 20px;
    /*margin-top: 2px;*/
  }
  .ul2 li {
    float: left;
    width: 70px;
    margin: 10px 9px 0 9px;
    /*margin-bottom: 10px;*/
    list-style: none;
    padding: 0;
  }
  /*.ul2 li:nth-child(3n + 2) {*/
    /*margin-bottom: 0px;*/
  /*}*/
  /*.ul2 li + li + li + li {*/
    /*margin-top: 10px;*/
  /*}*/
  .ul2 li img {
    width: 100%;
  }
</style>
