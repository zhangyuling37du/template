<template>
  <div class="com-paint" v-loading.body="loading" element-loading-text="拼命加载中">
    <div class="boxmain " v-for="item in sendList" >
      <span class="num1" :style="noticeColor1" v-if="item.logLevel==1">{{item.no}}</span>
      <span class="num1" :style="noticeColor2" v-if="item.logLevel==2">{{item.no}}</span>
      <span class="num1" :style="noticeColor3" v-if="item.logLevel==3">{{item.no}}</span>
      <span class="num1" :style="noticeColor4" v-if="item.logLevel==4">{{item.no}}</span>
      <span>{{item.logContent}}</span>
      <span class="boxmainTime rg">{{item.logTime | moment }}</span>
    </div>
    <div class="block rg">
     <!--  <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="$EslConfig.pageSize" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
import 'utils/stomp.js'
import 'utils/sock.js'
import { logs } from 'api/article'
import { mapGetters } from "vuex";
let moment = require('moment');
export default {
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'MM月DD日 HH:mm:ss';
      return moment(value).format(formatString);
    },
  },
  data() {
    return {
      stompClient: 'null',
      logContent: '',
      logTime: '',
      sendList: [],
      currentPage: 1,
      count: 0,
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
      loading: true,
    }
  },
  watch: {
    currentPage(val) {
      this.logs()
    }
  },
  mounted() {
    this.logs()
  },
  computed: {
    ...mapGetters([
      "baseUrl",
    ])
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    logs() {
      logs().then(res => {
        console.log(res)
        if (res.data) {
          this.loading = false
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
       console.log(frame)
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
  }
}

</script>
<style lang="less" scoped>
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

</style>
