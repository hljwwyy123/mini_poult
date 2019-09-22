<template>
  <view class="prize-item">
    <image class="prize-item-img" :src="prize.goodImg || '/static/goods.jpg'" />
    <div class="prize-info">
      <div class="prize-title">{{prize.goodName}}</div>
      <div class="prize-price">
        <view
          class="prize-virtual-price"
          v-if="!!prize.goodDownVirtual"
        >{{prize.goodDownVirtual || prize.goodVirtual || 0}}</view>
        <div
          :class="['prize-source-price', !!prize.goodDownVirtual ? 'disabled' : '']"
        >{{prize.goodVirtual}}大力丸</div>
      </div>
      <div class="prize-changeNum">已兑换: {{prize.goodNum}}</div>
      <div class="prize-remainNum">剩余: {{prize.goodNum}}</div>
    </div>
    <a
      :url="`/pages/sub/order/booking/index?goodsId=${prize.id}`"
      v-if="prize.goodNum > 0"
      class="prize-button"
    >立即兑换</a>
    <div v-else class="prize-button no-remain">已抢光</div>
  </view>
</template>
<script>
export default {
  props: {
    prize: {}
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
    height: 100%;
    .prize-title {
      font-size: 32upx;
      margin-bottom: 8upx;
      color: #000;
      font-weight: 500;
      line-height: 1;
    }
    .prize-price {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      padding-left: 22upx;
      background-image: url("~@/static/wan.png");
      background-repeat: no-repeat;
      background-size: 16upx 26upx;
      background-position: left center;
    }
    .prize-virtual-price {
      font-size: 28upx;
      color: #fb6f72;
      font-weight: 500;
      line-height: 28upx;
      padding-right: 10upx;
    }
    .prize-source-price {
      display: inline-block;
      font-size: 24upx;
      color: #676c7c;

      line-height: 28upx;
      &.disabled {
        text-decoration: line-through;
      }
    }
  }
  .prize-button {
    width: 166upx;
    height: 65upx;
    line-height: 65upx;
    text-align: center;
    background-color: rgba(251, 111, 114, 0.09);
    border-radius: 33upx;
    font-size: 28upx;
    color: #fb6f72;
    &.no-remain {
      background: rgba(0, 0, 0, 0.09);
      color: #a1a1a1;
    }
  }
}
</style>