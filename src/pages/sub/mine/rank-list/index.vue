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
          <scroll-view
            class="panel-scroll-box"
            :scroll-y="enableScroll"
            @scrolltolower="loadData('add')"
          >
            <rank-item
              class="rank-item"
              v-for="(item) in tabItem.list"
              :class="{mine: item.openId === openId}"
              :key="item.openid"
              :itemData="item"
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
import { mapState, mapMutations } from "vuex";
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
          tabName: "好友排行榜",
          loadMoreStatus: 0, //0加载前，1加载中，2没有更多了
          refreshing: 0,
          pageNo: 1,
          list: []
        },
        {
          tabName: "土豪排行榜",
          loadMoreStatus: 0, //0加载前，1加载中，2没有更多了
          refreshing: 0,
          pageNo: 1,
          list: []
        }
      ],
      enableScroll: true
    };
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    }),
    scrollHeight() {
      return uni.upx2px(168);
    }
  },
  onReachBottom() {
    //上滑加载
    if (this.tabList[this.activeTab].loadMoreStatus === 0) {
      this.loadData("add");
    }
  },
  onLoad() {
    this.loadData("add");
    this.pageSize = 10; // 一页数据大小
  },
  methods: {
    requestData() {
      const self = this;
      let tabItem = this.tabList[this.activeTab];
      this.$request({
        url: "/mp/myFriendRanking",
        method: "POST",
        data: {
          currentPage: tabItem.pageNo,
          type: self.activeTab + 1, // 1:friend, 2: total
          openid: self.openId
        }
      }).then(res => {
        const { friendRanking, integralRanking } = res;
        const ranking = friendRanking || integralRanking;
        if (ranking && ranking.length) {
          tabItem.pageNo++;
          tabItem.list = tabItem.list.concat(ranking);
          if (ranking.length < this.pageSize) {
            tabItem.loadMoreStatus = 2;
          } else {
            tabItem.loadMoreStatus = 0;
          }
        } else {
          tabItem.loadMoreStatus = 2;
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
          tabItem.list = []; //刷新前清空数组
          tabItem.refreshing = true;
          tabItem.pageNo = 1; // 重置页码为 1
          this.$refs.mixPulldownRefresh &&
            this.$refs.mixPulldownRefresh.endPulldownRefresh();
        }
        tabItem.refreshing = false;
        tabItem.loadMoreStatus = 0;
        this.requestData();
      }, 1000);
    },
    toggleTab(e) {
      let index = e;
      //e=number为点击切换，e=object为swiper滑动切换
      if (typeof e === "number") {
        //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
        this.activeTab = index;
      }
      // 将请求放到 swiper 中是为了避免点击tab触发两次toggleTab 从而导致连续请求两次接口
      if (typeof e === "object") {
        index = e.detail.current;
        this.activeTab = index;
        this.loadData("add");
      }
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