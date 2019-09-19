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
      this.$request({
        url: "/mp/goodExchangeList",
        method: "POST",
        data: {
          openid: "",
          currentPage: 1,
          pageSize: 10
        }
      }).then(res => (this.goodList = res));
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