<template>
  <view v-if="step <= 2 && isVisible" class="wrapper">
    <view class="guide">
      <view class="step1">
        <view v-show="step === 1">
          <view class="step-content top"></view>
          <view class="text top">
            点我进入个人主页
            更多奖品等你哦~
          </view>
        </view>
      </view>
      <view class="step2">
        <view v-show="step === 2">
          <view class="text bottom">
            点这里
            可以揍附近人的小鸡哦~
          </view>
          <view class="winding-arrow"></view>
          <view class="step-content bottom"></view>
        </view>
      </view>
    </view>
    <view @click="handleNext" class="next-button"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      isVisible: false
    };
  },
  mounted() {
    uni.getStorage({
      key: "isShowGiud",
      success: res => {
        const { data } = res;
        this.isVisible = data;
      },
      fail: () => {
        this.isVisible = true;
      }
    });
  },
  methods: {
    handleNext() {
      this.step += 1;
      if (this.step > 2) {
        uni.setStorage({
          key: "isShowGiud",
          data: false
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  .guide {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    .step1,
    .step2 {
      position: relative;
      flex: 1;
      background-color: rgba(0, 0, 0, 0.7);
      box-sizing: border-box;
      .step-content {
        position: absolute;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        &.top {
          width: 387upx;
          height: 251upx;
          background-image: url("~@/static/header-winding-arrow.png");
          top: 100upx;
          left: 23upx;
        }
        &.bottom {
          background-image: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/guid-tabs.png");
          width: 100vw;
          height: 37vw;
          bottom: 0;
          left: 0;
        }
      }
      .winding-arrow {
        position: absolute;
        top: 160upx;
        width: 100%;
        height: 217upx;
        background-image: url("~@/static/winding-arrow.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 60upx 180upx;
      }
    }
    .text {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      color: #fff;
      width: 50vw;
      font-size: 40upx;
      font-family: "HanziPenSC-W5", HanziPenSC;
      &.top {
        top: 65%;
      }
      &.bottom {
        top: 10%;
      }
    }
  }
  .next-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 37vw;
    height: 13vw;
    transform: translate(-50%, -50%);
    background-image: url("~@/static/next-button.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>