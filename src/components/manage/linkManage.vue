<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="input" placeholder="请输入商品名称，标签号" style="width:179px;"></el-input>
        <el-button @click="search" size="small" class="appointment">
          <span style="color:#116f7d">搜索</span>
        </el-button>
      </div>
      <div>
        <el-form class="lf">
          <el-form-item class="lf">
            <el-date-picker v-model="beginDate" align="right" type="date" placeholder="活动开始时间" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <span class="lf" style="height:50px;line-height:50px; text-align:center;">~</span>
          <el-form-item class="lf">
            <el-date-picker v-model="endDate" align="right" type="date" placeholder="活动结束时间" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button size="small"  @click="addActive()">
         新增
        </el-button>
        <el-button size="small">
        删除
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border :style="styleObject">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" label="序号" width="49">
        </el-table-column>
        <el-table-column prop="id" label="活动编号">
        </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="活动名称">
        </el-table-column>
        <el-table-column prop="id" label="活动条件">
        </el-table-column>
        <el-table-column prop="id" label="活动优先级别">
        </el-table-column>
        <el-table-column prop="id" label="活动开始时间">
        </el-table-column>
        <el-table-column prop="id" label="活动结束时间">
        </el-table-column>
        <el-table-column prop="id" label="绑定标签数量">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span @click="histList(scope.row)"><img src="static/img/activities-query-03.jpg" /></span>
            <span @click="histList(scope.row)"><img src="static/img/activities-query-04.jpg"/></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>
<script>
export default {
  watch: {
    currentPage(val) {
      this.BaseQueryList()
    }
  },
  data() {
    return {
      input: '',
      styleObject: {
        cursor: 'pointer',
        width: '100%'
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      beginDate: '',
      endDate: '',
      tableData: [{ "id": 121 }],
      currentPage: 1,
      pageSize: 15,
      pageNumber: 5,
      count: 0
    }
  },
  methods: {
    search(val) {
      console.log(val)
    },
    histList(row) {
      this.$router.push({ name: "activeDetail" })
    },
    addActive() {
      this.$router.push({ name: "addActive" })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  }
}

</script>
<style lang="less">
.com-paint-head {
  display: flex;
  justify-content: space-between;
}

.el-form-item {
  margin-bottom: 0;
  margin-top: 7px;
}

</style>
