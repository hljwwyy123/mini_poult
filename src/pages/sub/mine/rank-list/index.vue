<template>
  <view class="rank-wrapper">
    <mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="onPulldownReresh">
      <view class="scroll-wrapper">
        <view class="title-bg">
          <view class="tab-container">
            <span
              v-for="(tab,index) in tabList"
              class="tab"
              :class="{ active: activeTab === index}"
              @click="toggleTab(index)"
              :key="tab"
            >{{tab}}</span>
          </view>
        </view>
        <!-- <view class="list-item" v-for="item in list" :key="item">列表项 -- {{item}}</view> -->
        <rank-item v-for="item in list" :key="item" :data="item" />
        <mix-load-more :status="loadMoreStatus"></mix-load-more>
      </view>
    </mix-pulldown-refresh>
  </view>
</template>
<script>
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
import rankItem from "./components/rankItem";
import { formatScore } from "@/utils/index";

export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore,
    rankItem
  },
  data() {
    return {
      activeTab: 0,
      tabList: ["好友排行榜", "土豪排行榜"],
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
          this.list.push({
            rank: i,
            name: "name-" + i,
            avatar: "/static/avatar.jpeg",
            score: (Math.random() * 10000) | 0
          });
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
    toggleTab(el) {
      this.activeTab = el;
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
  .scroll-wrapper {
    box-shadow: 0px 2upx 10upx 5upx rgba(0, 0, 0, 0.1);
    margin: 0 30upx 60upx 30upx;
    border-radius: 39upx;
    .title-bg {
      display: flex;
      height: 168upx;
      background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/rank-bg.png")
        no-repeat;
      background-size: 100% 100%;
      .tab-container {
        display: flex;
        margin: auto;
        width: 530upx;
        height: 77upx;
        line-height: 77upx;
        overflow: hidden;
        font-size: 34upx;
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
  }
}
</style>