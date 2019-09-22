<template>
  <div class="tips">
    <div v-if="tips.length" class="tips-content">
      <view class="iconfont icon-notice tips-icon"></view>
      <swiper class="swiper" autoplay circular vertical skip-hidden-item-layout :interval="2000">
        <block v-for="item in tips" :key="item.title">
          <swiper-item class="swiper-item">
            <view class="swiper-item-content">{{item.content}}</view>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tips: []
    };
  },
  async mounted() {
    this.$request({
      url: "/mp/newsNotify",
      // url: '/mp/goodsExchangeNotify' // 后续 需要切换的接口
    }).then(res => {
      this.tips = res;
    });
  }
};
</script>

<style scoped lang="scss">
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  .tips-content {
    display: flex;
    align-items: center;
    width: 490upx;
    height: 58upx;
    background-color: rgba(251, 111, 114, 0.06);
    border-radius: 29upx;
    font-size: 24upx;
    padding: 0 30upx;
    box-sizing: border-box;
    margin-top: 26upx;
    .tips-icon {
      margin-top: 6upx;
    }
    .swiper {
      flex: 1;
      height: 100%;
    }
    .swiper-item {
      display: flex;
      align-items: center;
      color: #676c7c;
      &-content {
        padding-left: 10upx;
      }
    }
  }
}
</style>