<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { autoUpdateManager } from "@/utils/index.js";
export default {
  onLaunch: function() {
    const self = this;
    uni.getSystemInfo({
      success: function(res) {
        //model中包含着设备信息
        console.log(res.model);
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
</style>
