<template>
  <view class="rank-wrapper">
    <view class="title-bg">
      <view class="tab-container">
        <span
          v-for="(tab,index) in tabList"
          class="tab"
          :class="{ active: activeTab === index}"
          @click="toggleTab(index)"
          :key="tab.tabName"
        >{{tab.tabName}}</span>
      </view>
    </view>
    <mix-pulldown-refresh
      ref="mixPulldownRefresh"
      :top="168"
      @refresh="onPulldownReresh"
      @setEnableScroll="setEnableScroll"
    >
      <swiper
        id="swiper"
        class="scroll-wrapper"
        :style="{height: 'calc(100vh-'+scrollHeight+'px)'}"
        :duration="300"
        :current="activeTab"
        @change="toggleTab"
      >
        <swiper-item v-for="tabItem in tabList" :key="tabItem.id">
          <scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadData">
            <rank-item
              class="rank-item"
              v-for="item in tabItem.list"
              :class="{mine: item.rank === 6}"
              :key="item.rank"
              :data="item"
            />
            <empty-holder v-if="activeTab === 0 && tabItem.list <= 0" :text="'您还没有好友哦'"></empty-holder>
            <mix-load-more v-if="tabItem.list.length > 0" :status="tabItem.loadMoreStatus"></mix-load-more>
          </scroll-view>
        </swiper-item>
      </swiper>
    </mix-pulldown-refresh>
  </view>
</template>
<script>
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
import emptyHolder from "@/components/emptyHolder";
import rankItem from "./components/rankItem";
import { formatScore } from "@/utils/index";

export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore,
    rankItem,
    emptyHolder
  },
  data() {
    return {
      activeTab: 0,
      tabList: [
        {
          id: 1111,
          tabName: "好友排行榜",
          loadMoreStatus: 0,
          refreshing: 0,
          list: []
        },
        {
          id: 222,
          tabName: "土豪排行榜",
          loadMoreStatus: 0,
          refreshing: 0,
          list: []
        }
      ],
      enableScroll: true
    };
  },
  computed: {
    scrollHeight() {
      return uni.upx2px(168);
    }
  },
  onReachBottom() {
    //上滑加载
    this.loadData("add");
  },
  onLoad() {
    this.loadData("add");
  },
  methods: {
    requestData() {
      uni.request({
        url: this.$serverUrl + "/mp/integralTopTen",
        success: res => {
          // this.goodList = res.data.result;
          console.log(res.data.result);
        },
        fail: () => {
          uni.showModal({
            content: "请求失败，请重试!",
            showCancel: false
          });
        }
      });
    },
    loadData(type) {
      let tabItem = this.tabList[this.activeTab];
      //type add 加载更多 refresh下拉刷新
      if (type === "add") {
        if (tabItem.loadMoreStatus === 2) {
          return;
        }
        tabItem.loadMoreStatus = 1;
      }
      // 1s 的时间播放加载动画
      setTimeout(() => {
        if (type === "refresh") {
          if (type === "refresh") {
            tabItem.list = []; //刷新前清空数组
          }
        } else if (type === "refresh") {
          tabItem.refreshing = true;
        }
        this.requestData();
        let length = tabItem.list.length; // todo mock数据
        for (let i = length; i < length + 10; i++) {
          tabItem.list.push({
            rank: i,
            name: "name-" + i,
            avatar: "/static/avatar.jpeg",
            score: (Math.random() * 10000) | 0
          });
        }
        //上滑加载 处理状态
        // if (type === "add") {
        //   tabItem.loadMoreStatus = tabItem.list.length > 30 ? 2 : 0;
        // }
        if (type === "refresh") {
          this.$refs.mixPulldownRefresh &&
            this.$refs.mixPulldownRefresh.endPulldownRefresh();
          // #ifdef APP-PLUS
          tabItem.refreshing = false;
          // #endif
          tabItem.loadMoreStatus = 0;
        }
      }, 1000);
    },
    toggleTab(e) {
      let index = e;
      //e=number为点击切换，e=object为swiper滑动切换
      if (typeof e === "object") {
        index = e.detail.current;
      }
      if (typeof e === "number") {
        //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
        this.activeTab = index;
      }
      this.activeTab = index;
      this.loadData("add");
    },
    //下拉刷新
    onPulldownReresh() {
      this.loadData("refresh");
    },
    //设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
    setEnableScroll(enable) {
      if (this.enableScroll !== enable) {
        this.enableScroll = enable;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.rank-wrapper {
  .title-bg {
    position: relative;
    margin: 0 30upx;
    display: flex;
    height: 168upx;
    background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/rank-bg.png")
      no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px -2upx 10upx 5upx rgba(0, 0, 0, 0.1);
    border-radius: 39upx 39upx 0 0;
    z-index: 2;
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
  .scroll-wrapper {
    position: relative;
    z-index: 1;
    height: 96%;
    box-shadow: 0px 5upx 10upx 5upx rgba(0, 0, 0, 0.1);
    margin: 0 30upx 0 30upx;
    border-radius: 0 0 39upx 39upx;
    .panel-scroll-box {
      height: 100%;
    }
    .rank-item {
      position: relative;
      display: block;
      &:nth-child(even) {
        background: rgba(255, 183, 132, 0.07);
      }

      &.mine {
        background: rgba(255, 183, 132, 0.4);
      }
    }
    .empty-list {
      margin: 200upx 0;
    }
  }
}
</style>