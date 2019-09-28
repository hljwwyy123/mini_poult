<template>
  <view class="prize-wrapper">
    <prize-item v-for="item in goodList" :key="item.id" :prize="item" />
  </view>
</template>
<script>
import prizeItem from "./components/prizeItem";

export default {
  components: {
    prizeItem
  },
  data() {
    return {
      goodList: []
    };
  },
  onShow() {
    this.getPrizeList();
  },
  methods: {
    getPrizeList() {
      this.$request({
        url: "/mp/goodInfoList",
        success: res => {
          this.goodList = res.data.result;
        },
        fail: () => {
          uni.showModal({
            content: "请求失败，请重试!",
            showCancel: false
          });
        }
      });
    }
  }
};
</script>
