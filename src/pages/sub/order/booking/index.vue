<template>
  <div class="wrapper">
    <image
      class="image"
      src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
    />
    <div class="content">
      <div class="title">可爱小熊USB加湿器</div>
      <div>3600</div>
      <div @click="getAddrees">
        <div>添加地址</div>
        <div>{{address.userName}}</div>
        <div>{{address.telNumber}}</div>
      </div>
      <div @click="handleBooking">立即兑换</div>
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
          url: "/pages/sub/order/booking/success/index"
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
}
</style>