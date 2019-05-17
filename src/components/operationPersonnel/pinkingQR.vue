<template>
  <div>
    <div id="printContent">
      <img :src="imgUrl" alt="">
      <div class="printContent">
        <p><span>姓名：</span>{{editData.name}}</p>
        <p><span>部门：</span>{{getDepartment(editData.department)}}</p>
        <p><span>职务：</span>{{getPosition(editData.position)}}</p>
        <p><span>编号：</span>{{editData.workNumber}}</p>
      </div>
    </div>
    <p class="btn">
      <el-button v-print="'#printContent'" type="primary">打印</el-button>
    </p>
  </div>
</template>

<script>
// import QRCode from 'qrcode'
// import { getData } from '../../http'
export default {
  name: 'changePassword',
  props: ['editData'],
  data () {
    return {
      qrCode: '',
      imgUrl: ''
    }
  },
  created () {
    this.getImg()
    // getData('/tQrCode/getDataByQrCode', '987a3a8d47e443af859c62869054b142').then(resp => {
    //   console.log(1)
    //   console.log(resp)
    // })
  },
  watch: {
    editData () {
      this.getImg()
    }
  },
  methods: {
    getImg () {
      // console.log(this.editData.qrCode)
      // let ab = '用户ID：' + this.editData.id
      // QRCode.toDataURL(ab).then(url => {
      //   // console.log(url)
      //   this.imgUrl = url
      // })
      this.http('/user/bindQrCodeByUserId', {
        id: this.editData.id
      }).then(resp => {
        // console.log(resp)
        if (resp.success) {
          this.qrCode = resp.data.qrCode
          this.imgUrl = this.$store.state.qrUrl + resp.data.qrCode + '&w=250&h=250'
        }
      })
    },
    getDepartment (a) {
      if (a === 1) return '制造部'
      if (a === 2) return '热处理部'
      if (a === 3) return '加工Gr'
      if (a === 4) return '切断Gr'
      if (a === 5) return '生管Gr'
      if (a === 6) return '作业组'
      if (a === 7) return '仓库'
    },
    getPosition (a) {
      if (a === 1) return '副部长'
      if (a === 2) return '主任'
      if (a === 3) return '副主任'
      if (a === 4) return '科长'
      if (a === 5) return '技术工程师'
      if (a === 6) return '作业班长'
      if (a === 7) return '作业员工'
      if (a === 8) return '管员'
      if (a === 9) return '司机'
      if (a === 10) return '文员'
    }
  }
}
</script>

<style scoped>
#printContent {
  /*text-align: center;*/
  margin-bottom: 20px;
}
.btn {
  text-align: center;
}
.printContent p {
  font-size: 25px;
  line-height: 40px;
  margin-top: 0;
  text-align: left;
  margin-bottom: 20px;
}
.printContent p span {
  font-weight: bold;
  margin-right: 30px;
}
</style>
