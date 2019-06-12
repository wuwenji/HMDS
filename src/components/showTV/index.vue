<template>
  <div class="container">
    <div class="position">
      所在的位置：设置管理 -> <span>电视播放</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="addEquipment">添加</el-button>
          <el-button type="success" plain @click="onSubmit">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(0)" :class="{active: johnTab == 0}">文字</li>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">图片</li>
        <li @click="tabClick(2)" :class="{active: johnTab == 2}">视频</li>
      </ul>
      <span @click="playBanner" class="play">播放</span>
    </div>
    <div class="data-list">
      <el-table
        :data="listData"
        v-if="johnTab == 0"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="name"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          width="150"
          label="添加日期">
        </el-table-column>
        <el-table-column
          label="发布"
          align="center"
          width="50">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="printQr(scope.$index, scope.row)">发</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
            @click="getDetail(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="removeList(scope.$index, scope.row.id, listData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="listData"
        v-if="johnTab == 1"
        border
        height="calc(100% - 75px)">
        <el-table-column
          prop="name"
          label="图片">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          width="150"
          label="添加日期">
        </el-table-column>
        <el-table-column
          label="发布"
          align="center"
          width="50">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="printQr(scope.$index, scope.row)">发</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="getDetail(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="removeList(scope.$index, scope.row.id, listData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-if="johnTab == 2"
        style="height: calc(100% - 75px);border: 1px solid #ddd;">
        <ul class="videos">
          <li>
            <video width="200" height="150" controls>
              <source :src="movieSrc" type="video/mp4">
            </video>
            <p>标题：这是一只小熊</p>
            <p>发布日期：2019-05-01 18:22</p>
            <div class="bnts">
              <div class="bnts-left">
                <a class="john-btn rel">发</a>
              </div>
              <div class="bnts-right">
                <a class="john-btn change">修改</a>
                <a class="john-btn del">删除</a>
              </div>
            </div>
          </li>
          <li>
            <video width="200" height="150" controls>
              <source :src="movieSrc" type="video/mp4">
            </video>
            <p>标题：这是一只小熊</p>
            <p>发布日期：2019-05-01 18:22</p>
            <div class="bnts">
              <div class="bnts-left">
                <a class="john-btn rel">发</a>
              </div>
              <div class="bnts-right">
                <a class="john-btn change">修改</a>
                <a class="john-btn del">删除</a>
              </div>
            </div>
          </li>
          <li>
            <video width="200" height="150" controls>
              <source :src="movieSrc" type="video/mp4">
            </video>
            <p>标题：这是一只小熊</p>
            <p>发布日期：2019-05-01 18:22</p>
            <div class="bnts">
              <div class="bnts-left">
                <a class="john-btn rel">发</a>
              </div>
              <div class="bnts-right">
                <a class="john-btn change">修改</a>
                <a class="john-btn del">删除</a>
              </div>
            </div>
          </li>
          <li>
            <video width="200" height="150" controls>
              <source :src="movieSrc" type="video/mp4">
            </video>
            <p>标题：这是一只小熊</p>
            <p>发布日期：2019-05-01 18:22</p>
            <div class="bnts">
              <div class="bnts-left">
                <a class="john-btn rel">发</a>
              </div>
              <div class="bnts-right">
                <a class="john-btn change">修改</a>
                <a class="john-btn del">删除</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      width="1000px"
      :title="dialogTitle"
      :visible.sync="elDialog">
      <addEquipment :type="johnTab" v-if="dialogTitle == '添加'" />
      <equipDetail :orderInfo="setInfo" v-if="dialogTitle == '修改'"/>
    </el-dialog>
    <div v-if="play" class="play_box">
      <playCommod height="1050px"/>
    </div>
  </div>
</template>

<script>
import addEquipment from './addEquipment'
import equipDetail from './equipDetail'
import playCommod from './playCommod'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      play: false,
      setInfo: {},
      movieSrc: '../../../static/images/movie.mp4',
      johnTab: 0,
      total: 0,
      dialogTitle: '添加',
      elDialog: false,
      multipleSelection: [],
      formData: {
        title: ''
      },
      listData: []
    }
  },
  created () {
    this.getList(10, 1)
  },
  mounted () {
    let that = this
    this.$nextTick(function () {
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          if (that.play) {
            that.play = false
          }
        }
      })
    })
  },
  methods: {
    // 获取列表
    getList (pageSize, pageNum) {
      this.http('/equipment/list', {
        pageSize,
        pageNum,
        type: this.formData.type
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 条件查询
    onSubmit () {
      console.log(this.formData)
      this.http('/equipment/list', this.formData).then(resp => {
        if (resp.success) {
          this.pageNum = 1
          this.pageSize = 10
          this.listData = resp.data.list
          this.total = resp.data.total
        }
      })
    },
    // 添加设备
    addEquipment () {
      this.dialogTitle = '添加'
      this.elDialog = true
    },
    // 更换板块
    tabClick (index) {
      this.johnTab = index
    },
    // 详情
    getDetail (index, row) {
      this.dialogTitle = '修改'
      this.elDialog = true
    },
    // 删除
    removeList (index, id, row) {
      this.http('/equipment/delete', id).then(resp => {
        if (resp.success) {
          row.splice(index, 1)
        }
      })
    },
    // 播放
    playBanner () {
      this.play = true
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.getList(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.getList(this.pageSize, this.pageNum)
    }
  },
  computed: {
  },
  components: {
    addEquipment,
    equipDetail,
    playCommod
  }
}
</script>

<style scoped>
  .john-tab {
    position: relative;
  }
  .john-tab b {
    margin-left: 10px;
  }
  .qr-content p {
    margin-top: 40px;
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
    margin: 10px;
  }
  .data-list {
    margin: 10px;
  }
  .btns {
    float: right;
  }
  .block {
    text-align: right;
    padding: 20px 10px;
    background: #efefef;
    border: 1px solid #ddd;
    border-top: none;
  }
  .data-list {
    height: calc(100% - 170px);
  }
  .printContent img {
    float: left;
  }
  .printContent div {
    float: left;
  }
  .printContent div p {
    font-size: 35px;
    margin-left: 20px;
    line-height: 80px;
    margin-top: 0;
    text-align: left;
    margin-bottom: 70px;
  }
  .printContent div p span {
    font-weight: bold;
    margin-right: 30px;
    float: left;
  }
  .bnts {
    height: 30px;
    margin-top: 10px;
  }
  .bnts-left {
    float: left;
  }
  .bnts-right {
    float: right;
  }
  .videos li {
    float: left;
    list-style: none;
    width: 200px;
    margin: 10px;
    color: #999;
  }
  .videos li p {
    font-size: 12px;
  }
  .john-btn {
    padding: 3px 7px;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  .rel {
    background: #419ee1;
    color: #fff;
    border: 1px solid #419ee1;
  }
  .del {
    background: orange;
    color: #fff;
    border: 1px solid orange;
  }
  .play {
    position: absolute;
    right: 20px;
    top: 2px;
    background: orange;
    color: #fff;
    padding: 2px 10px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
  }
  .play_box {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
  }
</style>
