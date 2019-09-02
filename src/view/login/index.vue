<template>
  <div class="login-wrapper">
    <div class="login-main">
      <div class="logo">
        <img src="./img/login_logo.png" alt />
      </div>
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="12">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-button @click='btnCode' :disabled="sec!=60">{{sec==60?'发送验证码':'还有'+sec+'秒'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop='check'>
          <el-checkbox v-model="ruleForm.check"><span>我已阅读并同意</span><a href="javascript:void(0);">用户协议</a>和<a href="javascript:void(0);">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="btnLogin('ruleForm')" v-loading="isLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
import axios from 'axios'
export default {
  data() {
    return {
     isLoading:false,
      sec:60,
      ruleForm: {
        mobile: "18801185985",
        code: "",
        check:true
      },
      rules: {
        mobile: [
           { required: true, message: '请输入手机号码', trigger: 'blur' },
          //  为必须，若为空，则提示'请输入手机号码'
           { len:11, message: '请输入11位正确的手机号码', trigger: 'blur' }
          //  判断长度，当不满足长度条件时，提示'请输入11位正确的手机号码'
        ],
        code: [
           { required: true, message: '请输入验证码', trigger: 'blur' },
           { len:6, message: '请输入6位正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    btnCode() {
      // 手机号为空的提示
      if(this.ruleForm.mobile == '') {
        this.$message.error('请输入手机号码')
        return
      }
      // 定时器，数据减少
      // 箭头函数--箭头函数没有自己的this，它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值
      // 箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。
      // 点击了发送验证码，则按钮不可再点击
      let timerId = setInterval(()=>{
        this.sec--
        if(this.sec == 58) {
          this.ruleForm.code = '246810';
        }
        if(this.sec == 0) {
          // 当为0时消除定时器
          clearInterval(timerId)
          this.sec = 60
        }
      },1000)
    },
    btnLogin(formName){
     this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoading = true
            // 发送请求，获取数据判断进行登录
            axios.post("http://ttapi.research.itcast.cn/mp/v1_0/authorizations",{
             mobile: this.ruleForm.mobile,
             code:this.ruleForm.code
            })
            .then(res=>{
              // console.log(res);
              // sessionStorage保存的只能是字符串，所以需要进行转换
              let arr = JSON.stringify(res.data.data)
              window.sessionStorage.setItem('user_info',arr)
              // console.log(arr);

              if(res.data.data) {
                this.$message('登录成功');
                this.$router.push('/home')
              }else {
                this.isLoading = false
                this.$message.error('手机号码或者验证码错误')
                return
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
    }
  }
};
</script>

<style lang="less" escoped>
.login-wrapper {
  height: 100%;
  background: url("./img/login_bg.jpg") no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-main {
    text-align: center;
    width: 300px;
    background: #fff;
    padding: 40px;
    .logo {
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>