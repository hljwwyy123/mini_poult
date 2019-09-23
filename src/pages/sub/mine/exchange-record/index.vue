<template>
  <scroll-view @scrolltolower="handleScrollToLower" scroll-y class="prize-wrapper">
    <prize-item v-for="item in goodList" :key="item.id" :prize="item" />
    <mix-load-more v-if="goodList.length > 0" :status="loadMoreStatus"></mix-load-more>
  </scroll-view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import prizeItem from "./components/prizeItem";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
export default {
  components: {
    prizeItem,
    mixLoadMore
  },
  data() {
    return {
      goodList: [],
      loadMoreStatus: 0
    };
  },
  onLoad() {
    this.currentPage = 1;
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  methods: {
    getPrizeList() {
      if (this.loadMoreStatus === 0) {
        this.loadMoreStatus = 1;
      }
      this.$request({
        url: "/mp/goodExchangeList",
        method: "POST",
        data: {
          openid: this.openId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        const { data, countPage, currentPage } = res;
        this.currentPage = countPage;
        if (currentPage >= countPage) {
          this.loadMoreStatus = 2;
        } else {
          this.loadMoreStatus = 0;
        }
        if (data && data.length) {
          this.goodList = res.data;
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