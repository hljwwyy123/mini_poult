<template>
  <div class="wrapper">
    <div class="content" :class="{iphoneX: isIphoneX}">
      <form-ids>
        <view v-if="!authed" class="my-info">
          <image class="avatar" src="/static/default-avatar.png" />
          <image
            src="https://poult-1300165852.cos.ap-beijing.myqcloud.com/wan.png"
            class="wan-icon"
          />0
        </view>
        <a v-else url="/pages/major/mine/index" class="my-info">
          <image class="avatar" :src="userInfo.avatarUrl || '/static/default-avatar.png'" />
          <image
            src="https://poult-1300165852.cos.ap-beijing.myqcloud.com/wan.png"
            class="wan-icon"
          />
          {{totalScore}}
        </a>
      </form-ids>
      <div class="rank-info">
        <div class="rank-icon" />
        <!-- {{hitOpenId && hitOpenId !== openId ? 'TA' : '我'}}的排名：{{userData.ranking || 0}} -->
        我的排名：{{userData.ranking || 0}}
      </div>
      <div class="menu-list">
        <a url="/pages/sub/mine/rank-list/index" class="menu-item">
          <image class="menu-rank" src="/static/rank-menu.png" />
        </a>
        <a url="/pages/sub/mine/prizes-list/index" class="menu-item">
          <image class="menu-prize" src="/static/prize-menu.png" />
        </a>
        <button class="menu-item" open-type="share">
          <image class="menu-prize" src="/static/menu-invate.png" />
        </button>
      </div>
      <a
        v-if="hitOpenId && openId !== hitOpenId"
        url="/pages/major/poult/index"
        open-type="redirect"
        class="back-home"
      ></a>
      <poult
        :openId="openId"
        :hitOpenId="hitOpenId"
        :pageShow="pageShow"
        :todayScore="totalScore"
        :mostScore="mostScore"
        @onSendRequest="onSendRquest"
        @onBingo="onBingo"
      />
      <tabs v-if="openId" />
    </div>
    <image class="cloud clound-1" src="/static/cloud5.png" />
    <image class="cloud clound-2" src="/static/cloud2.png" />
    <image class="cloud clound-3" src="/static/cloud3.png" />

    <sign-modal :show="signedInfo.isSigned" :title="`大力丸+${signedInfo.score}`" />
    <auth @authComplete="onGetUserInfo" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { login, encryptByRsa } from "@/utils/index.js";
import tabs from "./components/tabs";
import poult from "./components/poult";
import formIds from "@/components/multiFormId";
import signModal from "@/components/sign-modal";
import auth from "@/components/auth-btn";
import { handleSign as updateSignState, fetchUserData } from "@/services";
export default {
  data() {
    return {
      totalScore: 0, // 获得总大力丸
      pageShow: true, // 当前页面是否onShow
      invate_openId: null, //邀请人Opoenid
      hitOpenId: "",
      userData: {}, // 个人数据
      signedInfo: {
        isSigned: false
      },
      mostScore: 0
    };
  },
  computed: {
    ...mapState({
      authed: state => state.authed,
      openId: state => state.openId,
      userInfo: state => state.userInfo || {},
      avatar: state => state.avatar,
      nickName: state => state.nickName,
      isIphoneX: state => state.isIphoneX,
      rateConfig: state => state.rateConfig
    })
  },
  watch: {
    openId(newValue, oldValue) {
      if (newValue) {
        this.fetchIndexData(newValue);
        if (this.authed) {
          this.handleSign();
        }
      }
    },
    authed(newValue) {
      if (this.openId) {
        // 如果已经注册 且 已经被微信授权 直接签到
        this.handleSign();
      }
    }
  },
  onLoad(options) {
    console.log("options ", options);
    //如果是别人邀请进入
    if (options.invate_openId) {
      this.invate_openId = options.invate_openId;
    }
    const self = this;
    // 别人的鸡
    if (options.hitOpenId) {
      this.hitOpenId = options.hitOpenId;
      this.$request({
        url: "/mp/hitUserScore",
        method: "POST",
        data: {
          openid: this.openId,
          hitOpenid: options.hitOpenId
        }
      }).then(res => {
        self.mostScore = res.differentScore;
      });
    }

    if (this.openId) {
      this.fetchIndexData(this.openId);
    }
    // 如果已经注册 且 已经被微信授权 直接签到
    if (this.authed && this.userInfo && this.userInfo.avatar) {
      this.handleSign();
    }
  },
  onHide() {
    this.pageShow = false;
  },
  onShow() {
    this.pageShow = true;
  },
  onShareAppMessage(res) {
    return {
      title: "揍小鸡换奖品",
      path: `/pages/major/poult/index?invate_openId=${this.openId}`
    };
  },
  methods: {
    onGetUserInfo(el) {
      const self = this;
      login({
        openid: self.openId,
        regSource: self.invate_openId,
        avatar: this.userInfo.avatarUrl,
        nickName: this.userInfo.nickName
      }).then(() => {
        // 登录成功后 签到
        this.handleSign();
      });
    },
    onBingo(score) {
      this.totalScore += Number(score);
      // TODO: 动画
    },
    onSendRquest(score) {
      if (!score) return;
      const self = this;
      // const encData = encryptByRsa(score);
      this.$request({
        url: "/mp/hitChicken",
        method: "POST",
        data: {
          openid: self.openId,
          score,
          hitOpenid: self.hitOpenId
        },
        success: res => {
          if (res.data.code === 200) {
            self.fetchIndexData(this.openId);
          }
        }
      });
    },
    fetchIndexData(openid = this.openId) {
      fetchUserData(openid).then(res => {
        this.userData = res;
        this.totalScore = res.score;
      });
    },
    /**
     * 打卡
     */
    handleSign() {
      updateSignState(this.openId, res => {
        // 打卡成功后 拉去最新的大力丸数据
        this.fetchIndexData();
        this.signedInfo = {
          ...res,
          isSigned: true
        };
      });
    }
  },
  components: {
    tabs,
    poult,
    formIds,
    signModal,
    auth
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #aee5ff;
}

.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #99d476;
  background: url("https://poult-1300165852.cos.ap-beijing.myqcloud.com/poult-bg.png")
    no-repeat;
  background-size: 100% 961upx;
  background-position: center bottom;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  z-index: 3;
  .my-info {
    position: absolute;
    display: flex;
    align-items: center;
    left: 65upx;
    top: 120upx;
    padding: 5upx 40upx 5upx 20upx;
    background: linear-gradient(
      152deg,
      rgba(255, 174, 130, 1) 0%,
      rgba(251, 111, 114, 1) 100%
    );
    color: white;
    border-radius: 40upx;
    height: 70upx;
    line-height: 70upx;
    font-size: 36pux;
    overflow: visible;
    &:after {
      content: "";
      position: absolute;
      top: 5upx;
      left: 5upx;
      right: 5upx;
      bottom: 5upx;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 35upx;
    }
    .avatar {
      position: absolute;
      top: -4upx;
      left: -20upx;
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      border: 5upx solid #fe9a7d;
      z-index: 2;
    }
    .wan-icon {
      margin-left: 60upx;
      margin-right: 8upx;
      width: 16upx;
      height: 26upx;
    }
  }

  .rank-info {
    position: absolute;
    left: 50upx;
    top: 220upx;
    padding-right: 20upx;
    height: 56upx;
    line-height: 56upx;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 28upx;
    color: #624c3d;
    display: flex;
    align-items: center;
    font-size: 24upx;
    .rank-icon {
      margin: -2upx 6upx 0 8upx;
      width: 47upx;
      height: 47upx;
      background: url("~@/static/my-rank-icon.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .menu-list {
    position: absolute;
    width: 125upx;
    right: 44upx;
    top: 180upx;
    display: flex;
    flex-direction: column;
    .menu-rank {
      width: 125upx;
      height: 103upx;
    }
    .menu-prize {
      width: 87upx;
      height: 103upx;
    }
    .menu-item {
      margin-bottom: 27upx;
      padding: 0;
      background-color: transparent;
    }
    button:after {
      border: none;
    }
  }
  &.iphoneX {
    .my-info {
      top: 140upx;
    }
    .rank-info {
      top: 240upx;
    }
    .menu-list {
      top: 200upx;
    }
  }
  .back-home {
    position: absolute;
    bottom: 340upx;
    left: 32upx;
    width: 83upx;
    height: 103upx;
    background: url("~@/static/back-home.png") no-repeat;
    background-size: 100% 100%;
    z-index: 3;
  }
}
.cloud {
  position: absolute;
  z-index: 1;
  &.clound-1 {
    top: 300upx;
    left: 100upx;
    width: 176upx;
    height: 114upx;
    animation: move-1 80s linear infinite;
  }
  @keyframes move-1 {
    from {
      transform: translate3d(-200upx, 0, 0);
    }
    to {
      transform: translate3d(1000upx, 0, 0);
    }
  }
  &.clound-2 {
    top: 100upx;
    left: -80upx;
    width: 77upx;
    height: 50upx;
    animation: move-2 40s linear infinite;
  }
  @keyframes move-2 {
    from {
      transform: translate3d(-80upx, 0, 0);
    }
    to {
      transform: translate3d(1000upx, 0, 0);
    }
  }
  &.clound-3 {
    top: 200upx;
    width: 98upx;
    height: 63upx;
    animation: move-3 35s linear infinite;
  }
  @keyframes move-3 {
    from {
      transform: translate3d(200upx, 0, 0);
    }
    to {
      transform: translate3d(1000upx, 0, 0);
    }
  }
}
</style>