<template>
  <div class="wrapper">
    <div class="header">
      <div @click="handleNavigateTo" class="tips">
        了解能量值
        <image class="tips-icon" src="/static/wan.png" />
      </div>
      <div class="header-content">
        <div class="count">{{userData.score}}</div>
        <div class="info">我的能量值余额</div>
        <button open-type="share" class="button breath-animate">邀请好友赚100能量值</button>
      </div>
    </div>
    <scroll-view scroll-y class="content" @scrolltolower="handleLoadData">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="item-left">
            <div class="item-title">{{item.remark}}</div>
            <div class="item-subtitle">{{item.operateTime}}</div>
          </div>
          <div class="item-right">
            <div v-if="item.score.indexOf('-') >= 0" class="item-detail danger">{{item.score}}</div>
            <div v-else class="item-detail">+{{item.score}}</div>
          </div>
        </div>
      </div>
      <mix-load-more v-if="list.length" :status="loadMoreStatus"></mix-load-more>
    </scroll-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
import { fetchUserData } from "@/services";
export default {
  data() {
    return {
      list: [],
      loadMoreStatus: 0,
      userData: {
        score: 0
      }
    };
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  onLoad() {
    this.currentPage = 1;
    this.handleLoadData();
    fetchUserData(this.openId).then(res => {
      this.userData = res;
    });
    this.pageSize = 10;
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
    handleLoadData() {
      if (this.loadMoreStatus === 2) {
        return;
      }
      if (this.loadMoreStatus === 0) {
        this.loadMoreStatus = 1;
      }
      this.$request({
        url: "/mp/consumeList",
        method: "POST",
        data: {
          openid: this.openId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res && res.length) {
          if (res.length < this.pageSize) {
            this.loadMoreStatus = 2;
          } else {
            this.loadMoreStatus = 0;
            this.currentPage += 1;
          }
          this.list.push(...res);
        } else {
          this.loadMoreStatus = 2;
        }
      });
    },
    handleNavigateTo() {
      uni.navigateTo({
        url: "/pages/sub/mine/rules/index"
      });
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
    height: 400upx;
    background-image: linear-gradient(45deg, #ffb784, #fb6f72);
    color: #fff;
    &-content {
      text-align: center;
    }
    .tips {
      position: relative;
      font-size: 30upx;
      align-self: flex-end;
      width: 100%;
      text-align: right;
      padding-right: 40upx;
      margin-top: 13upx;
      &-icon {
        position: absolute;
        width: 18.64upx;
        height: 30upx;
        top: 10upx;
        right: 10upx;
        transform: rotate(45deg);
      }
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
    &.danger {
      color: #fb6f72;
    }
  }
}
</style>