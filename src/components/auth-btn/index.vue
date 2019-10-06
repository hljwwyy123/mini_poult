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
      if (userInfo) {
        this.$store.commit("setUserInfo", el.detail.userInfo);
        this.$store.commit("authed", true);
        // 有时候没有头像 怀疑是此处的原因
        setTimeout(() => {
          this.$emit("authComplete", el);
        }, 10);
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
