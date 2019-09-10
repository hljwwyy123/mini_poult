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
      <div class="score-info">
        <div>点击次数：{{beatCount}}</div>
        <div>获得分数：{{totalScore}}</div>
        <div>连击次数：{{serialCount}}</div>
        <div>暴击次数：{{doubleCount}}</div>
        <div>当前概率：{{rate}}</div>
      </div>
      <image class="poult" @click="handlePoultClick" scr="/static/images/poult.png" />
      <tabs />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
// import debounce from "@/utils/debounce.js";
import tabs from "@/components/tabs";
export default {
  data() {
    return {
      beatCount: 0, // 点击次数
      totalScore: 0, // 获得总大力丸
      serialCount: 0, // 300ms 内连续点击的次数 -> 提高概率
      doubleCount: 0, // 暴击次数
      rate: 20 // 单次点击获得大力丸概率 %
    };
  },
  onLoad() {
    this.doubleRate = 20; // 在获得大力丸基础上暴击的概率 %
    this.scoreList = [1, 2, 3]; // 获得大力丸随机个数列表
    // TODO: 根据接口确定需要打多少大力丸
    this.mostScore = 50; // 最多可以在该小鸡获得都少大力丸 由接口获得
    this.beatTimer = null; // debounce timerid
    this.serialDuration = 300; // 连续点击 timer 间隔
  },
  methods: {
    beatPoult() {
      // 连续点击 10 次 提高概率至 40%
      if (this.serialCount > 10) {
        this.rate = 40;
      } else {
        this.rate = 20;
      }
      // 总分数 大于 总分数 4/5 概率下降至 30%
      if (this.totalScore > this.mostScore * 0.8) {
        this.rate = 30;
      }
      // 总分数 满了以后 概率变为0
      if (this.totalScore >= this.mostScore) {
        this.rate = 0;
      }
      console.log("rate ", this.rate);
      const random = (Math.random() * 100) | 0;
      console.log("random", random);
      if (this.rate && random <= this.rate) {
        // 取余 此处待议
        const remider = parseInt(random % this.scoreList.length, 10);
        const value = this.scoreList[remider];
        // 暴击概率映射随机数值
        if (random <= (this.rate * this.doubleRate) / 100) {
          console.log("暴击啦");
          this.doubleCount += 1;
          return value * 2;
        }
        return value;
      }
      return null;
    },
    handlePoultClick(e) {
      const value = this.beatPoult();
      this.beatCount += 1;
      this.serialCount += 1;
      if (value) {
        this.totalScore += value;
        console.log(value);
      }
      if (this.totalScore >= this.mostScore) {
        if (this.mostScore === 0) {
          uni.showToast({
            title: "今天打得够多了",
            icon: "none",
            duration: 2000
          });
        } else {
          uni.showToast({
            title: "不要再打我了",
            icon: "none",
            duration: 2000
          });
        }
        this.totalScore = this.mostScore;
      }
      this.handleResult();
    },
    handleResult() {
      clearTimeout(this.beatTimer);
      this.beatTimer = setTimeout(() => {
        console.log("ajax");
        this.serialCount = 0;
      }, this.serialDuration);
    }
  },
  components: {
    tabs
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

  .score-info {
    position: relative;
    top: 50%;
    width: 100%;
    text-align: center;
  }
  .score {
    top: 120px;
  }
  .poult {
    position: absolute;
    bottom: 200upx;
    width: 100upx;
    left: 50%;
    margin-left: -50upx;
    height: 100px;
    background-color: greenyellow;
  }
  .poult-bg {
    background-color: skyblue;
    width: 100%;
    height: 100%;
  }
}
</style>