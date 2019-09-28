<template>
  <view class="tabs">
    <view class="tab">
      <view
        v-for="(item, index) in tabs"
        :key="index"
        @click="handeTabClick(index)"
        :class="['tab-item', {active: activeIndex === index}]"
      >{{item.title}}</view>
    </view>
    <view class="panel-wrapper">
      <view class="panel-scroll-container">
        <view v-if="activePanelData.length">
          <view class="panel-container">
            <view
              @click="handlePersonClick(item)"
              v-for="(item, index) in activePanelData"
              :key="index"
              class="panel-item"
            >
              <image class="item-avatar" :src="item.avatar || '/static/default-avatar.png'" />
              <view class="nick-name">{{item.nickName || '匿名'}}</view>
            </view>
          </view>
        </view>
        <button open-type="share" class="pannel-text" v-else>
          还没有好友哦，快来邀请大家一起玩吧~
          <image class="wechat-icon" src="/static/wechat-icon.png" />
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          key: "byHitChicken",
          title: "最近揍我的人",
          data: []
        },
        {
          key: "userInfo",
          title: "附近的人",
          data: []
        },
        {
          key: "friend",
          title: "我的好友",
          data: []
        }
      ]
    };
  },
  computed: {
    activePanelData: function() {
      return this.tabs[this.activeIndex].data;
    },
    ...mapState({
      openId: state => state.openId,
      nickName: state => state.nickName
    })
  },
  watch: {
    openId(newValue) {
      if (newValue) {
        this.getLists();
      }
    }
  },
  mounted() {
    this.getLists();
  },
  onShareAppMessage: function(res) {
    return {
      title: "揍小鸡，得奖品",
      path: `/pages/major/poult/index?invate_openId=${this.openId}&isSharePage=1`,
      imageUrl:
        "https://poult-1300165852.cos.ap-beijing.myqcloud.com/share-img.png"
    };
  },
  methods: {
    handeTabClick(index) {
      this.activeIndex = index;
    },
    /**
     * 切换别人的小鸡
     */
    handlePersonClick(item) {
      if (item.openid) {
        this.$emit("changePoult", item);
      } else {
        this.$toast("数据异常");
      }
    },
    getLists() {
      if (this.openId) {
        this.$request({
          url: "/mp/operateList",
          method: "POST",
          data: {
            openid: this.openId,
            currentPage: 1
          }
        }).then(res => {
          const newTabs = this.tabs;
          newTabs.forEach(tab => {
            tab.data = res[tab.key];
          });
          this.tabs = newTabs;
        });
      }
    }
  }
};
</script>

<style lang="scss">
.tabs {
  position: fixed;
  bottom: 30upx;
  left: 0;
  width: 100%;
  .tab {
    display: flex;
    width: 100%;
    justify-content: center;
    .tab-item {
      width: 196upx;
      height: 54upx;
      line-height: 54upx;
      font-size: 28upx;
      color: white;
      background: url("~@/static/tab-bg.png") no-repeat;
      background-size: 100% 100%;
      &.active {
        background: url("~@/static/tab-active.png") no-repeat;
        color: #795109;
        background-size: 100% 100%;
      }
    }
  }
  .panel-wrapper {
    width: 734upx;
    margin: auto;
    height: 196upx;
    background: url("~@/static/friend-container.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .panel-scroll-container {
      padding: 20upx 28upx;
      overflow: hidden;
      .panel-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: auto;
        .panel-item {
          padding: 10px;
          display: flex;
          flex-direction: column;
          .item-avatar {
            width: 83upx;
            height: 83upx;
            border-radius: 50%;
            border: 3upx solid #ffa780;
          }
          .nick-name {
            max-width: 100upx;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 24upx;
            font-weight: 400;
            color: #795109;
          }
        }
      }
    }
  }
  .pannel-text {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #663b23;
    font-size: 28upx;
    height: 140upx;
    background-color: transparent;
    border: none;
    &::after {
      border: none;
    }
    .wechat-icon {
      width: 64upx;
      height: 64upx;
      display: inline-block;
    }
  }
}
</style>