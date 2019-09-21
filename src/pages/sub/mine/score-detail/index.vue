<template>
  <div class="wrapper">
    <div class="header">
      <div class="tips">
        了解大力丸
        <image class="tips-icon" src="/static/wan.png" />
      </div>
      <div class="count">1360</div>
      <div class="info">我的大力丸余额</div>
      <button open-type="share" class="button">邀请好友赚100大力丸</button>
    </div>
    <scroll-view scroll-y class="content" @scrolltolower="handleLoadData">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="item-left">
            <div class="item-title">{{item.remark}}</div>
            <div class="item-subtitle">{{item.operateTime}}</div>
          </div>
          <div class="item-right">
            <div
              :class="['item-detail', item.score.indexOf('-') >= 0 ? 'danger' : '']"
            >{{item.score}}</div>
          </div>
        </div>
      </div>
      <mix-load-more :status="loadMoreStatus"></mix-load-more>
    </scroll-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
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
    this.handleLoadData();
    this.currentPage = 1;
    this.pageSize = 10;
  },
  onShareAppMessage: function(res) {
    return {
      title: "揍小鸡，得奖品",
      path: `/pages/major/poult/index?invate_openId=${this.openId}&isSharePage=1`
    };
  },
  methods: {
    // FIXME: 加载完成 没有更多数据 处理
    async handleLoadData() {
      this.loadMoreStatus = 1;
      this.$request({
        url: "/mp/consumeList",
        method: "POST",
        data: {
          openid: this.openId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log("大力丸明细 response ", res);
        this.list.push(...res);
        this.loadMoreStatus = 0;
        this.currentPage += 1;
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
    justify-content: center;
    height: 400upx;
    background-image: linear-gradient(45deg, #ffb784, #fb6f72);
    color: #fff;
    .tips {
      position: relative;
      font-size: 30upx;
      align-self: flex-end;
      padding-right: 10upx;
      padding-right: 40upx;
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