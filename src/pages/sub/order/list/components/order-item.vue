<template>
  <view @click="navigateToDetail" class="prize-item">
    <image class="prize-item-img" :src="order.goodImg || '/static/goods.jpg'" />
    <div class="prize-info">
      <div class="prize-title">{{order.goodName}}</div>
      <div class="prize-price">{{order.score}}</div>
      <div class="prize-remainNum">兑换日期: {{order.exchangeTime}}</div>
    </div>
    <view>
      <view class="prize-button iconfont icon-arrow_right"></view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: {}
    }
  },
  methods: {
    navigateToDetail() {
      uni.navigateTo({
        url: `/pages/sub/order/detail/index?orderId=${this.order.orderNum}`
      });
    }
  }
};
</script>
<style scoped lang="scss">
.prize-item {
  .prize-info {
    display: flex;
    flex: 1;
    line-height: 1.4;
    flex-direction: column;
    justify-content: space-between;
    font-size: 24upx;
    color: #676c7c;
    .prize-title {
      font-size: 32upx;
      margin: 8upx 0;
      color: #000;
      font-weight: 500;
      line-height: 1;
    }
    .prize-price {
      font-size: 14px;
      color: #fb6f72;
      font-weight: 500;
      background-image: url("~@/static/wan.png");
      background-repeat: no-repeat;
      background-size: 16upx 26upx;
      background-position: left center;
      padding-left: 20upx;
    }
    .prize-source-price {
      display: inline-block;
      font-size: 24upx;
      color: #676c7c;
      text-decoration: line-through;
      padding-right: 10upx;
    }
  }
  .prize-button {
    width: 32upx;
    height: 32upx;
  }
}
</style>