<template>
  <div class="wrapper">
    <div class="content">
      <image class="cloud clound-1" src="/static/cloud4.png"/>
      <image class="cloud clound-2" src="/static/cloud2.png"/>
      <image class="cloud clound-3" src="/static/cloud3.png"/>
      <a url="/pages/major/mine/index" class="my-info" >
        <image class="avatar" src="/static/avatar.jpeg" />
        <image src="https://poult-1300165852.cos.ap-beijing.myqcloud.com/wan.png" class="wan-icon"></image>
        {{totalScore}}
      </a>
      <div class="rank-info">
        <div class="rank-icon" />我的排名：102
      </div>
      <div class="menu-list">
        <a url="/pages/sub/mine/prizes-list/index" class="menu-item">
          <image class="menu-rank" src="/static/rank-menu.png" />
        </a>
        <a url="/pages/sub/mine/rank-list/index" class="menu-item">
          <image class="menu-prize" src="/static/prize-menu.png" />
        </a>
      </div>
      
      <poult @onSendRequest="onSendRquest" @onBingo="onBingo"/>
      <tabs />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import tabs from "./components/tabs";
import poult from "./components/poult";

export default {
  data() {
    return {
      totalScore: 0, // 获得总大力丸
    };
  },
  onLoad() {
    
  },
  methods: {
    onBingo(score){
      console.log('onBingo ------------ ', score);
      this.totalScore += score;
      // 动画
    },
    onSendRquest(){

    }
  },
  components: {
    tabs,
    poult
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  background-color: #aee5ff;
  height: 100vh;
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
  .cloud {
    position: absolute;
    animation: move linear infinite;
    &.clound-1{
      top: 180upx;
      left: -100upx;
      width: 120upx;
      height: 107upx;
      animation-duration: 40s;
    }
    &.clound-2{
      top: 100upx;
      left: -180upx;
      width: 77upx;
      height: 50upx;
      animation-delay: 3s;
      animation-duration: 20s;
    }
    &.clound-3{
      top: 380upx;
      left: -250upx;
      width: 98upx;
      height: 63upx;
      animation-delay: 1s;
      animation-duration: 15s;
    }
  }
  .my-info {
    position: absolute;
    display: flex;
    align-items: center;
    left: 65upx;
    top: 10upx;
    padding: 5upx 40upx 5upx 20upx;
    background: rgba(98, 76, 61, 1);
    color: white;
    border-radius: 40upx;
    height: 70upx;
    line-height: 70upx;
    font-size: 36pux;
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
      border: 5upx solid rgba(98, 76, 61, 1);
      z-index: 2;
    }
    .wan-icon{
      margin-left: 60upx;
      margin-right: 8upx;
      width: 16upx;
      height: 26upx;
    }
  }
  .rank-info {
    position: absolute;
    left: 50upx;
    top: 120upx;
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
    top: 60upx;
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
    }
  }
  @keyframes move {
    from{transform: translate3d(-130upx,0,0)}
    to{transform: translate3d(1200upx,0,0)}
  }

  .score {
    top: 120px;
  }
}
</style>