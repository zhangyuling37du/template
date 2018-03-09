<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="inputValue" placeholder="请输入标签编号" style="width:179px;"></el-input>
        <el-button @click="search" size="small">
          <i class="ESLfont icon-sousuo" style="color:#116f7d"></i>
          <span style="color:#116f7d">搜索</span>
        </el-button>
        <el-button class="el-green" @click="deleteMore">批量删除</el-button>
      </div>
      <div>
        <el-select v-model="bindStatus" style="width:135px;" @change="tagBing(bindStatus)">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="tagStatus" style="width:135px;" @change="tagBing(tagStatus)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div></div>
    </div>
    <el-table class="com-table" :data="tableData" border @selection-change="handleSelectionChange"
    v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="no" width="49" label="序号">
      </el-table-column>
      <el-table-column prop="tagId" label="标签编号">
        <template slot-scope="scope">
          <span>{{ scope.row.tagId | IntoSystem }}</span>
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
      <el-table-column prop="goodName" label="绑定商品">
      </el-table-column>
      <el-table-column prop="" label="电压">
      </el-table-column>
      <!--  <el-table-column prop="tagLocation" label="货架位置">
        </el-table-column> -->
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <!-- <span @click="search(scope.row)" class="doIt"><i class="ESLfont icon-bianji4 blue  ic"></i></span> -->
          <span @click="histList(scope.row.id)" class="doIt"> <i class="ESLfont icon-xiangqing2 blue ic"></i></span>
          <span @click="onDelete(scope.row.id)" class="doIt"> <i class="ESLfont icon-delete red ic"></i></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>
<script>
import 'assets/public/css/device.css'
import { queryList, deleteByTagIdList, deleteById, queryByTagStatus } from 'api/device'
import { inUseFormat, inUseFormat1, inUseFormat2, IntoSystem } from 'utils/validate'
export default {
  watch: {
    currentPage(val) {
      this.queryList()
    },
  },
  filters: {
    inUseFormat: function(value) {
      return inUseFormat(value)
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
  },
  data() {
    return {
      inputValue: '',
      options: [{
          value: 0,
          label: '标签状态'
        },
        {
          value: 1,
          label: '在线'
        }, {
          value: 2,
          label: '离线'
        }
      ],
      options1: [{
        value: 0,
        label: '绑定状态'
      }, {
        value: 1,
        label: '绑定'
      }, {
        value: 2,
        label: '未绑定'
      }],
      value: 2,
      tableData: [],
      currentPage: 1,
      count: 0,
      bindStatus: 0,
      tagStatus: 0,
      deltemoreID: [],
      loading:true,
    }
  },
  mounted() {
    this.queryList()
  },
  methods: {
    search(val) {
      this.queryList()
    },
    queryList() {
      this.tableData = []
      if (this.inputValue != '') {
        this.inputValue = this.inputValue.substr(6, 2) + this.inputValue.substr(4, 2) + this.inputValue.substr(2, 2) + this.inputValue.substr(0, 2);
        this.inputValue = (parseInt(this.inputValue, 16)) << 0
      }
      queryList(this.inputValue, this.currentPage, this.$EslConfig.pageSize, this.bindStatus, this.tagStatus, ).then(res => {
        console.log(res)
        if (res.resultStatus) {
           this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
          this.count = res.count;
          this.inputValue = ''
        }
      }).catch(err => err)
    },
    tagBing(val) {
      this.queryList()
    },
    tagState(val) {
      this.queryList()
    },
    addProducts(val) {
      this.$router.push({ name: "linkAdd" })
    },
    histList(id) {
      this.$router.push({ name: "tagDetail", query: { id: id } })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelectionChange(val) {
      let ERReviewID = [];
      val.filter(val => {
        ERReviewID.push(val.id)
      });
      this.deltemoreID = ERReviewID;
      console.log(this.deltemoreID)
    },
    deleteMore() {
      if (this.deltemoreID.length) {
        this.$confirm(('确认删除') + '?').then(_ => {
          deleteByTagIdList(this.deltemoreID).then(res => {
            this.queryList();
          }).catch(err => err);
        }).catch(_ => {});
      } else {
        this.$message({
          message: ('请先选择所要删除的项') + '！',
          type: 'warning'
        });
      }
    },
    onDelete(id) {
      let ID = { "id": id }
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(ID)
        deleteById(ID).then(res => {
          if (res.resultStatus) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryList()
          }
        }).catch(error => error)
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
