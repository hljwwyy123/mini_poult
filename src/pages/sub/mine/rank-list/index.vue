<template>
  <view class="rank-wrapper">
    <mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="onPulldownReresh">
      <view class="title-bg">
        <view class="tab-container">
          <span class="tab">好友排行榜</span>
          <span class="tab">土豪排行榜</span>
        </view>
      </view>
      <view class="scroll-wrapper">
        <view class="list-item" v-for="item in list" :key="item">列表项 -- {{item}}</view>
        <mix-load-more :status="loadMoreStatus"></mix-load-more>
      </view>
    </mix-pulldown-refresh>
  </view>
</template>
<script>
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore
  },
  data() {
    return {
      activeTab: 0,
      list: [],
      loadMoreStatus: 0
    };
  },
  onReachBottom() {
    //上滑加载
    this.loadData("add");
  },
  onLoad() {
    this.loadData("add");
  },
  methods: {
    loadData(type) {
      if (type === "add") {
        this.loadMoreStatus = 1;
      }
      setTimeout(() => {
        if (type === "refresh") {
          this.list = [];
        }

        let length = this.list.length;
        for (let i = length; i < length + 10; i++) {
          this.list.push(i);
        }

        if (type === "add") {
          this.loadMoreStatus = 0;
        }
        if (type === "refresh") {
          this.$refs.mixPulldownRefresh &&
            this.$refs.mixPulldownRefresh.endPulldownRefresh();
        }
      }, 1000);
    },
    //下拉刷新
    onPulldownReresh() {
      this.loadData("refresh");
    }
  }
};
</script>
<style scoped lang="scss">
.rank-wrapper {
  .title-bg {
    display: flex;
    height: 84px;
    margin: 10px 15px;
    background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/rank-bg.png")
      no-repeat;
    background-size: 100% 100%;
    .tab-container {
      display: flex;
      margin: auto;
      width: 530upx;
      height: 77upx;
      line-height: 77upx;
      border-radius: 39upx;
      border: 3upx solid rgba(255, 255, 255, 1);
      .tab {
        flex: 1;
        text-align: center;
        color: white;
        &.active {
          color: #fb6f72;
          background: white;
        }
      }
    }
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140upx;
    line-height: 140upx;
    font-weight: bold;
    font-size: 32upx;
    color: #333;
    background: #fff;
  }
}
</style>