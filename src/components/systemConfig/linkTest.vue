<template>
  <div class="com-paint">
    <div class="textMain">
      <div>
        <h3>安装后系统模拟测试</h3>
        <el-button class="startTest butColor" @click="startTest">开始测试</el-button>
        <table border="1" bordercolor="#e6e6e6" ref="table" :model="table" style="border-collapse: collapse;">
          <tr>
            <td>参数</td>
            <td>实际值</td>
            <td>参数</td>
            <td>实际值</td>
          </tr>
          <tr>
            <td>商品总数</td>
            <td></td>
            <td>手持机列表</td>
            <td></td>
          </tr>
          <tr>
            <td>商品半年固定表签数</td>
            <td></td>
            <td>CPU/内存利用率</td>
            <td></td>
          </tr>
          <tr>
            <td>标签总数/各类标签数量</td>
            <td></td>
            <td>平均更新成功率</td>
            <td></td>
          </tr>
          <tr>
            <td>标签电压状态</td>
            <td></td>
            <td>软硬件版本</td>
            <td></td>
          </tr>
          <tr>
            <td>基站总数</td>
            <td></td>
            <td>客户信息</td>
            <td></td>
          </tr>
          <tr>
            <td>基站IP列表</td>
            <td></td>
            <td>安装信息</td>
            <td></td>
          </tr>
        </table>
        <div class="textBut">
          <el-button size="small" class="butColor" @click="exportPdf()">
            <span>导出</span>
          </el-button>
          <el-button size="small" class="butColor" @click="print">
            <span>打印</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: []
    }
  },

  methods: {
    startTest() {
      let loadingInstance = Loading.service(options);
      loadingInstance.close();
    },
    exportPdf() {

    },
    print() {

    }
  }
}

</script>
<style lang="less" scoped>
.textMain {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  h3 {
    font-size: 14px;
    color: #9c9c9c;
    text-align: center;
  }
  .startTest {
    width: 188px;
    height: 52px; // margin:1.4rem 35rem 0  2.64rem;
    margin: 1.4rem 40%;
  }
}

table {
  width: 57.14rem;
  text-align: center;
  tr {
    height: 41px;
    td {
      width: 25%;
    }
  }
}

.textBut {
  float: right;
  margin-top: 20px;
}

</style>
