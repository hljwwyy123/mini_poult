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
export default {
  data() {
    return {
      top: 40,
      left: 40,
      width: 120,
      height: 80,
      homeUrl: "/pages/major/poult/index"
    };
  },
  created() {
    if (uni.canIUse("getMenuButtonBoundingClientRect")) {
      const menuData = uni.getMenuButtonBoundingClientRect();
      this.top = menuData.top;
      this.left = menuData.left;
      this.width = menuData.width;
      this.height = menuData.height;
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