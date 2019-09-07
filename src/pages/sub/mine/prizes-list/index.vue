<template>
  <view class="prize-wrapper">
    <prize-item v-for="item in list" :key="item" :prize="item" />
  </view>
</template>
<script>
import prizeItem from "./components/prizeItem";

export default {
  components: {
    prizeItem
  },
  data() {
    return {
      list: [
        {
          picture: "/static/goods.jpg",
          name: "Diesel男表个性手表",
          originPrice: "4999",
          price: "3999",
          changedNum: (Math.random() * 1000) | 0,
          remainNum: (Math.random() * 10) | 0
        },
        {
          picture: "/static/goods.jpg",
          name: "Diesel男表个性手表",
          originPrice: "4999",
          price: "3999",
          changedNum: (Math.random() * 1000) | 0,
          remainNum: (Math.random() * 10) | 0
        },
        {
          picture: "/static/goods.jpg",
          name: "Diesel男表个性手表",
          originPrice: "4999",
          price: "3999",
          changedNum: (Math.random() * 1000) | 0,
          remainNum: 0
        }
      ]
    };
  },
  onLoad() {
    // todo ajax
    this.getPrizeList();
  },
  methods: {
    getPrizeList() {
      uni.request({
        url: this.$serverUrl + "/mp/login",
        success: res => {
          // if (res.data.code !== 0) {
          // 	uni.showModal({
          // 		content: '请求失败，失败原因：' + res.data.msg,
          // 		showCancel: false
          // 	})
          // 	return;
          // }
          // this.data = this.data.concat(res.data.data);
        },
        fail: () => {
          uni.showModal({
            content: "请求失败，请重试!",
            showCancel: false
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.rank-wrapper {
  .scroll-wrapper {
  }
}
</style>