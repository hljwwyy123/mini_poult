<template>
  <div class="wrapper">
    <home-bar />
    <div class="summary" :class="{iphoneX: isIphoneX}">
      <div class="info">{{userInfo.nickName || '我'}}的大力丸</div>
      <div class="score">{{userData.score || 0}}</div>
      <div
        v-if="userInfo.nickName"
        @click="handleNavigate('/pages/sub/mine/score-detail/index')"
        class="info"
      >
        查看明细
        <view class="iconfont icon-arrow_right"></view>
      </div>
      <button v-else class="info" open-type="getUserInfo" @getuserinfo="getUserInfo">
        点击获取个人信息
        <view class="iconfont icon-arrow_right"></view>
      </button>
      <image :src="userInfo.avatarUrl" class="avator" />
    </div>
    <div class="content">
      <div class="section section-shadow">
        <div class="section-header">
          <div>
            已连续打卡
            <div class="red-text">{{userData.signedDays}}</div>天
          </div>
        </div>
        <sign v-if="openId" :openId="openId" :signedDays="signedDays" />
        <button open-type="share" class="share-button">邀请好友立得100大力丸</button>
        <scroll-tips />
      </div>
      <div class="section section-shadow">
        <div class="section-header">
          奖品兑换
          <div @click="handleNavigate('/pages/sub/mine/prizes-list/index')" class="header-more">
            更多奖品
            <view class="iconfont icon-arrow_right"></view>
          </div>
        </div>
        <goods-list />
      </div>
      <div class="section section-shadow">
        <div class="section-content">
          <div class="menu">
            <div
              v-for="item in menus"
              :key="item.url"
              @click="handleNavigate(item.url)"
              class="menu-item"
            >
              <div class="menu-item-content">
                <view :class="['menu-item-icon', 'iconfont', `icon-${item.icon}`]"></view>
                <div class="menu-item-title">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sign-modal :show="signedInfo.isSigned" :title="`大力丸+${signedInfo.score}`" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { login } from "@/utils/index";
import { homeBar } from "@/components/homeBar";
import scrollTips from "./components/scroll-tips";
import sign from "./components/sign";
import goodsList from "./components/goods-list";
import signModal from "@/components/sign-modal";
import { handleSign as updateSignState } from "@/services";
export default {
  data() {
    return {
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
      avatarUrl: "/static/default-avatar.png",
      menus: [
        {
          name: "兑换记录",
          url: "/pages/sub/mine/exchange-record/index",
          icon: "records"
        },
        {
          name: "规则说明",
          url: "/pages/sub/mine/rules/index",
          icon: "info"
        },
        {
          name: "联系我们",
          url: "",
          icon: "contact"
        }
      ],
      signedData: {},
      userData: {},
      signedInfo: {}
    };
  },
  components: {
    homeBar,
    scrollTips,
    sign,
    goodsList,
    signModal
  },
  computed: {
    ...mapState({
      authed: state => state.authed,
      openId: state => state.openId,
      userInfo: state => state.userInfo,
      avatar: state => state.avatar,
      nickName: state => state.nickName,
      isIphoneX: state => state.isIphoneX
    }),
    signedDays() {
      return this.userData.signedDays % 7;
    }
  },
  onLoad() {
    if (this.openId) {
      this.getUserData();
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: "揍小鸡，得奖品",
      path: `/pages/major/poult/index?invate_openId=${this.openId}&isSharePage=1`
    };
  },
  methods: {
    signed() {
      updateSignState(
        () =>
          this.$request({
            url: "/mp/signed",
            method: "POST",
            data: {
              openid: this.openId
            }
          }),
        res => {
          // 打卡成功后 拉去最新的大力丸数据
          this.getUserData();
          this.signedInfo = {
            ...res,
            isSigned: true
          };
        }
      );
    },
    getUserData() {
      this.$request({
        url: "/mp/index",
        method: "POST",
        data: {
          openid: this.openId
        }
      }).then(res => {
        this.userData = res;
      });
    },
    fetchData(requests) {
      Promise.all(requests.fetchMethods)
        .then(res => {
          this.handlePromiseAllData(requests, res);
        })
        .catch(error => console.error(error));
    },
    getUserInfo(e) {
      const { userInfo } = e.detail;
      if (userInfo) {
        this.$store.commit("loginWx", userInfo);
        this.$store.commit("authed", true);
        login().then(res => {
          console.log("login res", res);
          this.signed();
        });
      }
    },
    handleNavigate(url) {
      if (url) {
        uni.navigateTo({
          url
        });
      }
    },
    handlePromiseAllData(requests, res) {
      const { keys } = requests;
      res.forEach((item, index) => {
        const key = keys[index];
        this[key] = item;
      });
    }
  },
  watch: {
    openId(newValue) {
      if (newValue) {
        this.getUserData(newValue);
        if (this.authed) {
          this.signed();
        }
      }
    },
    authed(newValue) {
      if (this.openId) {
        // 如果已经注册 且 已经被微信授权 直接签到
        this.signed();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #fff;
  .summary {
    position: relative;
    background-image: linear-gradient(180deg, #ffb784, #fb6f72);
    height: 406upx;
    border-bottom-left-radius: 80upx;
    border-bottom-right-radius: 80upx;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 105upx;
    .info {
      color: #fff;
      font-size: 26upx;
      line-height: 36upx;
      padding-bottom: 20upx;
      background-color: transparent;
      border: none;
      &:first-child {
        padding-top: 60upx;
      }
      &:after {
        border: none;
      }
    }
    &.iphoneX {
      .info:first-child {
        padding-top: 90upx;
      }
    }
    .score {
      font-size: 80upx;
      color: #fff;
      font-weight: 600;
      padding-bottom: 20upx;
      line-height: 1;
    }
    .avator {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      width: 210upx;
      height: 210upx;
      border-radius: 50%;
      margin-top: 30upx;
      border: 10upx solid #fff;
    }
  }
  .content {
    padding: 30upx;
    .section {
      display: flex;
      flex-direction: column;
      padding: 25upx 20upx;
      box-sizing: border-box;
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        font-size: 36upx;
        font-weight: 500;
        margin-bottom: 25upx;
        .header-more {
          font-size: 28upx;
          color: #676c7c;
        }
      }
      .section-content {
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {
          margin-bottom: 30upx;
        }
      }
      .share-button {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        color: #fff;
        font-size: 40upx;
        width: 84vw;
        height: 12.4vw;
        background-color: #fb6f72;
        border-radius: 6.2vw;
      }

      .item-image {
        display: inline-block;
        width: 36upx;
        height: 38upx;
        margin-right: 20upx;
      }
      .icon {
        color: #a4adc0;
      }
      .menu {
        flex: 1;
        .menu-item {
          position: relative;
          display: inline-block;
          width: 31%;
          padding: 15upx;
          box-sizing: border-box;
          .menu-item-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #212830;
            .menu-item-icon {
              width: 36upx;
              height: 38upx;
              font-size: 34upx;
              margin-bottom: 15upx;
            }
            .menu-item-title {
              font-size: 30upx;
            }
          }
          &:not(:last-child) {
            margin-right: 3.5%;
            &:after {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              content: " ";
              width: 1upx;
              height: 30upx;
              background-color: #d8d8d8;
            }
          }
        }
      }
      &.section-shadow {
        box-shadow: 0 2upx 10upx 5upx rgba(0, 0, 0, 0.1);
        border-radius: 20upx;
      }
      &:not(:last-child) {
        margin-bottom: 40upx;
      }
    }
  }
  .red-text {
    display: inline-block;
    color: #fb6f72;
  }
}
</style>