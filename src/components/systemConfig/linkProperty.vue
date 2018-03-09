<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" class="addImg imgom" @click="addProperty()" style="width:85px;">
          <span>新增属性</span>
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border @selection-change="selectChange" v-loading="loading" element-loading-text="拼命加载中">
        <!-- @cell-dblclick="tableDbEdit" -->
        <el-table-column type="selection" width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.dbcolumnIsshow" :false-label='0' :true-label='1' @change="submitPro(scope.row)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="no" width="49" label="序号">
        </el-table-column>
        <el-table-column prop="dbcolumnName" label="属性名称">
          <template slot-scope="scope">
            <el-input v-if="editShow" v-model="scope.row.dbcolumnName" placeholder="请输入内容"></el-input>
            <span v-else @keyup.enter.native="submitPro(scope.row)">{{scope.row.dbcolumnName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dbcolumnAttribute" show-overflow-tooltip label="属性别名">
        </el-table-column>
        <el-table-column prop="dbcolumnLength" label="字段长度">
        </el-table-column>
        <el-table-column prop="dbcolumnDatatype" label="数据类型">
          <template slot-scope="scope">
            <span>{{ scope.row.dbcolumnDatatype | inUseFormat4 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dbcolumnIsshow" label="是否界面显示">
          <template slot-scope="scope">
            <span>{{ scope.row.dbcolumnIsshow | inUseFormat3 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span @click="editList(scope.row)" class="doIt"> <i class="ESLfont icon-bianji4 blue" ></i></span>
            <span @click="deletList(scope.row)" class="doIt"> <i class="ESLfont icon-delete red"  ></i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block rg">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <EslRightBox ref="rightBox" :title="title">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="属性名称" prop="dbcolumnName">
          <el-input v-model="form.dbcolumnName"></el-input>
        </el-form-item>
        <el-form-item label="属性别名" prop="dbcolumnAttribute">
          <el-input v-model="form.dbcolumnAttribute" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="dbcolumnDatatype">
          <el-select v-model="form.dbcolumnDatatype" placeholder="请选择" style="width:300px">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段长度" prop="dbcolumnLength">
          <el-input v-model="form.dbcolumnLength" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="界面显示" prop="dbcolumnIsshow ">
          <el-select v-model="form.dbcolumnIsshow" placeholder="请选择" style="width:300px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="submitPro()">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
  </div>
</template>
<script>
import { queryList, setIsstart, updata, addAttribute } from 'api/systemConfig'
import { inUseFormat3, inUseFormat4, inUseFormat5 } from 'utils/validate'

export default {
  filters: {
    inUseFormat3: function(value) {
      return inUseFormat3(value)
    },
    inUseFormat4: function(value) {
      return inUseFormat4(value)
    },
    inUseFormat5: function(value) {
      return inUseFormat4(value)
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      count: 0,
      isEdit: '',
      title: '属性编辑',
      form: {
        dbcolumnName: '',
        dbcolumnAttribute: '',
        dbcolumnLength: '',
        dbcolumnDatatype: ''
      },
      options: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      types: [{
        value: 1,
        label: '字符'
      }, {
        value: 2,
        label: '数字'
      }, {
        value: 3,
        label: '时间'
      }],
      updataId: '',
      editShow: false,
      dbcolumnIsshow: '',
      no: '',
      checked: '',
      disabled: false,
      loading: true,
    }
  },
  mounted() {
    this.queryList()
  },
  watch: {
    currentPage(val) {
      this.queryList()
    },
    dbcolumnIsshow(val) {
      console.log(23)
    }
  },
  created() {
    let $this = this;
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      let key = e.keyCode;
      if (key == 13) {
        $this.submitPro()
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val;
    },
    selectChange(val) {},
    tableDbEdit(row, column, cell, event) {
      this.editShow = true
    },
    queryList() {
      queryList(this.currentPage, this.$EslConfig.pageSize).then(res => {
        if (res.data) {
          this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            this.no = v.id
            return v;
          })
          this.count = res.count;
        }

      })
    },
    addProperty() {
      let id = this.no + 1
      addAttribute(id).then(res => {
        if (res.resultStatus) {
          this.queryList()
        }
      })
    },
    histList() {},
    deletList(val) {
      if (val.dbcolumnIscanmodify == 1) {
        let id = { "id": val.id }
        this.$confirm('此操作将删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setIsstart(id).then(res => {
            if (res.resultStatus) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queryList()
            }
          }).catch(err => err)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      } else {
        this.$message({
          message: '此条不可删除',
          type: 'warning'
        });
      }
    },
    editList(val) {
      let isEdit = val.dbcolumnIscanmodify
      if (isEdit == 1) {
        this.$refs.rightBox.open();
        this.form = val
        this.updataId = val.id
      } else {
        this.$message({
          message: '此条不可编辑',
          type: 'warning'
        });
      }
    },
    submitPro(val) {
      let data = null
      if (val && val.dbcolumnIscanmodify == 0) {
        val.dbcolumnIsshow = 1
        this.$message({
          message: '此条不可编辑',
          type: 'warning'
        });
      } else {
        if (!val) {
          data = {
            id: this.updataId,
            dbcolumnName: this.form.dbcolumnName,
            dbcolumnIsshow: this.form.dbcolumnIsshow,
            dbcolumnDatatype: this.form.dbcolumnDatatype
          }
        } else {
          console.log(12)
          data = {
            id: val.id,
            dbcolumnName: val.dbcolumnName,
            dbcolumnIsshow: val.dbcolumnIsshow,
            dbcolumnDatatype: val.dbcolumnDatatype
          }
        }
        updata(data).then(res => {
          if (res.resultStatus) {
            this.$refs.rightBox.close();
            this.queryList()
          }
        }).catch(err => err);
      }
    }
  },
  created() {
    let $this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {}
    }
  },
}

</script>
<style lang="less" scoped>
.doIt {
  cursor: pointer;
  i {
    font-size: 24px;
  }
}

</style>
