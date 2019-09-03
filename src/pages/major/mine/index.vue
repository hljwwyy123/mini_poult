<template>
  <div class="wrapper">
    <div class="section">
      <div>{{userInfo.nickName}}</div>
      <image :src="userInfo.avatarUrl" class="avator" />
      <div>大力丸</div>
      <div>123</div>
      <div>查看明细</div>
      <button v-if="canIUse" open-type="getUserInfo" @click="geiUserInfo">授权登录</button>
    </div>
    <div class="section">
      <div
        v-for="item in pages"
        :key="item.url"
        class="item"
        @click="handleNavigate(item.url)"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      userInfo: {},
      pages: [
        {
          name: "兑换记录",
          url: "pages/exchange-record/main"
        },
        {
          name: "奖品列表",
          url: "pages/prizes-list/main"
        },
        {
          name: "规则",
          url: "pages/rules/main"
        },
        {
          name: "联系我们",
          url: "pages/concat/main"
        }
      ]
    };
  },
  onLoad() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
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
      wx.getUserInfo({
        success: res => {
          this.userInfo = res.userInfo;
        }
      });
    },
    handleNavigate(url) {
      if (url) {
        wx.navigateTo({
          url: `/pages/sub-pages/mine/${url}`
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  background-color: #f4f4f4;
  .section {
    background-color: #fff;

    .item {
      padding: 10px;
    }
    .avator {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>