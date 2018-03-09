<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="handsetAdd()">
          <i class="ESLfont icon-iconfontzengjia">新增</i>
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" width="49" label="序号">
        </el-table-column>
        <el-table-column prop="handsetId" label="手持机ID">
          <template slot-scope="scope">
            <span>{{scope.row.handsetId | handsetId}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="authorized" label="手持机状态">
          <template slot-scope="scope">
            <span>{{scope.row.authorized | authorization}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button size="small" class="el-green" @click='authorize(scope.row)'>
              <span v-if="scope.row.authorized==1">取消授权</span>
              <span v-else>&nbsp;&nbsp;&nbsp;授权&nbsp;&nbsp;&nbsp;</span>
            </el-button>
            <el-button @click="handsetDelete(scope.row)" size="small">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <EslRightBox ref="rightBox" :title="title">
      <el-form ref="addFrom" :model="addFrom" label-width="80px" :rules="rulesForm">
        <el-form-item label="手持机ID" prop="id">
          <el-input v-model="addFrom.handsetId"></el-input>
        </el-form-item>
        <el-form-item label="是否授权" prop="authorized">
          <el-select v-model="addFrom.authorized" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="submitHandset('addFrom')">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
  </div>
</template>
<script>
import 'assets/public/css/device.css'
import { handsetlist, handsetAdd, handsetAuthorized, handsetDelete } from 'api/device'
import { authorization } from 'utils/validate'
export default {
  watch: {
    currentPage(val) {
      this.handsetlist()
    }
  },
  filters: {
    authorization: function(value) {
      return authorization(value)
    },
    connectStatus: function(value) {
      return connectStatus(value)
    },
    handsetId: function(handsetId) {
      handsetId = (handsetId >= 0 ? handsetId : 0x100000000 + handsetId).toString(16)
      return handsetId.substr(6, 2) + handsetId.substr(4, 2) + handsetId.substr(2, 2) + handsetId.substr(0, 2);
    }
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      count: 0,
      delete: [],
      title: '新增手持机',
      addFrom: {
        handsetId: '',
        authorized: ''
      },
      rulesForm: {
        handsetId: [
          { required: true, message: "必须填写" },
          { type: "number", message: "必须为数字值" }
        ],
      },
      options: [{
        value: 1,
        label: '授权'
      }, {
        value: 0,
        label: '不授权'
      }],
      loading: true,
    }
  },
  mounted() {
    this.handsetlist()
  },
  methods: {
    handsetlist() {
      handsetlist(this.currentPage, this.$EslConfig.pageSize).then(res => {
        if (res.data) {
          this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
          this.count = res.count
        }

      })
    },
    //新增
    handsetAdd(val) {
      this.$refs.rightBox.open();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除
    handsetDelete(row) {
      this.delete.push(row.id)
      handsetDelete(this.delete).then(res => {
        console.log(res)
        if (res.resultStatus) {
          this.handsetlist()
        }
      })
    },
    //授权
    authorize(row) {
      if (row.authorized == 0) {
        row.authorized = 1
      } else {
        row.authorized = 0
      }
      let data = {
        handsetId: row.handsetId,
        authorized: row.authorized
      }
      handsetAuthorized(data).then(res => {
        if (res.resultStatus) {
          this.handsetlist()
        }
      })
    },
    submitHandset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { handsetId, authorized } = this.addFrom
          this.addFrom.handsetId = this.addFrom.handsetId.substr(6, 2) + this.addFrom.handsetId.substr(4, 2) + this.addFrom.handsetId.substr(2, 2) + this.addFrom.handsetId.substr(0, 2);
          this.addFrom.handsetId = (parseInt(this.addFrom.handsetId, 16)) << 0
          console.log(this.addFrom.handsetId)
          handsetAdd(this.addFrom).then(res => {
            console.log(res)
            if (res.resultStatus) {
              this.$refs.rightBox.close();
              this.handsetlist()
            }
          }).catch(err => err);
        }
      });
    }
  }
}

</script>
<style scoped>


</style>
