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
            success: res => {
              self.$store.commit("loginWx", res.userInfo);
            }
          });
          self.$store.commit("authed", true);
        } else {
          self.$store.commit("authed", false);
        }
      }
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
