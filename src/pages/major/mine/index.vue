<template>
  <div class="wrapper">
    <div class="section">
      <div class="summary">
        <div class="score">123</div>
        <div @click="handleNavigate('/pages/sub/mine/score-detail/index')" class="info">{{userInfo.nickName}}的大力丸 查看明细>></div>
        <image :src="userInfo.avatarUrl" class="avator" />
      </div>
    </div>
    <div class="section">
      <div class="header">已连续打卡1天</div>
      <div class="content">
        <div v-for="(item, index) in daysInfo" :key="index" class="day">
          <div v-if="item.isSigned" class="day-content">biu</div>
          <div v-else class="day-content">{{item.prizes}}</div>
          <div class="day-footer">第{{index + 1}}天</div>
        </div>
      </div>
      <div class="section section-center">
        <div class="share-button">邀请好友立得100大力丸</div>
      </div>
    </div>
    <div class="section">
      <div class="header">
        奖品兑换
        <div @click="handleNavigate('/pages/sub/mine/prizes-list/index')" class="header-more">更多奖品</div>
      </div>
      <div class="content prizes-item">
        <div class="prizes-image">image</div>
        <div class="prizes-content">
          <div class="prizes-info">
            <div class="prizes-title">空气加湿器</div>
            <div class="prizes-price">
              <div class="prizes-source-price">4500大力丸</div>3800
            </div>
          </div>
          <div class="prizes-button">去兑换</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div v-for="item in menus" :key="item.url" class="menu" @click="handleNavigate(item.url)">
        <div class="menu-item">
          <div>
            <div class="menu-item-image">icon</div>
            <div class="menu-item-title">{{item.name}}</div>
          </div>
          <div class="icon">></div>
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
      userInfo: {},
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
  .section {
    .summary {
      position: relative;
      background-image: linear-gradient(180deg, #ffb784, #fb6f72);
      height: 145px;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      text-align: center;
      box-sizing: border-box;
      margin-bottom: 52.5px;
      .score {
        font-size: 40px;
        line-height: 56px;
        color: #fff;
        font-weight: 600;
      }
      .info {
        color: #fff;
        font-size: 13px;
        line-height: 18px;
      }
      .avator {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        width: 105px;
        height: 105px;
        border-radius: 50%;
        margin-top: 15px;
        border: 2px solid #fff;
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      font-size: 21px;
      font-weight: 500;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      .header-more {
        font-size: 14px;
        color: #676c7c;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
    }
    .day {
      color: #828282;
      text-align: center;
      .day-content {
        border: 1px solid #828282;
        border-radius: 50%;
        width: 33px;
        height: 33px;
        line-height: 33px;
        font-size: 12px;
      }
      .day-footer {
        font-size: 10px;
        padding-top: 2.5px;
      }
    }
    .share-button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
      width: 84vw;
      height: 12.4vw;
      background-color: #fb6f72;
      border-radius: 6.2vw;
      margin-top: 5px;
    }
    .prizes-item {
      .prizes-image {
        width: 88px;
        height: 83.5px;
        border-radius: 4px;
        background-color: #f4f4f4;
      }
      .prizes-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding-left: 10px;
        .prizes-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
          height: 100%;
          .prizes-title {
            font-size: 16px;
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
            font-size: 12px;
            color: #676c7c;
            text-decoration: line-through;
            padding-right: 5px;
          }
        }
        .prizes-button {
          width: 70px;
          height: 32.5px;
          line-height: 32.5px;
          text-align: center;
          background-color: rgba(251, 111, 114, 0.09);
          border-radius: 14px;
          font-size: 14px;
          color: #fb6f72;
        }
      }
    }
    .menu {
      height: 55px;
      padding-left: 15px;
      box-sizing: border-box;
      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding-right: 15px;
        border-bottom: 1px solid #eaecf0;
        box-sizing: border-box;
        .menu-item-image {
          display: inline-block;
          width: 18px;
          height: 19px;
          margin-right: 10px;
        }
        .menu-item-title {
          display: inline-block;
          font-size: 15px;
          color: #212830;
        }
        .icon {
          color: #a4adc0;
        }
      }
    }
    &.section-center {
      display: flex;
      justify-content: center;
    }
    &:not(:last-child) {
      padding-bottom: 20px;
    }
  }
}
</style>