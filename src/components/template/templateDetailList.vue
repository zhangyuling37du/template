<template>
  <div>
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack">
          <i class="ESLfont icon-fanhui"></i> 返回
        </el-button>
        <el-input v-model="inputValue" placeholder="请输入模板名称" size="small" style="width:179px;"></el-input>
        <el-button @click="search" size="small">
          <i class="ESLfont icon-sousuo" style="color:#116f7d"></i>
          <span style="color:#116f7d">搜索</span>
        </el-button>
        <el-button size="small" @click="addTemplate()">
          <i class="ESLfont icon-iconfontzengjia"></i>
          <span>新增</span>
        </el-button>
      </div>
    </div>
    <div class="template-search-right-content">
      <!-- template-search-li -->
      <div v-for="items in searchList" class="template-search-li">
        <div>
          <div class="template-search-img2">
            <div class="template-search-img">
              <img :src="items.templetUrl" alt="" />
              <div class="img-cont">
                <img src="static/img/template-search-02.png" alt="" @click="tepAmend(items)" />
                <img src="static/img/template-search-03.png" alt="" @click="tepdelte(items)" />
              </div>
            </div>
          </div>
          <div>
            <p>模板名称:{{items.templetName}}</p>
            <p>关联标签:{{items.tagNum}} 个</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { queryTagType, queryTempletPicList, deleteTemplet, queryTempletInfo } from 'api/template'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      inputValue: '',
      currentPage: 1,
      pageSize: 6,
      count: 0,
      searchList: [],
      templateImgUrl: '',
      parameter: '',
    }
  },
  watch: {
    currentPage(val) {
      this.queryTempletPicList()
    }
  },
  computed: {
    ...mapGetters([
      "baseUrl",
      'scrType'
    ])
  },
  mounted() {
    this.parameter = JSON.parse(this.scrType)
    console.log(this.$route.query)
    this.tagTypeId = this.$route.query.tagTypeId
    this.scrTypeId = this.$route.query.scrTypeId
    this.queryTempletPicList()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    addTemplate(val) {
      this.$router.push({ name: 'templateAdd' });
      let x = JSON.stringify(this.parameter);
      this.$store.commit("SET_TEMSCRTYPE", x);
    },
    search() {
      this.queryTempletPicList()
    },
    goBack(val) {},
    queryTempletPicList() {
      queryTempletPicList(this.inputValue, this.currentPage, this.pageSize, this.tagTypeId, this.scrTypeId).then(res => {
        console.log(res)
        this.searchList = res.data
        let a = res.data
        let i = 0;
        for (i in a) {
          a[i].templetUrl = `${this.baseUrl}` + '/templet/' + a[i].templetUrl

        }
        this.count = res.count;
      })
    },
    //修改
    tepAmend(val) {
      let templetId = {
        templetId: val.templetId
      }
      queryTempletInfo(templetId).then(res => {
        this.$router.push({ name: 'templateAmend', query: { id: val.templetId } })
      }).catch(error => error)
    },
    tepdelte(val) {
      let templetId = {
        templetId: val.templetId
      }
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTemplet(templetId).then(res => {
          if (res.resultStatus) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryTempletPicList()
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
<style scoped lang='less'>
.com-paint-head {
  display: flex;
  justify-content: space-between;
}

.template-search-right {
  &-content {
    border-bottom: 1px solid #c9c9c9;
    .template-search-li {
      display: flex;
      float: left;
      margin-right: 30px;
      margin-bottom: 30px;
      position: relative;
      p {
        font-size: 12px;
        color: #555;
        padding-left: 10px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}

.template-search-li .template-search-img {
  margin: 15px 0px 15px 0px;
  /*border: 10px solid #ffffff;*/
  border-bottom: 8px solid #ffffff;
  border-top: 10px solid #ffffff;
  border-right: 10px solid #ffffff;
  border-left: 10px solid #ffffff;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 1px 2px 3px #5d5d5d;
  -moz-box-shadow: 1px 2px 3px #5d5d5d;
  box-shadow: 1px 2px 3px #5d5d5d;
  background-color: #ffffff;
  position: relative;
  img {
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    cursor: pointer;
  }
  .img-cont {
    position: absolute;
    right: 5px;
    top: 5px;
  }
}

.template-search-li .template-search-li-box {
  position: absolute;
  top: 20px;
  right: 15px;
  display: none;
  width: 61px;
  height: 32px;
}

</style>
