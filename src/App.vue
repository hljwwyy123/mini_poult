<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { login, autoUpdateManager } from "@/utils/index.js";
export default {
  onLaunch: function() {
    const self = this;
    // 获取用户信息写入vuex
    uni.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          uni.getUserInfo({
            success: info => {
              self.$store.commit("setUserInfo", info.userInfo);
              // NOTE: login 放到授权后来做
              // 1. 登录传入头像和昵称等信息
              // 2. 避免未授权的情况下请求接口 造成页面展示不统一
              login(info.userInfo);
            }
          });
          self.$store.commit("authed", true);
        } else {
          self.$store.commit("authed", false);
        }
      }
    });
    // 获取公共信息
    this.$request({
      url: "/mp/commonInterface",
      method: "GET"
    }).then(res => {
      self.$store.commit("setRateConfig", res);
    });
    uni.getSystemInfo({
      success: function(res) {
        //model中包含着设备信息
        var model = res.model;
        if (model.search("iPhone X") != -1) {
          // app.globalData.isIpx = true;
          self.$store.commit("updateIsIphoneX", true);
        }
      }
    });
    autoUpdateManager();
  },
  onShow: function() {
    // console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style>
@import "./common/css/common.css";
@import "./common/css/iconfont.css";
</style>
