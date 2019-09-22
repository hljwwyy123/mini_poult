<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">兑换成功</div>
      <div class="subtitle">恭喜！你的奖品已兑换成功</div>
      <div @click="navigateToList" class="button">兑换记录</div>
    </div>
    <div class="content">
      <div class="item">
        <image :src="orderDetail.goodImg" class="image" />
        <div class="info">
          <div class="item-title">{{orderDetail.goodName}}</div>
          <!-- <div class="item-subtitle">兑换数量：1</div> -->
          <div class="item-subtitle">兑换时间：{{orderDetail.exchangeTime}}</div>
        </div>
      </div>
      <div class="intro">
        <div class="intro-header">温馨提示</div>
        <div class="intro-content">
          <div v-for="(item, index) in tipsArray" :key="index" class="intro-content-text">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      orderDetail: {
        goodImg: "",
        goodName: "未知",
        exchangeTime: "0-0-0"
      }
    };
  },
  computed: {
    ...mapState({
      bookingSuccessTips: state => state.bookingSuccessTips
    }),
    tipsArray() {
      return this.bookingSuccessTips
        ? this.bookingSuccessTips.split("&")
        : [];
    }
  },
  onLoad(params) {
    console.log(this.bookingSuccessTips);
    if (params) {
      this.fetchOrderInfo(params);
    }
  },
  methods: {
    fetchOrderInfo(params) {
      if (params.openId && params.orderId) {
        this.$request({
          url: "/mp/goodExchangeDetail",
          method: "POST",
          data: {
            openid: params.openId,
            orderNum: params.orderId
          }
        }).then(res => {
          this.orderDetail = res.data;
        });
      } else {
        this.$toast("数据异常");
      }
    },
    navigateToList() {
      uni.navigateTo({
        url: "/pages/sub/order/list/index"
      });
    }
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
    height: 375upx;
    background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/booking_success_bg.png")
      no-repeat;
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
        justify-content: space-between;
        align-items: stretch;
        flex: 1;
        height: 127upx;
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
        padding-left: 27upx;
        margin-left: -27upx;
        background-image: url("~@/static/wan.png");
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 19upx 30upx;
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