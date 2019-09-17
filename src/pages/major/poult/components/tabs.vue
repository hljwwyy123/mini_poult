<template>
  <view class="tabs">
    <view class="tab">
      <view
        v-for="(item, index) in tabs"
        :key="index"
        @click="handeTabClick(index)"
        :class="['tab-item', {active: activeIndex === index}]"
      >{{item.title}}</view>
    </view>
    <view class="panel-wrapper">
      <view class="panel-scroll-container">
        <view class="panel-container">
          <view
            @click="handlePersonClick(item)"
            v-for="(item, index) in activePanelData"
            :key="index"
            class="panel-item"
          >
            <image class="item-avatar" :src="item.avatar" />
            <view class="nick-name">{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
          title: "最近揍我的人",
          data: [
            {
              avatar: "/static/avatar.jpeg",
              name: "1"
            },
            {
              avatar: "/static/avatar.jpeg",
              name: "2"
            },
            {
              avatar: "/static/avatar.jpeg",
              name: "3"
            },
            {
              avatar: "/static/avatar.jpeg",
              name: "4"
            },
            {
              avatar: "/static/avatar.jpeg",
              name: "5"
            },
            {
              avatar: "/static/avatar.jpeg",
              name: "6"
            }
          ]
        },
        {
          title: "附近的人",
          data: [
            {
              avatar: "/static/avatar.jpeg",
              name: "123"
            }
          ]
        },
        {
          title: "我的好友",
          data: [
            {
              avatar: "/static/avatar.jpeg",
              name: "123"
            }
          ]
        }
      ]
    }
  },
  computed: {
    activePanelData: function() {
      return this.tabs[this.activeIndex].data;
    },
    ...mapState({
      openId: state => state.openId,
      nickName: state => state.nickName
    })
  },
  mounted() {
    this.getLists();
  },
  methods: {
    handeTabClick(index) {
      this.activeIndex = index;
    },
    /**
     * 切换别人的小鸡
     */
    handlePersonClick(item) {
      if (item.openId) {
        this.$emit("changePoult", item);
      }
    },
    getLists() {
      if (this.openId) {
        console.log(this.$store.state);
        this.$request({
          url: "/mp/operateList",
          method: "POST",
          data: {
            openid: this.openId
          }
        }).then(res => {
          console.log("res ", res);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.tabs {
  position: fixed;
  bottom: 30upx;
  left: 0;
  width: 100%;
  .tab {
    display: flex;
    width: 100%;
    justify-content: center;
    .tab-item {
      width: 196upx;
      height: 54upx;
      line-height: 54upx;
      font-size: 28upx;
      color: white;
      background: url("~@/static/tab-bg.png") no-repeat;
      background-size: 100% 100%;
      &.active {
        background: url("~@/static/tab-active.png") no-repeat;
        color: #795109;
        background-size: 100% 100%;
      }
    }
  }
  .panel-wrapper {
    width: 734upx;
    margin: auto;
    height: 196upx;
    background: url("~@/static/friend-container.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .panel-scroll-container {
      padding: 20upx 28upx;
      overflow: hidden;
      .panel-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: auto;
        .panel-item {
          padding: 10px;
          display: flex;
          flex-direction: column;
          .item-avatar {
            width: 83upx;
            height: 83upx;
            border-radius: 50%;
            border: 3upx solid #ffa780;
          }
          .nick-name {
            max-width: 100upx;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 24upx;
            font-weight: 400;
            color: #795109;
          }
        }
      }
    }
  }
}
</style>