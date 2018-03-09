<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <el-menu mode="horizontal" :default-active="$route.path" router @select="handleSelect" :class="{active:isActive}">
        <el-menu-item index="/linkDevice/linkDeviceTag" class="stockName" >
          <i class="ESLfont icon-biaoqian"></i>
          <span>标签</span>
          <span style="margin-left:20px;">{{tagSumNum}}个</span>
        </el-menu-item>
        <el-menu-item index="/linkDevice/linkDeviceBS" class="stockName" >
          <i class="ESLfont icon-jizhan"></i>
          <span>基站</span>
          <span style="margin-left:20px;"> {{baseSumNum}}个</span>
        </el-menu-item>
        <el-menu-item index="/linkDevice/linkDeviceHandheld">
          <i class="ESLfont icon-shouji"></i>
          <span>手持机</span>
          <span style="margin-left:20px;">{{ handheldSumNum}}个</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { queryDevSumNum } from 'api/device'
export default {
  data() {
    return {
      isActive: false,
      tagSumNum: '',
      baseSumNum: '',
      handheldSumNum: '',
    }
  },
  mounted() {
      this.queryDevSumNum()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.isActive = !this.isActive
    },
    queryDevSumNum() {
      queryDevSumNum().then(res => {
        let { tagSumNum, baseSumNum, handheldSumNum } = res.data;
        this.tagSumNum = tagSumNum
        this.baseSumNum = baseSumNum
        this.handheldSumNum = handheldSumNum
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .el-menu {
  height: 36px;
  line-height: 36px;
  margin-top: 14px;
  background: #d3d3d3;
}

.el-menu--horizontal .el-menu-item {
  height: 36px;
  line-height: 36px; // width:140px;
  padding: 0px 15px;
  border-bottom: none;
}
.stockName{
  border-right:1px solid #fff;
}
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-menu-item.is-active{
  color:#fff;
  background: url('../../../static/img/template-added-17.jpg');
}
</style>