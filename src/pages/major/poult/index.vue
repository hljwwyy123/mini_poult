<template>
  <div class="wrapper" >
    <div class="content" :class="{iphoneX: isIphoneX}">
      <a url="/pages/major/mine/index" class="my-info" >
        <image class="avatar" src="/static/avatar.jpeg" />
        <image src="https://poult-1300165852.cos.ap-beijing.myqcloud.com/wan.png" class="wan-icon"></image>
        {{totalScore}}
      </a>
      <div class="rank-info">
        <div class="rank-icon" />我的排名：102
      </div>
      <div class="menu-list">
        <a url="/pages/sub/mine/rank-list/index" class="menu-item">
          <image class="menu-rank" src="/static/rank-menu.png" />
        </a>
        <a url="/pages/sub/mine/prizes-list/index" class="menu-item">
          <image class="menu-prize" src="/static/prize-menu.png" />
        </a>
        <button class="menu-item" open-type="share">
          <image class="menu-prize" src="/static/menu-invate.png" />
        </button>
      </div>
      <a url="/pages/major/poult/index" open-type="redirect" class="back-home"></a>
      <poult @onSendRequest="onSendRquest" @onBingo="onBingo"/>
      <tabs />
    </div>
    <image class="cloud clound-1" src="/static/cloud5.png"/>
    <image class="cloud clound-2" src="/static/cloud2.png"/>
    <image class="cloud clound-3" src="/static/cloud3.png"/>
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
  computed: {
    ...mapState({
      openId: state => state.openId,
      nickName: state => state.nickName,
      isIphoneX: state => state.isIphoneX,
    })
  },
  onLoad() {
    
  },
  onShareAppMessage(res) {
    return {
      title: '微信小程序测试分享',
      path: '/pages/major/poult/index'
    }
  },
  methods: {
    onBingo(score){
      // console.log('onBingo ------------ ', score);
      this.totalScore += score;
      // 动画
    },
    onSendRquest(score){
      console.log('send Ajax ===== 还需要判断该不该发请求', score)
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
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #aee5ff;
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
  z-index: 3;
  .my-info {
    position: absolute;
    display: flex;
    align-items: center;
    left: 65upx;
    top: 120upx;
    padding: 5upx 40upx 5upx 20upx;
    background:linear-gradient(152deg,rgba(255,174,130,1) 0%,rgba(251,111,114,1) 100%);
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
      border: 5upx solid #FE9A7D;
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
    top: 220upx;
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
    top: 180upx;
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
      background-color: transparent;
    }
    button:after{
        border: none;
    }
  }
  &.iphoneX{
    .my-info{
      top: 140upx;
    }
    .rank-info{
      top: 240upx;
    }
    .menu-list{
      top: 200upx;
    }
  }
  .back-home{
    position: absolute;
    bottom: 340upx;
    left: 32upx;
    width: 83upx;
    height: 103upx;
    background: url('~@/static/back-home.png') no-repeat;
    background-size: 100% 100%;
    z-index: 3;
  }
}
.cloud {
  position: absolute;
  z-index: 1;
  &.clound-1{
    top: 300upx;
    left: 100upx;
    width: 176upx;
    height: 114upx;
    animation: move-1 80s linear infinite;
  }
  @keyframes move-1 {
    from{transform: translate3d(-200upx,0,0)}
    to{transform: translate3d(1000upx,0,0)}
  }
  &.clound-2{
    top: 100upx;
    left: -80upx;
    width: 77upx;
    height: 50upx;
    animation: move-2 40s linear infinite;
  }
  @keyframes move-2 {
    from{transform: translate3d(-80upx,0,0)}
    to{transform: translate3d(1000upx,0,0)}
  }
  &.clound-3{
    top: 200upx;
    width: 98upx;
    height: 63upx;
    animation: move-3 35s linear infinite;
  }
  @keyframes move-3 {
    from{transform: translate3d(200upx,0,0)}
    to{transform: translate3d(1000upx,0,0)}
  }
}
</style>