<template>
  <scroll-view @scrolltolower="handleScrollToLower" scroll-y class="prize-wrapper">
    <block v-for="item in list" :key="item.orderNum">
      <order-item :order="item" />
    </block>
    <mix-load-more v-if="list.length > 0" :status="loadMoreStatus"></mix-load-more>
  </scroll-view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import orderItem from "./components/order-item";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
export default {
  data() {
    return {
      list: [],
      loadMoreStatus: 0
    };
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  onLoad() {
    this.currentPage = 1;
    this.pageSize = 10;
  },
  mounted() {
    this.fetchOrderList();
  },
  methods: {
    fetchOrderList() {
      if (this.loadMoreStatus === 0) {
        this.loadMoreStatus = 1;
      }
      this.$request({
        url: "/mp/goodExchangeList",
        method: "POST",
        data: {
          openid: this.openId
        }
      }).then(res => {
        const { data, countPage, currentPage } = res;
        this.currentPage = currentPage;
        if (currentPage >= countPage) {
          this.loadMoreStatus = 2;
        } else {
          this.loadMoreStatus = 0;
        }
        if (data && data.length) {
          this.list = res.data;
        }
      });
    },
    handleScrollToLower() {
      if (this.loadMoreStatus === 0) {
        this.currentPage += 1;
        this.getPrizeList();
      }
    }
  },
  components: {
    orderItem,
    mixLoadMore
  }
};
</script>
<style scoped lang="scss">
</style>