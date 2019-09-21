<template>
  <view class="prize-wrapper">
    <prize-item v-for="item in goodList" :key="item.id" :prize="item" />
  </view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
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
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  methods: {
    // TODO: 分页
    getPrizeList() {
      this.$request({
        url: "/mp/goodExchangeList",
        method: "POST",
        data: {
          openid: this.openId,
          currentPage: 1,
          pageSize: 10
        }
      }).then(res => (this.goodList = res.data));
    }
  },
  watch: {
    openId: {
      handler(newValue) {
        console.log(newValue);
        if (newValue) {
          this.getPrizeList();
        }
      },
      immediate: true
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