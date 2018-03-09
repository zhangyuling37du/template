<template>
  <div class="com-paint">
    <div class="com-paint-head">
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" width="49" label="序号">
        </el-table-column>
        <el-table-column prop="baseId" label="基站编号">
          <template slot-scope="scope">
            <span style="">{{ scope.row.baseId | IntoSystemBs }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baseStatus" label="连接状态">
          <template slot-scope="scope">
            <span style="">{{ scope.row.baseStatus | inUseFormat6 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baseIp" label="ip">
        </el-table-column>
        <el-table-column prop="gateway" label="网关">
        </el-table-column>
        <el-table-column prop="tagNum" show-overflow-tooltip label="绑定标签数量">
        </el-table-column>
        <el-table-column prop="baseLocation" label="货架位置">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span @click="deletList(scope.row)" class="doIt"> <i class="ESLfont icon-delete red"  ></i></span>
            <span @click="editList(scope.row)" class="doIt"> <i class="ESLfont icon-bianji4 blue" ></i></span>
            <span @click="histList(scope.row.baseId)" class="doIt"> <i class="ESLfont icon-xiangqing2 blue ic"></i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <EslRightBox ref="rightBox" :title="title">
      <el-form ref="editFrom" :model="editFrom" label-width="120px" :rules="rulesForm">
        <el-form-item label="基站编号" prop="baseId">
          <el-input v-model="editFrom.baseId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="连接状态" prop="baseStatus">
          <el-input v-model="editFrom.baseStatus" :disabled="true">{{ editFrom.baseStatus | inUseFormat6 }}</el-input>
        </el-form-item>
        <el-form-item label="ip" prop="baseIp">
          <el-input v-model="editFrom.baseIp" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="网关" prop="gateway">
          <el-input v-model="editFrom.gateway"></el-input>
        </el-form-item>
        <el-form-item label="绑定标签数量" prop="tagNum">
          <el-input v-model="editFrom.tagNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="货架位置" prop="baseLocation">
          <el-input v-model="editFrom.baseLocation"></el-input>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="submitBase('editFrom')">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
  </div>
</template>
<script>
import 'assets/public/css/device.css'
import { BaseQueryList, BaseDelete, BaseId, BaseUpdate } from 'api/device'
import { inUseFormat6, inUseFormat1, IntoSystem, IntoSystem10, IntoSystemBs } from 'utils/validate'
export default {
  watch: {
    currentPage(val) {
      this.BaseQueryList()
    }
  },
  filters: {
    inUseFormat6: function(value) {
      return inUseFormat6(value)
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
    IntoSystem: function(value) {
      return IntoSystem(value)
    },
    IntoSystem10: function(value) {
      return IntoSystem10(value)
    },
    IntoSystemBs: function(value) {
      return IntoSystemBs(value)
    },

  },
  data() {
    return {
      inputValue: '',
      options: [{
        value: '选项1',
        label: '状态'
      }, {
        value: '选项2',
        label: '更新中'
      }, {
        value: '选项3',
        label: '更新失败'
      }],
      options1: [{
        value1: '选项1',
        label1: '未绑定'
      }, {
        value1: '选项2',
        label1: '已绑定'
      }],
      value: '标签状态',
      value1: '绑定基站',
      tableData: [],
      id: '',
      currentPage: 1,
      count: 0,
      delete: [],
      title: '基站信息修改',
      editFrom: {
        baseId: '',
        baseStatus: '',
        baseIp: '',
        gateway: '',
        tagNum: '',
        baseLocation: ''
      },
      rulesForm: {

        baseIp: [{ required: true, message: "必须填写", trigger: 'blur' }],
        gateway: [{ required: true, message: "必须填写", trigger: 'blur' }],
        baseLocation: [{ required: true, message: "必须填写", trigger: 'blur' }],
      },
      loading: true,
    }
  },
  mounted() {
    this.BaseQueryList()
    // this.refeshed()
  },
  methods: {
    BaseQueryList() {
      BaseQueryList(this.currentPage, this.$EslConfig.pageSize).then(res => {
        console.log(res)
        if (res.data) {
          this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
          this.count = res.count;
        }

      })
    },
    histList(baseId) {
      this.$router.push({ name: "BSDetail", query: { baseId: baseId } })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //修改
    editList(val) {
      this.$refs.rightBox.open();
      this.editFrom = val
    },
    submitBase(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { baseId, gateway, baseLocation } = this.editFrom
          let data = {
            baseId: baseId,
            gateway: gateway,
            baseLocation: baseLocation
          }
          // data.baseId = IntoSystem10(data.baseId)
          BaseUpdate(data).then(res => {
            if (res.resultStatus) {
              this.$refs.rightBox.close();
              this.BaseQueryList()
            }
          }).catch(err => err);
        } else {
          return false;
        }
      })
    },
    //删除
    deletList(val) {
      this.delete.push(val.id)
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        configDelete(this.delete).then(res => {
          if (res.resultStatus) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.BaseQueryList()
          }
        }).catch(err => err)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
  }
}

</script>
<style scoped>


</style>
