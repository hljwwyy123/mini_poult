<template>
  <div class="wrapper">
    <div class="summary">
      <div v-if="userInfo.nickName" class="info">{{userInfo.nickName}}的大力丸</div>
      <div class="score">123</div>
      <div
        @click="handleNavigate('/pages/sub/mine/score-detail/index')"
        class="info"
      >{{userInfo.nickName ? '查看明细>>' : '获取个人信息'}}</div>
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
      </div>
      <div class="section section-shadow">
        <div class="section-header">
          奖品兑换
          <div
            @click="handleNavigate('/pages/sub/mine/prizes-list/index')"
            class="header-more"
          >更多奖品>></div>
        </div>
        <div class="section-content">
          <scroll-view scroll-x>
            <div class="scroll-horizontal">
              <div class="prizes-item" @click="handleBooking()">
                <image
                  src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
                  class="prizes-image"
                />
                <div class="prizes-info">
                  <div class="prizes-title">空气加湿器</div>
                  <div class="prizes-price">
                    <div class="prizes-source-price">4500大力丸</div>
                    <div>3800</div>
                  </div>
                </div>
              </div>
              <div class="prizes-item" @click="handleBooking()">
                <image
                  src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
                  class="prizes-image"
                />
                <div class="prizes-info">
                  <div class="prizes-title">空气加湿器</div>
                  <div class="prizes-price">
                    <div class="prizes-source-price">4500大力丸</div>
                    <div>3800</div>
                  </div>
                </div>
              </div>
              <div class="prizes-item" @click="handleBooking()">
                <image
                  src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
                  class="prizes-image"
                />
                <div class="prizes-info">
                  <div class="prizes-title">空气加湿器</div>
                  <div class="prizes-price">
                    <div class="prizes-source-price">4500大力丸</div>
                    <div>3800</div>
                  </div>
                </div>
              </div>
              <div class="prizes-item" @click="handleBooking()">
                <image
                  src="https://gw.alicdn.com/i1/49692482/O1CN01TtDPJz1UCnZ8cppZQ_!!49692482.jpg_300x10000Q75.jpg_.webp"
                  class="prizes-image"
                />
                <div class="prizes-info">
                  <div class="prizes-title">空气加湿器</div>
                  <div class="prizes-price">
                    <div class="prizes-source-price">4500大力丸</div>
                    <div>3800</div>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
      <div class="section section-shadow">
        <div class="section-header">其他工具</div>
        <div class="section-content">
          <div class="menu">
            <div v-for="item in menus" :key="item.url" @click="handleNavigate(item.url)" class="menu-item">
              <div class="menu-item-content">
                <div class="menu-item-image">ic</div>
                <div class="menu-item-title">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="canIUse" open-type="getUserInfo" @click="getUserInfo">授权登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
      userInfo: {
        avatarUrl:
          "https://gw.alicdn.com/tfs/TB1p.BGQXXXXXbFXFXXXXXXXXXX-160-160.png"
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
      ]
    };
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
  },
  methods: {
    handleBooking(orderId = 1) {
      uni.navigateTo({
        url: `/pages/sub/order/booking/index?orderId=${orderId}`
      });
    },
    getUserInfo() {
      uni.getUserInfo({
        success: res => {
          this.userInfo = res.userInfo;
        }
      });
    },
    handleNavigate(url) {
      if (url) {
        uni.navigateTo({
          url
        });
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
    height: 290upx;
    border-bottom-left-radius: 80upx;
    border-bottom-right-radius: 80upx;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 105upx;
    .score {
      font-size: 80upx;
      line-height: 112upx;
      color: #fff;
      font-weight: 600;
    }
    .info {
      color: #fff;
      font-size: 26upx;
      line-height: 36upx;
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
      border: 4upx solid #fff;
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
          display: inline-block;
          width: 31%;
          padding: 15upx;
          background-color: #f4f4f4;
          box-sizing: border-box;
          .menu-item-content {
            display: flex;
            align-items: center;
            color: #212830;
            .menu-item-title {
              font-size: 30upx;
            }
          }
          &:not(:last-child) {
            margin-right: 3.5%;
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