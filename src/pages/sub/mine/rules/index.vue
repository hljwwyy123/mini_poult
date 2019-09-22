<template>
  <view class="wrapper">
    <view class="header">
      <image mode="aspectFit" class="header-bg" src="/static/rules_bg.png" />
    </view>
    <view class="content">
      <view class="content-title">大力丸说明</view>
      <view class="rule-list" v-for="(item, index) in wanRules" :key="index">
        <view class="rule-title" v-if="item.title">{{item.title}}</view>
        <view class="rule-content">
          <view v-for="(each, i) in item.content" :key="i">{{each}}</view>
        </view>
      </view>
      <view class="content-title">兑换规则</view>
      <view class="rule-list" v-for="(item, index) in exchangeRules" :key="index">
        <view class="rule-content">
          <view v-for="(each, i) in item.content" :key="i">{{each}}</view>
        </view>
      </view>
    </view>
    <view class="footer">最终解释权归北京国马科技有限公司。</view>
  </view>
</template>
<script>
import { wanRules, exchangeRules } from "@/utils/rules";
export default {
  data() {
    return {
      wanRules: wanRules || [],
      exchangeRules: exchangeRules || []
    };
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  .header {
    width: 100%;
    height: 34vw;
    overflow: hidden;
    .header-bg {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    padding: 20upx 45upx;
    &-title {
      font-size: 32upx;
      color: #000;
      margin-bottom: 10upx;
    }
    .rule-list {
      margin-bottom: 40upx;
      .rule-title {
        font-size: 28upx;
        color: #000;
        padding-left: 27upx;
        background-image: url("~@/static/wan.png");
        background-repeat: no-repeat;
        background-size: 19upx 30upx;
        background-position: left center;
      }
      .rule-content {
        font-size: 28upx;
        padding-left: 27upx;
        color: #676c7c;
        line-height: 40upx;
      }
    }
  }
  .footer {
    font-size: 20upx;
    color: #676c7c;
    padding-bottom: 20upx;
    padding-left: 65upx;
  }
}
</style>