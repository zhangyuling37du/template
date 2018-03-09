<template>
  <div class="com-paint com-paint-main">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack" class="goBack imgom">
          返回
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="main-box-left">
          <el-form ref="form" :model="form" label-width="80px" v-loading="loading" element-loading-text="拼命加载中">
            <el-form-item label="基站编号:" prop="baseId">
              <span>{{form.baseId | IntoSystemBs}}</span>
            </el-form-item>
            <el-form-item label="连接状态:" prop="baseStatus">
              <span>{{form.baseStatus | inUseFormat6 }}</span>
            </el-form-item>
            <el-form-item label="绑定标签:" prop="tagNum">
              <span>{{form.tagNum}}个</span>
              <el-button class='el-green' @click="bingMore">查看更多</el-button>
            </el-form-item>
            <el-form-item label="货架位置:" prop="baseLocation">
              <span>{{form.baseLocation}}</span>
            </el-form-item>
            <el-form-item label="服务器IP:" prop="baseIp">
              <span>{{form.baseIp}}</span>
            </el-form-item>
            <el-form-item label="网关:" prop="gateway">
              <span>{{form.gateway}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="main-box-right">
          <el-table class="com-table" :data="tableData" border v-if="tableData.length" v-loading="loading2" element-loading-text="拼命加载中">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="no" width="49" label="序号">
            </el-table-column>
            <el-table-column prop="tagId" label="标签编号">
              <template slot-scope="scope">
                <span>{{ scope.row.tagId |IntoSystem  }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tagBindstatus" show-overflow-tooltip label="绑定状态">
              <template slot-scope="scope">
                <span style="">{{ scope.row.tagBindstatus | inUseFormat1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tagWorkstatus" label="标签状态">
              <template slot-scope="scope">
                <span style="">{{ scope.row.tagWorkstatus | inUseFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="page1UpdateStatus" label="更新状态">
              <template slot-scope="scope">
                <span style="">{{ scope.row.page1UpdateStatus | inUseFormat2 }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import { BaseId, queryByTagBase } from 'api/device'
import { inUseFormat, inUseFormat1, inUseFormat2, IntoSystem,IntoSystemBs,inUseFormat6 } from 'utils/validate'
export default {
  filters: {
    inUseFormat: function(value) {
      return inUseFormat(value)
    },
    inUseFormat6: function(value) {
      return inUseFormat6(value)
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
    inUseFormat2: function(value) {
      return inUseFormat2(value)
    },
    IntoSystem: function(value) {
      return IntoSystem(value)
    },
    IntoSystemBs: function(value) {
      return IntoSystemBs(value)
    },
  },
  data() {
    return {
      form: {
        baseId: '',
        baseStatus: '',
        baseIp: '',
        gateway: '',
        tagNum: '',
        baseLocation: '',
      },
      currentPage: 1,
      count: 0,
      tagBase: '',
      tableData: [],
      loading: true,
      loading2: true,
    }
  },
  mounted() {
    this.BaseId()
  },
  watch: {
    currentPage(val) {
      this.bingMore()
    },
  },
  methods: {
    goBack(val) {
      this.$router.go(-1)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    save() {},
    BaseId() {
      BaseId(this.$route.query.baseId).then(res => {
        console.log(res)
        if (res.resultStatus) {
          this.loading = false
          let { baseId, baseStatus, baseIp, gateway, tagNum, baseLocation } = res.data
          this.form = res.data
        }
      }).catch(err => err);
    },
    bingMore(val) {
      this.tagBase = this.$route.query.baseId
      // this.tagBase = this.tagBase.substr(6, 2) + this.tagBase.substr(4, 2) + this.tagBase.substr(2, 2) + this.tagBase.substr(0, 2);
      //   this.tagBase = (parseInt(this.tagBase, 16)) << 0
      queryByTagBase(this.tagBase, this.currentPage, this.$EslConfig.pageSize).then(res => {
        if (res.resultStatus) {
          this.loading2 = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
          this.count = res.count;
        }
      }).catch(err => err);
    },
  }
}

</script>
<style scoped lang="less">
// .main-box {
//   padding: 10px 0px;
// }
.com-paint-main {
  .el-form-item__label {
    text-align: right;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  label {
    margin-right: 10px;
  }
  span {
    color: #333;
    font-size: 13px;
  }
}

.main-box {
  padding: 20px 0px;
  display: flex;
  &-left {
    flex: 3;
  }
  &-right {
    flex: 7;
    padding: 0px 20px;
  }
}

label {
  color: #9c9c9c;
}

</style>
