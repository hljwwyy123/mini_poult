<template>
  <div class="wrapper">
    <div class="header">
      <div class="tips">了解大力丸</div>
      <div class="count">1360</div>
      <div class="info">我的大力丸余额</div>
      <div class="button">邀请好友赚100大力丸</div>
    </div>
    <scroll-view scroll-y class="content" @scrolltolower="handleLoadData">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="item-left">
            <div class="item-title">{{item.title}}</div>
            <div class="item-subtitle">{{item.time}}</div>
          </div>
          <div class="item-right">
            <div class="item-detail">{{item.detail}}</div>
          </div>
        </div>
      </div>
      <mix-load-more :status="loadMoreStatus"></mix-load-more>
    </scroll-view>
  </div>
</template>
<script>
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";

export default {
  data() {
    return {
      list: [],
      loadMoreStatus: 0
    };
  },
  onLoad() {
    this.handleLoadData();
  },
  methods: {
    handleLoadData() {
      this.loadMoreStatus = 1;
      setTimeout(() => {
        const list = Array.from({ length: 10 }).map((item, index) => {
          return {
            title: "7天打卡",
            time: "2019-08-27 16:28:32",
            detail: `${Math.random() > 0.5 ? "+" : "-"}${index}`
          };
        });
        this.list.push(...list);
        this.loadMoreStatus = 0;
      }, 1000);
    }
  },
  components: {
    mixPulldownRefresh,
    mixLoadMore
  }
};
</script>

<style lang="scss">
@import "@/styles/common.scss";
</style>

<style scoped lang="scss">
.wrapper {
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400upx;
    background-image: linear-gradient(45deg, #ffb784, #fb6f72);
    color: #fff;
    .tips {
      font-size: 30upx;
      align-self: flex-end;
      padding-right: 10upx;
    }
    .count {
      font-size: 80upx;
      font-weight: 600;
      line-height: 112upx;
    }
    .info {
      font-size: 26upx;
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 84vw;
      height: 12.4vw;
      background-color: #ffea9a;
      font-size: 42upx;
      color: #f4595d;
      border-radius: 6.2vw;
      margin-top: 30upx;
    }
  }
  .content {
    height: calc(100vh - 400upx);
  }
  .item-detail {
    font-size: 32upx;
    font-weight: 500;
    color: #fb6f72;
  }
}
</style>