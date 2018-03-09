<template>
  <div class="article">
    <div class="article-left lf">
      <div class="label box">
        <div class="title">标签概览</div>
        <div class="label-box">
          <span class="lf label-box-title">标签总数</span>
          <div class="strip lf">
            <el-progress class="strip-progress1" :percentage="percentage0" :show-text="false" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagSum}}个</span>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">标签在线</span>
          <div class="strip lf">
            <el-progress :percentage="percentage1" class="strip-progress2" :show-text="false" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagOnlineSum}}个</span>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">标签离线</span>
          <div class="strip lf">
            <el-progress :percentage="percentage2" class="strip-progress3" :show-text="false" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagOfflineSum}}个</span>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">电压异常</span>
          <div class="strip lf">
            <el-progress :percentage="percentage3" :show-text="false" class="strip-progress4" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagVoltageError}}个</span>
        </div>
        <!--  <div class="label-box">
          <span class="lf label-box-title">当天更新</span>
          <div class="strip lf">
            <el-progress :percentage="percentage4" :show-text="false" class="strip-progress5" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagUpdateToday}}个</span>
        </div> -->
        <div class="label-box">
          <span class="lf label-box-title">正在更新</span>
          <div class="strip lf">
            <el-progress :percentage="percentage5" :show-text="false" class="strip-progress6" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagUpdateNow}}个</span>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">更新失败</span>
          <div class="strip lf">
            <el-progress :percentage="percentage6" class="strip-progress7" :show-text="false" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{tagUpdateFail}}个</span>
        </div>
      </div>
      <!-- 商品概览 -->
      <div class="label box">
        <div class="title">商品概览</div>
        <div class="label-box">
          <span class="lf label-box-title">商品总数</span>
          <div class="strip lf">
            <el-progress :percentage="percentage" class="strip-progress8" :show-text="false" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{goodsSum}}个</span>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">绑定数量</span>
          <div class="strip lf">
            <el-progress :percentage="percentage7" :show-text="false" class="strip-progress9" :stroke-width="10"></el-progress>
          </div>
          <span class="rg">{{goodsBind}}个</span>
        </div>
      </div>
      <!-- 基站状态 -->
      <div class="station box">
        <div class="headline">
          <div class="title lf">基站状态</div>
          <div class="rg point" @click="bsDetail">
            <img src="static/img/system-27.jpg" alt="" />
          </div>
        </div>
        <div class="label-box">
          <span class="lf label-box-title">基站总数</span>
          <div class="strip lf" style="width:60%;">
            <el-progress class="strip-progress10" :percentage="percentage11" :show-text="false" :stroke-width="10">
            </el-progress>
          </div>
          <div class="rg" id="station_title1">
            <span>{{BStotal }}</span>
            <span><img src="static/img/system-28.jpg" alt=""/> 正常 {{normal}}</span>
            <span><img src="static/img/system-29.jpg" alt=""/> 异常 {{abnormal}} </span>
          </div>
        </div>
        <div class="station_box2" v-for="item in statusList">
          <img v-if="item.baseStatus==0" :src="srcURL0" alt="" />
          <img v-if="item.baseStatus==1" :src="srcURL1" alt="" />
          <div>{{item.baseId| IntoSystemBs}}</div>
        </div>
      </div>
    </div>
    <div class="article-right lf">
      <div class="box" style="height: 290px; overflow-y: auto">
        <div class="headline">
          <div class="title lf">实时通知</div>
          <div class="rg point">
            <img src="static/img/system-27.jpg" alt="" @click="informMore" />
          </div>
        </div>
        <div class="boxmain point" v-for="item in sendList" @click="tagDetail(item.id)">
          <span class="num1" :style="noticeColor1" v-if="item.logLevel==1">{{item.no}}</span>
          <span class="num1" :style="noticeColor2" v-if="item.logLevel==2">{{item.no}}</span>
          <span class="num1" :style="noticeColor3" v-if="item.logLevel==3">{{item.no}}</span>
          <span class="num1" :style="noticeColor4" v-if="item.logLevel==4">{{item.no}}</span>
          <span>{{item.logContent}}</span>
          <span class="rg">{{item.logTime | moment }}</span>
        </div>
      </div>
      <div class="box" style="height:250px;overflow-y:auto">
        <div class="headline">
          <div class="title lf">活动概况</div>
          <div class="rg point">
            <img src="static/img/system-27.jpg" alt="" @click="activeMore" />
          </div>
        </div>
        <div v-for="item in actionlist" class="boxmain point" @click="activeDetail(item.actionId)">
          <span class="num">{{item.no}}</span>
          <span>{{item.actionId}}&nbsp;{{item.actionName}} &nbsp;{{item.actionDescription}}</span>
          <span class="rg">{{item.actionStarttime}}~{{item.actionEndtime}}</span>
        </div>
      </div>
      <div class="resources box ">
        <div style="height:24px">
          <div class="lf title">系统资源概览</div>
          <span class="rg">软件版本：v1.0.0.0</span>
        </div>
        <div class="resources-box">
          <el-progress type="circle" :percentage="percentage8">
          </el-progress>
          <el-progress type="circle" :percentage="percentage9"></el-progress>
          <el-progress type="circle" :percentage="percentage10" class="supercent">
            <!-- <div class="el-progress__text" style="font-size: 16px;">成功</div> -->
          </el-progress>
        </div>
        <div class="resources-text">
          <span>CPU使用率</span>
          <span>内存使用率</span>
          <span>服务器数据库连接</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'assets/public/css/article.less'
import { queryTagstatus, queryBasestatus, queryGoodsstatus, queryActionstatus, dashboard, logs } from 'api/article'
let moment = require('moment');
let echarts = require('echarts');
import 'utils/stomp.js'
import 'utils/sock.js'
import { mapGetters } from "vuex";
import { IntoSystemBs } from 'utils/validate'
export default {
  filters: {
    moment(value, formatString) {
      formatString = formatString || 'MM月DD日 HH:mm:ss';
      return moment(value).format(formatString);
    },
    indexFormat(val) {
      return val + 1
    },
    IntoSystemBs: function(value) {
      return IntoSystemBs(value)
    },
  },
  data() {
    return {
      tagSum: 0,
      tagOnlineSum: 0,
      tagOfflineSum: 0,
      tagUpdateFail: 0,
      tagUpdateToday: 0,
      tagVoltageError: 0,
      tagUpdateNow: 0,
      tagUpdateFail: 0,
      statusList: [],
      actionlist: [],
      goodsSum: 0,
      goodsBind: 0,
      srcURL0: 'static/img/system-17.jpg',
      srcURL1: 'static/img/system-15.jpg',
      tableData: [],
      percentage0: 0,
      percentage: 0,
      percentage1: 0,
      percentage2: 0,
      percentage3: 0,
      percentage4: 0,
      percentage5: 0,
      percentage6: 0,
      percentage7: 0,
      percentage8: 0,
      percentage9: 0,
      percentage10: 0,
      percentage11: 0,
      stompClient: 'null',
      logContent: '',
      logTime: '',
      sendList: [],
      BStotal: 0,
      normal: 0,
      abnormal: 0,
      noticeColor1: {
        background: '#28B779'
      },
      noticeColor2: {
        background: '#28B779'
      },
      noticeColor3: {
        background: '#ffa800'
      },
      noticeColor4: {
        background: '#dd211f'
      },

    }
  },
  mounted() {
    this.queryTagstatus()
    this.queryBasestatus()
    this.queryGoodsstatus()
    this.queryActionstatus()
    this.dashboard()
    this.logs()
    // this.refeshed()
  },
  watch: {
    sendList(val, oldval) {}
  },
  computed: {
    ...mapGetters([
      "baseUrl",
    ])
  },
  methods: {
    // refeshed() {
    //   setInterval(() => {
    //     this.queryTagstatus()
    //     this.queryBasestatus()
    //     this.queryGoodsstatus()
    //     this.queryActionstatus()
    //     this.dashboard()
    //   },   1000)
    // },
    queryTagstatus() {
      queryTagstatus().then(res => {
        console.log(res)
        if (res.data) {
          let { tagSum, tagOnlineSum, tagOfflineSum, tagVoltageError, tagUpdateToday, tagUpdateNow, tagUpdateFail, } = res.data
          this.tagSum = tagSum ? tagSum : 0
          this.tagOnlineSum = tagOnlineSum ? tagOnlineSum : 0
          this.tagOfflineSum = tagOfflineSum ? tagOfflineSum : 0
          this.tagVoltageError = tagVoltageError ? tagVoltageError : 0
          this.tagUpdateToday = tagUpdateToday ? tagUpdateToday : 0
          this.tagUpdateNow = tagUpdateNow ? tagUpdateNow : 0
          this.tagUpdateFail = tagUpdateFail ? tagUpdateFail : 0
          if (tagSum != 0) { this.percentage0 = 100 }
          if (tagOnlineSum != 0) { this.percentage1 = tagOnlineSum / tagSum * 100 }
          if (tagOfflineSum != 0) { this.percentage2 = tagOfflineSum / tagSum * 100 }
          if (tagUpdateToday != 0) return this.percentage4 = tagUpdateToday / tagSum * 100
          if (tagUpdateNow != 0) return this.percentage5 = tagUpdateNow / tagSum * 100
          if (tagUpdateFail != 0) return this.percentage6 = tagUpdateFail / tagSum * 100
          if (tagVoltageError != 0) return this.percentage3 = tagVoltageError / tagSum * 100

        }
      }).catch(err => err)
    },
    queryBasestatus() {
      queryBasestatus().then(res => {
        console.log(res)
        this.statusList = res.data
        this.BStotal = this.statusList.length
        let arr = []
        let arr1 = []
        this.statusList.map((v, index) => {
          if (v.baseStatus == 1) { arr.push(v.baseStatus) }
          if (v.baseStatus == 0) { arr1.push(v.baseStatus) }
          this.normal = arr.length
          this.abnormal = arr1.length
          if (this.normal != 0) return this.percentage11 = this.normal / this.BStotal * 100
        })
      })
    },
    queryGoodsstatus() {
      queryGoodsstatus().then(res => {
        if (res.resultStatus) {
          let { goodsSum, goodsBind } = res.data
          this.goodsSum = goodsSum ? goodsSum : 0
          this.goodsBind = goodsBind ? goodsBind : 0
          this.percentage = 100
          if (this.goodsBind != 0) return this.percentage7 = goodsBind / goodsSum * 100
        }
      }).catch(err => err)
    },
    queryActionstatus() {
      queryActionstatus().then(res => {
        console.log(res)
        if (res.resultStatus) {
          this.actionlist = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
        }
      }).catch(err => err);
    },
    dashboard() {
      dashboard().then(res => {
        // console.log(res)
        let { systemCpuLoad, dataSourceConnected, freeMemorySize, totalMemorySize } = res.data
        if (res.data) {
          this.percentage8 = parseFloat((systemCpuLoad * 100).toFixed(2))
          this.percentage9 = parseFloat(((freeMemorySize / totalMemorySize) * 100).toFixed(2))
          this.percentage10 = dataSourceConnected * 100
        }
      })
    },
    logs() {
      logs().then(res => {
        console.log(res)
        if (res.data) {
          this.count = res.count;
          this.connect()
          this.sendList = res.data.map((v, index) => {
            v.no = index + 1;
            return v;
          })
        }
      })
    },
    onConnected(frame) {
      var topic = '/topic/logs'
      // ---订阅频道
      this.stompClient.subscribe(topic, this.responseCallback, this.onFailed)
    },
    onFailed(frame) {
      console.log('Failed: ' + frame)
      this.connect();
    },
    responseCallback(frame) {
      let sendMessage = JSON.parse(frame.body)
      this.sendList.push({
        id: sendMessage.id,
        logContent: sendMessage.logContent,
        logLevel: sendMessage.logLevel,
        logType: sendMessage.logType,
        linkId: sendMessage.linkId,
        logTime: sendMessage.logTime
      })
      this.sendList.sort(this.compare)
      this.sendList.filter((v, index) => {
        v.no = index + 1;
        return v;
      })
    },
    compare(a, b) {
      return (a.logTime < b.logTime) ? 1 : -1
    },
    connect() {
      // -- - 初始化mqtt客户端， 并连接mqtt服务   
      var socket = new SockJS(this.baseUrl + '/portfolio');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, this.onConnected, this.onFailed)
    },
    informMore() {
      this.$router.push({ name: "linkNotice" });
    },
    bsDetail() {
      this.$router.push({ name: "linkDeviceBS" });
    },
    activeMore() {
      this.$router.push({ name: "linkActivities" });
    },
    tagDetail(id) {
      // this.$router.push({ name: "tagDetail", query: { id: id } })
    },
    activeDetail(actionId) {
      this.$router.push({ name: "activeDetail", query: { actionId: actionId } })
    }
  }
}

</script>
<style scoped lang='less'>
.boxmain {
  border-bottom: 1px solid #e7e7e7;
  height: 35px;
  line-height: 35px;
  span:nth-child(2) {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .num,
  .num1 {
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    line-height: 18px;
    display: inline-block;
    text-align: center;
  }
  .boxmainTime {
    color: #888;
  }
}

.boxmain:nth-child(2) .num {
  background-color: #28B779;
}

.boxmain:nth-child(3) .num {
  background-color: #eb891c;
}

.boxmain:nth-child(4) .num {
  background-color: #dd211f;
}

.boxmain:last-child {
  border-bottom: none;
}

.resources-box {
  padding: 5px 0px 10px 0px;
  display: flex;
  justify-content: space-around;
}

.resources-text {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

.el-table {
  border: none;
}

.article-right .box {
  margin: 10px 10px 10px 0px;
  padding: 10px 20px 0px 20px;
  .headline {
    color: #000000;
    font-weight: inherit;
  }
  .station .station_box1 {
    padding: 0px 20px 0px 20px;
  }
}

.article-right .box:nth-child(2) {
  border-top: 2px solid #1eb2ea;
}

.article-right .box:nth-child(1) {
  border-top: 2px solid #4fb039;
}

.el-progress__text {
  position: relative;
}

</style>
