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
  onLoad() {
    this.getPrizeList();
  },
  methods: {
    getPrizeList() {
      uni.request({
        url: this.$serverUrl + "/mp/goodInfoList",
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
<style scoped lang="scss">
.rank-wrapper {
  .scroll-wrapper {
  }
}
</style>