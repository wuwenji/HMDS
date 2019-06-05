<template>
  <div class="container">
    <div class="position">
      所在的位置：盘点管理 -> <span>场所管理</span>
    </div>
    <div class="form" id="form-input">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="场所类型" prop="storageType">
          <el-select @change="typeChange" v-model="formData.storageType" placeholder="场所类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="地面" value="1"></el-option>
            <el-option label="货架" value="2"></el-option>
            <el-option label="特殊货架" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="货架编号" prop="id">
          <el-select v-model="formData.id" placeholder="货架编号">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" plain @click="addPlace">添加</el-button>
          <el-button type="success" plain @click="onSubmit(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 0"
        :data="listData.list"
        border
        height="calc(100% - 75px)">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="场所">
        </el-table-column>
        <el-table-column
          prop="materialCount"
          align="right"
          label="现有材料数量">
        </el-table-column>
        <el-table-column
          prop="materialWt"
          align="right"
          label="重量">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="140"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editPlace(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="removePlace(scope.$index, listData.list, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      width="400px"
      :title="elTitle"
      :visible.sync="elDialog">
      <addPlace v-if="elTitle == '添加场所'" />
      <editPlace v-if="elTitle == '场所修改'" :placeInfo="placeInfo" />
    </el-dialog>
  </div>
</template>

<script>
import addPlace from './addPlacer'
import editPlace from './editPlacer'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      elTitle: '添加场所',
      johnTab: 0,
      placeInfo: '',
      elDialog: false,
      multipleSelection: [],
      formData: {
        storageType: '',
        id: '',
        pageSize: 10,
        pageNum: 1,
        parentId: 0
      },
      options: [],
      listData: {}
    }
  },
  created () {
    this.getList(10, 1)
  },
  methods: {
    getList (pageSize, pageNum) {
      this.http('/tStorageLocation/list', {
        pageSize,
        pageNum,
        parentId: 0
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.listData = resp.data
        }
      })
    },
    onSubmit (pageSize, pageNum) {
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      this.http('/tStorageLocation/list', this.formData).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.listData = resp.data
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.onSubmit(this.pageSize, this.pageNum)
    },
    // 添加场所
    addPlace () {
      this.elTitle = '添加场所'
      this.elDialog = true
    },
    // 获取货架编号
    typeChange () {
      this.http('/tStorageLocation/find', {
        storageType: this.formData.storageType
      }).then(resp => {
        this.options = []
        if (resp.success) {
          resp.data.map(item => {
            this.options.push({
              label: item.name,
              value: item.id
            })
          })
        }
      })
    },
    editPlace (index, row) {
      this.elTitle = '场所修改'
      this.placeInfo = row
      this.elDialog = true
    },
    removePlace (index, row, id) {
      this.http('/tStorageLocation/deleteByPrimaryKey', id).then(resp => {
        if (resp.success) {
          row.splice(index, 1)
        }
      })
    }
  },
  computed: {
  },
  components: {
    addPlace,
    editPlace
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
    margin: 10px;
  }
  .data-list {
    margin: 10px;
  }
  .form-item {
    width:180px;
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
    height: calc(100% - 130px);
  }
</style>
