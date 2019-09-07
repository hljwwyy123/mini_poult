<template>
  <view class="empty-holder">
    <image src="/static/img-holder.png" />
    <view class="holder-text" v-if="text">{{text}}</view>
  </view>
</template>
<script>
export default {
  props: {
    text: ""
  }
};
</script>
<style scoped lang="scss">
.empty-holder {
  margin: 200upx auto;
  width: 100%;
  text-align: center;
  image {
    margin: auto;
    width: 280upx;
    height: 165upx;
  }
  .holder-text {
    width: 100%;
    text-align: center;
    color: #999999;
    font-size: 32upx;
  }
}
</style>