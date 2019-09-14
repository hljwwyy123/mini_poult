<template>
  <a
    class="back-home-container"
    :style="{top: top+'px', width: width/2+'px', height: height+'px'}"
    url="/pages/major/poult/index"
    open-type="navigateBack"
  >
    <view class="iconfont icon-home1 back-home"></view>
  </a>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      top: 26,
      left: 40,
      width: 80,
      height: 32,
      homeUrl: "/pages/major/poult/index"
    };
  },
  computed: {
    ...mapState({
      isIphoneX: state => state.isIphoneX
    })
  },
  created() {
    if (uni.canIUse("getMenuButtonBoundingClientRect")) {
      const menuData = uni.getMenuButtonBoundingClientRect();
      this.top = menuData.top;
      this.left = menuData.left;
      this.width = menuData.width;
      this.height = menuData.height;
    } else if (this.isIphoneX) {
      this.top += 20;
    }
  }
};
</script>

<style lang="scss">
.back-home-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 40upx;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 80upx;
  z-index: 3;
  .back-home {
    font-size: 42upx;
    color: white;
  }
}
</style>