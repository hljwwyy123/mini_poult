<template>
  <view :class="['modal', isShow ? 'is-show' : '']">
    <view class="modal-content">
      <image @click="handleClose" class="modal-content-close" src="/static/modal-close-btn.png" />
      <view class="modal-content-title">{{title}}</view>
      <view class="modal-content-info">{{info}}</view>
      <view class="modal-content-footer">
        <view class="footer-text">{{footerText}}</view>
        <view @click="handleClose" class="footer-button">{{buttonText}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showState: null
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "元气值"
    },
    info: {
      type: String,
      default: "登录成功"
    },
    footerText: {
      type: String,
      default: "好物0元换"
    },
    buttonText: {
      type: String,
      default: "知道了"
    }
  },
  computed: {
    isShow: {
      get() {
        if (!this.useData) {
          this.showState = this.show;
        }
        return this.showState;
      },
      set(value) {
        this.useData = true;
        this.showState = value;
      }
    }
  },
  methods: {
    handleClose() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: none;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  &-content {
    position: relative;
    width: 72vw;
    height: 57.33vw;
    background-image: url("~@/static/signed-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    text-align: center;
    &-close {
      position: absolute;
      top: -24upx;
      right: 0; // 图片右侧有留白
      width: 48upx;
      height: 48upx;
    }
    &-title {
      font-size: 50upx;
      color: #fff;
      font-weight: 600;
      margin-top: 48upx;
      margin-left: 50upx;
    }
    &-info {
      margin-left: 50upx;
      font-size: 30upx;
      color: #fff;
    }
    &-footer {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 45upx);
    }
    .footer-text {
      font-size: 24upx;
      color: #8d230c;
      margin-bottom: 10upx;
    }
    .footer-button {
      font-size: 36upx;
      font-weight: 500;
      color: #8d230c;
      width: 325upx;
      height: 90upx;
      line-height: 90upx;
      border-radius: 45upx;
      background-color: #f9da49;
      box-shadow: inset 0 -10upx 5supx #f3b13e;
    }
  }
  &.is-show {
    display: flex;
  }
}
</style>