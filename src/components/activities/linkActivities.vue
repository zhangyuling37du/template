<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="inputValue" placeholder="请输入活动编号" style="width:179px;"></el-input>
        <el-button @click="search" size="small">
          <i class="ESLfont icon-sousuo" style="color:#116f7d"></i>
          <span style="color:#116f7d">搜索</span>
        </el-button>
      </div>
      <div>
        <el-form class="lf">
          <el-form-item class="lf">
            <el-date-picker v-model="actionStart" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <span class="lf" style="height:50px;line-height:50px; text-align:center;">~</span>
          <el-form-item class="lf">
            <el-date-picker v-model="actionEnd" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button size="small" @click="addActive()">
          <i class="ESLfont icon-iconfontzengjia"></i>
          <span>新增</span>
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border :style="styleObject" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" label="序号" width="49">
        </el-table-column>
        <el-table-column prop="actionId" label="活动编号">
        </el-table-column>
        <el-table-column prop="actionName" show-overflow-tooltip label="活动名称">
        </el-table-column>
        <el-table-column prop="id" label="活动条件">
        </el-table-column>
        <el-table-column prop="actionDescription" label="活动描述">
        </el-table-column>
        <el-table-column prop="actionLevel" label="活动优先级别">
        </el-table-column>
        <el-table-column prop="actionStarttime" label="活动开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.actionStarttime  | moment}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actionEndtime" label="活动结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.actionEndtime  | moment}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="绑定标签数量">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span @click="histList(scope.row.actionId)" class="doIt"> <i class="ESLfont icon-xiangqing2 blue ic"></i></span>
            <span @click="deletList(scope.row.actionId)" class="doIt"> <i class="ESLfont icon-delete red ic"></i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { activeTest, deleteActionInfo } from 'api/active'
let moment = require('moment');
export default {
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'YYYY.MM.DD';
      return moment(value).format(formatString);
    }
  },
  watch: {
    currentPage(val) {
      this.BaseQueryList()
    },
    actionStart(val) {
      this.actionStart = moment(this.actionStart).format('YYYY-MM-DD HH:mm:ss');
    },
    actionEnd(val) {
      this.actionEnd = moment(this.actionEnd).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  data() {
    return {
      inputValue: '',
      styleObject: {
        cursor: 'pointer',
        width: '100%'
      },
      actionStart: '2001-1-1 00:00:01',
      actionEnd: '2100-1-1 00:00:01',
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      pageNumber: 5,
      count: 0,
      dataValue: '',
      value1: '',
      loading:true,
    }
  },
  mounted() {
      this.activeTest()
  },
  methods: {
    search(val) {
      this.activeTest()
    },
    histList(actionId) {
      this.$router.push({ name: "activeDetail", query: { actionId: actionId } })
    },
    addActive() {
      this.$router.push({ name: "activeAdd" })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    deletList(actionId) {
      let data = {
        actionId: actionId
      }
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActionInfo(data).then(res => {
          if (res.resultStatus) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.activeTest()
          }
        }).catch(error => error)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    editList() {},
    activeTest() {
      activeTest(this.inputValue, this.currentPage, this.$EslConfig.pageSize, this.actionStart, this.actionEnd).then(res => {
        console.log(res)
        if (res.data) {
          this.loading = false
          this.tableData = res.data
          res.data.map((v, index) => {
            v.no = index + 1
          })
        }
      }).catch(err => err)
    },
  }
}

</script>
<style lang="less" scoped>
.com-paint-head {
  display: flex;
  justify-content: space-between;
}

.el-form-item {
  margin-bottom: 0;
  margin-top: 7px;
}

.doIt {
  cursor: pointer;
}

.ic {
  font-size: 24px;
}

</style>
