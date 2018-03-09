<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="inputValue" placeholder="查询用户" style="width:179px;"></el-input>
        <el-button @click="search" size="small" class="appointment">
          <span style="color:#116f7d">搜索</span>
        </el-button>
      </div>
      
      <div>
        <el-button size="small" class="addImg imgom" @click="addProducts()">新增
        </el-button>
        <el-button size="small" class="  delete-selected imgom">删除
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" width="49" label="序号">
        </el-table-column>
        <el-table-column prop="tagId" label="角色">
          <template slot-scope="scope">
            <span style="">{{ scope.row.tagId | formatter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tagBindstatus" show-overflow-tooltip label="用户名">
          <template slot-scope="scope">
            <span style="">{{ scope.row.tagBindstatus | inUseFormat1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tagWorkstatus" label="密码">
          <template slot-scope="scope">
            <span style="">{{ scope.row.tagWorkstatus | inUseFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tagBase" label="创建时间">
        </el-table-column>
        <el-table-column prop="goodName" label="更新时间">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span><img src="static/img/activities-query-03.jpg"  @click="histList(scope.row)"/></span>
            <span><img src="static/img/activities-query-04.jpg" @click="delete1(scope.row)"/></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { inUseFormat, inUseFormat1 } from 'utils/validate'
export default {
  watch: {
    currentPage(val) {
      this.queryList()
    }
  },
  filters: {
    inUseFormat: function(value) {
      return inUseFormat(value)
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
    formatter: function(value) {
      let tagID = parseInt(value)
      // console.log(tagID.toString(16))
      return tagID.toString(16);
    },
  },
  data() {
    return {
      inputValue: '',
      options: [{
        value: '选项1',
        label: '在线'
      }, {
        value: '选项2',
        label: '离线'
      }, {
        value: '选项3',
        label: '异常'
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
      tableData: [{ id: '1' }],
      currentPage: 1,
      pageSize: 15,
      pageNumber: 5,
      count: 0,

    }
  },
  mounted() {},
  methods: {
    search(val) {},
    addProducts(val) {
      this.$router.push({ name: "linkAdd" })
    },
    histList(row) {
      console.log(row)
      this.$router.push({ name: "authorityEdit", query: { id: row.id } })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  }
}

</script>
<style scoped>


</style>
