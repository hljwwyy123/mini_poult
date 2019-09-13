<template>
  <div class="wrapper">
    <home-bar />
    <div class="summary" :class="{iphoneX: isIphoneX}">
      <div class="info">{{userInfo.nickName || '我'}}的大力丸</div>
      <div class="score">0</div>
      <div @click="handleNavigate('/pages/sub/mine/score-detail/index')" class="info">
        {{userInfo.nickName ? '查看明细' : '点击获取个人信息'}}
        <view class="iconfont icon-arrow_right"></view>
      </div>
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
            <div v-if="item.isSigned" class="day-content">biu</div>
            <div v-else class="day-content">{{item.prizes}}</div>
            <div class="day-footer">第{{index + 1}}天</div>
          </div>
        </div>
        <div class="share-button">邀请好友立得100大力丸</div>
        <div class="tips-content">
          <swiper
            class="swiper"
            autoplay
            circular
            vertical
            skip-hidden-item-layout
            :interval="2000"
          >
            <block v-for="item in tips" :key="item.title">
              <swiper-item class="swiper-item">
                <view class="iconfont icon-notice"></view>
                {{item.title}}
              </swiper-item>
            </block>
          </swiper>
        </div>
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
                    <div class="prizes-price">
                      <div class="prizes-source-price">{{item.goodVirtual}}大力丸</div>
                      <div>{{item.goodDownVirtual}}</div>
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
                <div class="menu-item-image">ic</div>
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
import { homeBar } from "@/components/homeBar";
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
          url: "/pages/sub/mine/exchange-record/index"
        },
        {
          name: "规则说明",
          url: "/pages/sub/mine/rules/index"
        },
        {
          name: "联系我们",
          url: ""
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
          isSigned: false
        }
      ],
      tips: [
        {
          title: "biubiubiu"
        },
        {
          title: "jiujiujiu"
        }
      ],
      goodsList: []
    };
  },
  components: {
    homeBar
  },
  computed: {
    ...mapState({
      openId: state => state.openId,
      nickName: state => state.nickName,
      isIphoneX: state => state.isIphoneX
    })
  },
  onLoad() {
    uni.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          uni.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
              console.log(this.userInfo);
            }
          });
        }
      }
    });
    this.requests = {
      keys: ["goodsList"],
      fetchMethods: [this.fetchGoodsList()]
    };
    this.fetchData(this.requests);
  },
  methods: {
    fetchGoodsList() {
      return uni.request({
        url: `${this.$serverUrl}/mp/goodInfoList`
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
      &:first-child {
        padding-top: 60upx;
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
      .tips-content {
        align-self: center;
        width: 490upx;
        height: 58upx;
        background-color: rgba(251, 111, 114, 0.06);
        border-radius: 29upx;
        font-size: 24upx;
        padding: 15upx 30upx;
        box-sizing: border-box;
        margin-top: 26upx;
        .swiper {
          height: 100%;
        }
        .swiper-item {
          color: #676c7c;
        }
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