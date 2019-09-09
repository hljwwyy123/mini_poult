<template>
  <div class="wrapper">
    <image
      class="image"
      src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
    />
    <div class="content">
      <div class="title">可爱小熊USB加湿器</div>
      <div class="info">
        <div>
          <div class="price">3800</div>
          <div class="source-price">4300</div>
        </div>
        <div class="source-price">实际商品价格：45元</div>
      </div>
      <div class="address" @click="getAddrees">
        <div class="address-button">添加地址</div>
        <div>{{address.userName}}</div>
        <div>{{address.telNumber}}</div>
      </div>
      <div class="footer" @click="handleBooking">立即兑换</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: {}
    };
  },
  onLoad(param) {
    // fetch prizes info
    // fetch 大力丸 info
    console.log(param);
  },
  methods: {
    getAddrees() {
      uni.chooseAddress({
        success: res => {
          console.log(res);
          this.address = res;
        },
        fail() {
          console.log("fail");
        }
      });
    },
    handleBooking() {
      if (this.address.telNumber) {
        uni.navigateTo({
          url: "/pages/sub/order/detail/index"
        });
      } else {
        uni.showToast({
          title: "请选择地址",
          icon: "none",
          duration: 2000
        });
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
    }
  }
}
</style>