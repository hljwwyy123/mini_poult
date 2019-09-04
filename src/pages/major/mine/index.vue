<template>
  <div class="wrapper">
    <div class="section">
      <div class="summary">
        <div class="score">123</div>
        <div class="info">{{userInfo.nickName}}的大力丸 查看明细>></div>
        <image :src="userInfo.avatarUrl" class="avator" />
      </div>
    </div>
    <div class="section">
      <div class="header">已连续打卡1天</div>
      <div class="content">
        <div class="day">
          <div class="day-content">+10</div>
          <div class="day-footer">第1天</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div
        v-for="item in pages"
        :key="item.url"
        class="item"
        @click="handleNavigate(item.url)"
      >{{item.name}}</div>
    </div>
    <button v-if="canIUse" open-type="getUserInfo" @click="geiUserInfo">授权登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
      userInfo: {},
      pages: [
        {
          name: "兑换记录",
          url: "/pages/sub/mine/exchange-record/main"
        },
        {
          name: "奖品列表",
          url: "/pages/sub/mine/prizes-list/main"
        },
        {
          name: "规则",
          url: "/pages/sub/mine/rules/main"
        },
        {
          name: "联系我们",
          url: "/pages/concat/main"
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
      uni.navigateTo({
        url
      });
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
      height: 50vw;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      text-align: center;
      padding-top: 50px;
      box-sizing: border-box;
      margin-bottom: 52.5px;
      .score {
        font-size: 40px;
        line-height: 56px;
        color: #fff;
        font-weight: 600;
        font-family: PingFangSC;
      }
      .info {
        color: #fff;
        font-size: 13px;
        font-family: PingFangSC;
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
        border: 5px solid #fff;
      }
    }
    .header {
      color: #000;
      font-size: 21px;
      font-weight: 500;
      font-family: PingFangSC;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      .day {
        color: #828282;
        text-align: center;
        .day-content {
          border: 1px solid #828282;
          border-radius: 50%;
          width: 33px;
          height: 33px;
          line-height: 33px;
        }
        .day-footer {
          font-size: 10px;
          padding-top: 2.5px;
        }
      }
    }
    &:not(:last-child) {
      padding-bottom: 20px;
    }
  }
}
</style>