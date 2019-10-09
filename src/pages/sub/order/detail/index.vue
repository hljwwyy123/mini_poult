<template>
  <div class="wrapper">
    <div class="prize-info">
      <div class="item">
        <image class="prize-item-img" :src="orderDetail.goodImg || '/static/goods.jpg'" />
        <div class="info">
          <div class="item-title">{{orderDetail.goodName}}</div>
          <div class="item-subtitle">
            消耗能量值：
            <span class="wan-count">{{orderDetail.score || 0}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <address-item
        :concatInfo="`${orderDetail.contact} ${orderDetail.phone}`"
        :concatAddress="`${orderDetail.province_name} ${orderDetail.city_name} ${orderDetail.county_name} ${orderDetail.addressDetail}`"
      />
      <list-item :label="'兑换时间'" :text="orderDetail.exchangeTime || ''" />
      <list-item :label="'订单编号'" :text="orderDetail.orderNum || ''" />
      <list-item :label="'订单状态'" :text="orderDetail.exchangeStatus || ''" />
      <list-item
        v-if="orderDetail.expressName || orderDetail.expressNum"
        :label="'物流信息'"
        :text="`${orderDetail.expressName || ''} ${orderDetail.expressNum || ''}`"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import addressItem from "./components/addressItem";
import listItem from "../components/listItem";
export default {
  components: {
    addressItem,
    listItem
  },
  data() {
    return {
      orderDetail: {}
    };
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  onLoad(params) {
    if (params) {
      this.fetchOrderDetail(params);
    }
  },
  methods: {
    fetchOrderDetail(params) {
      if (params.orderId) {
        this.$request({
          url: "/mp/goodExchangeDetail",
          method: "POST",
          data: {
            openid: this.openId,
            orderNum: params.orderId
          }
        }).then(res => {
          console.log("fetchOrderDetail ", res);
          this.orderDetail = res.data;
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  padding: 30upx;
  .prize-info {
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 25upx;
      // border-bottom: 1px solid #eaecf0;
      .prize-item-img {
        width: 127upx;
        height: 127upx;
        border-radius: 15upx;
        margin-right: 25upx;
        background-color: #f4f4f4;
        border: 1px solid #f4f4f4;
      }
      .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        .item-title {
          font-size: 32upx;
          color: #000;
          font-weight: 500;
          margin-bottom: 20upx;
        }
        .item-subtitle {
          font-size: 28upx;
          color: #676c7c;
          .wan-count {
            color: #fb6f72;
          }
        }
      }
    }
  }
  .order-info {
    text-indent: 15upx;
  }
  .list-container {
    display: flex;
    align-items: center;
  }
}
</style>