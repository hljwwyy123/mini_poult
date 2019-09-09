<template>
  <div class="wrapper">
    <div class="prize-info">
      <div class="item">
        <image class="prize-item-img" :src="order.goodImg || '/static/goods.jpg'" />
        <div class="info">
          <div class="item-title">空气加湿器</div>
          <div class="item-subtitle">
            消耗大力丸：
            <span class="wan-count">{{order.wan || 1200}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <address-item concatInfo="夏婷婷 18866251777" concatAddress="北京市朝阳区望京花家地西里一区112号楼" />
      <list-item :label="'兑换时间'" :text="'2019-09-06 21:14:07'" />
      <list-item :label="'订单编号'" :text="'1231512413213123'" />
      <list-item :label="'订单状态'" :text="'已完成'" />
      <list-item :label="'物流信息'" :text="'顺丰 3872378882378'" />
    </div>
  </div>
</template>
<script>
import addressItem from "./components/addressItem";
import listItem from "../components/listItem";
export default {
  components: {
    addressItem,
    listItem
  },
  data() {
    return {};
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