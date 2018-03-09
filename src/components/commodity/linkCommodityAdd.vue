<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack" class="Bread-button-le goBack imgom">
          返回
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="main-box-left leftDetail">
          <div class="leftDetail-list">
            <el-form :model="addForm" label-width="130px" v-loading="loading" element-loading-text="拼命加载中">
              <template v-for="(item,i) in detaillist">
                <el-form-item :label="item.dbcolumnName">
                  <el-date-picker :value="item.value" type="datetime" placeholder="选择日期时间" v-if="item.dbcolumnDatatype==3" :ref="'datapick_'+i" @input="pickblur(i)">
                  </el-date-picker>
                  <el-input v-else-if="item.dbcolumnAttribute=='goodStatus'" :disabled='true' v-model="item.value" style="width:220px;"></el-input>
                  <el-input v-else v-model="item.value" style="width:220px;"> </el-input>
                </el-form-item>
              </template>
              <el-button size="small" @click="addCommodity()" style="margin:0 50%;">
                保存
              </el-button>
            </el-form>
          </div>
        </div>
        <div class="main-box-right">
          <el-form ref="form" label-width="80px" style="border-bottom:1px solid #ccc;">
            <el-form-item label="绑定标签:">
              <el-input placeholder="请输入标签编号" size="small" style="width:123px" v-model="tagId"></el-input>
              <el-button style="background:#e6e6e6;width:80px;" @click="binding">绑定</el-button>
            </el-form-item>
          </el-form>
          <el-button class="main-box-right-but" @click="binding">再绑定标签绑定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'assets/public/css/commodity.less'
import { addNewGood, queryAllColumnName, goodBindTag, queryById, } from 'api/commodity'
import { IntoSystem10 } from 'utils/validate'
let moment = require('moment');
export default {
  filters: {
    IntoSystem10: function(value) {
      return IntoSystem10(value)
    },
  },
  data() {
    return {
      addForm: {},
      detaillist: [],
      tagId: '',
      saveShow: false,
      json: {},
      loading: true
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.queryAllColumnName()
  },
  methods: {
    goBack(val) {
      this.$router.go(-1)
    },
    pickblur(val) {
      let data = "datapick_" + val
      let time = this.$refs[data][0].picker.date
       // console.log( this.detaillist[val].value*1)
       this.detaillist[val].value = time.getTime()
      console.log(time.getTime())

    },
    queryAllColumnName() {
      queryAllColumnName().then(res => {
        if (res.data) {
          this.loading = false
          this.detaillist = res.data.filter(v => {
            v.value = ''
            if (v.dbcolumnDatatype == 3) {
              v.value = new Date(v.value);
            }
            return v;
          })
          console.log(this.detaillist)
        }
      })
    },
    addCommodity(val) {
      let data = null
      this.detaillist.map(v => {
        this.json[v.dbcolumnAttribute] = v.value;
        data = this.json[v.dbcolumnAttribute]
      })
      if (data == "") {
        this.$message({
          message: "表单不能为空",
          type: "error"
        });
      } else {
        console.log(this.json)
        addNewGood(this.json).then(res => {
          console.log(res)
          if (res.resultStatus) {
            this.saveShow = true
            this.$message({
              message: "新增成功",
              type: "success"
            });
          }
        })
      }
    },
    binding(val) {
      if (this.saveShow) {
        let data = {
          goodCode: this.json.goodCode,
          tagId: IntoSystem10(this.tagId)
        }
        goodBindTag(data).then(res => {
          this.$notify({
            title: res.resultStatus ? '成功' : '错误',
            message: res.resultStatus ? '标签绑定成功' : '标签绑定失败',
            type: res.resultStatus ? 'success' : ''
          });
          this.tagId = ''
        }).catch(err => err)
      } else {
        this.$message({
          message: "请先保存",
          type: "error"
        })
      }
    }
  }
}

</script>
<style lang="less" scoped>
@border: 1px solid #ccc;

.main-box {
  padding: 20px;
  display: flex;
  &-left {
    flex: 7;
    padding-right: 30px;
  }
  &-right {
    flex: 3;
    padding: 0px 20px;
  }
}
 
</style>
