<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <el-menu mode="horizontal" :default-active="$route.path" router>
        <el-menu-item index="/linkSystem/linkProperty" class="stockName">
          <i class="ESLfont icon-shangpin"></i>
          <span>商品属性</span>
        </el-menu-item>
        <el-menu-item index="/linkSystem/linkAuthority" class="stockName">
          <i class="ESLfont icon-yonghu"></i>
          <span>用户权限</span>
        </el-menu-item>
        <el-menu-item index="/linkSystem/linkSynchronize" class="stockName">
          <i class="ESLfont icon-xinxi"></i>
          <span>数据同步</span>
        </el-menu-item>
        <el-menu-item index="/linkSystem/linkTest" class="stockName">
          <i class="ESLfont icon-ceshi"></i>
          <span>系统测试</span>
        </el-menu-item>
        <el-menu-item index="/linkSystem/linkNotice" class="stockName">
          <i class="ESLfont icon-tongzhi"></i>
          <span>实时通知</span>
        </el-menu-item>   
         <el-menu-item index="/linkSystem/linkBSConfiguration">
          <i class="ESLfont icon-tongzhi"></i>
          <span>基站配置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view class="viewMain"></router-view>
  </div>
</template>
<script>
// import {queryDevSumNum} from 'api/device'
export default {
  data() {
    return {
    }
  },
  methods: {

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
  padding: 0px 20px;
  border-bottom: none;
}

.stockName {
  border-right: 1px solid #fff;
}
.el-menu--horizontal .el-menu-item.is-active {
  color: #fff;
}
.el-menu--horizontal .el-menu-item.is-active {
  background: #126f7e;
}

.viewMain {
  background: #fff;
  overflow: auto;
}

</style>
