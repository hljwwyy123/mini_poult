<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">兑换成功</div>
      <div class="subtitle">恭喜！你的奖品已兑换成功</div>
      <div class="button">兑换记录</div>
    </div>
    <div class="content">
      <div class="item">
        <div class="image">image</div>
        <div class="info">
          <div class="item-title">空气加湿器</div>
          <div class="item-subtitle">兑换数量：1</div>
          <div class="item-subtitle">兑换时间：2019-09-26</div>
        </div>
      </div>
      <div class="intro">
        <div class="intro-header">温馨提示</div>
        <div class="intro-content">
          <div class="intro-content-text">10元抵用券（满30可用）</div>
          <div class="intro-content-text">使用说明：</div>
          <div class="intro-content-text">
            1.兑换成功后，将订单详情截图（在“我的”-“兑换
            记录”-“订单详情”）
          </div>
          <div class="intro-content-text">
            2.打开淘宝，搜索店铺“马蜂窝旗舰店”，将砍价订
            单详情截图发送给店铺客服即可享受立减。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 360upx;
    background-image: linear-gradient(90deg, #ffb784, #fb6f72);
    background-size: 100% 100%;
    background-position: center;
    text-align: center;
    color: #fff;
    .title {
      font-size: 70upx;
      font-weight: 600;
      line-height: 98upx;
    }
    .subtitle {
      font-size: 26upx;
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 47upx;
      background-color: #ffea9a;
      color: #f4595d;
      font-size: 42upx;
      font-weight: 500;
      margin-top: 33upx;
      width: 66.6667vw;
      height: 93upx;
    }
  }
  .content {
    padding: 30upx;
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 30upx;
      border-bottom: 1px solid #eaecf0;
      .image {
        width: 127upx;
        height: 127upx;
        border-radius: 15upx;
        margin-right: 25upx;
        background-color: #f4f4f4;
      }
      .info {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        .item-title {
          font-size: 32upx;
          color: #000;
          font-weight: 500;
        }
        .item-subtitle {
          font-size: 24upx;
          color: #676c7c;
        }
      }
    }
    .intro {
      padding: 30upx;
      .intro-header {
        color: #000;
        font-size: 28upx;
      }
      .intro-content {
        color: #999;
        font-size: 28upx;
        .intro-content-text {
          padding-top: 10upx;
          line-height: 40upx;
        }
      }
    }
  }
}
</style>