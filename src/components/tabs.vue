<template>
  <div class="tabs">
    <div class="tab">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        @click="handeTabClick(index)"
        :class="['tab-item', {actice: activeIndex === index}]"
      >{{item.title}}</div>
    </div>
    <scroll-view>
      <div class="panel">
        <div v-for="(item, index) in activePanel" :key="index" class="panel-item">{{item.name}}</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  props: {
    tabs: {
      type: Array,
      required: true,
      default: [
        {
          title: "title1",
          data: [
            {
              image: "",
              name: "1"
            },
            {
              image: "",
              name: "2"
            },
            {
              image: "",
              name: "3"
            },
            {
              image: "",
              name: "4"
            },
            {
              image: "",
              name: "5"
            },
            {
              image: "",
              name: "6"
            }
          ]
        },
        {
          title: "title2",
          data: [
            {
              image: "",
              name: "123"
            }
          ]
        }
      ]
    }
  },
  computed: {
    activePanel: function() {
      return this.tabs[this.activeIndex].data;
    }
  },
  methods: {
    handeTabClick(index) {
      this.activeIndex = index
    }
  }
};
</script>

<style lang="scss">
.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .tab {
    display: flex;
    width: 100%;
    .tab-item {
      padding: 10px;
      background-color: #fff;
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
      &.active {
        background-color: #f4f4f4;
      }
    }
  }
  .panel {
    display: flex;
    .panel-item {
      padding: 10px;
    }
  }
}
</style>