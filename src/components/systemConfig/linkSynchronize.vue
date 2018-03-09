<template>
  <div class="com-paint viewMain">
    <div class="main-box">
      <div class="main-box-left">
        <el-form ref="SqlForm" :model="SqlForm" label-width="100px" style="width:20%;" :rules="rulesForm">
          <el-form-item label="数据库IP:" prop="jdbcUrl">
            <textarea v-model="SqlForm.jdbcUrl" class='textarea'></textarea>
          </el-form-item>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="SqlForm.username" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="SqlForm.password" type="password" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="同步周期:" prop="period">
            <el-input v-model.number="SqlForm.period" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="同步SQL:" prop="sql">
            <textarea v-model="SqlForm.sql" class='textarea'></textarea>
          </el-form-item>
        </el-form>
        <el-button @click="onCheck('SqlForm')">测试连接</el-button>
        <el-button @click="onRefer">SQL查询</el-button>
        <el-button @click="onSubmit('SqlForm')" :disabled='disabled'>保存配置</el-button>
      </div>
      <div class="main-box-right">
        <table border="1" bordercolor="#e6e6e6" v-loading="loading" element-loading-text="拼命加载中" v-if="isRefer">
          <tr>
            <td v-for="item in columns" width="100">
              <span>{{item}}</span>
            </td>
          </tr>
          <tr>
            <td v-for="(item,index) in columns" style="margin:0 5px;">
              <el-select v-model="json['a'+index]" @change='onSelect(json,index)'>
                <el-option v-for="i in ScreenTypes" :key="i.value" :label="i.label" :value="i.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr v-for="(item,index) in dataList" style="overflow:auto">
          <td v-for="i in dataList[index]">
            <span>{{i}}</span>
          </td>
        </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { checkConnection, checkSql, saveConfig } from 'api/systemConfig'
import { queryDbAttribute } from "api/template";

export default {
  data() {
    /*请输入正整数*/
    var isvalidateInteger = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('周期不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('必须是正整数'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      SqlForm: {
        jdbcUrl: "jdbc:mysql://192.168.7.33:3306/tianji_paas_db?characterEncoding=utf8&allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Shanghai",
        username: "root",
        password: '12345z',
        sql: 'select sku_num,sku_name,price from titem_sku',
        period: 12
      },
      columnList: [],
      dataList: [],
      ScreenTypes: [],
      columns: [],
      json: {},
      jsonList: [],
      rulesForm: {
        jdbcUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sql: [{ required: true, message: '不能为空', trigger: 'blur' }],
        period: [{ validator: isvalidateInteger, trigger: 'blur,change' }],
      },
      loading: '',
      disabled: false,
      isRefer: false,
    }
  },
  methods: {
    queryDbAttribute() {
      queryDbAttribute().then(res => {
        this.ScreenTypes = res.data.map(item => {
          return {
            value: item.dbcolumnAttribute,
            label: item.dbcolumnName
          }
        });
      });
    },
    onCheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Reflect.deleteProperty(this.SqlForm, 'period')
          checkConnection(this.SqlForm).then(res => {
            if (res.resultStatus) {
              if (res.data.success) {
                this.$confirm('连接成功', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                })
              } else {
                this.$confirm('res.data.exception', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
              }
            }
          })
        }
      })
    },
    onRefer() {
      this.isRefer = true
      this.json = {}
      this.jsonList = []
      console.log(this.jsonList)
      checkSql(this.SqlForm).then(res => {
        this.loading = true
        if (res.resultStatus) {
          this.loading = false
          console.log(res)
          this.queryDbAttribute()
          this.columns = res.data.columns
          this.dataList = res.data.data
          this.columns.map((v, index) => {
            this.$set(this.json, 'a' + index, '')
          })
        }
      })
    },
    onSelect(json, index) {
      for (let j in this.json) {
        if (this.json[j] !== '') {
          // if (json['a' + index] == this.json[j]) {
          //   this.$message({
          //     message: '属性重复',
          //     type: 'warn'
          //   });
          // }
        }
      }
    },
    onSubmit(formName) {
      if (this.isRefer) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            for (let j in this.json) {
              this.jsonList.push(this.json[j])
              if (this.json[j] == '') {
                this.$message('属性名称为必选项');
                return
              }
            }
            this.configDetail()
          }
        })
      } else {
        this.$message('先SQL查询,完成属性名称关联');
      }
    },
    configDetail() {
      let { jdbcUrl, username, password, sql, period } = this.SqlForm
      let data = {
        jdbcUrl: jdbcUrl,
        username: username,
        password: password,
        sql: sql,
        period: period,
        columns: this.jsonList
      }
      console.log(data)
      saveConfig(data).then(res => {
        console.log(res)
        if (res.resultStatus) {
          this.disabled = true
          this.isRefer = false
          this.$set(this.json, '', '')
          this.$confirm(res.msg, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          })
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
@border: 1px solid #ccc;
.main-box {
  display: flex;
  padding-top: 20px;
  &-left {
    flex: 2;
    padding-right: 20px;
  }
  &-right {
    flex: 8;
    padding: 0px 20px;
    overflow: auto;
  }
}

.textarea {
  width: 200px;
  height: 100px;
  max-width: 200px;
  max-height: 100px;
  margin-top: 10px;
}

table {
  width: 100%;
  overflow: hidden;
  border-collapse: collapse;
  table-layout: fixed;
  tr {
    overflow: hidden;
  }
  tr:first-child {
    background: #eeeeee;
    td {
      padding: 0px 5px;
    }
  }
  td {
    height: 41px;
    text-align: center;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    overflow: hidden;
  }
  td:first-child span {
    color: balck;
  }
}

</style>
