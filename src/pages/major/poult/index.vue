<template>
  <div class="wrapper">
    <!-- <div class="header"></div> -->
    <div class="content">
      <div>点击次数：{{beatCount}}</div>
      <div>获得分数：{{totalScore}}</div>
      <div>连击次数：{{serialCount}}</div>
      <div>暴击次数：{{doubleCount}}</div>
      <div>当前概率：{{rate}}</div>
      <image class="canvas poult" @click="handlePoultClick" scr="/static/images/poult.png" />
      <tabs />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import debounce from "@/utils/debounce.js";
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
  .score {
    top: 120px;
  }
  .poult {
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