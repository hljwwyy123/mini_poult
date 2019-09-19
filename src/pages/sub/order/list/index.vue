<template>
  <div class="prize-wrapper">
    <block v-for="item in list" :key="item.orderNum">
      <order-item :order="item" />
    </block>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import orderItem from "./components/order-item";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  mounted() {
    this.fetchOrderList()
  },
  methods: {
    // TODO: 分页
    fetchOrderList() {
      this.$request({
        url: "/mp/goodExchangeList",
        method: "POST",
        data: {
          openid: this.openId
        }
      }).then(res => {
        console.log('fetchOrderList ', res)
        this.list = res.data;
      });
    }
  },
  components: {
    orderItem
  }
};
</script>
<style scoped lang="scss">
</style>