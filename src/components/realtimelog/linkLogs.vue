<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-input v-model="input" placeholder="请输入标签编号" style="width:179px;"></el-input>
        <el-button @click="search" size="small">
          <i class="ESLfont icon-sousuo" style="color:#116f7d"></i>
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
        <el-button size="small" @click="exportPdf()">
          <i class="ESLfont icon-daochu"></i>
          <span>导出</span>
        </el-button>
        <el-button size="small" class="print imgom" @click="print">
          <i class="ESLfont icon-dayin"></i>
          <span>打印</span>
        </el-button>
      </div>
    </div>
    <!--startprint1-->
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" label="序号" width="49">
        </el-table-column>
        <el-table-column prop="id" label="标签编号">
        </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="标签状态">
        </el-table-column>
        <el-table-column prop="id" label="商品编码">
        </el-table-column>
        <el-table-column prop="id" label="模板">
        </el-table-column>
        <el-table-column prop="id" label="命令描述">
        </el-table-column>
        <el-table-column prop="id" label="开始时间">
        </el-table-column>
        <el-table-column prop="id" label="结束时间">
        </el-table-column>
        <el-table-column prop="id" label="绑定基站">
        </el-table-column>
        <el-table-column prop="id" label="重试次数">
        </el-table-column>
        <el-table-column prop="id" label="更新次数">
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
    <!--endprint1-->
  </div>
</template>
<script>
import '../../utils/html2canvas.js'
var jsPDF = require('jspdf');
export default {
  watch: {
    currentPage(val) {
      this.BaseQueryList()
    }
  },
  data() {
    return {
      input: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      beginDate: '',
      endDate: '',
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      pageNumber: 5,
      count: 0,
      // loading: true,
      loading: false,
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
    exportPdf(val) {
      html2canvas(document.body, {
        onrendered(canvas) {
          let contentWidth = canvas.width;
          let contentHeight = canvas.height;
          let pageHeight = contentWidth / 592.28 * 841.89;
          let leftHeight = contentHeight;
          let position = 0;
          let imgWidth = 595.28;
          let imgHeight = 592.28 / contentWidth * contentHeight;
          let pageData = canvas.toDataURL('image/jpeg', 1.0);
          let pdf = new jsPDF('', 'pt', 'a4');
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save('content.pdf');
        }
      })
    },
    print(oper) {
      if (oper < 10) {
        bdhtml = window.document.body.innerHTML;
        sprnstr = "<!--startprint" + oper + "-->"; //设置打印开始区域  
        eprnstr = "<!--endprint" + oper + "-->"; //设置打印结束区域
        prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18);
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
        window.document.body.innerHTML = prnhtml;
        window.print();
        window.document.body.innerHTML = bdhtml;
      } else {
        window.print();
      }
    }
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
