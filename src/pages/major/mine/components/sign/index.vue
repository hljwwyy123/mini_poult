<template>
  <div class="section-content">
    <div v-for="(item, index) in daysInfo" :key="index" class="day">
      <div v-if="signedDays >= index + 1" class="day-content active"></div>
      <div v-else class="day-content">+{{item}}</div>
      <div class="day-footer">第{{index + 1}}天</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysInfo: {}
    };
  },
  props: {
    openId: String,
    signedDays: [String, Number]
  },
  mounted() {
    this.getDaysInfo();
  },
  methods: {
    getDaysInfo() {
      this.$request({
        url: "/mp/signedScore"
      }).then(res => (this.daysInfo = res));
    }
  }
};
</script>

<style scoped lang="scss">
.section-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30upx;
}
.day {
  color: #828282;
  text-align: center;
  .day-content {
    border: 1px solid #828282;
    border-radius: 50%;
    width: 66upx;
    height: 66upx;
    line-height: 66upx;
    font-size: 24upx;
    &.active {
      background-image: url("~@/static/checked.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-color: transparent;
    }
  }
  .day-footer {
    font-size: 20upx;
    padding-top: 5upx;
  }
}
</style>