<template>
  <button
    v-if="!authed"
    open-type="getUserInfo"
    @getuserinfo="handleGetUserInfo"
    class="auth-button"
  ></button>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authed: state => state.authed,
      userInfo: state => state.userInfo || {}
    })
  },
  methods: {
    handleGetUserInfo(el) {
      const { userInfo } = el.detail;
      console.log(this.$store)
      if (userInfo) {
        this.$store.commit("loginWx", el.detail.userInfo);
        this.$store.commit("authed", true);
        this.$emit("authComplete", el);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.auth-button {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: transparent;
  border: none;
}
</style>
