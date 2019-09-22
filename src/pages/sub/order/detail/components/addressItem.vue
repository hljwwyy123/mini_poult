<template>
  <view class="address-item">
    <view class="concat-info">{{concatInfo || ''}}</view>
    <view class="concat-address">{{concatAddress || ''}}</view>
  </view>
</template>

<script>
export default {
  props: {
    concatInfo: "",
    concatAddress: ""
  }
};
</script>

<style lang="scss">
.address-item {
  padding: 28upx 0;
  border-top: 1upx solid #eaecf0;
  border-bottom: 1upx solid #eaecf0;
  min-height: 70upx;
  .concat-info {
    font-size: 32upx;
    color: #000000;
  }
  .concat-address {
    font-size: 28upx;
    color: #451f1f;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
