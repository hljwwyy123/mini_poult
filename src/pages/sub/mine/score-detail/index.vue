<template>
  <div class="wrapper">
    <div class="header">
      <div class="tips">了解大力丸</div>
      <div class="count">1360</div>
      <div class="info">我的大力丸余额</div>
      <div class="button">邀请好友赚100大力丸</div>
    </div>
    <div class="content">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="item-left">
            <div class="item-title">{{item.title}}</div>
            <div class="item-subtitle">{{item.time}}</div>
          </div>
          <div class="item-right">
            <div class="item-detail">{{item.detail}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "7天打卡",
          time: "2019-08-27 16:28:32",
          detail: "-20"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "@/styles/common.scss";
</style>

<style scoped lang="scss">
.wrapper {
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400upx;
    background-image: linear-gradient(45deg, #ffb784, #fb6f72);
    color: #fff;
    .tips {
      font-size: 30upx;
      align-self: flex-end;
      padding-right: 10upx;
    }
    .count {
      font-size: 80upx;
      font-weight: 600;
      line-height: 112upx;
    }
    .info {
      font-size: 26upx;
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 84vw;
      height: 12.4vw;
      background-color: #ffea9a;
      font-size: 42upx;
      color: #f4595d;
      border-radius: 6.2vw;
      margin-top: 30upx;
    }
  }
  .item-detail {
    font-size: 32upx;
    font-weight: 500;
    color: #fb6f72;
  }
}
</style>