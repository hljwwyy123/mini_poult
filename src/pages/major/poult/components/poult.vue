<template>
  <view class="poult-container">
    <view class="poult-sprit" :class="poultClass" @click="handlePoultClick"></view>
    <view class="score-test-info">
      <view>点击次数：{{beatCount}}</view>
      <view>获得分数：{{totalScore}}</view>
      <view class="score-num">连击次数：{{serialCount}}</view>
      <view>暴击次数：{{doubleCount}}</view>
      <view>当前概率：{{rate}}</view>
    </view>
  </view>
</template>

<script>
import "./poult.css";
export default {
  data() {
    return {
      status: 0, // 0: 调皮 1: 挨揍中
      beatCount: 0, // 点击次数
      totalScore: 0, // 获得总大力丸
      serialCount: 0, // 300ms 内连续点击的次数 -> 提高概率
      doubleCount: 0, // 暴击次数
      doubleRate: 20, // 在获得大力丸基础上暴击的概率 %
      scoreList: [1, 2, 3], // 获得大力丸随机个数列表
      // TODO: 根据接口确定需要打多少大力丸
      mostScore: 50, // 最多可以在该小鸡获得都少大力丸 由接口获得
      beatTimer: null, // debounce timerid
      serialDuration: 300, // 连续点击 timer 间隔
      rate: 20, // 单次点击获得大力丸概率 %
      positiveStatus: ["naughty", "happy", "crazy", "ease"],
      negativeStatus: ["angry", "sad", "cry", "grievance"]
    };
  },
  computed: {
    poultClass() {
      let className = "";
      let status = 0;
      // 初始化状态，小鸡随机从4个正向状态中选一个播放
      if (this.beatCount <= 0) {
        status = (Math.random() * 4) | 0;
        className = `animate-${this.positiveStatus[status]}`;
        console.log("积极状态: => ", className);
      } else if (this.serialCount <= 0) {
        // 如果揍过小鸡了，随机从四个负向 状态中抽取播放
        status = (Math.random() * 4) | 0;
        className = `animate-${this.negativeStatus[status]}`;
        console.log("负向状态: => ", className);
      } else {
        // 挨揍中
        className = Math.random() > 0.5 ? "beating1" : "beating2";
      }
      return className;
    }
  },
  onLoad() {},
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
      // console.log("rate ", this.rate);
      const random = (Math.random() * 100) | 0;
      // console.log("random", random);
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
        this.$emit("onBingo", value); // 通知父组件更新总积分
      }
      if (this.totalScore >= this.mostScore) {
        if (this.mostScore === 0) {
          uni.showToast({
            title: "你今天揍到上限了，别揍我了",
            icon: "none",
            duration: 2000
          });
        } else {
          uni.showToast({
            title: "这只鸡已经挨揍了50次，再打也不会获得大力丸了",
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
        this.$emit("onSendRequest", this.totalScore);
        this.totalScore = 0; // 发送ajax 后重新计算总分数
        this.serialCount = 0;
      }, this.serialDuration);
    }
  }
};
</script>

<style lang="scss" scoped>
.poult-container {
  .poult-sprit {
    position: absolute;
    bottom: 350upx;
    left: 50%;
    margin-left: -142upx;
    width: 340upx;
    height: 425upx;
  }
  .score-test-info {
    position: absolute;
    bottom: 350upx;
    left: 0;
    color: rgba(76, 76, 76, 0.42);
    text-align: center;
    .score-num {
      font-family: "EnterSansmanBoldItalic";
    }
  }
}
</style> 