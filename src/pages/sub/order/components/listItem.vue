<template>
  <div class="list-item">
    <div class="label-text">{{label}}</div>
    <div class="content-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: "",
    text: ""
  }
};
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  justify-content: space-between;
  height: 110upx;
  line-height: 110upx;
  font-size: 30upx;
  color: #212830;
  border-bottom: 1upx solid #eaecf0;
  .label-text {
    color: #676c7c;
  }
  .content-text {
    color: #212830;
  }
}
</style>