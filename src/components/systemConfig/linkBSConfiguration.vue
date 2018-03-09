<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" class="el-green" @click="editList()">
          <i class="ESLfont icon-iconfontzengjia"></i>新增基站配置
        </el-button>
      </div>
    </div>
    <div class="com-paint-table">
      <el-table class="com-table" :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" width="49" label="序号">
        </el-table-column>
        <el-table-column prop="index" label="index">
        </el-table-column>
        <el-table-column prop="address" show-overflow-tooltip label="Ip地址">
        </el-table-column>
        <el-table-column prop="connectFrequency" label="连接频点">
        </el-table-column>
        <el-table-column prop="transmitFrequency" label="传输频点">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span @click="deletList(scope.row)" class="doIt"> <i class="ESLfont icon-delete red"  ></i></span>
            <span @click="editList(scope.row)" class="doIt"> <i class="ESLfont icon-bianji4 blue" ></i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="rg">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <EslRightBox ref="rightBox" :title="title">
      <el-form ref="editFrom" :model="editFrom" label-width="80px" :rules='rulesForm'>
        <el-form-item label="index" prop="index">
          <el-input v-model.number="editFrom.index" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Ip地址" prop="address">
          <el-input v-model.number="editFrom.address" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="连接频点" prop="connectFrequency">
          <el-input v-model.number="editFrom.connectFrequency"></el-input>
        </el-form-item>
        <el-form-item label="传输频点" prop="transmitFrequency">
          <el-input v-model.number="editFrom.transmitFrequency"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="submitConfig('editFrom')">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
  </div>
</template>
<script>
import { configlist, configDelete, configUpdate, configAdd } from 'api/systemConfig'
export default {
  data() {
    var checkIndex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字段不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 9999) {
            callback(new Error('字段不能超過4位'));
          } else {
            callback();
          }
        }
      }, 1);
    };
    return {
      tableData: [],
      title: '基站配置',
      editFrom: {},
      rulesForm: {
        index: [{ validator: checkIndex, trigger: 'blur' }],
        transmitFrequency: [{ validator: checkIndex, trigger: 'blur' }],
        connectFrequency: [{ validator: checkIndex, trigger: 'blur' }],
      },
      currentPage: 1,
      count: 0,
      isAdd: true,
      disabled: true,
      delete: [],
      loading: true,
    }
  },
  mounted() {
    this.configlist()
  },
  watch: {
    currentPage(val) {
      this.configlist()
    },
    index(val) {
      console.log(2342)
    }
  },
  methods: {
    configlist() {
      configlist(this.currentPage, this.$EslConfig.pageSize).then(res => {
        console.log(res)
        if (res.data) {
          this.loading = false
          this.tableData = res.data.map((v, index) => {
            v.no = index + 1;
            if (v.dbcolumnIsstart == 0) {}
            return v;
          })
          this.count = res.count;
        }

        this.tableData = res.data.map((v, index) => {
          v.no = index + 1;
          if (v.dbcolumnIsstart == 0) {}
          return v;
        })
        this.count = res.count;
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //修改
    editList(val) {
      this.$refs.rightBox.open();
      if (!val) { //新增基站配置
        this.editFrom = {
            index: '',
            connectFrequency: '',
            transmitFrequency: '',
          },
          this.isAdd = true
      } else {
        this.editFrom = val
        this.isAdd = false
      }
    },
    //删除
    deletList(val) {
      this.delete.push(val.id)
      configDelete(this.delete).then(res => {
        if (res.resultStatus) {
          this.configlist()
        }
      })
    },
    submitConfig(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = null;
          let { index, address, connectFrequency, transmitFrequency, id } = this.editFrom
          if (this.isAdd) { //新增基站配置
            data = {
              index,
              connectFrequency,
              transmitFrequency
            }
            configAdd(data).then(res => {
              if (res.resultStatus) {
                this.$refs.rightBox.close();
                this.configlist()
              }
            }).catch(err => err);
          } else {
            data = {
              id,
              index,
              connectFrequency,
              transmitFrequency
            }
            console.log(data)
            configUpdate(data).then(res => {
              if (res.resultStatus) {
                this.$refs.rightBox.close();
                this.configlist()
              }
            }).catch(err => err);
          }
        } else {
          return false;
        }
      });
    },

  }
}

</script>
