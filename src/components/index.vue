</script>
<template>
  <el-row class="frame">
    <el-row :gutter="10" class="navbar" :style="{backgroundImage: 'url(' +bg + ')'}" style="min-width:64rem;margin-right:0;margin-left:0;">
      <el-col :xs="7" :sm="14" :md="18" :lg="19" class="nav-left">
        <div class='navbar-brand'>
          <img src='static/img/system-18.png' style="height:34px;" alt="" />
        </div>
        <div class="head-title">ESL System</div>
      </el-col>
      <el-col :xs="7" :sm="10" :md="6" :lg="5" class="nav-right">
        <div class="head-user">
          <div class="head-login" :style="{backgroundImage: 'url(' +bg1 + ')'}">
            <img class="head-login-man" src='static/img/system-19.png' alt="" />
            <span>超级管理员您好！</span>
            <div class='head-login-state' @click="loginOut()" :style="{backgroundImage: 'url(' +bg2 + ')'}"> <span>退出</span></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content" :class="{active:isActive}">
      <div class="content-child">
        <div class="content-inline-left">
          <div class="content-inline-left-top" :style="{backgroundImage: 'url(' +bg3 + ')'}">
            <div>
              <router-link tag="li" to="/home" active-class="active">
                <img :src="'static/img/system-1.png'" alt="" />
                <div class="left-title">系统概览</div>
              </router-link>
              <router-link tag="li" to="/commodity" active-class="active">
                <img :src="'static/img/system-2.png'" alt="" />
                <div class="left-title">商品管理</div>
              </router-link>
              <router-link tag="li" to="/template" active-class="active">
                <img :src="'static/img/system-3.png'" alt="" />
                <div class="left-title">模板配置</div>
              </router-link>
              <router-link tag="li" to="/activities" active-class="active">
                <img :src="'static/img/system-4.png'" alt="" />
                <div class="left-title">活动管理</div>
              </router-link>
              <router-link tag="li" to="/realtimelog" active-class="active">
                <img :src="'static/img/system-5.png'" alt="" />
                <div class="left-title">实时日志</div>
              </router-link>
              <router-link tag="li" to="/linkDevice" active-class="active">
                <img :src="'static/img/system-6.png'" alt="" />
                <div class="left-title">设备管理</div>
              </router-link>
              <router-link tag="li" to="/linkSystem" active-class="active">
                <img :src="'static/img/system-7.png'" alt="" />
                <div class="left-title">系统管理</div>
              </router-link>
            </div>
          </div>
          <div class="content-inline-left-bot" @click="leftBotMenu" :style="{backgroundImage: 'url(' +bg4 + ')'}"></div>
        </div>
        <div class="content-right">
          <router-view class="view">
          </router-view>
          <footer>思创医惠科技股份有限公司 www.century-cn.com</footer>
        </div>
      </div>
    </div>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex';
import 'assets/public/publicCom.less'
export default {
  data() {
    return {
      leftMenus: [
        { "name": "系统概览" },
        { "name": "商品管理" },
        { "name": "模板配置" },
        { "name": "活动管理" },
        { "name": "库存管理" },
        { "name": "设备管理" },
        { "name": "系统观理" },

      ],
      isActive: false,
      router: '',
      imgurl: '',
      leftActive: '',
      src: '',
      router: '',
      bg: 'static/img/system-20.jpg',
      bg1: 'static/img/system-24.png',
      bg2: 'static/img/system-25.png',
      bg3: 'static/img/system-14.jpg',
      bg4: 'static/img/system-26.jpg'
    }
  },

  methods: {
    loginOut() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 路由跳转登录页面
        this.$router.push({ name: "login" });
      }).catch(err => err);
    },
    leftBotMenu() {
      // this.isActive = !this.isActive
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'userName',
        'rightMenuId',
        'leftMenus',
      ]),
      leftActive() {
        return 't' + 1
      }
    },
    leftMenuTap(index) {
      if (this.$route.path === '/') {
        this.$router.push({ path: '/index' })
      }
    },
  }
}

</script>
<style scoped lang="less">
.content {
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 0;
  right: 0;
  background: #fff;
}

.content-child {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}

.navbar {
  z-index: 1;
  margin-bottom: 0;
  border-radius: inherit;
  color: #666666;
  background-size: cover;
  margin-left: 0;
  margin-right: 0;
}

.navbar-brand {
  padding: 0 2rem;
  height: 100%;
  width: 50px;
  float: left;
  margin-top: 8px;
}

.head-title {
  float: left;
  min-height: 50px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0 45px;
  color: #fff;
  font-weight: bold;
}

.head-user {
  font-size: 1rem;
  float: right;
  margin-right: 1rem;
  color: #fff;
}

.head-login {
  width: 212px;
  height: 28px;
  margin: 11px 10px;
}

.head-login-man {
  z-index: 1;
  float: left;
  margin: 5px 12px 5px 5px;
}

.head-user span {
  height: 28px;
  line-height: 28px;
  float: left;
}

.head-login-state {
  cursor: pointer;
  margin-right: 0;
  float: right;
  width: 50px;
  height: 22px;
  margin: 3px;
}

.head-login-state span {
  height: 22px;
  line-height: 22px;
  text-align: center;
  width: 50px;
}

.nav-left {
  min-width: 360px;
}

.nav-right {
  float: right;
}

.left-title {
  // margin-top:-5px;
  color: #fff;
}

.content-inline-left {
  width: 100px;
  min-width: 100px;
  height: 100%;
  position: relative;
  .el-menu-item,
  .el-submenu__title {
    line-height: 45px;
  }
}

.content-inline-left-top {
  height: 90%;
  /*min-height: 700px;*/
  background-size: cover;
  overflow-y: auto;
  div {
    li {
      height: 14.285%;
      min-height: 114px; // min-height: 120px;
      text-align: center;
      border-bottom: 1px solid #82b2b2;
      img {
        margin-top: 20px;
      }
      div{
        margin-top: 17px;
      }
    }
  }
}
li:hover,:focus{
  cursor: pointer;
}
li.active {
  background-color: #e4e4e4;
  border-left: 5px solid #126f7e;
  div {
    color: #126f7e;

  }
}
.content-inline-left-bot {
  background: no-repeat;
  height: 10%;
  background-size: 100% 100%;
}
@keyframes animate {
  0% {
    width: 100px;
  }
  100% {
    width: 10px;
  }
}

@-webkit-keyframes animate {
  0% {
    width: 100px;
  }
  100% {
    width: 10px;
  }
}

@-moz-keyframes animate {
  0% {
    width: 100px;
  }
  100% {
    width: 10px;
  }
}

@-o-keyframes animate {
  0% {
    width: 100px;
  }
  100% {
    width: 10px;
  }
}

.content.active {
  .content-inline-left {
    width: 10px;
    min-width: 10px;
    border-left: none;
    -webkit-animation: animate .2s linear 1;
    animation: animate .2s linear 1;
    -o-animation: animate .2s linear 1;
    -moz-animation: animate .2s linear 1;
  }
  .content-inline-left li {
    border-left: none;
  }
}
.content.active .content-inline-left-top {
  background: #e6e6e6;
}
.content.active .content-inline-left-bottom {
  background: url("/static/img/arrow_right.jpg") no-repeat;
  width: 10px;
  height: 49px;
}
.content-right {
  width: 100%;
  height: 100%;
  flex: 7;
  background-color: #e4e4e4;
  overflow-x: auto;
}

.view {
  height: 96%; // width:100%;
  overflow: auto;
  transition: all .28s ease-out;
  background: #e4e4e4;
}

footer {
  // background-color: #d9d9d9;
  height: 20px; // position: absolute;
  font-size: 1.1rem;
  text-align: center;
  bottom: 0;
  color: #9aa6ac; // width: 94%;
}

</style>
