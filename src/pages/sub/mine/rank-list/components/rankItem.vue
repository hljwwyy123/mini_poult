<template>
  <view class="list-item">
    <view class="avatar-container">
      <view class="rank" :class="{top: data.rank < 3}">
        <view class="rank-num">{{data.rank}}</view>
      </view>
      <image class="avatar" :src="data.avatar" />
      <view class="top-mark" v-if="data.rank < 3" />
    </view>
    <view class="name">{{data.name}}</view>
    <view class="score" :class="{top: data.rank < 3}">{{data.score}}</view>
  </view>
</template>
<script>
export default {
  props: {
    data: {}
  }
};
</script>
<style scoped lang="scss">
.list-item {
  display: flex;
  margin: 0 40upx;
  align-items: center;
  justify-content: space-between;
  height: 140upx;
  line-height: 140upx;
  font-weight: bold;
  font-size: 32upx;
  color: #333;
  &:nth-child(even) {
    background: rgba(255, 183, 132, 0.07);
  }
  &:last-child {
    border-radius: 0 20upx 20upx 0;
  }
  .avatar-container {
    position: relative;
    display: flex;
    align-items: center;
    .rank {
      position: relative;
      width: 90upx;
      margin-right: -32upx;
      height: 59upx;
      line-height: 59upx;
      color: #fea47f;
      font-size: 30upx;
      font-weight: 600;
      .rank-num {
        text-align: right;
        width: 45upx;
        position: absolute;
        left: 6upx;
        top: 0;
      }
      &.top {
        color: white;
        background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/top-rank.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .avatar {
      position: relative;
      margin-left: auto;
      width: 102upx;
      height: 102upx;
      border-radius: 50%;
      border: 8upx solid white;
    }
    .top-mark {
      position: absolute;
      top: -25upx;
      right: -27upx;
      width: 60upx;
      height: 60upx;
      background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/avatar-mark.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .name {
    margin: 0 23upx;
    font-size: 32upx;
    color: #000000;
    flex: 1;
  }
  .score {
    width: 80upx;
    color: rgba(69, 31, 31, 0.52);
    font-size: 36upx;
    text-align: right;
    &.top {
      color: #fb6f72;
    }
  }
}
</style>