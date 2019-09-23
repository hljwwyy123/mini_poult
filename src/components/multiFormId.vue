<template>
  <div class="form-id-box">
    <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
      <button form-type="submit">
        <div class="btn-box">
          <form
            class="record-formid"
            report-submit
            date-type="submit"
            @submit="recordFormId($event)"
          >
            <button form-type="submit">
              <div class="btn-box">
                <form
                  class="record-formid"
                  report-submit
                  date-type="submit"
                  @submit="recordFormId($event)"
                >
                  <button form-type="submit">
                    <div class="btn-box">
                      <form
                        class="record-formid"
                        report-submit
                        date-type="submit"
                        @submit="recordFormId($event)"
                      >
                        <button form-type="submit">
                          <div class="btn-box">
                            <form
                              class="record-formid"
                              report-submit
                              date-type="submit"
                              @submit="recordFormId($event)"
                            >
                              <button form-type="submit">
                                <div class="btn-box">
                                  <form
                                    class="record-formid"
                                    report-submit
                                    date-type="submit"
                                    @submit="recordFormId($event)"
                                  >
                                    <button form-type="submit">
                                      <div class="btn-box">
                                        <form
                                          class="record-formid"
                                          report-submit
                                          date-type="submit"
                                          @submit="recordFormId($event)"
                                        >
                                          <button form-type="submit">
                                            <div class="btn-box">
                                              <form
                                                class="record-formid"
                                                report-submit
                                                date-type="submit"
                                                @submit="recordFormId($event)"
                                              >
                                                <button form-type="submit">
                                                  <div class="btn-box">
                                                    <form
                                                      class="record-formid"
                                                      report-submit
                                                      date-type="submit"
                                                      @submit="recordFormId($event)"
                                                    >
                                                      <button form-type="submit">
                                                        <div class="btn-box">
                                                          <form
                                                            class="record-formid"
                                                            report-submit
                                                            date-type="submit"
                                                            @submit="recordFormId($event)"
                                                          >
                                                            <button form-type="submit">
                                                              <div class="btn-box">
                                                                <slot />
                                                              </div>
                                                            </button>
                                                          </form>
                                                        </div>
                                                      </button>
                                                    </form>
                                                  </div>
                                                </button>
                                              </form>
                                            </div>
                                          </button>
                                        </form>
                                      </div>
                                    </button>
                                  </form>
                                </div>
                              </button>
                            </form>
                          </div>
                        </button>
                      </form>
                    </div>
                  </button>
                </form>
              </div>
            </button>
          </form>
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    type: {
      // 业务线
      type: String,
      default: "wxapp_sales"
    },
    source: {
      // 活动来源
      type: String,
      default: "default"
    },
    btnText: {
      // 按钮文字
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState({
      openId: state => state.openId
    })
  },
  mounted() {
    this.ids = [];
  },
  methods: {
    recordFormId(e) {
      console.log(e);
      const { formId } = e.detail;
      this.ids.push(formId);
      clearTimeout(this.submitTimer);
      this.submitTimer = setTimeout(() => {
        console.log(this.ids);
        this.$request({
          url: "/mp/saveFromId",
          method: "POST",
          data: {
            openid: this.openId,
            formId: this.ids.join(",")
          }
        }).then(res => console.log(res));
      }, 160);
    }
  }
};
</script>

<style scoped lang="scss">
.form-id-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(0);
  .record-formid {
    .btn-box {
      width: 100%;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    button {
      width: 1upx;
      height: 1upx;
      margin: 0;
      padding: 0;
      border-color: transparent;
      border: none;
      background-color: transparent;
      &:after {
        border: none;
      }
    }
  }
}
</style>
