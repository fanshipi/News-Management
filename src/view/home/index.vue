<template>
  <el-container class="my-container">
    <el-aside width="200px" class="my-aside">
      <el-container style="marginBottom:1px;background: #f2f3f5;">
        <el-header class="my-aside-header" style="width:200px;height:100px;padding:0">
          <img
            src="http://img3.imgtn.bdimg.com/it/u=520709884,3171189443&fm=11&gp=0.jpg"
            style="width:100%;height:100%;marginTop:-5px;"
            alt
          />
        </el-header>
        <el-main class="my-aside-main">
          <el-menu
            :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#14607a"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
            <el-menu-item index="/homepage">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/publish">发布文章</el-menu-item>
                <el-menu-item index="/article">内容列表</el-menu-item>
                <el-menu-item index="/comment">评论列表</el-menu-item>
                <el-menu-item index="/media">素材管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-chat-dot-square"></i>
                <span>粉丝管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">图文数据</el-menu-item>
                <el-menu-item index="/overview">粉丝概况</el-menu-item>
                <el-menu-item index="3-3">粉丝画像</el-menu-item>
                <el-menu-item index="3-4">粉丝列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/account">
              <i class="el-icon-user-solid"></i>
              <span slot="title">账户信息</span>
            </el-menu-item>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <el-main class="my-main">
      <el-container>
        <el-header class="my-main-header">
          <el-row class="my-row">
            <el-col :span="12">
              <span>广州云青汇科技有限公司</span>
            </el-col>

            <el-col :span="6" :offset="4" class="searchInfo">
              <el-input placeholder="请输入搜索内容" class="inputTxt">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>

            <el-col :span="2">
              <span style="margin-left:20px;">消息</span>
            </el-col>

            <el-col :span="4" style="display:flex;">
              <img :src="$store.state.userInfo.photo" alt />
              <el-dropdown trigger="click" @command="handleCommand" class="my-dropdown">
                <span class="el-dropdown-link">
                  <span class="userCenter">{{$store.state.userInfo.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus" command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus" command="git">git地址</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline" command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="my-main-main">
          <router-view></router-view>
          <!-- <el-row class="my-main-main-title">
            <el-col :span="6">
              <ul>
                <li><img src="./pugongying2.jpg" alt=""></li>
                <li><span>黑马头条官方账号</span>
              <span>视频发布</span></li>
              </ul>
            </el-col>
            <el-col :span="14" :offset="10">
              <ul class="count">
                <li><span>222</span><span>粉丝数</span></li><li class="line"></li>
                <li><span>333</span><span>累计阅读量</span></li><li class="line"></li>
                <li><span>444</span><span>累计评论数</span></li>
              </ul>
            </el-col>
          </el-row>-->
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      userInfo: {
        name: "",
        photo: ""
      }
    };
  },
  created() {
    // let res = window.sessionStorage.getItem("user_info");
    // // 获取到登录页面的登录信息，并转成对象
    // let obj = JSON.parse(res);

    // this.userInfo.name = obj.name;
    // this.userInfo.photo = obj.photo;

    // 判断有没有登录
    this.$axios.get("/mp/v1_0/user/profile").then(res => {
      this.$store.commit("changeUserInfo", res.data.data);
    });
  },
  methods: {
    handleCommand(command) {
      // logout
      // 页面跳转
      // 消除当前的登录信息
      if (command == "logout") {
        window.sessionStorage.removeItem("user_info");
        this.$router.push("/login");
      } else if (command == "git") {
        // git跳转页面
        window.open("https://github.com/fanshipi/studePull");
      }
    }
  }
};
</script>
<style lang='less' escoped>
.my-container {
  background: #f2f3f5;
  height: 100%;
  .my-aside {
    height: 100%;
    background: #323745;
    overflow: hidden;
    background-color: #14607a;
    .my-aside-header {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .my-aside-main {
      padding: 0;
    }
  }
  .el-menu {
    border-right: 0;
  }
  .my-main {
    padding: 0;
    .my-main-header {
      background: #fff;
      padding: 10px;
      .my-row {
        height: 100%;
        width: 100%;
        display: flex;
        // justify-content: center;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .my-dropdown {
          width: 100%;
          margin-top: 10px;
          .el-dropdown-link {
            display: flex;
            justify-content: center;
            align-items: center;
            .userCenter {
              margin: 0 10px;
            }
          }
        }
      }
    }
    .my-main-main {
      .my-main-main-title {
        padding: 6px 5px;
        background: #fff;
        border: 1px solid #e7e7e9;
        height: 100%;
        display: flex;
        align-items: center;
        li {
          float: left;
          font-size: 14px;

          &:nth-child(2) {
            margin-left: 5px;
            margin-top: 6px;
            span:nth-child(2) {
              color: #ccc;
              margin-right: -56px;
            }
          }

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        ul.count {
          li {
            width: 148px;
            text-align: center;
            &.line {
              width: 1px;
              height: 40px;
              background: #eee;
            }
            span {
              display: block;
              &:nth-child(2) {
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
}
</style>
