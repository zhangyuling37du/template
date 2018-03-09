<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="inputValue" placeholder="请输入商品编号,商品名称" style="width:220px;"></el-input>
        <el-button @click="search" size="small">
          <i class="ESLfont icon-sousuo" style="color:#116f7d"></i>
          <span style="color:#116f7d">搜索</span>
        </el-button>
      </div>
      <div>
        <el-select v-model="goodStatus" size="small" class="selectStatus" @change="tagBing">
          <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
          </el-option>
        </el-select>
      </div>
      <div style="padding-top:7px;">
        <!--  <img src="static/img/activities-query-11.png" />
        <img src="static/img/activities-query-13.png" /> -->
      </div>
      <div>
        <!--  <el-button size="small" @click="Binding">批量绑定</el-button> -->
        <el-button size="small" @click="deleteMore">批量删除</el-button>
        <el-button size="small" @click="addProducts()">
          <i class="ESLfont icon-iconfontzengjia"></i>
          <span>新增</span>
        </el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="com-table" border v-loading="loading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="no" width="30" label="序号">
      </el-table-column>
      <template v-for="item in  headlist" width="120">
        <el-table-column :prop="item.dbcolumnAttribute" :label="item.dbcolumnName" show-overflow-tooltip>
        </el-table-column>
      </template>
      <el-table-column prop="id" label="操作" fixed="right" width="60">
        <template slot-scope="scope">
          <span @click="histList(scope.row)" class="doIt"> <i class="ESLfont icon-xiangqing2 blue ic"></i></span>
          <span @click="onDelete(scope.row.id)" class="doIt"> <i class="ESLfont icon-delete red ic"></i></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { querykeyWordsList, queryColumnName, deleteGoodInfo, queryList, deleteGoodList } from 'api/commodity'
import { inUseFormat1 } from 'utils/validate'
let moment = require('moment');
export default {
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'YYYY年MM月DD日 HH:mm:ss';
      return moment(value).format(formatString);
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
  },
  data() {
    return {
      inputValue: '',
      options1: [{
        value1: 0,
        label1: '绑定状态'
      }, {
        value1: 1,
        label1: '已绑定'
      }, {
        value1: 2,
        label1: '未绑定'
      }],
      tableData: [],
      headlist: [],
      id: '',
      currentPage: 1,
      count: 0,
      dataType: '',
      goodStatus: 0,
      loading: true,
      deltemoreID: []
    }
  },
  mounted() {
    this.querykeyWordsList()
    this.queryColumnName()
  },
  watch: {
    currentPage(val) {
      this.querykeyWordsList()
    }
  },
  methods: {
    search(val) {
      this.querykeyWordsList()
    },
    tagBing(val) {
      this.querykeyWordsList()
    },
    queryColumnName() {
      queryColumnName().then(res => {
        console.log(res)
        this.headlist = res.data
      })
    },
    querykeyWordsList() {
      querykeyWordsList(this.inputValue, this.currentPage, this.$EslConfig.pageSize, this.goodStatus).then(res => {
        console.log(res)
        if (res.data) {
          this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            this.headlist.map(t => {
              if (t.dbcolumnDatatype == 3) {
                v[t.dbcolumnAttribute] = moment(v[t.dbcolumnAttribute] * 1).format('YYYY-MM-DD HH:mm:ss')
              }
            })
            v.goodStatus = inUseFormat1(v.goodStatus)
            return v;
          })
          this.count = res.count;
        }
      })
    },
    onDelete(id) {
      let ID = { 'id': id }
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodInfo(ID).then(res => {
          if (res.resultStatus) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.querykeyWordsList()
          }
        }).catch(err => err)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    handleSelectionChange(val) {
      let ERReviewID = [];
      val.filter(val => {
        ERReviewID.push(val.id)
      });
      this.deltemoreID = ERReviewID;
    },
    deleteMore() {
      if (this.deltemoreID.length) {
        this.$confirm(('确认删除') + '?').then(_ => {
          deleteGoodList(this.deltemoreID).then(res => {
            this.querykeyWordsList()
            this.queryColumnName()
          }).catch(err => err);
        }).catch(_ => {});
      } else {
        this.$message({
          message: ('请先选择所要删除的项') + '！',
          type: 'warning'
        });
      }
    },
    addProducts(val) {
      this.$router.push({ name: "linkCommodityAdd" })
    },
    histList(row) {
      console.log(row)
      this.$router.push({ name: "commodityDetail", query: { goodCode: row.goodCode, id: row.id } })
    },
    Binding(val) {
      this.$router.push({ name: "commodityBinding" })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  }
}

</script>
<style type="less" scoped>
  .com-paint-head { display: flex; justify-content:space-between; } .selectStatus{ width:105px; margin-right:20px; } .doIt { cursor: pointer; } .ic{ font-size:24px; } .el-table__fixed, .el-table__fixed-right{ position: absolute; top: 0; left: 0; }
</style>
