<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getUserInfo, autoUpdateManager } from "@/utils/index.js";

export default {
  created() {
    const _this = this;
    autoUpdateManager();
    // 获取用户信息
    // getUserInfo();
    wx.getSystemInfo({
      success: function(res) {
        _this.$store.commit("updateWindowIneerHeight", res.windowHeight);
        _this.$store.commit("updateDPR", res.pixelRatio);
        _this.$store.commit("updateWindowWidth", res.windowWidth);
        _this.$store.commit("updateModel", res.model);
      }
    });
  }
};
</script>