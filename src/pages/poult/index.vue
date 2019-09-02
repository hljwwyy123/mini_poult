<template>
  <div class="wrapper">
    <!-- <div class="header"></div> -->
    <div class="content">
      <canvas class="poult-bg" canvas-id="poult-bg"></canvas>
      <canvas id="score" class="canvas score" canvas-id="score"></canvas>
      <canvas id="text" class="canvas text" canvas-id="text"></canvas>
      <canvas @click="handlePoultClick" id="poult" class="canvas poult" canvas-id="poult"></canvas>
    </div>
  </div>
</template>
<script>
import debounce from "@/utils/debounce.js";
export default {
  data() {
    return {};
  },
  onLoad() {
    const context = wx.createCanvasContext("poult");
    context.drawImage("/static/images/poult.png", 0, 0, 100, 100);
    context.draw();
    this.rate = 20; // 单次点击获得大力丸概率 %
    this.doubleRate = 20; // 在获得大力丸基础上暴击的概率 %
    this.beatCount = 0; // 点击次数
    this.doubleCount = 0; // 暴击次数
    this.totalScore = 0; // 获得总大力丸
    this.scoreList = [1, 2, 3]; // 获得大力丸随机个数列表
    this.mostScore = 50; // 最多可以在该小鸡获得都少大力丸 由接口获得
    this.serialCount = 0; // 300ms 内连续点击的次数 -> 提高概率
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
      if (this.rate && random <= this.rate) {
        // 取余 此处待议
        const remider = parseInt(random % this.scoreList.length, 10);
        const value = this.scoreList[remider];
        // 暴击概率映射随机数值
        if (random <= this.rate * this.doubleRate / 100) {
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
          wx.showToast({
            title: "今天打得够多了",
            icon: "none",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: "不要再打我了",
            icon: "none",
            duration: 2000
          });
        }
        this.totalScore = this.mostScore;
      }
      const context = wx.createCanvasContext("score");
      context.setFontSize(14);
      context.fillText(`点击次数：${this.beatCount}`, 0, 24);
      context.fillText(`获得分数：${this.totalScore}`, 0, 48);
      context.fillText(`连击次数：${this.serialCount}`, 0, 72);
      context.fillText(`暴击次数：${this.doubleCount}`, 0, 96);
      context.fillText(`当前概率：${this.rate}`, 0, 120);
      context.draw();
      this.handleResult();
    },
    handleResult: debounce(
      function() {
        console.log("ajax");
        this.serialCount = 0;
      },
      this.serialDuration,
      { leading: true, trailing: false }
    )
  }
};
</script>
<style scoped lang="scss">
.header {
  height: 100px;
  background: skyblue;
  box-sizing: border-box;
}
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .canvas {
    position: absolute;
    left: 50%;
    width: 100px;
    transform: translateX(-50%);
  }
  .score {
    top: 120px;
  }
  .poult {
    top: 50%;
    height: 150px;
    background-color: greenyellow;
  }
  .poult-bg {
    background-color: skyblue;
    width: 100%;
    height: 100%;
  }
}
</style>