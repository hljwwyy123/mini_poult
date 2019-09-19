<template>
  <div class="wrapper">
    <image class="image" :src="goodsInfo.goodImg" />
    <div class="content">
      <div class="title">{{goodsInfo.goodName || '暂无'}}</div>
      <div class="info">
        <div>
          <div class="price">{{goodsInfo.goodDownVirtual || 0}}</div>
          <div class="source-price">{{goodsInfo.goodVirtual || 0}}大力丸</div>
        </div>
        <div class="source-price">实际商品价格：{{goodsInfo.goodPrice || 0}}元</div>
      </div>
      <div class="address" @click="getAddrees">
        <div v-if="!address.telNumber" class="address-button">添加地址</div>
        <div v-else class="address-content">
          <div class="address-info">
            <div class="address-info-header">
              <div style="padding-right: 10upx">{{address.userName}}</div>
              <div>{{address.telNumber}}</div>
            </div>
            <div
              class="address-info-footer"
            >{{address.provinceName}} {{address.cityName}} {{address.countyName}} {{address.detailInfo}}</div>
          </div>
          <div class="iconfont icon-arrow_right"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div class="text">剩余大力丸:</div>
        {{userData.score}}
      </div>
      <div @click="handleBooking" class="footer-right">{{canBuy ? "立即兑换" : "大力丸不足，去赚取"}}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      goodsInfo: {
        goodDownVirtual: 0
      },
      address: {},
      userData: {
        score: 0
      }
    };
  },
  onLoad(param) {
    // fetch prizes info
    // fetch 大力丸 info
    this.param = param;
    this.fetchGoodsInfo();
    this.getUserData();
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    }),
    canBuy() {
      // return this.userData.score >= this.goodsInfo.goodDownVirtual;
      return true;
    }
  },
  methods: {
    handleBooking() {
      if (this.canBuy) {
        if (this.address.telNumber) {
          this.$request({
            url: "/mp/goodExchangeById",
            method: "POST",
            data: {
              openid: this.openId,
              goodId: this.param.goodsId,
              score: this.goodsInfo.goodDownVirtual,
              ...this.address,
              telNumber: '15210000000' // FIXME: 测试
            }
          }).then(res => {
            console.log("res ", res);
            uni.redirectTo({
              url: `/pages/sub/order/booking/success/index?orderId=${res.orderNum}&openId=${this.openId}`
            });
          });
        } else {
          uni.showToast({
            title: "请选择地址",
            icon: "none",
            duration: 2000
          });
        }
      } else {
        uni.navigateTo({
          url: "/pages/major/poult/index"
        });
      }
    },
    async fetchGoodsInfo() {
      if (this.param.goodsId) {
        this.$request({
          url: "/mp/goodDetailById",
          method: "POST",
          data: {
            goodId: this.param.goodsId
          }
        }).then(res => {
          this.goodsInfo = res;
        });
      }
    },
    getUserData() {
      this.$request({
        url: "/mp/index",
        method: "POST",
        data: {
          openid: this.openId
        }
      }).then(res => (this.userData = res));
    },
    getAddrees() {
      uni.chooseAddress({
        success: res => {
          console.log(res);
           delete res.errMsg;
          this.address = res;
        },
        fail(error) {
          console.error(error);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 30upx;
  .image {
    width: 100%;
    height: 434upx;
    border-radius: 20upx;
  }
  .content {
    padding-top: 20upx;
    padding-bottom: 20upx;
    .title {
      font-size: 32upx;
      color: #000;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10upx;
      padding-bottom: 10upx;
      .price {
        display: inline-block;
        font-size: 30upx;
        color: #fb6f72;
        margin-right: 10upx;
        padding-left: 24upx;
        background-image: url("~@/static/wan.png");
        background-repeat: no-repeat;
        background-size: 16upx 26upx;
        background-position: left center;
      }
      .source-price {
        display: inline-block;
        color: #676c7c;
        text-decoration: line-through;
        font-size: 24upx;
      }
    }
    .address {
      padding-top: 30upx;
      .address-button {
        display: inline-block;
        box-sizing: border-box;
        height: 65upx;
        padding: 10upx 20upx;
        border-radius: 33upx;
        color: #fb6f72;
        font-size: 28upx;
        border: 1upx solid #fb6f72;
      }
      .address-content {
        display: flex;
        align-items: center;
      }
      .address-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        &-header {
          display: flex;
          color: #000;
          font-size: 32upx;
        }
        &-footer {
          color: rgba(69, 31, 31, 0.52);
          font-size: 28upx;
        }
      }
    }
  }
  .footer {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    &-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      min-width: 50%;
      height: 100%;
      padding-right: 30upx;
      padding-left: 30upx;
      box-sizing: border-box;
      box-shadow: 0 -1upx 0upx 0upx rgba(0, 0, 0, 0.03);
      font-size: 28upx;
      color: #272727;
      .text {
        color: #9fa1a7;
        font-size: 18upx;
        padding-right: 20upx;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      background-color: #fb6f72;
      color: #fff;
      font-size: 36upx;
    }
  }
}
</style>