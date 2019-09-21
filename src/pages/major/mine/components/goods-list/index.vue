<template>
  <view class="section-content">
    <scroll-view scroll-x>
      <div class="scroll-horizontal">
        <block v-for="(item, index) in goodsList" :key="index">
          <div class="prizes-item" @click="handleBooking(item)">
            <image :src="item.goodImg" class="prizes-image" />
            <div class="prizes-info">
              <div class="prizes-title">{{item.goodName}}</div>
              <div>
                <div class="prizes-source-price">{{item.goodVirtual}}大力丸</div>
                <div class="prizes-price">{{item.goodDownVirtual}}</div>
              </div>
            </div>
          </div>
        </block>
      </div>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  mounted() {
    this.fetchGoodsList();
  },
  methods: {
    fetchGoodsList() {
      this.$request({
        url: "/mp/goodInfoList"
      }).then(res => (this.goodsList = res));
    },
    handleBooking(goods) {
      const { id } = goods;
      if (id) {
        uni.navigateTo({
          url: `/pages/sub/order/booking/index?goodsId=${id}`
        });
      } else {
        uni.showToast({
          title: "商品信息有误",
          icon: "none",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.section-content {
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 30upx;
  }
}
.scroll-horizontal {
  white-space: nowrap;
}
.prizes-item {
  display: inline-block;
  width: 205upx;
  .prizes-image {
    width: 100%;
    height: 165upx;
    border-radius: 8upx;
    background-color: #f4f4f4;
  }
  .prizes-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    height: 100%;
    .prizes-title {
      font-size: 28upx;
      color: #000;
      font-weight: 500;
    }
    .prizes-price {
      font-size: 14px;
      color: #fb6f72;
      font-weight: 500;
      padding-left: 24upx;
      background-image: url("~@/static/wan.png");
      background-size: 16upx 26upx;
      background-position: center left;
      background-repeat: no-repeat;
    }
    .prizes-source-price {
      display: inline-block;
      font-size: 24upx;
      color: #676c7c;
      text-decoration: line-through;
      padding-right: 10upx;
    }
  }
  .prizes-button {
    width: 140upx;
    height: 65upx;
    line-height: 65upx;
    text-align: center;
    background-color: rgba(251, 111, 114, 0.09);
    border-radius: 28upx;
    font-size: 28upx;
    color: #fb6f72;
  }
  &:not(:last-child) {
    margin-right: 19upx;
  }
}
</style>
