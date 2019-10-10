<template>
  <view class="poult-container">
    <view v-show="poultWord" class="poult-word">{{poultWord}}</view>
    <view class="poult-sprit" :class="animateClass" @click="handlePoultClick"></view>
    <view v-show="serialCount >= 5" class="boom">X{{serialCount}}</view>
    <view
      v-for="item in wanList"
      :key="item"
      class="wan-icon"
      :class="{toTop: item == hitTotalScore}"
    ></view>
    <view v-show="show_console" class="score-test-info">
      <view>点击次数：{{beatCount}}</view>
      <view>获得分数：{{hitTotalScore}}</view>
      <view class="score-num">连击次数：{{serialCount}}</view>
      <view>暴击次数：{{rateConfig.gainRate}}</view>
      <view>当前概率：{{rate}}</view>
    </view>
  </view>
</template>

<script>
import "./poult.css";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      wanList: [],
      beatCount: 0, // 点击次数
      hitTotalScore: 0, // 获得总元气值
      serialCount: 0, // 300ms 内连续点击的次数 -> 提高概率
      doubleCount: 0, // 暴击次数
      beatTimer: null, // debounce timerid
      serialDuration: 300, // 连续点击 timer 间隔
      rate: 5, // 单次点击获得元气值概率 %

      statusIndex: 0, //当前timer 随机取值
      animateTimer: null,
      sleepTimer: null,
      poultWord: "", // 小鸡当前说的话
      show_console: false,
      animateClass: "animate-normal"
    };
  },
  props: {
    pageShow: Boolean,
    hitOpenId: String,
    openId: String,
    positiveStatusMap: Array,
    negativeStatusMap: Array
  },
  mounted() {
    this.hitScore = 0; // 单次 / 连击 得到的分数 区别于 hitTotalScore
    const wanList = [];
    for (let i = 1; i <= 50; i++) {
      wanList.push(i);
    }
    this.wanList = wanList;
  },
  watch: {
    pageShow(isShow, old) {
      if (!isShow) {
        clearInterval(this.animateTimer);
        this.animateTimer = null;
      } else {
        // this.animate();
      }
    },
    positiveStatusMap(newValue) {
      setTimeout(() => {
        this.animateLoop();
      }, 2000);
    },
    hitOpenId(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.animateClass = "animate-normal";
        this.poultWord = "";
        this.fetchList();
      }
      if (!newValue) {
        //回家喽
        console.log("回家喽~~~");
        this.poultWord = "";
        this.animateClass = "animate-happy";
      }
    }
  },
  computed: {
    ...mapState({
      rateConfig: state => state.rateConfig
    })
  },
  methods: {
    initAnimation() {
      this.animateClass = "animate-normal";
      this.poultWord = "";
      clearTimeout(this.animateTimer);
      clearTimeout(this.sleepTimer);
      setTimeout(() => {
        this.animateLoop();
      }, 1000);
    },
    beatPoult() {
      const { hitRate, gainRate, scoreList } = this.rateConfig;
      clearTimeout(this.animateTimer);
      clearTimeout(this.sleepTimer);
      this.animateClass = Math.random() > 0.5 ? "beating1" : "beating2";
      this.poultWord = "";
      // 连击10次，概率翻倍 todo: 到底翻几倍
      if (this.serialCount > 10) {
        this.rate = hitRate * 2;
      }
      if (this.serialCount > 20) {
        this.rate = hitRate * 4;
      }
      // 总分数 大于 总分数 4/5 概率下降至 30%
      if (this.hitTotalScore > this.restThisPoultScore * 0.8) {
        this.rate = hitRate * 1;
      }
      // 总分数 满了以后 概率变为0
      if (this.hitTotalScore >= this.restThisPoultScore) {
        this.rate = 0;
      }
      const random = (Math.random() * 100) | 0;
      if (this.rate && random <= this.rate) {
        // 取余
        const remider = parseInt(random % scoreList.length, 10);
        console.log(remider);
        const value = Number(scoreList[remider]);
        // 暴击概率映射随机数值
        let doubleRate = (this.rate * gainRate) / 100;
        if (doubleRate < 1) {
          doubleRate = 1;
        }
        if (random <= doubleRate) {
          this.doubleCount += 1;
          return value * 2;
        }
        return value;
      }
      return null;
    },
    handlePoultClick(e) {
      if (this.restThisPoultScore <= 0) {
        this.poultWord = "今天次数已达到上限";
        console.log("这只小鸡已经没有分数了");
        return;
      }
      if (this.restTotalScore <= 0) {
        this.poultWord = "今天次数已达到上限";
        console.log("分数满了");
        return;
      }
      if (this.hitOpenId) {
        const value = this.beatPoult();
        this.beatCount += 1;
        this.serialCount += 1;
        // 打击的分数要小于等于 [还能获得的总分数]和[还能从这个鸡获得的分数] 的最小值
        const minScore = Math.min(this.restThisPoultScore, this.restTotalScore);
        if (this.hitTotalScore >= minScore) {
          // NOTE: 提示语改一下
          console.log("这只鸡已经挨揍了50次，再打也不会获得元气值了");
        } else if (value) {
          this.hitTotalScore += value;
          if (this.hitTotalScore >= minScore) {
            // 计算超出的分数
            const diff = this.hitTotalScore - minScore;
            this.hitTotalScore = Number(minScore);
            const result = value - diff;
            this.hitScore = this.hitScore + result;
            this.$emit("onBingo", result); // 通知父组件更新总积分
          } else {
            this.hitScore += value;
            this.$emit("onBingo", value); // 通知父组件更新总积分
          }
        }
        this.handleResult();
      } else {
        // 自己的鸡不能揍
        // this.initAnimation();
        this.poultWord = "不可以揍自己的宝宝哦！快去看看附近的人";
      }
    },
    handleResult() {
      clearTimeout(this.beatTimer);
      clearTimeout(this.animateTimer);
      clearTimeout(this.sleepTimer);
      this.beatTimer = setTimeout(() => {
        this.$emit("onSendRequest", Number(this.hitScore));
        this.hitScore = 0; // 发送ajax 后重新计算总分数
        this.serialCount = 0;
        // 播放一次负面状态后继续正常吊儿郎当
        this.animateLoop(this.negativeStatusMap);
      }, this.serialDuration);
    },
    animateLoop(statusMap = this.positiveStatusMap) {
      let animateInfo = statusMap[(Math.random() * statusMap.length) | 0];
      this.animateClass = `animate-${animateInfo.status}`;
      // 一个状态可能会有多句话
      this.poultWord =
        animateInfo.words[(Math.random() * animateInfo.words.length) | 0];
      this.animateTimer = setTimeout(() => {
        this.animateClass = "animate-normal";
        this.poultWord = "";
        this.sleepTimer = setTimeout(() => {
          this.animateLoop();
        }, animateInfo.sleep);
      }, animateInfo.during);
    },
    animate() {},
    // 获取总共还可以打多少分
    fetchScoreInfo() {
      return this.$request({
        url: "/mp/integralCount",
        method: "POST",
        data: {
          openid: this.openId
        }
      });
    },
    // 获取还可以从该小鸡得多少分
    fetchCanGetScoreByThis() {
      if (this.openId && this.hitOpenId) {
        return this.$request({
          url: "/mp/hitUserScore",
          method: "POST",
          data: {
            openid: this.openId,
            hitOpenid: this.hitOpenId
          }
        });
      }
    },
    // 获取概率和分数list
    fetchRate() {
      return this.$request({
        url: "/mp/commonInterface"
      });
    },
    fetchList() {
      Promise.all([
        this.fetchScoreInfo(),
        this.fetchCanGetScoreByThis(),
        this.fetchRate()
      ])
        .then(([restTotalScore, restThisScore, rate]) => {
          if (restTotalScore) {
            this.restTotalScore = restTotalScore.differentScore;
          }
          if (restThisScore) {
            this.restThisPoultScore = restThisScore.differentScore;
          }
          if (rate) {
            this.$store.commit("setRateConfig", rate);
          }
        })
        .catch(_ => this.$toast("网络异常"));
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
    margin-left: -170upx;
    width: 340upx;
    height: 425upx;
    z-index: 99;
  }
  .poult-word {
    position: absolute;
    bottom: 760upx;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    padding: 20upx 28upx 30upx;
    background-image: url('~@/static/word-bg.png');
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 100% 100%;
    color: #592c11;
    font-size: 28upx;
    line-height: 1.2;
  }
  .boom {
    position: absolute;
    right: 110upx;
    bottom: 670upx;
    width: 134upx;
    height: 87upx;
    line-height: 87upx;
    background: url("~@/static/boom.png") no-repeat;
    background-size: 100% 100%;
    font-family: "EnterSansmanBoldItalic";
    text-align: center;
    font-size: 32upx;
  }
  .wan-icon {
    position: absolute;
    left: 52%;
    bottom: 550upx;
    width: 32upx;
    height: 52upx;
    background: url("~@/static/wan.png") no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    &.toTop {
      animation: toTop 1s ease-out forwards;
    }
  }
  @keyframes toTop {
    from {
      opacity: 1;
      bottom: 550upx;
      transform: rotate(0);
    }
    to {
      opacity: 0;
      transform: rotate(720deg);
      bottom: 90vh;
    }
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