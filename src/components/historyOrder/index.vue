<template>
  <div class="container">
    <div class="position">
      所在的位置：接单管理 -> <span>历史订单</span>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="接单号" prop="soNo">
          <el-input v-model="formData.soNo" placeholder="接单号"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="订购商" prop="contName">
          <el-input v-model="formData.contName" placeholder="订购商名称"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="发件人" prop="entryUserName">
          <el-input v-model="formData.entryUserName" placeholder="发件人"></el-input>
        </el-form-item>
        <div class="cl" style="height: 10px;"></div>
        <el-form-item class="form-item" label="接单时间">
          <el-col>
            <el-form-item prop="soDateStr">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.soDateStr" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="form-item" label="交期">
          <el-col>
            <el-form-item prop="contDueDateStr">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formData.contDueDateStr"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btns">
          <!--<el-button type="primary" plain>更新</el-button>-->
          <el-button type="success" plain @click="searchList(10, 1)">查询</el-button>
          <el-button type="info" plain @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="john-tab">
      <ul>
        <li @click="tabClick(1)" :class="{active: johnTab == 1}">整条</li>
        <li @click="tabClick(2)" :class="{active: johnTab == 2}">切断</li>
        <li @click="tabClick(3)" :class="{active: johnTab == 3}">切断&加工</li>
        <!--<li @click="tabClick(5)" :class="{active: johnTab == 5}">热处理</li>-->
        <li @click="tabClick(6)" :class="{active: johnTab == 6}">切断&加工&热处理</li>
      </ul>
    </div>
    <div class="data-list">
      <el-table
        v-show="johnTab == 1"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="内部交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.internalDeliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="指示书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '整条作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="最后打印时间"
          width="150">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.printDateStr)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="printingOne(scope.$index, scope.row, '整条')">打印整条作业指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="!(submitShow <= 15)"
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单标签导入"
          width="100">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              style="float: left;margin-right:10px;margin-left: 10px;"
              :action="$store.state.httpUrl + '/label/order/' + scope.row.soNo"
              :on-success="successUpload"
              :show-file-list="false">
              <el-button size="mini" type="primary">导入标签</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="订单标签打印"
          width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 1)">通用标签</el-button>
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 2)">指定标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 2"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="内部交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.internalDeliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成次数"
          align="right"
          width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '完成次数详情', 0, scope.row.confirmOrderList)"
              type="text"
              size="small">
              {{scope.row.confirmCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="指示书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="最后打印时间"
          width="150">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.printDateStr)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="!(submitShow <= 15)"
              size="mini"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单标签导入"
          width="100">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              style="float: left;margin-right:10px;margin-left: 10px;"
              :action="$store.state.httpUrl + '/label/order/' + scope.row.soNo"
              :on-success="successUpload"
              :show-file-list="false">
              <el-button size="mini" type="primary">导入标签</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="订单标签打印"
          width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 1)">通用标签</el-button>
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 2)">指定标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 3"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="内部交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.internalDeliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="tempMachineSpecCd"
          label="加工类型"
          width="130">
        </el-table-column>
        <el-table-column
          label="完成次数"
          align="right"
          width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '完成次数详情', 0, scope.row.confirmOrderList)"
              type="text"
              size="small">
              {{scope.row.confirmCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="切断书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="加工书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '加工作业指示书打印历史', 2)"
              type="text"
              size="small">
              {{scope.row.machineHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="最后打印时间"
          width="150">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.printDateStr)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.machineHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示票')">打印加工作业指示票</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="!(submitShow <= 15)"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单标签导入"
          width="100">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              style="float: left;margin-right:10px;margin-left: 10px;"
              :action="$store.state.httpUrl + '/label/order/' + scope.row.soNo"
              :on-success="successUpload"
              :show-file-list="false">
              <el-button size="mini" type="primary">导入标签</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="订单标签打印"
          width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 1)">通用标签</el-button>
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 2)">指定标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 5"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="内部交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.internalDeliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成次数"
          align="right"
          width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '完成次数详情', 0, scope.row.confirmOrderList)"
              type="text"
              size="small">
              {{scope.row.confirmCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="热处理书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '热处理作业指示书打印历史', 3)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="最后打印时间"
          width="150">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.printDateStr)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="!(submitShow <= 15)"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单标签导入"
          width="100">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              style="float: left;margin-right:10px;margin-left: 10px;"
              :action="$store.state.httpUrl + '/label/order/' + scope.row.soNo"
              :on-success="successUpload"
              :show-file-list="false">
              <el-button size="mini" type="primary">导入标签</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="订单标签打印"
          width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 1)">通用标签</el-button>
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 2)">指定标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="johnTab == 6"
        :data="listData"
        border
        height="calc(100% - 75px)"
        style="width: 100%;">
        <el-table-column
          prop="soNo"
          width="100px"
          label="接单号">
        </el-table-column>
        <el-table-column
          prop="contName"
          label="订购商名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="sUserName"
          label="营业员"
          width="130">
        </el-table-column>
        <el-table-column
          prop="entryUserName"
          label="发件人"
          width="130">
        </el-table-column>
        <el-table-column
          label="接单时间"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.soDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.contDueDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="内部交期"
          width="130">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.internalDeliveryDate, 2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="完成次数"
          align="right"
          width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '完成次数详情', 0, scope.row.confirmOrderList)"
              type="text"
              size="small">
              {{scope.row.confirmCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="切断书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '切断作业指示书打印历史', 1)"
              type="text"
              size="small">
              {{scope.row.cutHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="加工书打印次数"
          align="right"
          width="130">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '加工作业指示书打印历史', 2)"
              type="text"
              size="small">
              {{scope.row.machineHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="热处理书打印次数"
          align="right"
          width="140">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getHistory(scope.row.soNo, '热处理作业指示书打印历史', 3)"
              type="text"
              size="small">
              {{scope.row.heatHistoryCount}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="最后打印时间"
          width="150">
          <template slot-scope="scope">
            {{$store.getters.getDate(scope.row.printDateStr)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="370">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :class="scope.row.cutHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印切断作业指示书')">打印切断作业指示书</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.machineHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '打印加工作业指示票')">打印加工作业指示票</el-button>
            <el-button
              size="mini"
              type="text"
              :class="scope.row.heatHistoryCount > 0 ? 'gray' : 'aPrint'"
              @click="cutFun(scope.$index, scope.row, '生成热处理指示书')">生成热处理指示书</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="是否关联母材"
          width="120">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowMaterial">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="显示金额">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isShowAmount">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="!(submitShow <= 15)"
              type="primary"
              @click="confirmComp(scope.row, scope.$index, listData)">确认完成</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单标签导入"
          width="100">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              style="float: left;margin-right:10px;margin-left: 10px;"
              :action="$store.state.httpUrl + '/label/order/' + scope.row.soNo"
              :on-success="successUpload"
              :show-file-list="false">
              <el-button size="mini" type="primary">导入标签</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="订单标签打印"
          width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 1)">通用标签</el-button>
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 2)">指定标签</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="包装箱标签打印"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.appointLabel === 1"
              type="primary"
              @click="labelPrint(scope.row, scope.$index, 3)">包装箱标签</el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogOne"
      width="1290px"
      top="5vh"
      center>
      <printPage v-if="title == '打印切断作业指示书'" :orderInfo="info" :title="title"></printPage>
      <hotHandle v-if="title == '生成热处理指示书'" :orderInfo="info" :title="title"></hotHandle>
      <machining v-if="title == '打印加工作业指示票'" :orderInfo="info" :title="title"></machining>
      <wholePage v-if="title == '整条'" :orderInfo="info" :title="title"/>
    </el-dialog>
    <el-dialog
      :visible.sync="cnfirmDialog"
      :title="historyTitle"
      width="500px"
      center>
      <table border="1" class="table">
        <tr>
          <th>序号</th>
          <th>确认时间</th>
          <th>确认人</th>
        </tr>
        <tr v-for="(item, num) in cnfirmList" :key="'ccc' + num">
          <td>{{num + 1}}</td>
          <td>{{item.printDate}}</td>
          <td>{{item.userName}}</td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog
      :visible.sync="historyDialog"
      :title="historyTitle"
      width="500px"
      center>
        <table border="1" class="table">
          <tr>
            <th>序号</th>
            <th>打印时间</th>
            <th>操作人</th>
          </tr>
          <tr v-for="(item, num) in historyList" :key="num">
            <td>{{num + 1}}</td>
            <td>{{$store.getters.getTime(item.createDate)}}</td>
            <td>{{item.createUserName}}</td>
          </tr>
        </table>
    </el-dialog>
    <el-dialog
      title="打印标签"
      width="490px"
      :visible.sync="labelShow">
      <labelPrint
        v-if="labelShow"
        :type="labelType"
        :labelData="labelData"/>
    </el-dialog>
  </div>
</template>

<script>
import printPage from './printing'
import hotHandle from './hotHandle'
import machining from './machining'
import wholePage from './whole'
import labelPrint from '../labelPrint'
import { getHttp } from '../../http'
// import printPage from '../orderPrinting/printing_'
// import hotHandle from '../orderPrinting/hotHandle'
// import machining from '../orderPrinting/machining_'
// import wholePage from '../orderPrinting/whole'
export default {
  name: 'index',
  data () {
    return {
      pageNum: 1,
      labelShow: false,
      labelType: 1,
      cnfirmDialog: false,
      labelData: '123',
      pageSize: 10,
      submitShow: this.$store.state.users.position,
      total: 0,
      selectValue: '',
      title: '',
      historyDialog: false,
      historyTitle: '',
      info: {},
      dialogOne: false,
      johnTab: 1,
      formData: {
        soNo: '',
        soDateStr: '',
        contName: '',
        contDueDateStr: '',
        entryUserName: ''
      },
      listData: [],
      cnfirmList: [],
      historyList: [
        {
          time: '2018/12/16 20:11',
          name: 'John'
        }
      ]
    }
  },
  created () {
    this.getLists(1, 10, 1)

  },
  mounted () {
    // setTimeout(() => {
    //   this.createdBarCode('73071A1088897')
    // }, 2000)

  },
  computed: {

  },
  methods: {
    successUpload (resp) {
      let type = resp.success ? 'success' : 'error'
      this.$message({
        type,
        message: resp.message
      })
    },
    labelPrint (row, index, type) {
      // type: 1通用，2指定
      if (type === 1 || type === 3) {
        this.labelType = type
        getHttp('/label/getCommonOrderLabel/' + row.soNo).then(resp => {
          if (resp.success) {
            this.labelData = resp.data
            this.labelShow = true
          } else {
            this.$message({
              type: 'error',
              message: resp.message
            })
          }
        })
      } else if (type === 2) {
        this.labelType = 1
        this.http('/label/getOrderLabel', {
          soNo: row.soNo
        }).then(resp => {
          if (resp.success) {
            this.labelData = resp.data
            this.labelShow = true
          } else {
            this.$message({
              type: 'error',
              message: resp.message
            })
          }
        })
      }
    },
    // 确认完成
    confirmComp (row, index, data) {
      this.http('/tSalesOrder/confirmOrder', {
        soNo: row.soNo,
        isShowAmount: row.isShowAmount,
        isShowMaterial: row.isShowMaterial
      }).then(resp => {
        alert(resp.message)
        // data.splice(index, 1)
        // console.log(resp)
        if (resp.success) {
          data.splice(index, 1)
        }
      })
    },
    getLists (num, size, type) {
      let url = '/tSalesOrder/orderList'
      this.http(url, {
        pageNum: num,
        pageSize: size,
        isHistory: 1,
        workInstCd: type
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.total = resp.data.total
          this.listData = resp.data.list.filter(item => {
            item.johnValue = ''
            return item
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = parseInt(`${val}`)
      this.searchList(this.pageSize, this.pageNum)
    },
    handleCurrentChange (val) {
      this.pageNum = parseInt(`${val}`)
      this.searchList(this.pageSize, this.pageNum)
    },
    printingOne (index, row, title) {
      // this.http('/printHistory/list', {
      //   soNo: row.soNo
      // }).then(resp => {
      //   if (resp.success) {
      //     // console.log(resp.data)
      //     this.info = resp.data.list[0]
      //     this.title = title
      //     this.dialogOne = true
      //   }
      // })
      this.title = title
      this.dialogOne = true
      this.info = row
    },
    cutFun (index, row, title) {
      this.title = title
      this.dialogOne = true
      this.info = row
      // this.http('/printHistory/list', {
      //   soNo: row.soNo
      // }).then(resp => {
      //   if (resp.success) {
      //     console.log('654')
      //     console.log(resp)
      //     this.info = resp.data.list[0]
      //     this.title = title
      //     this.dialogOne = true
      //   }
      // })
    },
    searchList (pageSize, pageNum) {
      this.formData.workInstCd = this.johnTab
      this.formData.isHistory = 1
      this.formData.pageSize = pageSize
      this.formData.pageNum = pageNum
      let url = '/tSalesOrder/orderList'
      this.http(url, this.formData).then(resp => {
        if (resp.success) {
          this.pageSize = pageSize
          this.pageNum = pageNum
          this.total = resp.data.total
          this.listData = resp.data.list
        }
      })
    },
    tabClick (index) {
      this.johnTab = index
      this.pageSize = 10
      this.pageNum = 1
      this.getLists(1, 10, index)
    },
    getHistory (soNo, title, type, lists = []) {
      this.historyTitle = title
      if (type === 0) {
        this.cnfirmList = lists
        this.cnfirmDialog = true
      } else {
        this.http('/printHistory/list', {
          soNo,
          pageSize: 100,
          printType: type
        }).then(resp => {
          if (resp.success) {
            console.log(resp)
            this.historyList = resp.data.list
            this.historyDialog = true
          }
        })
      }
    }
  },
  components: {
    printPage,
    hotHandle,
    machining,
    wholePage,
    labelPrint
  }
}
</script>

<style scoped>
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
    width:220px;
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
    height: calc(100% - 220px);
  }
  .table {
    width: 100%;
  }
  .table td,.table th {
    text-align: center;
    padding: 4px;
  }
  .label-table td {
    padding: 6px 4px
  }
</style>
