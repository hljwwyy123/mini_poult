<template>
  <div class="wrapper">
    <home-bar />
    <div class="summary" :class="{iphoneX: isIphoneX}">
      <div class="info">{{userInfo.nickName || '我'}}的大力丸</div>
      <div class="score">0</div>
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
            <div class="red-text">1</div>天
          </div>
        </div>
        <div class="section-content">
          <div v-for="(item, index) in daysInfo" :key="index" class="day">
            <div v-if="item.isSigned" class="day-content active"></div>
            <div v-else class="day-content">{{item.prizes}}</div>
            <div class="day-footer">第{{index + 1}}天</div>
          </div>
        </div>
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
        <div class="section-content">
          <scroll-view scroll-x>
            <div class="scroll-horizontal">
              <block v-for="(item, index) in goodsList" :key="index">
                <div class="prizes-item" @click="handleBooking(item)">
                  <image :src="item.goodImg" class="prizes-image" />
                  <div class="prizes-info">
                    <div class="prizes-title">{{item.goodName}}</div>
                    <div>
                      <div class="prizes-source-price">{{item.goodVirtual}}大力丸</div>
                      <div class="prizes-price">{{item.goodDownVirtual}}</div>
                    </div>
                  </div>
                </div>
              </block>
            </div>
          </scroll-view>
        </div>
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
    <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { login } from "@/utils/index";
import { homeBar } from "@/components/homeBar";
import scrollTips from "@/components/scroll-tips";
export default {
  data() {
    return {
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
      userInfo: {
        avatarUrl: "/static/default-avatar.png"
      },
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
      daysInfo: [
        {
          prizes: "+10",
          isSigned: true
        },
        {
          prizes: "+10",
          isSigned: false
        },
        {
          prizes: "+10",
          isSigned: false
        },
        {
          prizes: "+10",
          isSigned: false
        },
        {
          prizes: "+10",
          isSigned: false
        },
        {
          prizes: "+10",
          isSigned: false
        },
        {
          prizes: "+10",
          isSigned: false,
          isShowGift: true
        }
      ],
      goodsList: []
    };
  },
  components: {
    homeBar,
    scrollTips
  },
  computed: {
    ...mapState({
      openId: state => state.openId,
      nickName: state => state.nickName,
      isIphoneX: state => state.isIphoneX
    })
  },
  onLoad() {
    login().then(res => {
      console.log("login success");
    });
    this.requests = {
      keys: ["goodsList"],
      fetchMethods: [this.fetchGoodsList()]
    };
    this.fetchData(this.requests);
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "揍小鸡，得奖品",
      path: `/pages/major/poult/index?openId=${this.openId}&isSharePage=1`
    };
  },
  methods: {
    fetchGoodsList() {
      return this.$request({
        url: "/mp/goodInfoList"
      });
    },
    fetchData(requests) {
      Promise.all(requests.fetchMethods)
        .then(res => {
          this.handlePromiseAllData(requests, res);
        })
        .catch(error => console.error(error));
    },
    handleBooking(goods) {
      const { id } = goods;
      if (id) {
        uni.navigateTo({
          url: `/pages/sub/order/booking/index?goodsId=${id}`
        });
      } else {
        uni.showToast({
          title: "商品信息有误",
          icon: "none",
          duration: 2000
        });
      }
    },
    getUserInfo(e) {
      const { userInfo } = e.detail;
      if (userInfo) {
        this.userInfo = userInfo;
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
        const { data } = item[1];
        if (data.code === 200) {
          this[key] = data.result;
        }
      });
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
      .day {
        color: #828282;
        text-align: center;
        .day-content {
          border: 1px solid #828282;
          border-radius: 50%;
          width: 66upx;
          height: 66upx;
          line-height: 66upx;
          font-size: 24upx;
          &.active {
            background-image: url("~@/static/checked.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            border-color: transparent;
          }
        }
        .day-footer {
          font-size: 20upx;
          padding-top: 5upx;
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
      .prizes-item {
        display: inline-block;
        width: 205upx;
        .prizes-image {
          width: 100%;
          height: 165upx;
          border-radius: 8upx;
          background-color: #f4f4f4;
        }
        .prizes-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
          height: 100%;
          .prizes-title {
            font-size: 28upx;
            color: #000;
            font-weight: 500;
          }
          .prizes-price {
            font-size: 14px;
            color: #fb6f72;
            font-weight: 500;
            padding-left: 24upx;
            background-image: url("~@/static/wan.png");
            background-size: 16upx 26upx;
            background-position: center left;
            background-repeat: no-repeat;
          }
          .prizes-source-price {
            display: inline-block;
            font-size: 24upx;
            color: #676c7c;
            text-decoration: line-through;
            padding-right: 10upx;
          }
        }
        .prizes-button {
          width: 140upx;
          height: 65upx;
          line-height: 65upx;
          text-align: center;
          background-color: rgba(251, 111, 114, 0.09);
          border-radius: 28upx;
          font-size: 28upx;
          color: #fb6f72;
        }
        &:not(:last-child) {
          margin-right: 19upx;
        }
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
      .scroll-horizontal {
        white-space: nowrap;
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