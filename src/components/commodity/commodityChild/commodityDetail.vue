<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack" class="Bread-button-le goBack imgom">
          <i class="ESLfont icon-fanhui"></i> 返回
        </el-button>
        <el-button size="small" @click="detailEdit">
          <i class="ESLfont  icon-bianji"></i>编辑
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="main-box-left leftDetail">
          <div class="leftDetail-list">
            <el-form label-width="130px" v-loading="loading" element-loading-text="拼命加载中">
              <template v-for="item in detaillist">
                <el-form-item :label="item.dbcolumnName">
                  <span v-if="item.dbcolumnDatatype==3">{{ item.value | moment }}</span>
                  <span v-else-if="item.dbcolumnAttribute=='goodStatus'" :disabled='true'>
                    {{item.value | inUseFormat1}}
                  </span>
                  <span v-else>{{item.value}}</span>
                </el-form-item>
              </template>
            </el-form>
          </div>
          <div class="leftDetail-active" v-for="item in actionInfoList" v-if="actionInfoList.length>0">
            <div style="padding:10px 0;">
              <span>当前活动：{{item.actionName}}</span>
            </div>
            <el-form>
              <el-form-item>
                <span>活动描述：{{ item.actionDescription }}</span>
              </el-form-item>
              <el-form-item>
                <span>活动开始时间：{{ item.actionStarttime | moment }}</span>
              </el-form-item>
              <el-form-item>
                <span>活动结束时间：{{item.actionEndtime | moment}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="leftDetail-active" v-for=" item in actionHisList" v-if="actionHisList.length>0">
            <div style="padding:10px 0;">
              <span>历史参与活动:{{item.actionName}}</span>
            </div>
            <el-form>
              <el-form-item>
                <span>{{ item.actionDescription }}</span>
              </el-form-item>
              <el-form-item>
                <span>活动开始时间：{{ item.actionStarttime | moment }}</span>
              </el-form-item>
              <el-form-item>
                <span>活动结束时间：{{item.actionEndtime | moment}}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="main-box-right">
          <el-form ref="form" label-width="80px" style="border-bottom:1px solid #ccc;">
            <el-form-item label="绑定标签:">
              <el-input placeholder="请输入标签编号" size="small" style="width:123px" v-model="tagId"></el-input>
              <el-button style="width:80px;" class="butColor" @click="binding">绑定</el-button>
            </el-form-item>
          </el-form>
          <el-button class="main-box-right-but" @click="binding">再绑定标签绑定</el-button>
          <tagTemplate :tagInfo="tagInfo" v-if="tagInfoList.length>0"></tagTemplate>
        </div>
      </div>
    </div>
    <EslRightBox ref="rightBox" :title="title">
      <el-form :model="json" ref="form" label-width="130px">
        <template v-for="(item,i) in detaillist">
          <el-form-item :label="item.dbcolumnName">
            <el-date-picker :value="item.value" type="datetime" placeholder="选择日期时间" v-if="item.dbcolumnDatatype==3" :ref="'datapick_'+i" @input="pickblur(i)" style="width:285px;">
            </el-date-picker>
            <el-input v-else-if="item.dbcolumnAttribute=='goodStatus'" :disabled='true' v-model="item.value">
            </el-input>
            <el-input v-else-if="item.dbcolumnAttribute=='goodCode'" :disabled='true' v-model="item.value"></el-input>
            <el-input v-else v-model="item.value"> </el-input>
          </el-form-item>
        </template>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="onsubmit">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
  </div>
</template>
<script>
import { queryByGoodCode, queryAllColumnName, unBindTag, updateGoodInfo, goodBindTag } from 'api/commodity'
let moment = require('moment');
import tagTemplate from "@/components/common/tagTemplate.vue"
import { inUseFormat1, IntoSystem, tagStatus, IntoSystem10 } from 'utils/validate'
export default {
  components: { tagTemplate },
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'YYYY年MM月DD日 HH:mm:ss';
      return moment(value * 1).format(formatString);
    },
    tagStatus: function(value) {
      return tagStatus(value)
    },
    IntoSystem: function(value) {
      return IntoSystem(value)
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
    IntoSystem10: function(value) {
      return IntoSystem10(value)
    },
  },
  data() {
    return {
      title: '商品详情编辑',
      detaillist: [],
      tagInfoList: [],
      jsonlist: [],
      actionHisList: [],
      actionInfoList: [],
      tagId: '',
      msg: '',
      no: 0,
      json: {},
      disabled: false,
      tagInfo: '',
      goodCode: '',
      loading: true
    }
  },
  computed: {},
  watch: {
    detaillist: {
      handler(newVal, oldVal) {　},
      deep: true
    },
  },
  mounted() {
    this.queryByGoodCode()
    this.queryAllColumnName()
    this.goodCode = this.$route.query.goodCode
  },
  methods: {
    queryAllColumnName() {
      queryAllColumnName().then(res => {
        if (res.data) {
          this.loading = false
          this.detaillist = res.data.filter(v => {
            if (v.dbcolumnDatatype == 3) {
              v.value = new Date(v.value);
            }
            return v
          })
        }

      })
    },
    pickblur(val) {
      let data = "datapick_" + val
      let time = this.$refs[data][0].picker.date
      this.detaillist[val].value = time.getTime()
    },
    queryByGoodCode() {
      queryByGoodCode(this.$route.query.goodCode).then(res => {
        if (res.data) {
          this.loading = false
          this.jsonlist = res.data
          if (res.data.tagInfoList) {
            this.tagInfoList = res.data.tagInfoList
            this.tagInfo = { tagInfoList: res.data.tagInfoList, tagGoodcode: this.goodCode }
          }
          this.actionHisList = res.data.actionHisList
          this.actionInfoList = res.data.actionInfoList
          for (let json in this.jsonlist) {
            let n = this.detaillist.filter(v => {
              if (v.dbcolumnAttribute == json) {
                v.value = this.jsonlist[json];
                if (v.dbcolumnDatatype == 3) {
                  v.value = new Date(v.value * 1);
                }
                return v;
              }
              return false
            });
          }
        }
      })
    },
    goBack(val) {
      this.$router.go(-1)
    },
    //绑定标签
    binding(val) {
      let data = {
        goodCode: this.goodCode,
        tagId: IntoSystem10(this.tagId)
      }
      goodBindTag(data).then(res => {
        this.$notify({
          title: res.resultStatus ? '成功' : '错误',
          message: res.resultStatus ? res.msg : res.msg,
          type: res.resultStatus ? 'success' : ''
        });
        this.tagId = ''
        if (res.resultStatus) {
          this.queryByGoodCode()
          this.queryAllColumnName()
        }
      })
    },
    //编辑
    detailEdit(val) {
      this.$refs.rightBox.open();
      setTimeout(() => {}, 300);
    },
    //编辑保存
    onsubmit(val) {
      this.detaillist.map(v => {
        if (v.dbcolumnDatatype == 3) {
          v.value = moment(v.value) * 1;
        }
        this.json[v.dbcolumnAttribute] = v.value;
      })
      this.json.id = this.$route.query.id
      updateGoodInfo(this.json).then(res => {
        if (res.resultStatus) {
          this.$refs.rightBox.close();
          this.queryByGoodCode()
          this.queryAllColumnName()
        }
      }).catch(err => err)
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

.main-box-right-but {
  background: #e6e6e6;
  width: 142px;
  margin: 20px 10rem;
}

.leftDetail .el-form-item .el-input__inner {
  border: none;
}

.tag-cell {
  width: 100%;
  height: 100%;
  background: #e2e2e2;
  border: 1px dashed #126f7e;
  padding: 10px;
  position: relative;
  margin: 10px 0;
  .tag-cont {
    margin: 10px;
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
  }
  .tag-state {
    position: absolute;
    right: 5px;
    top: 0;
    span {
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: green;
    }
  }
}

</style>
