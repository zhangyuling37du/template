<template>
  <div class="com-paint">
    <div class="com-paint-head login-box">
      <el-form ref="loginForm" :model="loginForm" label-width="100px" :rules="loginRules">
        <el-form-item label="用户名:" prop="userAccount">
          <el-input v-model="loginForm.userAccount" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="userPwd">
          <el-input v-model="loginForm.userPwd" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <div class="login-rem">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
        <el-button class="el-green" @click="onLogin('loginForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
import { sysLogin } from 'api/systemConfig'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error(this.errMsg));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error(this.errPas));
      }
      // else if (value.length < 6) {
      //   callback(new Error("密码不能小于6位"));
      // } 
      else {
        callback();
      }
    }
    return {
      btn: false, //true 已经提交过， false没有提交过
      loginForm: {
        userAccount: '',
        userPwd: ''
      },
      errMsg: "请输入正确用户名",
      errPas: "请输入密码",
      loginRules: {
        userAccount: [{ trigger: "blur", validator: validateUser }],
        userPwd: [{ trigger: "blur", validator: validatePass }]
      },
      checked: true
    }
  },
  created() {
    let $this = this;
    document.onkeydown = function(evente) {
       var e = event || window.event || arguments.callee.caller.arguments[0];
      let key = e.keyCode;
      if (key == 13) {
        $this.onLogin("loginForm");
      }
    }
  },
  computed: {
    ...mapActions([
        "USER_SIGNIN"
    ])
  },
  methods: {
    onLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { userAccount, userPwd } = this.loginForm;

          let data = {
            userAccount,
            userPwd: userPwd,
          };
          let x = JSON.stringify(this.loginForm)
           this.$store.commit("USER_SIGNIN", x)
          sysLogin(data).then(res => {
            if (res.resultStatus) {
              this.$router.push({ name: "home" });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "warning"
              });
            }
          }).catch(err => err)
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    }
  }
}

</script>
<style scoped>
.login-box {
  width: 100%;
  height: 400px;
  /*background: rgba(50, 52, 66, 0.8);*/
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
}

.login-rem {
  margin: 3px 0 10px 15px;
  /*color: #fff;*/
}

</style>
