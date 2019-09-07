<template>
  <view class="list-item">
    <image class="prize-img" :src="prize.picture" />
    <div class="prize-info">
      <div class="prize-title">{{prize.name}}</div>
      <div class="prize-price">
        <div class="prize-source-price">{{prize.originPrice}}大力丸</div>
        {{prize.price}}
      </div>
      <div class="prize-changeNum">已兑换: {{prize.changedNum}}</div>
      <div class="prize-remainNum">剩余: {{prize.remainNum}}</div>
    </div>
    <a url="/pages/major/mine/index" v-if="prize.remainNum > 0" class="prize-button">立即兑换</a>
    <div v-else class="prize-button no-remain">已兑换完</div>
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
.list-item {
  display: flex;
  margin: 30upx 30upx 30upx 44upx;
  align-items: center;
  justify-content: space-between;
  height: 165upx;
  line-height: 165upx;
  font-weight: bold;
  font-size: 32upx;
  color: #333;
  background: #fff;
  .prize-img {
    width: 165upx;
    height: 165upx;
    border-radius: 8upx;
    margin-right: 30upx;
  }
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