<template>
  <view class="poult-container">
    <view class="poult-word">{{poultWord}}</view>
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
const ANIMTE_DUR = 3200;
import "./poult.css";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      status: 0, // 0: 调皮 1: 挨揍中
      beatCount: 0, // 点击次数
      totalScore: 0, // 获得总大力丸
      serialCount: 0, // 300ms 内连续点击的次数 -> 提高概率
      doubleCount: 0, // 暴击次数
      doubleRate: 20, // 在获得大力丸基础上暴击的概率 %
      // TODO: 根据接口确定需要打多少大力丸
      mostScore: 50, // 最多可以在该小鸡获得都少大力丸 由接口获得
      beatTimer: null, // debounce timerid
      serialDuration: 300, // 连续点击 timer 间隔
      rate: 5, // 单次点击获得大力丸概率 %
      positiveStatus: ["naughty", "happy", "crazy", "ease"],
      positiveStatusMap: [
        { status: "naughty", words: ["看不惯我？那你揍我啊，嘻嘻~"] },
        { status: "happy", words: ["主人要带我去兜风咯，开心开心~"] },
        { status: "crazy", words: ["不上班的日子，真舒服~"] },
        { status: "ease", words: ["偷偷睡个觉，主人应该不会知道吧~"] }
      ],
      negativeStatus: ["angry", "sad", "cry", "grievance"],
      negativeStatusMap: [
        { status: "angry", words: ["你敢打我，我也让我家主人去打你的叽叽~"] },
        { status: "sad", words: ["好讨厌啊，不要打了啦~"] },
        { status: "cry", words: ["你再打我我告诉我家主人~"] },
        {
          status: "grievance",
          words: ["你怎么狠心打小鸡，叽叽这么可爱呀，人家都被你打肿了~"]
        }
      ],
      statusIndex: 0, //当前timer 随机取值
      animateTimer: null
    };
  },
  props: {
    todayScore: {
      type: Number,
      default: 0
    },
    pageShow: Boolean,
    hitOpenId: String,
    openId: String
  },
  watch: {
    pageShow(isShow, old) {
      if (!isShow) {
        clearInterval(this.animateTimer);
        this.animateTimer = null;
      } else {
        this.animate();
      }
    }
  },
  computed: {
    poultClass() {
      let className = "";
      let status = 0;
      // 初始化状态，没揍小鸡的时候。随机从4个正向状态中选一个播放
      if (!this.pageShow) {
        return "";
      }
      if (this.beatCount <= 0) {
        if (!this.animateTimer) {
          this.animate();
        }
        className = `animate-${this.positiveStatus[this.statusIndex]}`;
        // console.log("积极状态: => ", className);
      } else if (this.serialCount <= 0) {
        // 如果揍过小鸡了，随机从四个负向 状态中抽取播放
        className = `animate-${this.negativeStatus[this.statusIndex]}`;
        // console.log("负向状态: => ", className);
      } else {
        // 挨揍中
        clearInterval(this.animateTimer);
        className = Math.random() > 0.5 ? "beating1" : "beating2";
      }
      return className;
    },
    ...mapState({
      rateConfig: state => state.rateConfig
    })
  },
  methods: {
    beatPoult() {
      const { hitRate, gainRate, scoreList } = this.rateConfig;
      // 连击10次，概率翻倍 todo: 到底翻几倍
      if (this.serialCount > 10) {
        this.rate = hitRate * 2;
      }
      // 总分数 大于 总分数 4/5 概率下降至 30%
      if (this.totalScore > this.mostScore * 0.8) {
        this.rate = hitRate * 1;
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
        const remider = parseInt(random % scoreList.length, 10);
        const value = scoreList[remider];
        // 暴击概率映射随机数值
        if (random <= (this.rate * gainRate) / 100) {
          console.log("暴击啦~~~~");
          this.doubleCount += 1;
          return value * 2;
        }
        return value;
      }
      return null;
    },
    handlePoultClick(e) {
      if (this.hitOpenId) {
        const value = this.beatPoult();
        this.beatCount += 1;
        this.serialCount += 1;

        if (this.totalScore >= this.mostScore) {
          if (this.mostScore === 0) {
            console.log("你今天揍到上限了，别揍我了");
          } else {
            console.log("这只鸡已经挨揍了50次，再打也不会获得大力丸了");
          }
          this.totalScore = this.mostScore;
        } else if (value) {
          this.totalScore += value;
          this.$emit("onBingo", value); // 通知父组件更新总积分
          console.log("props totalScore", this.totalScore);
        }
        this.handleResult();
      }
    },
    handleResult() {
      clearTimeout(this.beatTimer);
      this.beatTimer = setTimeout(() => {
        this.$emit("onSendRequest", this.totalScore);
        setTimeout(() => {
          this.animate();
        }, 2000);
        // this.totalScore = 0; // 发送ajax 后重新计算总分数 FIXME:
        this.serialCount = 0;
      }, this.serialDuration);
    },
    animate() {
      this.animateTimer = setInterval(() => {
        this.statusIndex = (Math.random() * 4) | 0;
      }, ANIMTE_DUR);
    },
    // TODO: 对比分数 限制点击
    fetchScoreInfo() {
      this.$request({
        url: "/mp/integralCount",
        method: "POST",
        data: {
          openid: this.openId
        }
      }).then(res => {
        console.log(res);
      });
    }
  },
  watch: {
    openId(newValue) {
      if (newValue) {
        this.fetchScoreInfo();
      }
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
  .poult-word {
    padding: 20upx 28upx;
    background: rgba(255, 222, 23, 1);
    border-radius: 43px;
    border: 3px solid rgba(156, 110, 33, 1);
    color: #592c11;
    font-size: 28upx;
    line-height: 40upx;
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