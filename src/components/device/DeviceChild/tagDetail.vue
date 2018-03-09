<template>
  <div class="com-paint com-paint-main">
    <div class="com-paint-head border">
      <div>
        <el-button size="small" @click="goBack" class="goBack imgom">
          返回
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="main-box-left ">
          <div class=" detailMessage lf">
            <el-form :model="tagform" label-width="120px" v-loading="loading" element-loading-text="拼命加载中">
              <el-form-item label="标签编号:" prop="tagId">
                <span>{{tagform.tagId |IntoSystem}}</span>
              </el-form-item>
              <el-form-item label="绑定状态:" prop="tagBindstatus">
                <span>{{tagform.tagBindstatus | inUseFormat1}}</span>
              </el-form-item>
              <el-form-item label="标签状态:" prop="tagWorkstatus">
                <span>{{tagform.tagWorkstatus | inUseFormat}}</span>
              </el-form-item>
              <el-form-item label="绑定基站:" prop="tagBase">
                <span>{{tagform.tagBase|IntoSystem}}</span>
              </el-form-item>
              <el-form-item label="绑定模板:" prop="tagBase">
                <span>{{tagform.tagBase}}</span>
              </el-form-item>
              <el-form-item label="绑定商品:" prop="goodName">
                <span>{{tagform.goodName}}</span>
              </el-form-item>
              <el-form-item label="货架位置:" prop="tagLocation">
                <span>{{tagform.tagLocation}}</span>
              </el-form-item>
              <el-form-item label="电压:" prop="tagVoltage">
                <span>{{tagform.tagVoltage}}</span>
              </el-form-item>
              <el-form-item label="湿度:" prop="tagHumidity">
                <span>{{tagform.tagHumidity}}</span>
              </el-form-item>
              <el-form-item label="更新时间:" prop="tagModifytime">
                <span>{{tagform.tagModifytime| moment}}</span>
              </el-form-item>
              <el-form-item label="绑定时间:" prop="tagModifytime">
                <span>{{ tagform.tagModifytime| moment}}</span>
              </el-form-item>
              <el-form-item label="第一页更新状态:" prop="page1UpdateStatus">
                <span>{{ tagform.page1UpdateStatus| inUseFormat2}}</span>
              </el-form-item>
              <el-form-item label="第二页更新状态:" prop="page1UpdateStatus">
                <span>{{ tagform.page2UpdateStatus| inUseFormat2}}</span>
              </el-form-item>
              <el-form-item label="第三页更新状态:" prop="page1UpdateStatus">
                <span>{{ tagform.page3UpdateStatus| inUseFormat2}}</span>
              </el-form-item>
            </el-form>
            <div v-for=" item in actionInfoList" v-if="actionInfoList.length">
              <el-form>
                <el-form-item label='参与活动'>
                  <span>{{ item.actionName }}</span>
                </el-form-item>
                <el-form-item label='活动描述'>
                  <span>{{ item.actionDescription }}</span>
                </el-form-item>
                <el-form-item label='开始时间'>
                  <span>{{ item.actionStarttime | moment }}</span>
                </el-form-item>
                <el-form-item label='结束时间'>
                  <span>{{item.actionEndtime | moment}}</span>
                </el-form-item>
                <el-button class="el-green" @click="operate">操作日志</el-button>
              </el-form>
            </div>
          </div>
          <div class="detailProduct lf" v-if="tagform.goodName">
            <span>绑定商品:{{tagform.goodName}}</span>
            <div style="margin-top:10px;">
              <el-button@click="bingProduct">查看详情</el-button>
                <el-button@click="removeBinding">解绑商品</el-button>
            </div>
          </div>
        </div>
        <div class="main-box-right">
          <tagTemplate :tagInfo="tagInfo" v-if="tagInfoList.length>0"></tagTemplate>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { query } from 'api/device'
import tagTemplate from "@/components/common/tagTemplate.vue"
let moment = require('moment');
import { unBindTagByGoodCode } from 'api/commodity'
import { inUseFormat, inUseFormat1, inUseFormat2, IntoSystem } from 'utils/validate'
export default {
  components: { tagTemplate },
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'YYYY年MM月DD日 HH:mm:ss';
      return moment(value).format(formatString);
    },
    inUseFormat: function(value) {
      return inUseFormat(value)
    },
    inUseFormat1: function(value) {
      return inUseFormat1(value)
    },
    inUseFormat2: function(value) {
      return inUseFormat2(value)
    },
    IntoSystem: function(value) {
      return IntoSystem(value)
    },

  },
  data() {
    return {
      tagform: {
        tagId: '',
        tagBase: '',
        goodName: '',
        tagBindstatus: '',
        tagPage1: '',
        tagLocation: '',
        tagVoltage: '',
        tagModifytime: '',
        tagBindtime: '',
        tagHumidity: '',
        tagTemplet: '',
        tagWorkstatus: '',
        page1UpdateStatus: '',
        tagBase: ''
      },
      actionInfoList: [],
      tagInfo: '',
      tagInfoList: '',
      tagGoodcode: '',
      loading: true,
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    goBack(val) {
      this.$router.go(-1)
    },
    query() {
      query(this.$route.query.id).then(res => {
        console.log(res)
        if (res.resultStatus) {
          this.loading = false
          this.tagform = res.data
          this.tagGoodcode = res.data.tagGoodcode
          if (res.data.tagInfoList) {
            this.tagInfoList = res.data.tagInfoList
            this.tagInfo = { tagInfoList: res.data.tagInfoList, tagGoodcode: res.data.tagGoodcode, id: this.$route.query.id }
          }
          this.actionInfoList = res.data.actionInfoList
        }
      }).catch(err => err);
    },
    operate() {
      this.$router.push({ name: 'linkNotice' })
    },

    bingProduct() {
      this.$router.push({ name: "commodityDetail", query: { goodCode: this.tagGoodcode } })
    },
    removeBinding() {
      let data = {
        "goodCode": this.tagGoodcode
      }
      unBindTagByGoodCode(data).then(res => {
        console.log(res)
        this.$notify({
          title: res.resultStatus ? '成功' : '失败',
          type: res.resultStatus ? 'success' : 'error',
          message: res.resultStatus ? '解除绑定成功' : '解除绑定失败'
        });
        if (res.resultStatus) {
          this.query()
        }
      })
    }
  }
}

</script>
<style scoped lang="less">
@border: 1px solid #ccc;
.border {
  border-bottom: @border;
}

.com-paint {
  padding: 0% 20px;
}

.main-box {
  padding: 20px 0px;
  display: flex;
  &-left {
    flex: 7;
    border-right: @border;
    padding-right: 30px;
  }
  &-right {
    flex: 3;
    padding: 0px 30px;
  }
}

span {
  color: #333;
  font-size: 13px;
}

.el-form-item {
  margin-bottom: 0px;
}

.detailRecord {
  margin-bottom: 10px;
  span {
    padding-right: 20px;
  }
}

.detailMessage {
  width: 60%;
}

.detailProduct {
  width: 40%;
  span {
    margin-bottom: 20px;
  }
}

.leftDetail-message {
  background: #e6e6e6;
  width: 90px;
  margin-top: 20px
}

</style>
