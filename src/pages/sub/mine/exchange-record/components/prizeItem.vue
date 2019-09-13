<template>
  <view class="prize-item active" @click="gotoDetail(prize.id)">
    <image class="prize-item-img" :src="prize.goodImg || '/static/goods.jpg'" />
    <div class="prize-info">
      <div class="prize-title">{{prize.goodName}}</div>
      <div class="prize-price">
        <image src="https://poult-1300165852.cos.ap-beijing.myqcloud.com/wan.png" class="wan-icon"></image>
        {{prize.goodVirtual}}
      </div>
      <div class="exchange-date">兑换日期：{{prize.date || '2019-09-26'}}</div>
    </div>
    <view class="iconfont icon-arrow_right"></view>
  </view>
</template>
<script>
export default {
  props: {
    prize: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    gotoDetail(orderId){
      uni.navigateTo({
        url: `/pages/sub/order/detail/index?orderId=${orderId}`
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
      display: flex;
      margin: 10upx 0 22upx 0;
      font-size: 14px;
      color: #fb6f72;
      font-weight: 500;
      align-items: center;
      .wan-icon {
        display: inline-block;
        margin-right: 8upx;
        width: 16upx;
        height: 26upx;
      }
    }
    .exchange-date{
      color:#676C7C;
    }
  }
  .icon-text{
    color: #A4ADC0
  }
}
</style>