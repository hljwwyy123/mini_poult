<template>
  <div class="wrapper">
    <image class="image" mode="aspectFill" :src="goodsInfo.goodImg" />
    <div class="content">
      <div class="title">{{goodsInfo.goodName || '暂无'}}</div>
      <div class="info">
        <div>
          <div class="price">{{goodsInfo.goodDownVirtual || goodsInfo.goodVirtual || 0}}</div>
          <div
            v-if="!!goodsInfo.goodDownVirtual"
            class="source-price"
          >{{goodsInfo.goodVirtual || 0}}元气值</div>
        </div>
        <div class="source-price">实际商品价格：{{goodsInfo.goodPrice || 0}}元</div>
      </div>
      <div class="address">
        <div v-if="reAuthAddress">
          <button
            class="address-button"
            style="boder:none"
            open-type="openSetting"
            @opensetting="openSettingHandler"
          >添加地址</button>
        </div>
        <div v-else @click="getAddrees">
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
    </div>
    <div class="footer" :class="{'iphoneX-bottom': isIphoneX}">
      <div class="footer-left">
        <div class="text">剩余元气值</div>
        {{userData.score}}
      </div>
      <div @click="handleBooking" class="footer-right">{{canBuy ? "立即兑换" : "元气值不足，去赚取"}}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { fetchUserData } from "@/services";
export default {
  data() {
    return {
      goodsInfo: {
        goodDownVirtual: 0
      },
      address: {},
      userData: {
        score: 0
      },
      reAuthAddress: false
    };
  },
  onLoad(param) {
    // fetch prizes info
    // fetch 元气值 info
    this.param = param;
    this.fetchGoodsInfo();
    this.getUserData();
    uni.getSetting().then(authRes => {
      let authInfo = authRes[1];
      if (
        authInfo.authSetting &&
        authInfo.hasOwnProperty("scope.address") &&
        !authInfo.authSetting["scope.address"]
      ) {
        // 之前拒绝过授权获取address 重新授权
        this.reAuthAddress = true;
      }
    });
  },
  computed: {
    ...mapState({
      openId: state => state.openId,
      isIphoneX: state => state.isIphoneX
    }),
    canBuy() {
      return (
        this.userData.score >=
        (this.goodsInfo.goodDownVirtual || this.goodsInfo.goodVirtual)
      );
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
              ...this.address
            }
          }).then(res => {
            this.$store.commit("setBookingSuccessTips", res.tips);
            uni.redirectTo({
              url: `/pages/sub/order/booking/success/index?orderId=${res.orderNum}&openId=${this.openId}`
            });
          });
        } else {
          this.$toast("请选择地址");
        }
      } else {
        uni.redirectTo({
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
      fetchUserData(this.openId).then(res => (this.userData = res));
    },
    getAddrees() {
      const self = this;
      uni.chooseAddress({
        success: res => {
          delete res.errMsg;
          this.address = res;
        },
        fail(error) {
          if (error.errMsg.indexOf("fail auth") > -1) {
            self.reAuthAddress = true;
          }
        }
      });
    },
    // Setting-page 回调函数
    openSettingHandler(data) {
      const self = this;
      if (data.mp.detail.authSetting["scope.address"] == true) {
        // 如果开启授权
        self.reAuthAddress = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 30upx;
  .image {
    width: 100%;
    height: 100vw;
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
        line-height: 1.6;
        padding: 10upx 20upx;
        border-radius: 33upx;
        color: #fb6f72;
        font-size: 28upx;
        border: 1upx solid #fb6f72;
        background: white;
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